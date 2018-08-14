/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
/*

  The MIT License (MIT)

  Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/

function OutputLine(parent) {
  this._parent = parent;
  this._character_count = 0;
  // use indent_count as a marker for this._lines that have preserved indentation
  this._indent_count = -1;
  this._alignment_count = 0;

  this._items = [];
}

OutputLine.prototype.set_indent = function(level) {
  this._indent_count = level;
  this._character_count = this._parent.baseIndentLength + this._alignment_count + this._indent_count * this._parent.indent_length;
};

OutputLine.prototype.set_alignment = function(level) {
  this._alignment_count = level;
  this._character_count = this._parent.baseIndentLength + this._alignment_count + this._indent_count * this._parent.indent_length;
};

OutputLine.prototype.get_character_count = function() {
  return this._character_count;
};

OutputLine.prototype.is_empty = function() {
  return this._items.length === 0;
};

OutputLine.prototype.last = function() {
  if (!this.is_empty()) {
    return this._items[this._items.length - 1];
  } else {
    return null;
  }
};

OutputLine.prototype.push = function(item) {
  this._items.push(item);
  this._character_count += item.length;
};

OutputLine.prototype.push_raw = function(item) {
  this.push(item);
  var last_newline_index = item.lastIndexOf('\n');
  if (last_newline_index !== -1) {
    this._character_count = item.length - last_newline_index;
  }
};

OutputLine.prototype.pop = function() {
  var item = null;
  if (!this.is_empty()) {
    item = this._items.pop();
    this._character_count -= item.length;
  }
  return item;
};

OutputLine.prototype.remove_indent = function() {
  if (this._indent_count > 0) {
    this._indent_count -= 1;
    this._character_count -= this._parent.indent_length;
  }
};

OutputLine.prototype.trim = function() {
  while (this.last() === ' ') {
    this._items.pop();
    this._character_count -= 1;
  }
};

OutputLine.prototype.toString = function() {
  var result = '';
  if (!this.is_empty()) {
    if (this._indent_count >= 0) {
      result = this._parent.get_indent_string(this._indent_count);
    }
    if (this._alignment_count >= 0) {
      result += this._parent.get_alignment_string(this._alignment_count);
    }
    result += this._items.join('');
  }
  return result;
};


function Output(indent_string, baseIndentString) {
  baseIndentString = baseIndentString || '';
  this._indent_cache = [baseIndentString];
  this._alignment_cache = [''];
  this.baseIndentLength = baseIndentString.length;
  this.indent_length = indent_string.length;
  this.raw = false;

  this._lines = [];
  this.baseIndentString = baseIndentString;
  this.indent_string = indent_string;
  this.previous_line = null;
  this.current_line = null;
  this.space_before_token = false;
  // initialize
  this.add_outputline();
}

Output.prototype.add_outputline = function() {
  this.previous_line = this.current_line;
  this.current_line = new OutputLine(this);
  this._lines.push(this.current_line);
};

Output.prototype.get_line_number = function() {
  return this._lines.length;
};

Output.prototype.get_indent_string = function(level) {
  while (level >= this._indent_cache.length) {
    this._indent_cache.push(this._indent_cache[this._indent_cache.length - 1] + this.indent_string);
  }

  return this._indent_cache[level];
};

Output.prototype.get_alignment_string = function(level) {
  while (level >= this._alignment_cache.length) {
    this._alignment_cache.push(this._alignment_cache[this._alignment_cache.length - 1] + ' ');
  }

  return this._alignment_cache[level];
};


// Using object instead of string to allow for later expansion of info about each line
Output.prototype.add_new_line = function(force_newline) {
  if (this.get_line_number() === 1 && this.just_added_newline()) {
    return false; // no newline on start of file
  }

  if (force_newline || !this.just_added_newline()) {
    if (!this.raw) {
      this.add_outputline();
    }
    return true;
  }

  return false;
};

Output.prototype.get_code = function(end_with_newline, eol) {
  var sweet_code = this._lines.join('\n').replace(/[\r\n\t ]+$/, '');

  if (end_with_newline) {
    sweet_code += '\n';
  }

  if (eol !== '\n') {
    sweet_code = sweet_code.replace(/[\n]/g, eol);
  }

  return sweet_code;
};

Output.prototype.set_indent = function(level) {
  // Never indent your first output indent at the start of the file
  if (this._lines.length > 1) {
    this.current_line.set_indent(level);
    return true;
  }
  this.current_line.set_indent(0);
  return false;
};

Output.prototype.set_alignment = function(level) {
  // Never indent your first output indent at the start of the file
  if (this._lines.length > 1) {
    this.current_line.set_alignment(level);
    return true;
  }
  this.current_line.set_alignment(0);
  return false;
};


Output.prototype.add_raw_token = function(token) {
  for (var x = 0; x < token.newlines; x++) {
    this.add_outputline();
  }
  this.current_line.push(token.whitespace_before);
  this.current_line.push_raw(token.text);
  this.space_before_token = false;
};

Output.prototype.add_token = function(printable_token) {
  this.add_space_before_token();
  this.current_line.push(printable_token);
};

Output.prototype.add_space_before_token = function() {
  if (this.space_before_token && !this.just_added_newline()) {
    this.current_line.push(' ');
  }
  this.space_before_token = false;
};

Output.prototype.remove_indent = function(index) {
  var output_length = this._lines.length;
  while (index < output_length) {
    this._lines[index].remove_indent();
    index++;
  }
};

Output.prototype.trim = function(eat_newlines) {
  eat_newlines = (eat_newlines === undefined) ? false : eat_newlines;

  this.current_line.trim(this.indent_string, this.baseIndentString);

  while (eat_newlines && this._lines.length > 1 &&
    this.current_line.is_empty()) {
    this._lines.pop();
    this.current_line = this._lines[this._lines.length - 1];
    this.current_line.trim();
  }

  this.previous_line = this._lines.length > 1 ? this._lines[this._lines.length - 2] : null;
};

Output.prototype.just_added_newline = function() {
  return this.current_line.is_empty();
};

Output.prototype.just_added_blankline = function() {
  if (this.just_added_newline()) {
    if (this._lines.length === 1) {
      return true; // start of the file and newline = blank
    }

    var line = this._lines[this._lines.length - 2];
    return line.is_empty();
  }
  return false;
};


module.exports.Output = Output;