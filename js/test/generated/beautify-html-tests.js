/*
    AUTO-GENERATED. DO NOT MODIFY.
    Script: test/generate-tests.js
    Template: test/data/html/node.mustache
    Data: test/data/html/tests.js

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
/*jshint unused:false */

function run_html_tests(test_obj, Urlencoded, js_beautify, html_beautify, css_beautify)
{

    var default_opts = {
        indent_size: 4,
        indent_char: ' ',
        preserve_newlines: true,
        jslint_happy: false,
        keep_array_indentation: false,
        brace_style: 'collapse',
        space_before_conditional: true,
        break_chained_methods: false,
        selector_separator: '\n',
        end_with_newline: false
    };
    var opts;

    default_opts.indent_size = 4;
    default_opts.indent_char = ' ';
    default_opts.indent_with_tabs = false;
    default_opts.preserve_newlines = true;
    default_opts.jslint_happy = false;
    default_opts.keep_array_indentation = false;
    default_opts.brace_style = 'collapse';
    default_opts.extra_liners = ['html', 'head', '/html'];

    function reset_options()
    {
        opts = JSON.parse(JSON.stringify(default_opts));
        test_name = 'html-beautify';
    }

    function test_beautifier(input)
    {
        return html_beautify(input, opts);
    }

    var sanitytest;
    var test_name = '';

    function set_name(name)
    {
        name = (name || '').trim();
        if (name) {
            test_name = name.replace(/\r/g, '\\r').replace(/\n/g, '\\n');
        }
    }

    // test the input on beautifier with the current flag settings
    // does not check the indentation / surroundings as bt() does
    function test_fragment(input, expected)
    {
        var success = true;
        sanitytest.test_function(test_beautifier, test_name);
        expected = expected || expected === '' ? expected : input;
        success = success && sanitytest.expect(input, expected);
        // if the expected is different from input, run it again
        // expected output should be unchanged when run twice.
        if (success && expected !== input) {
            success = success && sanitytest.expect(expected, expected);
        }

        // Everywhere we do newlines, they should be replaced with opts.eol
        sanitytest.test_function(test_beautifier, 'eol ' + test_name);
        opts.eol = '\r\n';
        expected = expected.replace(/[\n]/g, '\r\n');
        success = success && sanitytest.expect(input, expected);
        if (success && input && input.indexOf('\n') !== -1) {
            input = input.replace(/[\n]/g, '\r\n');
            sanitytest.expect(input, expected);
            // Ensure support for auto eol detection
            opts.eol = 'auto';
            success = success && sanitytest.expect(input, expected);
        }
        opts.eol = '\n';
        return success;
    }

    // test html
    function bth(input, expectation)
    {
        var success = true;

        var wrapped_input, wrapped_expectation, field_input, field_expectation;

        expectation = expectation || expectation === '' ? expectation : input;
        success = success && test_fragment(input, expectation);

        if (opts.indent_size === 4 && input) {
            wrapped_input = '<div>\n' + input.replace(/^(.+)$/mg, '    $1') + '\n    <span>inline</span>\n</div>';
            wrapped_expectation = '<div>\n' + expectation.replace(/^(.+)$/mg, '    $1') + '\n    <span>inline</span>\n</div>';
            success = success && test_fragment(wrapped_input, wrapped_expectation);
        }
        return success;
    }

    function unicode_char(value) {
        return String.fromCharCode(value);
    }

    function beautifier_tests()
    {
        sanitytest = test_obj;

        reset_options();
        //============================================================
        bth('');


        //============================================================
        // Handle inline and block elements differently - ()
        reset_options();
        set_name('Handle inline and block elements differently - ()');
        test_fragment(
            '<body><h1>Block</h1></body>',
            //  -- output --
            '<body>\n' +
            '    <h1>Block</h1>\n' +
            '</body>');
        test_fragment('<body><i>Inline</i></body>');


        //============================================================
        // End With Newline - (end_with_newline = "true")
        reset_options();
        set_name('End With Newline - (end_with_newline = "true")');
        opts.end_with_newline = true;
        test_fragment('', '\n');
        test_fragment('<div></div>', '<div></div>\n');
        test_fragment('\n');

        // End With Newline - (end_with_newline = "false")
        reset_options();
        set_name('End With Newline - (end_with_newline = "false")');
        opts.end_with_newline = false;
        test_fragment('');
        test_fragment('<div></div>');
        test_fragment('\n', '');


        //============================================================
        // Custom Extra Liners (empty) - (extra_liners = "[]")
        reset_options();
        set_name('Custom Extra Liners (empty) - (extra_liners = "[]")');
        opts.extra_liners = [];
        test_fragment(
            '<html><head><meta></head><body><div><p>x</p></div></body></html>',
            //  -- output --
            '<html>\n' +
            '<head>\n' +
            '    <meta>\n' +
            '</head>\n' +
            '<body>\n' +
            '    <div>\n' +
            '        <p>x</p>\n' +
            '    </div>\n' +
            '</body>\n' +
            '</html>');


        //============================================================
        // Custom Extra Liners (default) - (extra_liners = "null")
        reset_options();
        set_name('Custom Extra Liners (default) - (extra_liners = "null")');
        opts.extra_liners = null;
        test_fragment(
            '<html><head></head><body></body></html>',
            //  -- output --
            '<html>\n' +
            '\n' +
            '<head></head>\n' +
            '\n' +
            '<body></body>\n' +
            '\n' +
            '</html>');


        //============================================================
        // Custom Extra Liners (p, string) - (extra_liners = ""p,/p"")
        reset_options();
        set_name('Custom Extra Liners (p, string) - (extra_liners = ""p,/p"")');
        opts.extra_liners = 'p,/p';
        test_fragment(
            '<html><head><meta></head><body><div><p>x</p></div></body></html>',
            //  -- output --
            '<html>\n' +
            '<head>\n' +
            '    <meta>\n' +
            '</head>\n' +
            '<body>\n' +
            '    <div>\n' +
            '\n' +
            '        <p>x\n' +
            '\n' +
            '        </p>\n' +
            '    </div>\n' +
            '</body>\n' +
            '</html>');


        //============================================================
        // Custom Extra Liners (p) - (extra_liners = "["p", "/p"]")
        reset_options();
        set_name('Custom Extra Liners (p) - (extra_liners = "["p", "/p"]")');
        opts.extra_liners = ['p', '/p'];
        test_fragment(
            '<html><head><meta></head><body><div><p>x</p></div></body></html>',
            //  -- output --
            '<html>\n' +
            '<head>\n' +
            '    <meta>\n' +
            '</head>\n' +
            '<body>\n' +
            '    <div>\n' +
            '\n' +
            '        <p>x\n' +
            '\n' +
            '        </p>\n' +
            '    </div>\n' +
            '</body>\n' +
            '</html>');


        //============================================================
        // Tests for script and style types (issue 453, 821)
        reset_options();
        set_name('Tests for script and style types (issue 453, 821)');
        bth('<script type="text/unknown"><div></div></script>');
        bth('<script type="text/unknown">Blah Blah Blah</script>');
        bth('<script type="text/unknown">    Blah Blah Blah   </script>', '<script type="text/unknown"> Blah Blah Blah   </script>');
        bth(
            '<script type="text/javascript"><div></div></script>',
            //  -- output --
            '<script type="text/javascript">\n' +
            '    < div > < /div>\n' +
            '</script>');
        bth(
            '<script><div></div></script>',
            //  -- output --
            '<script>\n' +
            '    < div > < /div>\n' +
            '</script>');
        bth(
            '<script>var foo = "bar";</script>',
            //  -- output --
            '<script>\n' +
            '    var foo = "bar";\n' +
            '</script>');
        bth(
            '<script type="text/javascript">var foo = "bar";</script>',
            //  -- output --
            '<script type="text/javascript">\n' +
            '    var foo = "bar";\n' +
            '</script>');
        bth(
            '<script type="application/javascript">var foo = "bar";</script>',
            //  -- output --
            '<script type="application/javascript">\n' +
            '    var foo = "bar";\n' +
            '</script>');
        bth(
            '<script type="application/javascript;version=1.8">var foo = "bar";</script>',
            //  -- output --
            '<script type="application/javascript;version=1.8">\n' +
            '    var foo = "bar";\n' +
            '</script>');
        bth(
            '<script type="application/x-javascript">var foo = "bar";</script>',
            //  -- output --
            '<script type="application/x-javascript">\n' +
            '    var foo = "bar";\n' +
            '</script>');
        bth(
            '<script type="application/ecmascript">var foo = "bar";</script>',
            //  -- output --
            '<script type="application/ecmascript">\n' +
            '    var foo = "bar";\n' +
            '</script>');
        bth(
            '<script type="dojo/aspect">this.domNode.style.display="none";</script>',
            //  -- output --
            '<script type="dojo/aspect">\n' +
            '    this.domNode.style.display = "none";\n' +
            '</script>');
        bth(
            '<script type="dojo/method">this.domNode.style.display="none";</script>',
            //  -- output --
            '<script type="dojo/method">\n' +
            '    this.domNode.style.display = "none";\n' +
            '</script>');
        bth(
            '<script type="text/javascript1.5">var foo = "bar";</script>',
            //  -- output --
            '<script type="text/javascript1.5">\n' +
            '    var foo = "bar";\n' +
            '</script>');
        bth(
            '<script type="application/json">{"foo":"bar"}</script>',
            //  -- output --
            '<script type="application/json">\n' +
            '    {\n' +
            '        "foo": "bar"\n' +
            '    }\n' +
            '</script>');
        bth(
            '<script type="application/ld+json">{"foo":"bar"}</script>',
            //  -- output --
            '<script type="application/ld+json">\n' +
            '    {\n' +
            '        "foo": "bar"\n' +
            '    }\n' +
            '</script>');
        bth('<style type="text/unknown"><tag></tag></style>');
        bth(
            '<style type="text/css"><tag></tag></style>',
            //  -- output --
            '<style type="text/css">\n' +
            '    <tag></tag>\n' +
            '</style>');
        bth(
            '<style><tag></tag></style>',
            //  -- output --
            '<style>\n' +
            '    <tag></tag>\n' +
            '</style>');
        bth(
            '<style>.selector {font-size:12px;}</style>',
            //  -- output --
            '<style>\n' +
            '    .selector {\n' +
            '        font-size: 12px;\n' +
            '    }\n' +
            '</style>');
        bth(
            '<style type="text/css">.selector {font-size:12px;}</style>',
            //  -- output --
            '<style type="text/css">\n' +
            '    .selector {\n' +
            '        font-size: 12px;\n' +
            '    }\n' +
            '</style>');


        //============================================================
        // Attribute Wrap alignment with spaces - (wrap_attributes = ""force-aligned"", indent_with_tabs = "true")
        reset_options();
        set_name('Attribute Wrap alignment with spaces - (wrap_attributes = ""force-aligned"", indent_with_tabs = "true")');
        opts.wrap_attributes = 'force-aligned';
        opts.indent_with_tabs = true;
        test_fragment(
            '<div><div a="1" b="2"><div>test</div></div></div>',
            //  -- output --
            '<div>\n' +
            '\t<div a="1"\n' +
            '\t     b="2">\n' +
            '\t\t<div>test</div>\n' +
            '\t</div>\n' +
            '</div>');


        //============================================================
        // Attribute Wrap de-indent - (wrap_attributes = ""force-aligned"", indent_with_tabs = "false")
        reset_options();
        set_name('Attribute Wrap de-indent - (wrap_attributes = ""force-aligned"", indent_with_tabs = "false")');
        opts.wrap_attributes = 'force-aligned';
        opts.indent_with_tabs = false;
        test_fragment(
            '<div a="1" b="2"><div>test</div></div>',
            //  -- output --
            '<div a="1"\n' +
            '     b="2">\n' +
            '    <div>test</div>\n' +
            '</div>');
        test_fragment(
            '<p>\n' +
            '    <a href="/test/" target="_blank"><img src="test.jpg" /></a><a href="/test/" target="_blank"><img src="test.jpg" /></a>\n' +
            '</p>',
            //  -- output --
            '<p>\n' +
            '    <a href="/test/"\n' +
            '       target="_blank"><img src="test.jpg" /></a><a href="/test/"\n' +
            '       target="_blank"><img src="test.jpg" /></a>\n' +
            '</p>');
        test_fragment(
            '<p>\n' +
            '    <span data-not-a-href="/test/" data-totally-not-a-target="_blank"><img src="test.jpg" /></span><span data-not-a-href="/test/" data-totally-not-a-target="_blank"><img src="test.jpg" /></span>\n' +
            '</p>',
            //  -- output --
            '<p>\n' +
            '    <span data-not-a-href="/test/"\n' +
            '          data-totally-not-a-target="_blank"><img src="test.jpg" /></span><span data-not-a-href="/test/"\n' +
            '          data-totally-not-a-target="_blank"><img src="test.jpg" /></span>\n' +
            '</p>');


        //============================================================
        // Attribute Wrap - (wrap_attributes = ""force"")
        reset_options();
        set_name('Attribute Wrap - (wrap_attributes = ""force"")');
        opts.wrap_attributes = 'force';
        test_fragment('<div  >This is some text</div>', '<div>This is some text</div>');
        
        // This test shows how line wrapping is still not correct. Should wrap before 0015.
        test_fragment('<span>0 0001 0002 0003 0004 0005 0006 0007 0008 0009 0010 0011 0012 0013 0014 0015 0016 0017 0018 0019 0020</span>');
        
        // Issue 1222 -- P tags are formatting correctly
        test_fragment('<p>Our forms for collecting address-related information follow a standard design. Specific input elements will vary according to the form’s audience and purpose.</p>');
        test_fragment('<div attr="123"  >This is some text</div>', '<div attr="123">This is some text</div>');
        test_fragment(
            '<div attr0 attr1="123" data-attr2="hello    t here">This is some text</div>',
            //  -- output --
            '<div attr0\n' +
            '    attr1="123"\n' +
            '    data-attr2="hello    t here">This is some text</div>');
        test_fragment(
            '<div lookatthissuperduperlongattributenamewhoahcrazy0="true" attr0 attr1="123" data-attr2="hello    t here" heymanimreallylongtoowhocomesupwiththesenames="false">This is some text</div>',
            //  -- output --
            '<div lookatthissuperduperlongattributenamewhoahcrazy0="true"\n' +
            '    attr0\n' +
            '    attr1="123"\n' +
            '    data-attr2="hello    t here"\n' +
            '    heymanimreallylongtoowhocomesupwiththesenames="false">This is some text</div>');
        test_fragment(
            '<img attr0 attr1="123" data-attr2="hello    t here"/>',
            //  -- output --
            '<img attr0\n' +
            '    attr1="123"\n' +
            '    data-attr2="hello    t here" />');
        test_fragment(
            '<?xml version="1.0" encoding="UTF-8" ?><root attr1="foo" attr2="bar"/>',
            //  -- output --
            '<?xml version="1.0" encoding="UTF-8" ?>\n' +
            '<root attr1="foo"\n' +
            '    attr2="bar" />');
        test_fragment(
            '<link href="//fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,400,600,700,300&amp;subset=latin" rel="stylesheet" type="text/css">',
            //  -- output --
            '<link href="//fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,400,600,700,300&amp;subset=latin"\n' +
            '    rel="stylesheet"\n' +
            '    type="text/css">');

        // Attribute Wrap - (wrap_attributes = ""force"", wrap_line_length = "80")
        reset_options();
        set_name('Attribute Wrap - (wrap_attributes = ""force"", wrap_line_length = "80")');
        opts.wrap_attributes = 'force';
        opts.wrap_line_length = 80;
        test_fragment('<div  >This is some text</div>', '<div>This is some text</div>');
        
        // This test shows how line wrapping is still not correct. Should wrap before 0015.
        test_fragment(
            '<span>0 0001 0002 0003 0004 0005 0006 0007 0008 0009 0010 0011 0012 0013 0014 0015 0016 0017 0018 0019 0020</span>',
            //  -- output --
            '<span>0 0001 0002 0003 0004 0005 0006 0007 0008 0009 0010 0011 0012 0013 0014 0015\n' +
            '    0016 0017 0018 0019 0020</span>');
        
        // Issue 1222 -- P tags are formatting correctly
        test_fragment(
            '<p>Our forms for collecting address-related information follow a standard design. Specific input elements will vary according to the form’s audience and purpose.</p>',
            //  -- output --
            '<p>Our forms for collecting address-related information follow a standard design.\n' +
            '    Specific input elements will vary according to the form’s audience and purpose.</p>');
        test_fragment('<div attr="123"  >This is some text</div>', '<div attr="123">This is some text</div>');
        test_fragment(
            '<div attr0 attr1="123" data-attr2="hello    t here">This is some text</div>',
            //  -- output --
            '<div attr0\n' +
            '    attr1="123"\n' +
            '    data-attr2="hello    t here">This is some text</div>');
        test_fragment(
            '<div lookatthissuperduperlongattributenamewhoahcrazy0="true" attr0 attr1="123" data-attr2="hello    t here" heymanimreallylongtoowhocomesupwiththesenames="false">This is some text</div>',
            //  -- output --
            '<div lookatthissuperduperlongattributenamewhoahcrazy0="true"\n' +
            '    attr0\n' +
            '    attr1="123"\n' +
            '    data-attr2="hello    t here"\n' +
            '    heymanimreallylongtoowhocomesupwiththesenames="false">This is some text</div>');
        test_fragment(
            '<img attr0 attr1="123" data-attr2="hello    t here"/>',
            //  -- output --
            '<img attr0\n' +
            '    attr1="123"\n' +
            '    data-attr2="hello    t here" />');
        test_fragment(
            '<?xml version="1.0" encoding="UTF-8" ?><root attr1="foo" attr2="bar"/>',
            //  -- output --
            '<?xml version="1.0" encoding="UTF-8" ?>\n' +
            '<root attr1="foo"\n' +
            '    attr2="bar" />');
        test_fragment(
            '<link href="//fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,400,600,700,300&amp;subset=latin" rel="stylesheet" type="text/css">',
            //  -- output --
            '<link href="//fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,400,600,700,300&amp;subset=latin"\n' +
            '    rel="stylesheet"\n' +
            '    type="text/css">');

        // Attribute Wrap - (wrap_attributes = ""force"", wrap_attributes_indent_size = "8")
        reset_options();
        set_name('Attribute Wrap - (wrap_attributes = ""force"", wrap_attributes_indent_size = "8")');
        opts.wrap_attributes = 'force';
        opts.wrap_attributes_indent_size = 8;
        test_fragment('<div  >This is some text</div>', '<div>This is some text</div>');
        
        // This test shows how line wrapping is still not correct. Should wrap before 0015.
        test_fragment('<span>0 0001 0002 0003 0004 0005 0006 0007 0008 0009 0010 0011 0012 0013 0014 0015 0016 0017 0018 0019 0020</span>');
        
        // Issue 1222 -- P tags are formatting correctly
        test_fragment('<p>Our forms for collecting address-related information follow a standard design. Specific input elements will vary according to the form’s audience and purpose.</p>');
        test_fragment('<div attr="123"  >This is some text</div>', '<div attr="123">This is some text</div>');
        test_fragment(
            '<div attr0 attr1="123" data-attr2="hello    t here">This is some text</div>',
            //  -- output --
            '<div attr0\n' +
            '        attr1="123"\n' +
            '        data-attr2="hello    t here">This is some text</div>');
        test_fragment(
            '<div lookatthissuperduperlongattributenamewhoahcrazy0="true" attr0 attr1="123" data-attr2="hello    t here" heymanimreallylongtoowhocomesupwiththesenames="false">This is some text</div>',
            //  -- output --
            '<div lookatthissuperduperlongattributenamewhoahcrazy0="true"\n' +
            '        attr0\n' +
            '        attr1="123"\n' +
            '        data-attr2="hello    t here"\n' +
            '        heymanimreallylongtoowhocomesupwiththesenames="false">This is some text</div>');
        test_fragment(
            '<img attr0 attr1="123" data-attr2="hello    t here"/>',
            //  -- output --
            '<img attr0\n' +
            '        attr1="123"\n' +
            '        data-attr2="hello    t here" />');
        test_fragment(
            '<?xml version="1.0" encoding="UTF-8" ?><root attr1="foo" attr2="bar"/>',
            //  -- output --
            '<?xml version="1.0" encoding="UTF-8" ?>\n' +
            '<root attr1="foo"\n' +
            '        attr2="bar" />');
        test_fragment(
            '<link href="//fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,400,600,700,300&amp;subset=latin" rel="stylesheet" type="text/css">',
            //  -- output --
            '<link href="//fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,400,600,700,300&amp;subset=latin"\n' +
            '        rel="stylesheet"\n' +
            '        type="text/css">');

        // Attribute Wrap - (wrap_attributes = ""auto"", wrap_line_length = "80", wrap_attributes_indent_size = "0")
        reset_options();
        set_name('Attribute Wrap - (wrap_attributes = ""auto"", wrap_line_length = "80", wrap_attributes_indent_size = "0")');
        opts.wrap_attributes = 'auto';
        opts.wrap_line_length = 80;
        opts.wrap_attributes_indent_size = 0;
        test_fragment('<div  >This is some text</div>', '<div>This is some text</div>');
        
        // This test shows how line wrapping is still not correct. Should wrap before 0015.
        test_fragment(
            '<span>0 0001 0002 0003 0004 0005 0006 0007 0008 0009 0010 0011 0012 0013 0014 0015 0016 0017 0018 0019 0020</span>',
            //  -- output --
            '<span>0 0001 0002 0003 0004 0005 0006 0007 0008 0009 0010 0011 0012 0013 0014 0015\n' +
            '    0016 0017 0018 0019 0020</span>');
        
        // Issue 1222 -- P tags are formatting correctly
        test_fragment(
            '<p>Our forms for collecting address-related information follow a standard design. Specific input elements will vary according to the form’s audience and purpose.</p>',
            //  -- output --
            '<p>Our forms for collecting address-related information follow a standard design.\n' +
            '    Specific input elements will vary according to the form’s audience and purpose.</p>');
        test_fragment('<div attr="123"  >This is some text</div>', '<div attr="123">This is some text</div>');
        test_fragment('<div attr0 attr1="123" data-attr2="hello    t here">This is some text</div>');
        test_fragment(
            '<div lookatthissuperduperlongattributenamewhoahcrazy0="true" attr0 attr1="123" data-attr2="hello    t here" heymanimreallylongtoowhocomesupwiththesenames="false">This is some text</div>',
            //  -- output --
            '<div lookatthissuperduperlongattributenamewhoahcrazy0="true" attr0 attr1="123" data-attr2="hello    t here"\n' +
            'heymanimreallylongtoowhocomesupwiththesenames="false">This is some text</div>');
        test_fragment('<img attr0 attr1="123" data-attr2="hello    t here"/>', '<img attr0 attr1="123" data-attr2="hello    t here" />');
        test_fragment(
            '<?xml version="1.0" encoding="UTF-8" ?><root attr1="foo" attr2="bar"/>',
            //  -- output --
            '<?xml version="1.0" encoding="UTF-8" ?>\n' +
            '<root attr1="foo" attr2="bar" />');
        test_fragment(
            '<link href="//fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,400,600,700,300&amp;subset=latin" rel="stylesheet" type="text/css">',
            //  -- output --
            '<link href="//fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,400,600,700,300&amp;subset=latin"\n' +
            'rel="stylesheet" type="text/css">');

        // Attribute Wrap - (wrap_attributes = ""auto"", wrap_line_length = "80", wrap_attributes_indent_size = "4")
        reset_options();
        set_name('Attribute Wrap - (wrap_attributes = ""auto"", wrap_line_length = "80", wrap_attributes_indent_size = "4")');
        opts.wrap_attributes = 'auto';
        opts.wrap_line_length = 80;
        opts.wrap_attributes_indent_size = 4;
        test_fragment('<div  >This is some text</div>', '<div>This is some text</div>');
        
        // This test shows how line wrapping is still not correct. Should wrap before 0015.
        test_fragment(
            '<span>0 0001 0002 0003 0004 0005 0006 0007 0008 0009 0010 0011 0012 0013 0014 0015 0016 0017 0018 0019 0020</span>',
            //  -- output --
            '<span>0 0001 0002 0003 0004 0005 0006 0007 0008 0009 0010 0011 0012 0013 0014 0015\n' +
            '    0016 0017 0018 0019 0020</span>');
        
        // Issue 1222 -- P tags are formatting correctly
        test_fragment(
            '<p>Our forms for collecting address-related information follow a standard design. Specific input elements will vary according to the form’s audience and purpose.</p>',
            //  -- output --
            '<p>Our forms for collecting address-related information follow a standard design.\n' +
            '    Specific input elements will vary according to the form’s audience and purpose.</p>');
        test_fragment('<div attr="123"  >This is some text</div>', '<div attr="123">This is some text</div>');
        test_fragment('<div attr0 attr1="123" data-attr2="hello    t here">This is some text</div>');
        test_fragment(
            '<div lookatthissuperduperlongattributenamewhoahcrazy0="true" attr0 attr1="123" data-attr2="hello    t here" heymanimreallylongtoowhocomesupwiththesenames="false">This is some text</div>',
            //  -- output --
            '<div lookatthissuperduperlongattributenamewhoahcrazy0="true" attr0 attr1="123" data-attr2="hello    t here"\n' +
            '    heymanimreallylongtoowhocomesupwiththesenames="false">This is some text</div>');
        test_fragment('<img attr0 attr1="123" data-attr2="hello    t here"/>', '<img attr0 attr1="123" data-attr2="hello    t here" />');
        test_fragment(
            '<?xml version="1.0" encoding="UTF-8" ?><root attr1="foo" attr2="bar"/>',
            //  -- output --
            '<?xml version="1.0" encoding="UTF-8" ?>\n' +
            '<root attr1="foo" attr2="bar" />');
        test_fragment(
            '<link href="//fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,400,600,700,300&amp;subset=latin" rel="stylesheet" type="text/css">',
            //  -- output --
            '<link href="//fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,400,600,700,300&amp;subset=latin"\n' +
            '    rel="stylesheet" type="text/css">');

        // Attribute Wrap - (wrap_attributes = ""auto"", wrap_line_length = "0")
        reset_options();
        set_name('Attribute Wrap - (wrap_attributes = ""auto"", wrap_line_length = "0")');
        opts.wrap_attributes = 'auto';
        opts.wrap_line_length = 0;
        test_fragment('<div  >This is some text</div>', '<div>This is some text</div>');
        
        // This test shows how line wrapping is still not correct. Should wrap before 0015.
        test_fragment('<span>0 0001 0002 0003 0004 0005 0006 0007 0008 0009 0010 0011 0012 0013 0014 0015 0016 0017 0018 0019 0020</span>');
        
        // Issue 1222 -- P tags are formatting correctly
        test_fragment('<p>Our forms for collecting address-related information follow a standard design. Specific input elements will vary according to the form’s audience and purpose.</p>');
        test_fragment('<div attr="123"  >This is some text</div>', '<div attr="123">This is some text</div>');
        test_fragment('<div attr0 attr1="123" data-attr2="hello    t here">This is some text</div>');
        test_fragment('<div lookatthissuperduperlongattributenamewhoahcrazy0="true" attr0 attr1="123" data-attr2="hello    t here" heymanimreallylongtoowhocomesupwiththesenames="false">This is some text</div>');
        test_fragment('<img attr0 attr1="123" data-attr2="hello    t here"/>', '<img attr0 attr1="123" data-attr2="hello    t here" />');
        test_fragment(
            '<?xml version="1.0" encoding="UTF-8" ?><root attr1="foo" attr2="bar"/>',
            //  -- output --
            '<?xml version="1.0" encoding="UTF-8" ?>\n' +
            '<root attr1="foo" attr2="bar" />');
        test_fragment('<link href="//fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,400,600,700,300&amp;subset=latin" rel="stylesheet" type="text/css">');

        // Attribute Wrap - (wrap_attributes = ""force-aligned"")
        reset_options();
        set_name('Attribute Wrap - (wrap_attributes = ""force-aligned"")');
        opts.wrap_attributes = 'force-aligned';
        test_fragment('<div  >This is some text</div>', '<div>This is some text</div>');
        
        // This test shows how line wrapping is still not correct. Should wrap before 0015.
        test_fragment('<span>0 0001 0002 0003 0004 0005 0006 0007 0008 0009 0010 0011 0012 0013 0014 0015 0016 0017 0018 0019 0020</span>');
        
        // Issue 1222 -- P tags are formatting correctly
        test_fragment('<p>Our forms for collecting address-related information follow a standard design. Specific input elements will vary according to the form’s audience and purpose.</p>');
        test_fragment('<div attr="123"  >This is some text</div>', '<div attr="123">This is some text</div>');
        test_fragment(
            '<div attr0 attr1="123" data-attr2="hello    t here">This is some text</div>',
            //  -- output --
            '<div attr0\n' +
            '     attr1="123"\n' +
            '     data-attr2="hello    t here">This is some text</div>');
        test_fragment(
            '<div lookatthissuperduperlongattributenamewhoahcrazy0="true" attr0 attr1="123" data-attr2="hello    t here" heymanimreallylongtoowhocomesupwiththesenames="false">This is some text</div>',
            //  -- output --
            '<div lookatthissuperduperlongattributenamewhoahcrazy0="true"\n' +
            '     attr0\n' +
            '     attr1="123"\n' +
            '     data-attr2="hello    t here"\n' +
            '     heymanimreallylongtoowhocomesupwiththesenames="false">This is some text</div>');
        test_fragment(
            '<img attr0 attr1="123" data-attr2="hello    t here"/>',
            //  -- output --
            '<img attr0\n' +
            '     attr1="123"\n' +
            '     data-attr2="hello    t here" />');
        test_fragment(
            '<?xml version="1.0" encoding="UTF-8" ?><root attr1="foo" attr2="bar"/>',
            //  -- output --
            '<?xml version="1.0" encoding="UTF-8" ?>\n' +
            '<root attr1="foo"\n' +
            '      attr2="bar" />');
        test_fragment(
            '<link href="//fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,400,600,700,300&amp;subset=latin" rel="stylesheet" type="text/css">',
            //  -- output --
            '<link href="//fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,400,600,700,300&amp;subset=latin"\n' +
            '      rel="stylesheet"\n' +
            '      type="text/css">');

        // Attribute Wrap - (wrap_attributes = ""force-aligned"", wrap_line_length = "80")
        reset_options();
        set_name('Attribute Wrap - (wrap_attributes = ""force-aligned"", wrap_line_length = "80")');
        opts.wrap_attributes = 'force-aligned';
        opts.wrap_line_length = 80;
        test_fragment('<div  >This is some text</div>', '<div>This is some text</div>');
        
        // This test shows how line wrapping is still not correct. Should wrap before 0015.
        test_fragment(
            '<span>0 0001 0002 0003 0004 0005 0006 0007 0008 0009 0010 0011 0012 0013 0014 0015 0016 0017 0018 0019 0020</span>',
            //  -- output --
            '<span>0 0001 0002 0003 0004 0005 0006 0007 0008 0009 0010 0011 0012 0013 0014 0015\n' +
            '    0016 0017 0018 0019 0020</span>');
        
        // Issue 1222 -- P tags are formatting correctly
        test_fragment(
            '<p>Our forms for collecting address-related information follow a standard design. Specific input elements will vary according to the form’s audience and purpose.</p>',
            //  -- output --
            '<p>Our forms for collecting address-related information follow a standard design.\n' +
            '    Specific input elements will vary according to the form’s audience and purpose.</p>');
        test_fragment('<div attr="123"  >This is some text</div>', '<div attr="123">This is some text</div>');
        test_fragment(
            '<div attr0 attr1="123" data-attr2="hello    t here">This is some text</div>',
            //  -- output --
            '<div attr0\n' +
            '     attr1="123"\n' +
            '     data-attr2="hello    t here">This is some text</div>');
        test_fragment(
            '<div lookatthissuperduperlongattributenamewhoahcrazy0="true" attr0 attr1="123" data-attr2="hello    t here" heymanimreallylongtoowhocomesupwiththesenames="false">This is some text</div>',
            //  -- output --
            '<div lookatthissuperduperlongattributenamewhoahcrazy0="true"\n' +
            '     attr0\n' +
            '     attr1="123"\n' +
            '     data-attr2="hello    t here"\n' +
            '     heymanimreallylongtoowhocomesupwiththesenames="false">This is some text</div>');
        test_fragment(
            '<img attr0 attr1="123" data-attr2="hello    t here"/>',
            //  -- output --
            '<img attr0\n' +
            '     attr1="123"\n' +
            '     data-attr2="hello    t here" />');
        test_fragment(
            '<?xml version="1.0" encoding="UTF-8" ?><root attr1="foo" attr2="bar"/>',
            //  -- output --
            '<?xml version="1.0" encoding="UTF-8" ?>\n' +
            '<root attr1="foo"\n' +
            '      attr2="bar" />');
        test_fragment(
            '<link href="//fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,400,600,700,300&amp;subset=latin" rel="stylesheet" type="text/css">',
            //  -- output --
            '<link href="//fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,400,600,700,300&amp;subset=latin"\n' +
            '      rel="stylesheet"\n' +
            '      type="text/css">');

        // Attribute Wrap - (wrap_attributes = ""aligned-multiple"", wrap_line_length = "80")
        reset_options();
        set_name('Attribute Wrap - (wrap_attributes = ""aligned-multiple"", wrap_line_length = "80")');
        opts.wrap_attributes = 'aligned-multiple';
        opts.wrap_line_length = 80;
        test_fragment('<div  >This is some text</div>', '<div>This is some text</div>');
        
        // This test shows how line wrapping is still not correct. Should wrap before 0015.
        test_fragment(
            '<span>0 0001 0002 0003 0004 0005 0006 0007 0008 0009 0010 0011 0012 0013 0014 0015 0016 0017 0018 0019 0020</span>',
            //  -- output --
            '<span>0 0001 0002 0003 0004 0005 0006 0007 0008 0009 0010 0011 0012 0013 0014 0015\n' +
            '    0016 0017 0018 0019 0020</span>');
        
        // Issue 1222 -- P tags are formatting correctly
        test_fragment(
            '<p>Our forms for collecting address-related information follow a standard design. Specific input elements will vary according to the form’s audience and purpose.</p>',
            //  -- output --
            '<p>Our forms for collecting address-related information follow a standard design.\n' +
            '    Specific input elements will vary according to the form’s audience and purpose.</p>');
        test_fragment('<div attr="123"  >This is some text</div>', '<div attr="123">This is some text</div>');
        test_fragment('<div attr0 attr1="123" data-attr2="hello    t here">This is some text</div>');
        test_fragment(
            '<div lookatthissuperduperlongattributenamewhoahcrazy0="true" attr0 attr1="123" data-attr2="hello    t here" heymanimreallylongtoowhocomesupwiththesenames="false">This is some text</div>',
            //  -- output --
            '<div lookatthissuperduperlongattributenamewhoahcrazy0="true" attr0 attr1="123" data-attr2="hello    t here"\n' +
            '     heymanimreallylongtoowhocomesupwiththesenames="false">This is some text</div>');
        test_fragment('<img attr0 attr1="123" data-attr2="hello    t here"/>', '<img attr0 attr1="123" data-attr2="hello    t here" />');
        test_fragment(
            '<?xml version="1.0" encoding="UTF-8" ?><root attr1="foo" attr2="bar"/>',
            //  -- output --
            '<?xml version="1.0" encoding="UTF-8" ?>\n' +
            '<root attr1="foo" attr2="bar" />');
        test_fragment(
            '<link href="//fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,400,600,700,300&amp;subset=latin" rel="stylesheet" type="text/css">',
            //  -- output --
            '<link href="//fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,400,600,700,300&amp;subset=latin"\n' +
            '      rel="stylesheet" type="text/css">');

        // Attribute Wrap - (wrap_attributes = ""aligned-multiple"")
        reset_options();
        set_name('Attribute Wrap - (wrap_attributes = ""aligned-multiple"")');
        opts.wrap_attributes = 'aligned-multiple';
        test_fragment('<div  >This is some text</div>', '<div>This is some text</div>');
        
        // This test shows how line wrapping is still not correct. Should wrap before 0015.
        test_fragment('<span>0 0001 0002 0003 0004 0005 0006 0007 0008 0009 0010 0011 0012 0013 0014 0015 0016 0017 0018 0019 0020</span>');
        
        // Issue 1222 -- P tags are formatting correctly
        test_fragment('<p>Our forms for collecting address-related information follow a standard design. Specific input elements will vary according to the form’s audience and purpose.</p>');
        test_fragment('<div attr="123"  >This is some text</div>', '<div attr="123">This is some text</div>');
        test_fragment('<div attr0 attr1="123" data-attr2="hello    t here">This is some text</div>');
        test_fragment('<div lookatthissuperduperlongattributenamewhoahcrazy0="true" attr0 attr1="123" data-attr2="hello    t here" heymanimreallylongtoowhocomesupwiththesenames="false">This is some text</div>');
        test_fragment('<img attr0 attr1="123" data-attr2="hello    t here"/>', '<img attr0 attr1="123" data-attr2="hello    t here" />');
        test_fragment(
            '<?xml version="1.0" encoding="UTF-8" ?><root attr1="foo" attr2="bar"/>',
            //  -- output --
            '<?xml version="1.0" encoding="UTF-8" ?>\n' +
            '<root attr1="foo" attr2="bar" />');
        test_fragment('<link href="//fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,400,600,700,300&amp;subset=latin" rel="stylesheet" type="text/css">');

        // Attribute Wrap - (wrap_attributes = ""force-aligned"", wrap_attributes_indent_size = "8")
        reset_options();
        set_name('Attribute Wrap - (wrap_attributes = ""force-aligned"", wrap_attributes_indent_size = "8")');
        opts.wrap_attributes = 'force-aligned';
        opts.wrap_attributes_indent_size = 8;
        test_fragment('<div  >This is some text</div>', '<div>This is some text</div>');
        
        // This test shows how line wrapping is still not correct. Should wrap before 0015.
        test_fragment('<span>0 0001 0002 0003 0004 0005 0006 0007 0008 0009 0010 0011 0012 0013 0014 0015 0016 0017 0018 0019 0020</span>');
        
        // Issue 1222 -- P tags are formatting correctly
        test_fragment('<p>Our forms for collecting address-related information follow a standard design. Specific input elements will vary according to the form’s audience and purpose.</p>');
        test_fragment('<div attr="123"  >This is some text</div>', '<div attr="123">This is some text</div>');
        test_fragment(
            '<div attr0 attr1="123" data-attr2="hello    t here">This is some text</div>',
            //  -- output --
            '<div attr0\n' +
            '     attr1="123"\n' +
            '     data-attr2="hello    t here">This is some text</div>');
        test_fragment(
            '<div lookatthissuperduperlongattributenamewhoahcrazy0="true" attr0 attr1="123" data-attr2="hello    t here" heymanimreallylongtoowhocomesupwiththesenames="false">This is some text</div>',
            //  -- output --
            '<div lookatthissuperduperlongattributenamewhoahcrazy0="true"\n' +
            '     attr0\n' +
            '     attr1="123"\n' +
            '     data-attr2="hello    t here"\n' +
            '     heymanimreallylongtoowhocomesupwiththesenames="false">This is some text</div>');
        test_fragment(
            '<img attr0 attr1="123" data-attr2="hello    t here"/>',
            //  -- output --
            '<img attr0\n' +
            '     attr1="123"\n' +
            '     data-attr2="hello    t here" />');
        test_fragment(
            '<?xml version="1.0" encoding="UTF-8" ?><root attr1="foo" attr2="bar"/>',
            //  -- output --
            '<?xml version="1.0" encoding="UTF-8" ?>\n' +
            '<root attr1="foo"\n' +
            '      attr2="bar" />');
        test_fragment(
            '<link href="//fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,400,600,700,300&amp;subset=latin" rel="stylesheet" type="text/css">',
            //  -- output --
            '<link href="//fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,400,600,700,300&amp;subset=latin"\n' +
            '      rel="stylesheet"\n' +
            '      type="text/css">');

        // Attribute Wrap - (wrap_attributes = ""force-expand-multiline"", wrap_attributes_indent_size = "4")
        reset_options();
        set_name('Attribute Wrap - (wrap_attributes = ""force-expand-multiline"", wrap_attributes_indent_size = "4")');
        opts.wrap_attributes = 'force-expand-multiline';
        opts.wrap_attributes_indent_size = 4;
        test_fragment('<div  >This is some text</div>', '<div>This is some text</div>');
        
        // This test shows how line wrapping is still not correct. Should wrap before 0015.
        test_fragment('<span>0 0001 0002 0003 0004 0005 0006 0007 0008 0009 0010 0011 0012 0013 0014 0015 0016 0017 0018 0019 0020</span>');
        
        // Issue 1222 -- P tags are formatting correctly
        test_fragment('<p>Our forms for collecting address-related information follow a standard design. Specific input elements will vary according to the form’s audience and purpose.</p>');
        test_fragment('<div attr="123"  >This is some text</div>', '<div attr="123">This is some text</div>');
        test_fragment(
            '<div attr0 attr1="123" data-attr2="hello    t here">This is some text</div>',
            //  -- output --
            '<div\n' +
            '    attr0\n' +
            '    attr1="123"\n' +
            '    data-attr2="hello    t here"\n' +
            '>This is some text</div>');
        test_fragment(
            '<div lookatthissuperduperlongattributenamewhoahcrazy0="true" attr0 attr1="123" data-attr2="hello    t here" heymanimreallylongtoowhocomesupwiththesenames="false">This is some text</div>',
            //  -- output --
            '<div\n' +
            '    lookatthissuperduperlongattributenamewhoahcrazy0="true"\n' +
            '    attr0\n' +
            '    attr1="123"\n' +
            '    data-attr2="hello    t here"\n' +
            '    heymanimreallylongtoowhocomesupwiththesenames="false"\n' +
            '>This is some text</div>');
        test_fragment(
            '<img attr0 attr1="123" data-attr2="hello    t here"/>',
            //  -- output --
            '<img\n' +
            '    attr0\n' +
            '    attr1="123"\n' +
            '    data-attr2="hello    t here"\n' +
            '/>');
        test_fragment(
            '<?xml version="1.0" encoding="UTF-8" ?><root attr1="foo" attr2="bar"/>',
            //  -- output --
            '<?xml version="1.0" encoding="UTF-8" ?>\n' +
            '<root\n' +
            '    attr1="foo"\n' +
            '    attr2="bar"\n' +
            '/>');
        test_fragment(
            '<link href="//fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,400,600,700,300&amp;subset=latin" rel="stylesheet" type="text/css">',
            //  -- output --
            '<link\n' +
            '    href="//fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,400,600,700,300&amp;subset=latin"\n' +
            '    rel="stylesheet"\n' +
            '    type="text/css"\n' +
            '>');

        // Attribute Wrap - (wrap_attributes = ""force-expand-multiline"", wrap_attributes_indent_size = "4", wrap_line_length = "80")
        reset_options();
        set_name('Attribute Wrap - (wrap_attributes = ""force-expand-multiline"", wrap_attributes_indent_size = "4", wrap_line_length = "80")');
        opts.wrap_attributes = 'force-expand-multiline';
        opts.wrap_attributes_indent_size = 4;
        opts.wrap_line_length = 80;
        test_fragment('<div  >This is some text</div>', '<div>This is some text</div>');
        
        // This test shows how line wrapping is still not correct. Should wrap before 0015.
        test_fragment(
            '<span>0 0001 0002 0003 0004 0005 0006 0007 0008 0009 0010 0011 0012 0013 0014 0015 0016 0017 0018 0019 0020</span>',
            //  -- output --
            '<span>0 0001 0002 0003 0004 0005 0006 0007 0008 0009 0010 0011 0012 0013 0014 0015\n' +
            '    0016 0017 0018 0019 0020</span>');
        
        // Issue 1222 -- P tags are formatting correctly
        test_fragment(
            '<p>Our forms for collecting address-related information follow a standard design. Specific input elements will vary according to the form’s audience and purpose.</p>',
            //  -- output --
            '<p>Our forms for collecting address-related information follow a standard design.\n' +
            '    Specific input elements will vary according to the form’s audience and purpose.</p>');
        test_fragment('<div attr="123"  >This is some text</div>', '<div attr="123">This is some text</div>');
        test_fragment(
            '<div attr0 attr1="123" data-attr2="hello    t here">This is some text</div>',
            //  -- output --
            '<div\n' +
            '    attr0\n' +
            '    attr1="123"\n' +
            '    data-attr2="hello    t here"\n' +
            '>This is some text</div>');
        test_fragment(
            '<div lookatthissuperduperlongattributenamewhoahcrazy0="true" attr0 attr1="123" data-attr2="hello    t here" heymanimreallylongtoowhocomesupwiththesenames="false">This is some text</div>',
            //  -- output --
            '<div\n' +
            '    lookatthissuperduperlongattributenamewhoahcrazy0="true"\n' +
            '    attr0\n' +
            '    attr1="123"\n' +
            '    data-attr2="hello    t here"\n' +
            '    heymanimreallylongtoowhocomesupwiththesenames="false"\n' +
            '>This is some text</div>');
        test_fragment(
            '<img attr0 attr1="123" data-attr2="hello    t here"/>',
            //  -- output --
            '<img\n' +
            '    attr0\n' +
            '    attr1="123"\n' +
            '    data-attr2="hello    t here"\n' +
            '/>');
        test_fragment(
            '<?xml version="1.0" encoding="UTF-8" ?><root attr1="foo" attr2="bar"/>',
            //  -- output --
            '<?xml version="1.0" encoding="UTF-8" ?>\n' +
            '<root\n' +
            '    attr1="foo"\n' +
            '    attr2="bar"\n' +
            '/>');
        test_fragment(
            '<link href="//fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,400,600,700,300&amp;subset=latin" rel="stylesheet" type="text/css">',
            //  -- output --
            '<link\n' +
            '    href="//fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,400,600,700,300&amp;subset=latin"\n' +
            '    rel="stylesheet"\n' +
            '    type="text/css"\n' +
            '>');

        // Attribute Wrap - (wrap_attributes = ""force-expand-multiline"", wrap_attributes_indent_size = "8")
        reset_options();
        set_name('Attribute Wrap - (wrap_attributes = ""force-expand-multiline"", wrap_attributes_indent_size = "8")');
        opts.wrap_attributes = 'force-expand-multiline';
        opts.wrap_attributes_indent_size = 8;
        test_fragment('<div  >This is some text</div>', '<div>This is some text</div>');
        
        // This test shows how line wrapping is still not correct. Should wrap before 0015.
        test_fragment('<span>0 0001 0002 0003 0004 0005 0006 0007 0008 0009 0010 0011 0012 0013 0014 0015 0016 0017 0018 0019 0020</span>');
        
        // Issue 1222 -- P tags are formatting correctly
        test_fragment('<p>Our forms for collecting address-related information follow a standard design. Specific input elements will vary according to the form’s audience and purpose.</p>');
        test_fragment('<div attr="123"  >This is some text</div>', '<div attr="123">This is some text</div>');
        test_fragment(
            '<div attr0 attr1="123" data-attr2="hello    t here">This is some text</div>',
            //  -- output --
            '<div\n' +
            '        attr0\n' +
            '        attr1="123"\n' +
            '        data-attr2="hello    t here"\n' +
            '>This is some text</div>');
        test_fragment(
            '<div lookatthissuperduperlongattributenamewhoahcrazy0="true" attr0 attr1="123" data-attr2="hello    t here" heymanimreallylongtoowhocomesupwiththesenames="false">This is some text</div>',
            //  -- output --
            '<div\n' +
            '        lookatthissuperduperlongattributenamewhoahcrazy0="true"\n' +
            '        attr0\n' +
            '        attr1="123"\n' +
            '        data-attr2="hello    t here"\n' +
            '        heymanimreallylongtoowhocomesupwiththesenames="false"\n' +
            '>This is some text</div>');
        test_fragment(
            '<img attr0 attr1="123" data-attr2="hello    t here"/>',
            //  -- output --
            '<img\n' +
            '        attr0\n' +
            '        attr1="123"\n' +
            '        data-attr2="hello    t here"\n' +
            '/>');
        test_fragment(
            '<?xml version="1.0" encoding="UTF-8" ?><root attr1="foo" attr2="bar"/>',
            //  -- output --
            '<?xml version="1.0" encoding="UTF-8" ?>\n' +
            '<root\n' +
            '        attr1="foo"\n' +
            '        attr2="bar"\n' +
            '/>');
        test_fragment(
            '<link href="//fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,400,600,700,300&amp;subset=latin" rel="stylesheet" type="text/css">',
            //  -- output --
            '<link\n' +
            '        href="//fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,400,600,700,300&amp;subset=latin"\n' +
            '        rel="stylesheet"\n' +
            '        type="text/css"\n' +
            '>');


        //============================================================
        // Handlebars Indenting Off
        reset_options();
        set_name('Handlebars Indenting Off');
        opts.indent_handlebars = false;
        test_fragment(
            '{{#if 0}}\n' +
            '    <div>\n' +
            '    </div>\n' +
            '{{/if}}',
            //  -- output --
            '{{#if 0}}\n' +
            '<div>\n' +
            '</div>\n' +
            '{{/if}}');
        test_fragment(
            '<div>\n' +
            '{{#each thing}}\n' +
            '    {{name}}\n' +
            '{{/each}}\n' +
            '</div>',
            //  -- output --
            '<div>\n' +
            '    {{#each thing}} {{name}} {{/each}}\n' +
            '</div>');
        test_fragment(
            '{{em-input label="Some Labe" property="amt" type="text" placeholder=""}}\n' +
            '{{em-input label="Type*" property="type" type="text" placeholder="(LTD)"}}\n' +
            '{{em-input label="Place*" property="place" type="text" placeholder=""}}',
            //  -- output --
            '{{em-input label="Some Labe" property="amt" type="text" placeholder=""}} {{em-input label="Type*" property="type" type="text" placeholder="(LTD)"}} {{em-input label="Place*" property="place" type="text" placeholder=""}}');


        //============================================================
        // Handlebars Indenting On - (indent_handlebars = "true")
        reset_options();
        set_name('Handlebars Indenting On - (indent_handlebars = "true")');
        opts.indent_handlebars = true;
        test_fragment('{{page-title}}');
        test_fragment(
            '{{page-title}}\n' +
            '{{a}}\n' +
            '{{value-title}}');
        test_fragment(
            '{{em-input label="Some Labe" property="amt" type="text" placeholder=""}}\n' +
            '{{em-input label="Type*" property="type" type="text" placeholder="(LTD)"}}\n' +
            '{{em-input label="Place*" property="place" type="text" placeholder=""}}');
        test_fragment('{{#if 0}}{{/if}}');
        test_fragment('{{#if 0}}{{field}}{{/if}}');
        test_fragment(
            '{{#if 0}}\n' +
            '{{/if}}');
        test_fragment(
            '{{#if     words}}{{/if}}',
            //  -- output --
            '{{#if words}}{{/if}}');
        test_fragment(
            '{{#if     words}}{{field}}{{/if}}',
            //  -- output --
            '{{#if words}}{{field}}{{/if}}');
        test_fragment(
            '{{#if     words}}{{field}}{{/if}}',
            //  -- output --
            '{{#if words}}{{field}}{{/if}}');
        test_fragment(
            '{{#if 1}}\n' +
            '    <div>\n' +
            '    </div>\n' +
            '{{/if}}');
        test_fragment(
            '{{#if 1}}\n' +
            '<div>\n' +
            '</div>\n' +
            '{{/if}}',
            //  -- output --
            '{{#if 1}}\n' +
            '    <div>\n' +
            '    </div>\n' +
            '{{/if}}');
        test_fragment(
            '<div>\n' +
            '    {{#if 1}}\n' +
            '    {{/if}}\n' +
            '</div>');
        test_fragment(
            '<div>\n' +
            '{{#if 1}}\n' +
            '{{/if}}\n' +
            '</div>',
            //  -- output --
            '<div>\n' +
            '    {{#if 1}}\n' +
            '    {{/if}}\n' +
            '</div>');
        test_fragment(
            '{{#if}}\n' +
            '{{#each}}\n' +
            '{{#if}}\n' +
            '{{field}}\n' +
            '{{/if}}\n' +
            '{{#if}}\n' +
            '{{field}}\n' +
            '{{/if}}\n' +
            '{{/each}}\n' +
            '{{/if}}',
            //  -- output --
            '{{#if}}\n' +
            '    {{#each}}\n' +
            '        {{#if}}\n' +
            '            {{field}}\n' +
            '        {{/if}}\n' +
            '        {{#if}}\n' +
            '            {{field}}\n' +
            '        {{/if}}\n' +
            '    {{/each}}\n' +
            '{{/if}}');
        test_fragment(
            '{{#if 1}}\n' +
            '    <div>\n' +
            '    </div>\n' +
            '{{/if}}');
        test_fragment(
            '<div>\n' +
            '    <small>SMALL TEXT</small>\n' +
            '    <span>\n' +
            '        {{#if isOwner}}\n' +
            '    <span><i class="fa fa-close"></i></span>\n' +
            '        {{else}}\n' +
            '            <span><i class="fa fa-bolt"></i></span>\n' +
            '        {{/if}}\n' +
            '    </span>\n' +
            '    <strong>{{userName}}:&nbsp;</strong>{{text}}\n' +
            '</div>',
            //  -- output --
            '<div>\n' +
            '    <small>SMALL TEXT</small>\n' +
            '    <span>\n' +
            '        {{#if isOwner}}\n' +
            '            <span><i class="fa fa-close"></i></span>\n' +
            '        {{else}}\n' +
            '            <span><i class="fa fa-bolt"></i></span>\n' +
            '        {{/if}}\n' +
            '    </span>\n' +
            '    <strong>{{userName}}:&nbsp;</strong>{{text}}\n' +
            '</div>');
        test_fragment(
            '<div>\n' +
            '    <small>SMALL TEXT</small>\n' +
            '    <span>\n' +
            '        {{#if isOwner}}\n' +
            '            <span><i class="fa fa-close"></i></span>\n' +
            '        {{else}}\n' +
            '            <span><i class="fa fa-bolt"></i></span>\n' +
            '        {{/if}}\n' +
            '    </span>\n' +
            '    <strong>{{userName}}:&nbsp;</strong>{{text}}\n' +
            '</div>');
        test_fragment(
            '{{#if 1}}\n' +
            '    {{field}}\n' +
            '    {{else}}\n' +
            '    {{field}}\n' +
            '{{/if}}',
            //  -- output --
            '{{#if 1}}\n' +
            '    {{field}}\n' +
            '{{else}}\n' +
            '    {{field}}\n' +
            '{{/if}}');
        test_fragment(
            '{{#if 1}}\n' +
            '    {{else}}\n' +
            '    {{/if}}',
            //  -- output --
            '{{#if 1}}\n' +
            '{{else}}\n' +
            '{{/if}}');
        test_fragment(
            '{{#if thing}}\n' +
            '{{#if otherthing}}\n' +
            '    {{field}}\n' +
            '    {{else}}\n' +
            '{{field}}\n' +
            '    {{/if}}\n' +
            '       {{else}}\n' +
            '{{field}}\n' +
            '{{/if}}',
            //  -- output --
            '{{#if thing}}\n' +
            '    {{#if otherthing}}\n' +
            '        {{field}}\n' +
            '    {{else}}\n' +
            '        {{field}}\n' +
            '    {{/if}}\n' +
            '{{else}}\n' +
            '    {{field}}\n' +
            '{{/if}}');
        test_fragment(
            '<div{{someStyle}}></div>',
            //  -- output --
            '<div {{someStyle}}></div>');
        test_fragment(
            '<dIv{{#if test}}class="foo"{{/if}}>{{field}}</dIv>',
            //  -- output --
            '<dIv {{#if test}} class="foo" {{/if}}>{{field}}</dIv>');
        test_fragment(
            '<diV{{#if thing}}{{somestyle}}class="{{class}}"{{else}}class="{{class2}}"{{/if}}>{{field}}</diV>',
            //  -- output --
            '<diV {{#if thing}} {{somestyle}} class="{{class}}" {{else}} class="{{class2}}" {{/if}}>{{field}}</diV>');
        test_fragment(
            '<span{{#if condition}}class="foo"{{/if}}>{{field}}</span>',
            //  -- output --
            '<span {{#if condition}} class="foo" {{/if}}>{{field}}</span>');
        test_fragment('<div unformatted="{{#if}}{{field}}{{/if}}">{{field}}</div>');
        test_fragment('<div unformatted="{{#if  }}    {{field}}{{/if}}">{{field}}</div>');
        test_fragment('<div class="{{#if thingIs "value"}}{{field}}{{/if}}"></div>');
        test_fragment('<div class="{{#if thingIs \'value\'}}{{field}}{{/if}}"></div>');
        test_fragment('<div class=\'{{#if thingIs "value"}}{{field}}{{/if}}\'></div>');
        test_fragment('<div class=\'{{#if thingIs \'value\'}}{{field}}{{/if}}\'></div>');
        test_fragment('<span>{{condition < 0 ? "result1" : "result2"}}</span>');
        test_fragment('<span>{{condition1 && condition2 && condition3 && condition4 < 0 ? "resForTrue" : "resForFalse"}}</span>');

        // Handlebars Indenting On - (indent_handlebars = "true")
        reset_options();
        set_name('Handlebars Indenting On - (indent_handlebars = "true")');
        opts.indent_handlebars = true;
        test_fragment('{{page-title}}');
        test_fragment(
            '{{page-title}}\n' +
            '{{a}}\n' +
            '{{value-title}}');
        test_fragment(
            '{{em-input label="Some Labe" property="amt" type="text" placeholder=""}}\n' +
            '{{em-input label="Type*" property="type" type="text" placeholder="(LTD)"}}\n' +
            '{{em-input label="Place*" property="place" type="text" placeholder=""}}');
        test_fragment('{{#if 0}}{{/if}}');
        test_fragment('{{#if 0}}{{em-input label="Some Labe" property="amt" type="text" placeholder=""}}{{/if}}');
        test_fragment(
            '{{#if 0}}\n' +
            '{{/if}}');
        test_fragment(
            '{{#if     words}}{{/if}}',
            //  -- output --
            '{{#if words}}{{/if}}');
        test_fragment(
            '{{#if     words}}{{em-input label="Some Labe" property="amt" type="text" placeholder=""}}{{/if}}',
            //  -- output --
            '{{#if words}}{{em-input label="Some Labe" property="amt" type="text" placeholder=""}}{{/if}}');
        test_fragment(
            '{{#if     words}}{{em-input label="Some Labe" property="amt" type="text" placeholder=""}}{{/if}}',
            //  -- output --
            '{{#if words}}{{em-input label="Some Labe" property="amt" type="text" placeholder=""}}{{/if}}');
        test_fragment(
            '{{#if 1}}\n' +
            '    <div>\n' +
            '    </div>\n' +
            '{{/if}}');
        test_fragment(
            '{{#if 1}}\n' +
            '<div>\n' +
            '</div>\n' +
            '{{/if}}',
            //  -- output --
            '{{#if 1}}\n' +
            '    <div>\n' +
            '    </div>\n' +
            '{{/if}}');
        test_fragment(
            '<div>\n' +
            '    {{#if 1}}\n' +
            '    {{/if}}\n' +
            '</div>');
        test_fragment(
            '<div>\n' +
            '{{#if 1}}\n' +
            '{{/if}}\n' +
            '</div>',
            //  -- output --
            '<div>\n' +
            '    {{#if 1}}\n' +
            '    {{/if}}\n' +
            '</div>');
        test_fragment(
            '{{#if}}\n' +
            '{{#each}}\n' +
            '{{#if}}\n' +
            '{{em-input label="Some Labe" property="amt" type="text" placeholder=""}}\n' +
            '{{/if}}\n' +
            '{{#if}}\n' +
            '{{em-input label="Some Labe" property="amt" type="text" placeholder=""}}\n' +
            '{{/if}}\n' +
            '{{/each}}\n' +
            '{{/if}}',
            //  -- output --
            '{{#if}}\n' +
            '    {{#each}}\n' +
            '        {{#if}}\n' +
            '            {{em-input label="Some Labe" property="amt" type="text" placeholder=""}}\n' +
            '        {{/if}}\n' +
            '        {{#if}}\n' +
            '            {{em-input label="Some Labe" property="amt" type="text" placeholder=""}}\n' +
            '        {{/if}}\n' +
            '    {{/each}}\n' +
            '{{/if}}');
        test_fragment(
            '{{#if 1}}\n' +
            '    <div>\n' +
            '    </div>\n' +
            '{{/if}}');
        test_fragment(
            '<div>\n' +
            '    <small>SMALL TEXT</small>\n' +
            '    <span>\n' +
            '        {{#if isOwner}}\n' +
            '    <span><i class="fa fa-close"></i></span>\n' +
            '        {{else}}\n' +
            '            <span><i class="fa fa-bolt"></i></span>\n' +
            '        {{/if}}\n' +
            '    </span>\n' +
            '    <strong>{{userName}}:&nbsp;</strong>{{text}}\n' +
            '</div>',
            //  -- output --
            '<div>\n' +
            '    <small>SMALL TEXT</small>\n' +
            '    <span>\n' +
            '        {{#if isOwner}}\n' +
            '            <span><i class="fa fa-close"></i></span>\n' +
            '        {{else}}\n' +
            '            <span><i class="fa fa-bolt"></i></span>\n' +
            '        {{/if}}\n' +
            '    </span>\n' +
            '    <strong>{{userName}}:&nbsp;</strong>{{text}}\n' +
            '</div>');
        test_fragment(
            '<div>\n' +
            '    <small>SMALL TEXT</small>\n' +
            '    <span>\n' +
            '        {{#if isOwner}}\n' +
            '            <span><i class="fa fa-close"></i></span>\n' +
            '        {{else}}\n' +
            '            <span><i class="fa fa-bolt"></i></span>\n' +
            '        {{/if}}\n' +
            '    </span>\n' +
            '    <strong>{{userName}}:&nbsp;</strong>{{text}}\n' +
            '</div>');
        test_fragment(
            '{{#if 1}}\n' +
            '    {{em-input label="Some Labe" property="amt" type="text" placeholder=""}}\n' +
            '    {{else}}\n' +
            '    {{em-input label="Some Labe" property="amt" type="text" placeholder=""}}\n' +
            '{{/if}}',
            //  -- output --
            '{{#if 1}}\n' +
            '    {{em-input label="Some Labe" property="amt" type="text" placeholder=""}}\n' +
            '{{else}}\n' +
            '    {{em-input label="Some Labe" property="amt" type="text" placeholder=""}}\n' +
            '{{/if}}');
        test_fragment(
            '{{#if 1}}\n' +
            '    {{else}}\n' +
            '    {{/if}}',
            //  -- output --
            '{{#if 1}}\n' +
            '{{else}}\n' +
            '{{/if}}');
        test_fragment(
            '{{#if thing}}\n' +
            '{{#if otherthing}}\n' +
            '    {{em-input label="Some Labe" property="amt" type="text" placeholder=""}}\n' +
            '    {{else}}\n' +
            '{{em-input label="Some Labe" property="amt" type="text" placeholder=""}}\n' +
            '    {{/if}}\n' +
            '       {{else}}\n' +
            '{{em-input label="Some Labe" property="amt" type="text" placeholder=""}}\n' +
            '{{/if}}',
            //  -- output --
            '{{#if thing}}\n' +
            '    {{#if otherthing}}\n' +
            '        {{em-input label="Some Labe" property="amt" type="text" placeholder=""}}\n' +
            '    {{else}}\n' +
            '        {{em-input label="Some Labe" property="amt" type="text" placeholder=""}}\n' +
            '    {{/if}}\n' +
            '{{else}}\n' +
            '    {{em-input label="Some Labe" property="amt" type="text" placeholder=""}}\n' +
            '{{/if}}');
        test_fragment(
            '<div{{someStyle}}></div>',
            //  -- output --
            '<div {{someStyle}}></div>');
        test_fragment(
            '<dIv{{#if test}}class="foo"{{/if}}>{{em-input label="Some Labe" property="amt" type="text" placeholder=""}}</dIv>',
            //  -- output --
            '<dIv {{#if test}} class="foo" {{/if}}>{{em-input label="Some Labe" property="amt" type="text" placeholder=""}}</dIv>');
        test_fragment(
            '<diV{{#if thing}}{{somestyle}}class="{{class}}"{{else}}class="{{class2}}"{{/if}}>{{em-input label="Some Labe" property="amt" type="text" placeholder=""}}</diV>',
            //  -- output --
            '<diV {{#if thing}} {{somestyle}} class="{{class}}" {{else}} class="{{class2}}" {{/if}}>{{em-input label="Some Labe" property="amt" type="text" placeholder=""}}</diV>');
        test_fragment(
            '<span{{#if condition}}class="foo"{{/if}}>{{em-input label="Some Labe" property="amt" type="text" placeholder=""}}</span>',
            //  -- output --
            '<span {{#if condition}} class="foo" {{/if}}>{{em-input label="Some Labe" property="amt" type="text" placeholder=""}}</span>');
        test_fragment('<div unformatted="{{#if}}{{em-input label="Some Labe" property="amt" type="text" placeholder=""}}{{/if}}">{{em-input label="Some Labe" property="amt" type="text" placeholder=""}}</div>');
        test_fragment('<div unformatted="{{#if  }}    {{em-input label="Some Labe" property="amt" type="text" placeholder=""}}{{/if}}">{{em-input label="Some Labe" property="amt" type="text" placeholder=""}}</div>');
        test_fragment('<div class="{{#if thingIs "value"}}{{em-input label="Some Labe" property="amt" type="text" placeholder=""}}{{/if}}"></div>');
        test_fragment('<div class="{{#if thingIs \'value\'}}{{em-input label="Some Labe" property="amt" type="text" placeholder=""}}{{/if}}"></div>');
        test_fragment('<div class=\'{{#if thingIs "value"}}{{em-input label="Some Labe" property="amt" type="text" placeholder=""}}{{/if}}\'></div>');
        test_fragment('<div class=\'{{#if thingIs \'value\'}}{{em-input label="Some Labe" property="amt" type="text" placeholder=""}}{{/if}}\'></div>');
        test_fragment('<span>{{condition < 0 ? "result1" : "result2"}}</span>');
        test_fragment('<span>{{condition1 && condition2 && condition3 && condition4 < 0 ? "resForTrue" : "resForFalse"}}</span>');

        // Handlebars Indenting On - (indent_handlebars = "true")
        reset_options();
        set_name('Handlebars Indenting On - (indent_handlebars = "true")');
        opts.indent_handlebars = true;
        test_fragment('{{page-title}}');
        test_fragment(
            '{{page-title}}\n' +
            '{{a}}\n' +
            '{{value-title}}');
        test_fragment(
            '{{em-input label="Some Labe" property="amt" type="text" placeholder=""}}\n' +
            '{{em-input label="Type*" property="type" type="text" placeholder="(LTD)"}}\n' +
            '{{em-input label="Place*" property="place" type="text" placeholder=""}}');
        test_fragment('{{#if 0}}{{/if}}');
        test_fragment('{{#if 0}}{{! comment}}{{/if}}');
        test_fragment(
            '{{#if 0}}\n' +
            '{{/if}}');
        test_fragment(
            '{{#if     words}}{{/if}}',
            //  -- output --
            '{{#if words}}{{/if}}');
        test_fragment(
            '{{#if     words}}{{! comment}}{{/if}}',
            //  -- output --
            '{{#if words}}{{! comment}}{{/if}}');
        test_fragment(
            '{{#if     words}}{{! comment}}{{/if}}',
            //  -- output --
            '{{#if words}}{{! comment}}{{/if}}');
        test_fragment(
            '{{#if 1}}\n' +
            '    <div>\n' +
            '    </div>\n' +
            '{{/if}}');
        test_fragment(
            '{{#if 1}}\n' +
            '<div>\n' +
            '</div>\n' +
            '{{/if}}',
            //  -- output --
            '{{#if 1}}\n' +
            '    <div>\n' +
            '    </div>\n' +
            '{{/if}}');
        test_fragment(
            '<div>\n' +
            '    {{#if 1}}\n' +
            '    {{/if}}\n' +
            '</div>');
        test_fragment(
            '<div>\n' +
            '{{#if 1}}\n' +
            '{{/if}}\n' +
            '</div>',
            //  -- output --
            '<div>\n' +
            '    {{#if 1}}\n' +
            '    {{/if}}\n' +
            '</div>');
        test_fragment(
            '{{#if}}\n' +
            '{{#each}}\n' +
            '{{#if}}\n' +
            '{{! comment}}\n' +
            '{{/if}}\n' +
            '{{#if}}\n' +
            '{{! comment}}\n' +
            '{{/if}}\n' +
            '{{/each}}\n' +
            '{{/if}}',
            //  -- output --
            '{{#if}}\n' +
            '    {{#each}}\n' +
            '        {{#if}}\n' +
            '            {{! comment}}\n' +
            '        {{/if}}\n' +
            '        {{#if}}\n' +
            '            {{! comment}}\n' +
            '        {{/if}}\n' +
            '    {{/each}}\n' +
            '{{/if}}');
        test_fragment(
            '{{#if 1}}\n' +
            '    <div>\n' +
            '    </div>\n' +
            '{{/if}}');
        test_fragment(
            '<div>\n' +
            '    <small>SMALL TEXT</small>\n' +
            '    <span>\n' +
            '        {{#if isOwner}}\n' +
            '    <span><i class="fa fa-close"></i></span>\n' +
            '        {{else}}\n' +
            '            <span><i class="fa fa-bolt"></i></span>\n' +
            '        {{/if}}\n' +
            '    </span>\n' +
            '    <strong>{{userName}}:&nbsp;</strong>{{text}}\n' +
            '</div>',
            //  -- output --
            '<div>\n' +
            '    <small>SMALL TEXT</small>\n' +
            '    <span>\n' +
            '        {{#if isOwner}}\n' +
            '            <span><i class="fa fa-close"></i></span>\n' +
            '        {{else}}\n' +
            '            <span><i class="fa fa-bolt"></i></span>\n' +
            '        {{/if}}\n' +
            '    </span>\n' +
            '    <strong>{{userName}}:&nbsp;</strong>{{text}}\n' +
            '</div>');
        test_fragment(
            '<div>\n' +
            '    <small>SMALL TEXT</small>\n' +
            '    <span>\n' +
            '        {{#if isOwner}}\n' +
            '            <span><i class="fa fa-close"></i></span>\n' +
            '        {{else}}\n' +
            '            <span><i class="fa fa-bolt"></i></span>\n' +
            '        {{/if}}\n' +
            '    </span>\n' +
            '    <strong>{{userName}}:&nbsp;</strong>{{text}}\n' +
            '</div>');
        test_fragment(
            '{{#if 1}}\n' +
            '    {{! comment}}\n' +
            '    {{else}}\n' +
            '    {{! comment}}\n' +
            '{{/if}}',
            //  -- output --
            '{{#if 1}}\n' +
            '    {{! comment}}\n' +
            '{{else}}\n' +
            '    {{! comment}}\n' +
            '{{/if}}');
        test_fragment(
            '{{#if 1}}\n' +
            '    {{else}}\n' +
            '    {{/if}}',
            //  -- output --
            '{{#if 1}}\n' +
            '{{else}}\n' +
            '{{/if}}');
        test_fragment(
            '{{#if thing}}\n' +
            '{{#if otherthing}}\n' +
            '    {{! comment}}\n' +
            '    {{else}}\n' +
            '{{! comment}}\n' +
            '    {{/if}}\n' +
            '       {{else}}\n' +
            '{{! comment}}\n' +
            '{{/if}}',
            //  -- output --
            '{{#if thing}}\n' +
            '    {{#if otherthing}}\n' +
            '        {{! comment}}\n' +
            '    {{else}}\n' +
            '        {{! comment}}\n' +
            '    {{/if}}\n' +
            '{{else}}\n' +
            '    {{! comment}}\n' +
            '{{/if}}');
        test_fragment(
            '<div{{someStyle}}></div>',
            //  -- output --
            '<div {{someStyle}}></div>');
        test_fragment(
            '<dIv{{#if test}}class="foo"{{/if}}>{{! comment}}</dIv>',
            //  -- output --
            '<dIv {{#if test}} class="foo" {{/if}}>{{! comment}}</dIv>');
        test_fragment(
            '<diV{{#if thing}}{{somestyle}}class="{{class}}"{{else}}class="{{class2}}"{{/if}}>{{! comment}}</diV>',
            //  -- output --
            '<diV {{#if thing}} {{somestyle}} class="{{class}}" {{else}} class="{{class2}}" {{/if}}>{{! comment}}</diV>');
        test_fragment(
            '<span{{#if condition}}class="foo"{{/if}}>{{! comment}}</span>',
            //  -- output --
            '<span {{#if condition}} class="foo" {{/if}}>{{! comment}}</span>');
        test_fragment('<div unformatted="{{#if}}{{! comment}}{{/if}}">{{! comment}}</div>');
        test_fragment('<div unformatted="{{#if  }}    {{! comment}}{{/if}}">{{! comment}}</div>');
        test_fragment('<div class="{{#if thingIs "value"}}{{! comment}}{{/if}}"></div>');
        test_fragment('<div class="{{#if thingIs \'value\'}}{{! comment}}{{/if}}"></div>');
        test_fragment('<div class=\'{{#if thingIs "value"}}{{! comment}}{{/if}}\'></div>');
        test_fragment('<div class=\'{{#if thingIs \'value\'}}{{! comment}}{{/if}}\'></div>');
        test_fragment('<span>{{condition < 0 ? "result1" : "result2"}}</span>');
        test_fragment('<span>{{condition1 && condition2 && condition3 && condition4 < 0 ? "resForTrue" : "resForFalse"}}</span>');

        // Handlebars Indenting On - (indent_handlebars = "true")
        reset_options();
        set_name('Handlebars Indenting On - (indent_handlebars = "true")');
        opts.indent_handlebars = true;
        test_fragment('{{page-title}}');
        test_fragment(
            '{{page-title}}\n' +
            '{{a}}\n' +
            '{{value-title}}');
        test_fragment(
            '{{em-input label="Some Labe" property="amt" type="text" placeholder=""}}\n' +
            '{{em-input label="Type*" property="type" type="text" placeholder="(LTD)"}}\n' +
            '{{em-input label="Place*" property="place" type="text" placeholder=""}}');
        test_fragment('{{#if 0}}{{/if}}');
        test_fragment('{{#if 0}}{{!-- comment--}}{{/if}}');
        test_fragment(
            '{{#if 0}}\n' +
            '{{/if}}');
        test_fragment(
            '{{#if     words}}{{/if}}',
            //  -- output --
            '{{#if words}}{{/if}}');
        test_fragment(
            '{{#if     words}}{{!-- comment--}}{{/if}}',
            //  -- output --
            '{{#if words}}{{!-- comment--}}{{/if}}');
        test_fragment(
            '{{#if     words}}{{!-- comment--}}{{/if}}',
            //  -- output --
            '{{#if words}}{{!-- comment--}}{{/if}}');
        test_fragment(
            '{{#if 1}}\n' +
            '    <div>\n' +
            '    </div>\n' +
            '{{/if}}');
        test_fragment(
            '{{#if 1}}\n' +
            '<div>\n' +
            '</div>\n' +
            '{{/if}}',
            //  -- output --
            '{{#if 1}}\n' +
            '    <div>\n' +
            '    </div>\n' +
            '{{/if}}');
        test_fragment(
            '<div>\n' +
            '    {{#if 1}}\n' +
            '    {{/if}}\n' +
            '</div>');
        test_fragment(
            '<div>\n' +
            '{{#if 1}}\n' +
            '{{/if}}\n' +
            '</div>',
            //  -- output --
            '<div>\n' +
            '    {{#if 1}}\n' +
            '    {{/if}}\n' +
            '</div>');
        test_fragment(
            '{{#if}}\n' +
            '{{#each}}\n' +
            '{{#if}}\n' +
            '{{!-- comment--}}\n' +
            '{{/if}}\n' +
            '{{#if}}\n' +
            '{{!-- comment--}}\n' +
            '{{/if}}\n' +
            '{{/each}}\n' +
            '{{/if}}',
            //  -- output --
            '{{#if}}\n' +
            '    {{#each}}\n' +
            '        {{#if}}\n' +
            '            {{!-- comment--}}\n' +
            '        {{/if}}\n' +
            '        {{#if}}\n' +
            '            {{!-- comment--}}\n' +
            '        {{/if}}\n' +
            '    {{/each}}\n' +
            '{{/if}}');
        test_fragment(
            '{{#if 1}}\n' +
            '    <div>\n' +
            '    </div>\n' +
            '{{/if}}');
        test_fragment(
            '<div>\n' +
            '    <small>SMALL TEXT</small>\n' +
            '    <span>\n' +
            '        {{#if isOwner}}\n' +
            '    <span><i class="fa fa-close"></i></span>\n' +
            '        {{else}}\n' +
            '            <span><i class="fa fa-bolt"></i></span>\n' +
            '        {{/if}}\n' +
            '    </span>\n' +
            '    <strong>{{userName}}:&nbsp;</strong>{{text}}\n' +
            '</div>',
            //  -- output --
            '<div>\n' +
            '    <small>SMALL TEXT</small>\n' +
            '    <span>\n' +
            '        {{#if isOwner}}\n' +
            '            <span><i class="fa fa-close"></i></span>\n' +
            '        {{else}}\n' +
            '            <span><i class="fa fa-bolt"></i></span>\n' +
            '        {{/if}}\n' +
            '    </span>\n' +
            '    <strong>{{userName}}:&nbsp;</strong>{{text}}\n' +
            '</div>');
        test_fragment(
            '<div>\n' +
            '    <small>SMALL TEXT</small>\n' +
            '    <span>\n' +
            '        {{#if isOwner}}\n' +
            '            <span><i class="fa fa-close"></i></span>\n' +
            '        {{else}}\n' +
            '            <span><i class="fa fa-bolt"></i></span>\n' +
            '        {{/if}}\n' +
            '    </span>\n' +
            '    <strong>{{userName}}:&nbsp;</strong>{{text}}\n' +
            '</div>');
        test_fragment(
            '{{#if 1}}\n' +
            '    {{!-- comment--}}\n' +
            '    {{else}}\n' +
            '    {{!-- comment--}}\n' +
            '{{/if}}',
            //  -- output --
            '{{#if 1}}\n' +
            '    {{!-- comment--}}\n' +
            '{{else}}\n' +
            '    {{!-- comment--}}\n' +
            '{{/if}}');
        test_fragment(
            '{{#if 1}}\n' +
            '    {{else}}\n' +
            '    {{/if}}',
            //  -- output --
            '{{#if 1}}\n' +
            '{{else}}\n' +
            '{{/if}}');
        test_fragment(
            '{{#if thing}}\n' +
            '{{#if otherthing}}\n' +
            '    {{!-- comment--}}\n' +
            '    {{else}}\n' +
            '{{!-- comment--}}\n' +
            '    {{/if}}\n' +
            '       {{else}}\n' +
            '{{!-- comment--}}\n' +
            '{{/if}}',
            //  -- output --
            '{{#if thing}}\n' +
            '    {{#if otherthing}}\n' +
            '        {{!-- comment--}}\n' +
            '    {{else}}\n' +
            '        {{!-- comment--}}\n' +
            '    {{/if}}\n' +
            '{{else}}\n' +
            '    {{!-- comment--}}\n' +
            '{{/if}}');
        test_fragment(
            '<div{{someStyle}}></div>',
            //  -- output --
            '<div {{someStyle}}></div>');
        test_fragment(
            '<dIv{{#if test}}class="foo"{{/if}}>{{!-- comment--}}</dIv>',
            //  -- output --
            '<dIv {{#if test}} class="foo" {{/if}}>{{!-- comment--}}</dIv>');
        test_fragment(
            '<diV{{#if thing}}{{somestyle}}class="{{class}}"{{else}}class="{{class2}}"{{/if}}>{{!-- comment--}}</diV>',
            //  -- output --
            '<diV {{#if thing}} {{somestyle}} class="{{class}}" {{else}} class="{{class2}}" {{/if}}>{{!-- comment--}}</diV>');
        test_fragment(
            '<span{{#if condition}}class="foo"{{/if}}>{{!-- comment--}}</span>',
            //  -- output --
            '<span {{#if condition}} class="foo" {{/if}}>{{!-- comment--}}</span>');
        test_fragment('<div unformatted="{{#if}}{{!-- comment--}}{{/if}}">{{!-- comment--}}</div>');
        test_fragment('<div unformatted="{{#if  }}    {{!-- comment--}}{{/if}}">{{!-- comment--}}</div>');
        test_fragment('<div class="{{#if thingIs "value"}}{{!-- comment--}}{{/if}}"></div>');
        test_fragment('<div class="{{#if thingIs \'value\'}}{{!-- comment--}}{{/if}}"></div>');
        test_fragment('<div class=\'{{#if thingIs "value"}}{{!-- comment--}}{{/if}}\'></div>');
        test_fragment('<div class=\'{{#if thingIs \'value\'}}{{!-- comment--}}{{/if}}\'></div>');
        test_fragment('<span>{{condition < 0 ? "result1" : "result2"}}</span>');
        test_fragment('<span>{{condition1 && condition2 && condition3 && condition4 < 0 ? "resForTrue" : "resForFalse"}}</span>');

        // Handlebars Indenting On - (indent_handlebars = "true")
        reset_options();
        set_name('Handlebars Indenting On - (indent_handlebars = "true")');
        opts.indent_handlebars = true;
        test_fragment('{{page-title}}');
        test_fragment(
            '{{page-title}}\n' +
            '{{a}}\n' +
            '{{value-title}}');
        test_fragment(
            '{{em-input label="Some Labe" property="amt" type="text" placeholder=""}}\n' +
            '{{em-input label="Type*" property="type" type="text" placeholder="(LTD)"}}\n' +
            '{{em-input label="Place*" property="place" type="text" placeholder=""}}');
        test_fragment('{{#if 0}}{{/if}}');
        test_fragment('{{#if 0}}{{Hello "woRld"}} {{!-- comment--}} {{heLloWorlD}}{{/if}}');
        test_fragment(
            '{{#if 0}}\n' +
            '{{/if}}');
        test_fragment(
            '{{#if     words}}{{/if}}',
            //  -- output --
            '{{#if words}}{{/if}}');
        test_fragment(
            '{{#if     words}}{{Hello "woRld"}} {{!-- comment--}} {{heLloWorlD}}{{/if}}',
            //  -- output --
            '{{#if words}}{{Hello "woRld"}} {{!-- comment--}} {{heLloWorlD}}{{/if}}');
        test_fragment(
            '{{#if     words}}{{Hello "woRld"}} {{!-- comment--}} {{heLloWorlD}}{{/if}}',
            //  -- output --
            '{{#if words}}{{Hello "woRld"}} {{!-- comment--}} {{heLloWorlD}}{{/if}}');
        test_fragment(
            '{{#if 1}}\n' +
            '    <div>\n' +
            '    </div>\n' +
            '{{/if}}');
        test_fragment(
            '{{#if 1}}\n' +
            '<div>\n' +
            '</div>\n' +
            '{{/if}}',
            //  -- output --
            '{{#if 1}}\n' +
            '    <div>\n' +
            '    </div>\n' +
            '{{/if}}');
        test_fragment(
            '<div>\n' +
            '    {{#if 1}}\n' +
            '    {{/if}}\n' +
            '</div>');
        test_fragment(
            '<div>\n' +
            '{{#if 1}}\n' +
            '{{/if}}\n' +
            '</div>',
            //  -- output --
            '<div>\n' +
            '    {{#if 1}}\n' +
            '    {{/if}}\n' +
            '</div>');
        test_fragment(
            '{{#if}}\n' +
            '{{#each}}\n' +
            '{{#if}}\n' +
            '{{Hello "woRld"}} {{!-- comment--}} {{heLloWorlD}}\n' +
            '{{/if}}\n' +
            '{{#if}}\n' +
            '{{Hello "woRld"}} {{!-- comment--}} {{heLloWorlD}}\n' +
            '{{/if}}\n' +
            '{{/each}}\n' +
            '{{/if}}',
            //  -- output --
            '{{#if}}\n' +
            '    {{#each}}\n' +
            '        {{#if}}\n' +
            '            {{Hello "woRld"}} {{!-- comment--}} {{heLloWorlD}}\n' +
            '        {{/if}}\n' +
            '        {{#if}}\n' +
            '            {{Hello "woRld"}} {{!-- comment--}} {{heLloWorlD}}\n' +
            '        {{/if}}\n' +
            '    {{/each}}\n' +
            '{{/if}}');
        test_fragment(
            '{{#if 1}}\n' +
            '    <div>\n' +
            '    </div>\n' +
            '{{/if}}');
        test_fragment(
            '<div>\n' +
            '    <small>SMALL TEXT</small>\n' +
            '    <span>\n' +
            '        {{#if isOwner}}\n' +
            '    <span><i class="fa fa-close"></i></span>\n' +
            '        {{else}}\n' +
            '            <span><i class="fa fa-bolt"></i></span>\n' +
            '        {{/if}}\n' +
            '    </span>\n' +
            '    <strong>{{userName}}:&nbsp;</strong>{{text}}\n' +
            '</div>',
            //  -- output --
            '<div>\n' +
            '    <small>SMALL TEXT</small>\n' +
            '    <span>\n' +
            '        {{#if isOwner}}\n' +
            '            <span><i class="fa fa-close"></i></span>\n' +
            '        {{else}}\n' +
            '            <span><i class="fa fa-bolt"></i></span>\n' +
            '        {{/if}}\n' +
            '    </span>\n' +
            '    <strong>{{userName}}:&nbsp;</strong>{{text}}\n' +
            '</div>');
        test_fragment(
            '<div>\n' +
            '    <small>SMALL TEXT</small>\n' +
            '    <span>\n' +
            '        {{#if isOwner}}\n' +
            '            <span><i class="fa fa-close"></i></span>\n' +
            '        {{else}}\n' +
            '            <span><i class="fa fa-bolt"></i></span>\n' +
            '        {{/if}}\n' +
            '    </span>\n' +
            '    <strong>{{userName}}:&nbsp;</strong>{{text}}\n' +
            '</div>');
        test_fragment(
            '{{#if 1}}\n' +
            '    {{Hello "woRld"}} {{!-- comment--}} {{heLloWorlD}}\n' +
            '    {{else}}\n' +
            '    {{Hello "woRld"}} {{!-- comment--}} {{heLloWorlD}}\n' +
            '{{/if}}',
            //  -- output --
            '{{#if 1}}\n' +
            '    {{Hello "woRld"}} {{!-- comment--}} {{heLloWorlD}}\n' +
            '{{else}}\n' +
            '    {{Hello "woRld"}} {{!-- comment--}} {{heLloWorlD}}\n' +
            '{{/if}}');
        test_fragment(
            '{{#if 1}}\n' +
            '    {{else}}\n' +
            '    {{/if}}',
            //  -- output --
            '{{#if 1}}\n' +
            '{{else}}\n' +
            '{{/if}}');
        test_fragment(
            '{{#if thing}}\n' +
            '{{#if otherthing}}\n' +
            '    {{Hello "woRld"}} {{!-- comment--}} {{heLloWorlD}}\n' +
            '    {{else}}\n' +
            '{{Hello "woRld"}} {{!-- comment--}} {{heLloWorlD}}\n' +
            '    {{/if}}\n' +
            '       {{else}}\n' +
            '{{Hello "woRld"}} {{!-- comment--}} {{heLloWorlD}}\n' +
            '{{/if}}',
            //  -- output --
            '{{#if thing}}\n' +
            '    {{#if otherthing}}\n' +
            '        {{Hello "woRld"}} {{!-- comment--}} {{heLloWorlD}}\n' +
            '    {{else}}\n' +
            '        {{Hello "woRld"}} {{!-- comment--}} {{heLloWorlD}}\n' +
            '    {{/if}}\n' +
            '{{else}}\n' +
            '    {{Hello "woRld"}} {{!-- comment--}} {{heLloWorlD}}\n' +
            '{{/if}}');
        test_fragment(
            '<div{{someStyle}}></div>',
            //  -- output --
            '<div {{someStyle}}></div>');
        test_fragment(
            '<dIv{{#if test}}class="foo"{{/if}}>{{Hello "woRld"}} {{!-- comment--}} {{heLloWorlD}}</dIv>',
            //  -- output --
            '<dIv {{#if test}} class="foo" {{/if}}>{{Hello "woRld"}} {{!-- comment--}} {{heLloWorlD}}</dIv>');
        test_fragment(
            '<diV{{#if thing}}{{somestyle}}class="{{class}}"{{else}}class="{{class2}}"{{/if}}>{{Hello "woRld"}} {{!-- comment--}} {{heLloWorlD}}</diV>',
            //  -- output --
            '<diV {{#if thing}} {{somestyle}} class="{{class}}" {{else}} class="{{class2}}" {{/if}}>{{Hello "woRld"}} {{!-- comment--}} {{heLloWorlD}}</diV>');
        test_fragment(
            '<span{{#if condition}}class="foo"{{/if}}>{{Hello "woRld"}} {{!-- comment--}} {{heLloWorlD}}</span>',
            //  -- output --
            '<span {{#if condition}} class="foo" {{/if}}>{{Hello "woRld"}} {{!-- comment--}} {{heLloWorlD}}</span>');
        test_fragment('<div unformatted="{{#if}}{{Hello "woRld"}} {{!-- comment--}} {{heLloWorlD}}{{/if}}">{{Hello "woRld"}} {{!-- comment--}} {{heLloWorlD}}</div>');
        test_fragment('<div unformatted="{{#if  }}    {{Hello "woRld"}} {{!-- comment--}} {{heLloWorlD}}{{/if}}">{{Hello "woRld"}} {{!-- comment--}} {{heLloWorlD}}</div>');
        test_fragment('<div class="{{#if thingIs "value"}}{{Hello "woRld"}} {{!-- comment--}} {{heLloWorlD}}{{/if}}"></div>');
        test_fragment('<div class="{{#if thingIs \'value\'}}{{Hello "woRld"}} {{!-- comment--}} {{heLloWorlD}}{{/if}}"></div>');
        test_fragment('<div class=\'{{#if thingIs "value"}}{{Hello "woRld"}} {{!-- comment--}} {{heLloWorlD}}{{/if}}\'></div>');
        test_fragment('<div class=\'{{#if thingIs \'value\'}}{{Hello "woRld"}} {{!-- comment--}} {{heLloWorlD}}{{/if}}\'></div>');
        test_fragment('<span>{{condition < 0 ? "result1" : "result2"}}</span>');
        test_fragment('<span>{{condition1 && condition2 && condition3 && condition4 < 0 ? "resForTrue" : "resForFalse"}}</span>');

        // Handlebars Indenting On - (indent_handlebars = "true")
        reset_options();
        set_name('Handlebars Indenting On - (indent_handlebars = "true")');
        opts.indent_handlebars = true;
        test_fragment('{{page-title}}');
        test_fragment(
            '{{page-title}}\n' +
            '{{a}}\n' +
            '{{value-title}}');
        test_fragment(
            '{{em-input label="Some Labe" property="amt" type="text" placeholder=""}}\n' +
            '{{em-input label="Type*" property="type" type="text" placeholder="(LTD)"}}\n' +
            '{{em-input label="Place*" property="place" type="text" placeholder=""}}');
        test_fragment('{{#if 0}}{{/if}}');
        test_fragment('{{#if 0}}{pre{{field1}} {{field2}} {{field3}}post{{/if}}');
        test_fragment(
            '{{#if 0}}\n' +
            '{{/if}}');
        test_fragment(
            '{{#if     words}}{{/if}}',
            //  -- output --
            '{{#if words}}{{/if}}');
        test_fragment(
            '{{#if     words}}{pre{{field1}} {{field2}} {{field3}}post{{/if}}',
            //  -- output --
            '{{#if words}}{pre{{field1}} {{field2}} {{field3}}post{{/if}}');
        test_fragment(
            '{{#if     words}}{pre{{field1}} {{field2}} {{field3}}post{{/if}}',
            //  -- output --
            '{{#if words}}{pre{{field1}} {{field2}} {{field3}}post{{/if}}');
        test_fragment(
            '{{#if 1}}\n' +
            '    <div>\n' +
            '    </div>\n' +
            '{{/if}}');
        test_fragment(
            '{{#if 1}}\n' +
            '<div>\n' +
            '</div>\n' +
            '{{/if}}',
            //  -- output --
            '{{#if 1}}\n' +
            '    <div>\n' +
            '    </div>\n' +
            '{{/if}}');
        test_fragment(
            '<div>\n' +
            '    {{#if 1}}\n' +
            '    {{/if}}\n' +
            '</div>');
        test_fragment(
            '<div>\n' +
            '{{#if 1}}\n' +
            '{{/if}}\n' +
            '</div>',
            //  -- output --
            '<div>\n' +
            '    {{#if 1}}\n' +
            '    {{/if}}\n' +
            '</div>');
        test_fragment(
            '{{#if}}\n' +
            '{{#each}}\n' +
            '{{#if}}\n' +
            '{pre{{field1}} {{field2}} {{field3}}post\n' +
            '{{/if}}\n' +
            '{{#if}}\n' +
            '{pre{{field1}} {{field2}} {{field3}}post\n' +
            '{{/if}}\n' +
            '{{/each}}\n' +
            '{{/if}}',
            //  -- output --
            '{{#if}}\n' +
            '    {{#each}}\n' +
            '        {{#if}}\n' +
            '            {pre{{field1}} {{field2}} {{field3}}post\n' +
            '        {{/if}}\n' +
            '        {{#if}}\n' +
            '            {pre{{field1}} {{field2}} {{field3}}post\n' +
            '        {{/if}}\n' +
            '    {{/each}}\n' +
            '{{/if}}');
        test_fragment(
            '{{#if 1}}\n' +
            '    <div>\n' +
            '    </div>\n' +
            '{{/if}}');
        test_fragment(
            '<div>\n' +
            '    <small>SMALL TEXT</small>\n' +
            '    <span>\n' +
            '        {{#if isOwner}}\n' +
            '    <span><i class="fa fa-close"></i></span>\n' +
            '        {{else}}\n' +
            '            <span><i class="fa fa-bolt"></i></span>\n' +
            '        {{/if}}\n' +
            '    </span>\n' +
            '    <strong>{{userName}}:&nbsp;</strong>{{text}}\n' +
            '</div>',
            //  -- output --
            '<div>\n' +
            '    <small>SMALL TEXT</small>\n' +
            '    <span>\n' +
            '        {{#if isOwner}}\n' +
            '            <span><i class="fa fa-close"></i></span>\n' +
            '        {{else}}\n' +
            '            <span><i class="fa fa-bolt"></i></span>\n' +
            '        {{/if}}\n' +
            '    </span>\n' +
            '    <strong>{{userName}}:&nbsp;</strong>{{text}}\n' +
            '</div>');
        test_fragment(
            '<div>\n' +
            '    <small>SMALL TEXT</small>\n' +
            '    <span>\n' +
            '        {{#if isOwner}}\n' +
            '            <span><i class="fa fa-close"></i></span>\n' +
            '        {{else}}\n' +
            '            <span><i class="fa fa-bolt"></i></span>\n' +
            '        {{/if}}\n' +
            '    </span>\n' +
            '    <strong>{{userName}}:&nbsp;</strong>{{text}}\n' +
            '</div>');
        test_fragment(
            '{{#if 1}}\n' +
            '    {pre{{field1}} {{field2}} {{field3}}post\n' +
            '    {{else}}\n' +
            '    {pre{{field1}} {{field2}} {{field3}}post\n' +
            '{{/if}}',
            //  -- output --
            '{{#if 1}}\n' +
            '    {pre{{field1}} {{field2}} {{field3}}post\n' +
            '{{else}}\n' +
            '    {pre{{field1}} {{field2}} {{field3}}post\n' +
            '{{/if}}');
        test_fragment(
            '{{#if 1}}\n' +
            '    {{else}}\n' +
            '    {{/if}}',
            //  -- output --
            '{{#if 1}}\n' +
            '{{else}}\n' +
            '{{/if}}');
        test_fragment(
            '{{#if thing}}\n' +
            '{{#if otherthing}}\n' +
            '    {pre{{field1}} {{field2}} {{field3}}post\n' +
            '    {{else}}\n' +
            '{pre{{field1}} {{field2}} {{field3}}post\n' +
            '    {{/if}}\n' +
            '       {{else}}\n' +
            '{pre{{field1}} {{field2}} {{field3}}post\n' +
            '{{/if}}',
            //  -- output --
            '{{#if thing}}\n' +
            '    {{#if otherthing}}\n' +
            '        {pre{{field1}} {{field2}} {{field3}}post\n' +
            '    {{else}}\n' +
            '        {pre{{field1}} {{field2}} {{field3}}post\n' +
            '    {{/if}}\n' +
            '{{else}}\n' +
            '    {pre{{field1}} {{field2}} {{field3}}post\n' +
            '{{/if}}');
        test_fragment(
            '<div{{someStyle}}></div>',
            //  -- output --
            '<div {{someStyle}}></div>');
        test_fragment(
            '<dIv{{#if test}}class="foo"{{/if}}>{pre{{field1}} {{field2}} {{field3}}post</dIv>',
            //  -- output --
            '<dIv {{#if test}} class="foo" {{/if}}>{pre{{field1}} {{field2}} {{field3}}post</dIv>');
        test_fragment(
            '<diV{{#if thing}}{{somestyle}}class="{{class}}"{{else}}class="{{class2}}"{{/if}}>{pre{{field1}} {{field2}} {{field3}}post</diV>',
            //  -- output --
            '<diV {{#if thing}} {{somestyle}} class="{{class}}" {{else}} class="{{class2}}" {{/if}}>{pre{{field1}} {{field2}} {{field3}}post</diV>');
        test_fragment(
            '<span{{#if condition}}class="foo"{{/if}}>{pre{{field1}} {{field2}} {{field3}}post</span>',
            //  -- output --
            '<span {{#if condition}} class="foo" {{/if}}>{pre{{field1}} {{field2}} {{field3}}post</span>');
        test_fragment('<div unformatted="{{#if}}{pre{{field1}} {{field2}} {{field3}}post{{/if}}">{pre{{field1}} {{field2}} {{field3}}post</div>');
        test_fragment('<div unformatted="{{#if  }}    {pre{{field1}} {{field2}} {{field3}}post{{/if}}">{pre{{field1}} {{field2}} {{field3}}post</div>');
        test_fragment('<div class="{{#if thingIs "value"}}{pre{{field1}} {{field2}} {{field3}}post{{/if}}"></div>');
        test_fragment('<div class="{{#if thingIs \'value\'}}{pre{{field1}} {{field2}} {{field3}}post{{/if}}"></div>');
        test_fragment('<div class=\'{{#if thingIs "value"}}{pre{{field1}} {{field2}} {{field3}}post{{/if}}\'></div>');
        test_fragment('<div class=\'{{#if thingIs \'value\'}}{pre{{field1}} {{field2}} {{field3}}post{{/if}}\'></div>');
        test_fragment('<span>{{condition < 0 ? "result1" : "result2"}}</span>');
        test_fragment('<span>{{condition1 && condition2 && condition3 && condition4 < 0 ? "resForTrue" : "resForFalse"}}</span>');

        // Handlebars Indenting On - (indent_handlebars = "true")
        reset_options();
        set_name('Handlebars Indenting On - (indent_handlebars = "true")');
        opts.indent_handlebars = true;
        test_fragment('{{page-title}}');
        test_fragment(
            '{{page-title}}\n' +
            '{{a}}\n' +
            '{{value-title}}');
        test_fragment(
            '{{em-input label="Some Labe" property="amt" type="text" placeholder=""}}\n' +
            '{{em-input label="Type*" property="type" type="text" placeholder="(LTD)"}}\n' +
            '{{em-input label="Place*" property="place" type="text" placeholder=""}}');
        test_fragment('{{#if 0}}{{/if}}');
        test_fragment(
            '{{#if 0}}{{! \n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            '}}{{/if}}');
        test_fragment(
            '{{#if 0}}\n' +
            '{{/if}}');
        test_fragment(
            '{{#if     words}}{{/if}}',
            //  -- output --
            '{{#if words}}{{/if}}');
        test_fragment(
            '{{#if     words}}{{! \n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            '}}{{/if}}',
            //  -- output --
            '{{#if words}}{{! \n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            '}}{{/if}}');
        test_fragment(
            '{{#if     words}}{{! \n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            '}}{{/if}}',
            //  -- output --
            '{{#if words}}{{! \n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            '}}{{/if}}');
        test_fragment(
            '{{#if 1}}\n' +
            '    <div>\n' +
            '    </div>\n' +
            '{{/if}}');
        test_fragment(
            '{{#if 1}}\n' +
            '<div>\n' +
            '</div>\n' +
            '{{/if}}',
            //  -- output --
            '{{#if 1}}\n' +
            '    <div>\n' +
            '    </div>\n' +
            '{{/if}}');
        test_fragment(
            '<div>\n' +
            '    {{#if 1}}\n' +
            '    {{/if}}\n' +
            '</div>');
        test_fragment(
            '<div>\n' +
            '{{#if 1}}\n' +
            '{{/if}}\n' +
            '</div>',
            //  -- output --
            '<div>\n' +
            '    {{#if 1}}\n' +
            '    {{/if}}\n' +
            '</div>');
        test_fragment(
            '{{#if}}\n' +
            '{{#each}}\n' +
            '{{#if}}\n' +
            '{{! \n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            '}}\n' +
            '{{/if}}\n' +
            '{{#if}}\n' +
            '{{! \n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            '}}\n' +
            '{{/if}}\n' +
            '{{/each}}\n' +
            '{{/if}}',
            //  -- output --
            '{{#if}}\n' +
            '    {{#each}}\n' +
            '        {{#if}}\n' +
            '            {{! \n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            '}}\n' +
            '        {{/if}}\n' +
            '        {{#if}}\n' +
            '            {{! \n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            '}}\n' +
            '        {{/if}}\n' +
            '    {{/each}}\n' +
            '{{/if}}');
        test_fragment(
            '{{#if 1}}\n' +
            '    <div>\n' +
            '    </div>\n' +
            '{{/if}}');
        test_fragment(
            '<div>\n' +
            '    <small>SMALL TEXT</small>\n' +
            '    <span>\n' +
            '        {{#if isOwner}}\n' +
            '    <span><i class="fa fa-close"></i></span>\n' +
            '        {{else}}\n' +
            '            <span><i class="fa fa-bolt"></i></span>\n' +
            '        {{/if}}\n' +
            '    </span>\n' +
            '    <strong>{{userName}}:&nbsp;</strong>{{text}}\n' +
            '</div>',
            //  -- output --
            '<div>\n' +
            '    <small>SMALL TEXT</small>\n' +
            '    <span>\n' +
            '        {{#if isOwner}}\n' +
            '            <span><i class="fa fa-close"></i></span>\n' +
            '        {{else}}\n' +
            '            <span><i class="fa fa-bolt"></i></span>\n' +
            '        {{/if}}\n' +
            '    </span>\n' +
            '    <strong>{{userName}}:&nbsp;</strong>{{text}}\n' +
            '</div>');
        test_fragment(
            '<div>\n' +
            '    <small>SMALL TEXT</small>\n' +
            '    <span>\n' +
            '        {{#if isOwner}}\n' +
            '            <span><i class="fa fa-close"></i></span>\n' +
            '        {{else}}\n' +
            '            <span><i class="fa fa-bolt"></i></span>\n' +
            '        {{/if}}\n' +
            '    </span>\n' +
            '    <strong>{{userName}}:&nbsp;</strong>{{text}}\n' +
            '</div>');
        test_fragment(
            '{{#if 1}}\n' +
            '    {{! \n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            '}}\n' +
            '    {{else}}\n' +
            '    {{! \n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            '}}\n' +
            '{{/if}}',
            //  -- output --
            '{{#if 1}}\n' +
            '    {{! \n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            '}}\n' +
            '{{else}}\n' +
            '    {{! \n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            '}}\n' +
            '{{/if}}');
        test_fragment(
            '{{#if 1}}\n' +
            '    {{else}}\n' +
            '    {{/if}}',
            //  -- output --
            '{{#if 1}}\n' +
            '{{else}}\n' +
            '{{/if}}');
        test_fragment(
            '{{#if thing}}\n' +
            '{{#if otherthing}}\n' +
            '    {{! \n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            '}}\n' +
            '    {{else}}\n' +
            '{{! \n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            '}}\n' +
            '    {{/if}}\n' +
            '       {{else}}\n' +
            '{{! \n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            '}}\n' +
            '{{/if}}',
            //  -- output --
            '{{#if thing}}\n' +
            '    {{#if otherthing}}\n' +
            '        {{! \n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            '}}\n' +
            '    {{else}}\n' +
            '        {{! \n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            '}}\n' +
            '    {{/if}}\n' +
            '{{else}}\n' +
            '    {{! \n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            '}}\n' +
            '{{/if}}');
        test_fragment(
            '<div{{someStyle}}></div>',
            //  -- output --
            '<div {{someStyle}}></div>');
        test_fragment(
            '<dIv{{#if test}}class="foo"{{/if}}>{{! \n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            '}}</dIv>',
            //  -- output --
            '<dIv {{#if test}} class="foo" {{/if}}>{{! \n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            '}}</dIv>');
        test_fragment(
            '<diV{{#if thing}}{{somestyle}}class="{{class}}"{{else}}class="{{class2}}"{{/if}}>{{! \n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            '}}</diV>',
            //  -- output --
            '<diV {{#if thing}} {{somestyle}} class="{{class}}" {{else}} class="{{class2}}" {{/if}}>{{! \n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            '}}</diV>');
        test_fragment(
            '<span{{#if condition}}class="foo"{{/if}}>{{! \n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            '}}</span>',
            //  -- output --
            '<span {{#if condition}} class="foo" {{/if}}>{{! \n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            '}}</span>');
        test_fragment(
            '<div unformatted="{{#if}}{{! \n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            '}}{{/if}}">{{! \n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            '}}</div>');
        test_fragment(
            '<div unformatted="{{#if  }}    {{! \n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            '}}{{/if}}">{{! \n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            '}}</div>');
        test_fragment(
            '<div class="{{#if thingIs "value"}}{{! \n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            '}}{{/if}}"></div>');
        test_fragment(
            '<div class="{{#if thingIs \'value\'}}{{! \n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            '}}{{/if}}"></div>');
        test_fragment(
            '<div class=\'{{#if thingIs "value"}}{{! \n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            '}}{{/if}}\'></div>');
        test_fragment(
            '<div class=\'{{#if thingIs \'value\'}}{{! \n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            '}}{{/if}}\'></div>');
        test_fragment('<span>{{condition < 0 ? "result1" : "result2"}}</span>');
        test_fragment('<span>{{condition1 && condition2 && condition3 && condition4 < 0 ? "resForTrue" : "resForFalse"}}</span>');

        // Handlebars Indenting On - (indent_handlebars = "true")
        reset_options();
        set_name('Handlebars Indenting On - (indent_handlebars = "true")');
        opts.indent_handlebars = true;
        test_fragment('{{page-title}}');
        test_fragment(
            '{{page-title}}\n' +
            '{{a}}\n' +
            '{{value-title}}');
        test_fragment(
            '{{em-input label="Some Labe" property="amt" type="text" placeholder=""}}\n' +
            '{{em-input label="Type*" property="type" type="text" placeholder="(LTD)"}}\n' +
            '{{em-input label="Place*" property="place" type="text" placeholder=""}}');
        test_fragment('{{#if 0}}{{/if}}');
        test_fragment(
            '{{#if 0}}{{!-- \n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            '--}}{{/if}}');
        test_fragment(
            '{{#if 0}}\n' +
            '{{/if}}');
        test_fragment(
            '{{#if     words}}{{/if}}',
            //  -- output --
            '{{#if words}}{{/if}}');
        test_fragment(
            '{{#if     words}}{{!-- \n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            '--}}{{/if}}',
            //  -- output --
            '{{#if words}}{{!-- \n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            '--}}{{/if}}');
        test_fragment(
            '{{#if     words}}{{!-- \n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            '--}}{{/if}}',
            //  -- output --
            '{{#if words}}{{!-- \n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            '--}}{{/if}}');
        test_fragment(
            '{{#if 1}}\n' +
            '    <div>\n' +
            '    </div>\n' +
            '{{/if}}');
        test_fragment(
            '{{#if 1}}\n' +
            '<div>\n' +
            '</div>\n' +
            '{{/if}}',
            //  -- output --
            '{{#if 1}}\n' +
            '    <div>\n' +
            '    </div>\n' +
            '{{/if}}');
        test_fragment(
            '<div>\n' +
            '    {{#if 1}}\n' +
            '    {{/if}}\n' +
            '</div>');
        test_fragment(
            '<div>\n' +
            '{{#if 1}}\n' +
            '{{/if}}\n' +
            '</div>',
            //  -- output --
            '<div>\n' +
            '    {{#if 1}}\n' +
            '    {{/if}}\n' +
            '</div>');
        test_fragment(
            '{{#if}}\n' +
            '{{#each}}\n' +
            '{{#if}}\n' +
            '{{!-- \n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            '--}}\n' +
            '{{/if}}\n' +
            '{{#if}}\n' +
            '{{!-- \n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            '--}}\n' +
            '{{/if}}\n' +
            '{{/each}}\n' +
            '{{/if}}',
            //  -- output --
            '{{#if}}\n' +
            '    {{#each}}\n' +
            '        {{#if}}\n' +
            '            {{!-- \n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            '--}}\n' +
            '        {{/if}}\n' +
            '        {{#if}}\n' +
            '            {{!-- \n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            '--}}\n' +
            '        {{/if}}\n' +
            '    {{/each}}\n' +
            '{{/if}}');
        test_fragment(
            '{{#if 1}}\n' +
            '    <div>\n' +
            '    </div>\n' +
            '{{/if}}');
        test_fragment(
            '<div>\n' +
            '    <small>SMALL TEXT</small>\n' +
            '    <span>\n' +
            '        {{#if isOwner}}\n' +
            '    <span><i class="fa fa-close"></i></span>\n' +
            '        {{else}}\n' +
            '            <span><i class="fa fa-bolt"></i></span>\n' +
            '        {{/if}}\n' +
            '    </span>\n' +
            '    <strong>{{userName}}:&nbsp;</strong>{{text}}\n' +
            '</div>',
            //  -- output --
            '<div>\n' +
            '    <small>SMALL TEXT</small>\n' +
            '    <span>\n' +
            '        {{#if isOwner}}\n' +
            '            <span><i class="fa fa-close"></i></span>\n' +
            '        {{else}}\n' +
            '            <span><i class="fa fa-bolt"></i></span>\n' +
            '        {{/if}}\n' +
            '    </span>\n' +
            '    <strong>{{userName}}:&nbsp;</strong>{{text}}\n' +
            '</div>');
        test_fragment(
            '<div>\n' +
            '    <small>SMALL TEXT</small>\n' +
            '    <span>\n' +
            '        {{#if isOwner}}\n' +
            '            <span><i class="fa fa-close"></i></span>\n' +
            '        {{else}}\n' +
            '            <span><i class="fa fa-bolt"></i></span>\n' +
            '        {{/if}}\n' +
            '    </span>\n' +
            '    <strong>{{userName}}:&nbsp;</strong>{{text}}\n' +
            '</div>');
        test_fragment(
            '{{#if 1}}\n' +
            '    {{!-- \n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            '--}}\n' +
            '    {{else}}\n' +
            '    {{!-- \n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            '--}}\n' +
            '{{/if}}',
            //  -- output --
            '{{#if 1}}\n' +
            '    {{!-- \n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            '--}}\n' +
            '{{else}}\n' +
            '    {{!-- \n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            '--}}\n' +
            '{{/if}}');
        test_fragment(
            '{{#if 1}}\n' +
            '    {{else}}\n' +
            '    {{/if}}',
            //  -- output --
            '{{#if 1}}\n' +
            '{{else}}\n' +
            '{{/if}}');
        test_fragment(
            '{{#if thing}}\n' +
            '{{#if otherthing}}\n' +
            '    {{!-- \n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            '--}}\n' +
            '    {{else}}\n' +
            '{{!-- \n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            '--}}\n' +
            '    {{/if}}\n' +
            '       {{else}}\n' +
            '{{!-- \n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            '--}}\n' +
            '{{/if}}',
            //  -- output --
            '{{#if thing}}\n' +
            '    {{#if otherthing}}\n' +
            '        {{!-- \n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            '--}}\n' +
            '    {{else}}\n' +
            '        {{!-- \n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            '--}}\n' +
            '    {{/if}}\n' +
            '{{else}}\n' +
            '    {{!-- \n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            '--}}\n' +
            '{{/if}}');
        test_fragment(
            '<div{{someStyle}}></div>',
            //  -- output --
            '<div {{someStyle}}></div>');
        test_fragment(
            '<dIv{{#if test}}class="foo"{{/if}}>{{!-- \n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            '--}}</dIv>',
            //  -- output --
            '<dIv {{#if test}} class="foo" {{/if}}>{{!-- \n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            '--}}</dIv>');
        test_fragment(
            '<diV{{#if thing}}{{somestyle}}class="{{class}}"{{else}}class="{{class2}}"{{/if}}>{{!-- \n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            '--}}</diV>',
            //  -- output --
            '<diV {{#if thing}} {{somestyle}} class="{{class}}" {{else}} class="{{class2}}" {{/if}}>{{!-- \n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            '--}}</diV>');
        test_fragment(
            '<span{{#if condition}}class="foo"{{/if}}>{{!-- \n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            '--}}</span>',
            //  -- output --
            '<span {{#if condition}} class="foo" {{/if}}>{{!-- \n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            '--}}</span>');
        test_fragment(
            '<div unformatted="{{#if}}{{!-- \n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            '--}}{{/if}}">{{!-- \n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            '--}}</div>');
        test_fragment(
            '<div unformatted="{{#if  }}    {{!-- \n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            '--}}{{/if}}">{{!-- \n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            '--}}</div>');
        test_fragment(
            '<div class="{{#if thingIs "value"}}{{!-- \n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            '--}}{{/if}}"></div>');
        test_fragment(
            '<div class="{{#if thingIs \'value\'}}{{!-- \n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            '--}}{{/if}}"></div>');
        test_fragment(
            '<div class=\'{{#if thingIs "value"}}{{!-- \n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            '--}}{{/if}}\'></div>');
        test_fragment(
            '<div class=\'{{#if thingIs \'value\'}}{{!-- \n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            '--}}{{/if}}\'></div>');
        test_fragment('<span>{{condition < 0 ? "result1" : "result2"}}</span>');
        test_fragment('<span>{{condition1 && condition2 && condition3 && condition4 < 0 ? "resForTrue" : "resForFalse"}}</span>');

        // Handlebars Indenting On - (indent_handlebars = "true")
        reset_options();
        set_name('Handlebars Indenting On - (indent_handlebars = "true")');
        opts.indent_handlebars = true;
        test_fragment('{{page-title}}');
        test_fragment(
            '{{page-title}}\n' +
            '{{a}}\n' +
            '{{value-title}}');
        test_fragment(
            '{{em-input label="Some Labe" property="amt" type="text" placeholder=""}}\n' +
            '{{em-input label="Type*" property="type" type="text" placeholder="(LTD)"}}\n' +
            '{{em-input label="Place*" property="place" type="text" placeholder=""}}');
        test_fragment('{{#if 0}}{{/if}}');
        test_fragment(
            '{{#if 0}}{{!-- \n' +
            ' mult-line\n' +
            'comment \n' +
            '{{#> component}}\n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            ' {{/ component}}--}}{{/if}}');
        test_fragment(
            '{{#if 0}}\n' +
            '{{/if}}');
        test_fragment(
            '{{#if     words}}{{/if}}',
            //  -- output --
            '{{#if words}}{{/if}}');
        test_fragment(
            '{{#if     words}}{{!-- \n' +
            ' mult-line\n' +
            'comment \n' +
            '{{#> component}}\n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            ' {{/ component}}--}}{{/if}}',
            //  -- output --
            '{{#if words}}{{!-- \n' +
            ' mult-line\n' +
            'comment \n' +
            '{{#> component}}\n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            ' {{/ component}}--}}{{/if}}');
        test_fragment(
            '{{#if     words}}{{!-- \n' +
            ' mult-line\n' +
            'comment \n' +
            '{{#> component}}\n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            ' {{/ component}}--}}{{/if}}',
            //  -- output --
            '{{#if words}}{{!-- \n' +
            ' mult-line\n' +
            'comment \n' +
            '{{#> component}}\n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            ' {{/ component}}--}}{{/if}}');
        test_fragment(
            '{{#if 1}}\n' +
            '    <div>\n' +
            '    </div>\n' +
            '{{/if}}');
        test_fragment(
            '{{#if 1}}\n' +
            '<div>\n' +
            '</div>\n' +
            '{{/if}}',
            //  -- output --
            '{{#if 1}}\n' +
            '    <div>\n' +
            '    </div>\n' +
            '{{/if}}');
        test_fragment(
            '<div>\n' +
            '    {{#if 1}}\n' +
            '    {{/if}}\n' +
            '</div>');
        test_fragment(
            '<div>\n' +
            '{{#if 1}}\n' +
            '{{/if}}\n' +
            '</div>',
            //  -- output --
            '<div>\n' +
            '    {{#if 1}}\n' +
            '    {{/if}}\n' +
            '</div>');
        test_fragment(
            '{{#if}}\n' +
            '{{#each}}\n' +
            '{{#if}}\n' +
            '{{!-- \n' +
            ' mult-line\n' +
            'comment \n' +
            '{{#> component}}\n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            ' {{/ component}}--}}\n' +
            '{{/if}}\n' +
            '{{#if}}\n' +
            '{{!-- \n' +
            ' mult-line\n' +
            'comment \n' +
            '{{#> component}}\n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            ' {{/ component}}--}}\n' +
            '{{/if}}\n' +
            '{{/each}}\n' +
            '{{/if}}',
            //  -- output --
            '{{#if}}\n' +
            '    {{#each}}\n' +
            '        {{#if}}\n' +
            '            {{!-- \n' +
            ' mult-line\n' +
            'comment \n' +
            '{{#> component}}\n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            ' {{/ component}}--}}\n' +
            '        {{/if}}\n' +
            '        {{#if}}\n' +
            '            {{!-- \n' +
            ' mult-line\n' +
            'comment \n' +
            '{{#> component}}\n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            ' {{/ component}}--}}\n' +
            '        {{/if}}\n' +
            '    {{/each}}\n' +
            '{{/if}}');
        test_fragment(
            '{{#if 1}}\n' +
            '    <div>\n' +
            '    </div>\n' +
            '{{/if}}');
        test_fragment(
            '<div>\n' +
            '    <small>SMALL TEXT</small>\n' +
            '    <span>\n' +
            '        {{#if isOwner}}\n' +
            '    <span><i class="fa fa-close"></i></span>\n' +
            '        {{else}}\n' +
            '            <span><i class="fa fa-bolt"></i></span>\n' +
            '        {{/if}}\n' +
            '    </span>\n' +
            '    <strong>{{userName}}:&nbsp;</strong>{{text}}\n' +
            '</div>',
            //  -- output --
            '<div>\n' +
            '    <small>SMALL TEXT</small>\n' +
            '    <span>\n' +
            '        {{#if isOwner}}\n' +
            '            <span><i class="fa fa-close"></i></span>\n' +
            '        {{else}}\n' +
            '            <span><i class="fa fa-bolt"></i></span>\n' +
            '        {{/if}}\n' +
            '    </span>\n' +
            '    <strong>{{userName}}:&nbsp;</strong>{{text}}\n' +
            '</div>');
        test_fragment(
            '<div>\n' +
            '    <small>SMALL TEXT</small>\n' +
            '    <span>\n' +
            '        {{#if isOwner}}\n' +
            '            <span><i class="fa fa-close"></i></span>\n' +
            '        {{else}}\n' +
            '            <span><i class="fa fa-bolt"></i></span>\n' +
            '        {{/if}}\n' +
            '    </span>\n' +
            '    <strong>{{userName}}:&nbsp;</strong>{{text}}\n' +
            '</div>');
        test_fragment(
            '{{#if 1}}\n' +
            '    {{!-- \n' +
            ' mult-line\n' +
            'comment \n' +
            '{{#> component}}\n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            ' {{/ component}}--}}\n' +
            '    {{else}}\n' +
            '    {{!-- \n' +
            ' mult-line\n' +
            'comment \n' +
            '{{#> component}}\n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            ' {{/ component}}--}}\n' +
            '{{/if}}',
            //  -- output --
            '{{#if 1}}\n' +
            '    {{!-- \n' +
            ' mult-line\n' +
            'comment \n' +
            '{{#> component}}\n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            ' {{/ component}}--}}\n' +
            '{{else}}\n' +
            '    {{!-- \n' +
            ' mult-line\n' +
            'comment \n' +
            '{{#> component}}\n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            ' {{/ component}}--}}\n' +
            '{{/if}}');
        test_fragment(
            '{{#if 1}}\n' +
            '    {{else}}\n' +
            '    {{/if}}',
            //  -- output --
            '{{#if 1}}\n' +
            '{{else}}\n' +
            '{{/if}}');
        test_fragment(
            '{{#if thing}}\n' +
            '{{#if otherthing}}\n' +
            '    {{!-- \n' +
            ' mult-line\n' +
            'comment \n' +
            '{{#> component}}\n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            ' {{/ component}}--}}\n' +
            '    {{else}}\n' +
            '{{!-- \n' +
            ' mult-line\n' +
            'comment \n' +
            '{{#> component}}\n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            ' {{/ component}}--}}\n' +
            '    {{/if}}\n' +
            '       {{else}}\n' +
            '{{!-- \n' +
            ' mult-line\n' +
            'comment \n' +
            '{{#> component}}\n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            ' {{/ component}}--}}\n' +
            '{{/if}}',
            //  -- output --
            '{{#if thing}}\n' +
            '    {{#if otherthing}}\n' +
            '        {{!-- \n' +
            ' mult-line\n' +
            'comment \n' +
            '{{#> component}}\n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            ' {{/ component}}--}}\n' +
            '    {{else}}\n' +
            '        {{!-- \n' +
            ' mult-line\n' +
            'comment \n' +
            '{{#> component}}\n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            ' {{/ component}}--}}\n' +
            '    {{/if}}\n' +
            '{{else}}\n' +
            '    {{!-- \n' +
            ' mult-line\n' +
            'comment \n' +
            '{{#> component}}\n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            ' {{/ component}}--}}\n' +
            '{{/if}}');
        test_fragment(
            '<div{{someStyle}}></div>',
            //  -- output --
            '<div {{someStyle}}></div>');
        test_fragment(
            '<dIv{{#if test}}class="foo"{{/if}}>{{!-- \n' +
            ' mult-line\n' +
            'comment \n' +
            '{{#> component}}\n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            ' {{/ component}}--}}</dIv>',
            //  -- output --
            '<dIv {{#if test}} class="foo" {{/if}}>{{!-- \n' +
            ' mult-line\n' +
            'comment \n' +
            '{{#> component}}\n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            ' {{/ component}}--}}</dIv>');
        test_fragment(
            '<diV{{#if thing}}{{somestyle}}class="{{class}}"{{else}}class="{{class2}}"{{/if}}>{{!-- \n' +
            ' mult-line\n' +
            'comment \n' +
            '{{#> component}}\n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            ' {{/ component}}--}}</diV>',
            //  -- output --
            '<diV {{#if thing}} {{somestyle}} class="{{class}}" {{else}} class="{{class2}}" {{/if}}>{{!-- \n' +
            ' mult-line\n' +
            'comment \n' +
            '{{#> component}}\n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            ' {{/ component}}--}}</diV>');
        test_fragment(
            '<span{{#if condition}}class="foo"{{/if}}>{{!-- \n' +
            ' mult-line\n' +
            'comment \n' +
            '{{#> component}}\n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            ' {{/ component}}--}}</span>',
            //  -- output --
            '<span {{#if condition}} class="foo" {{/if}}>{{!-- \n' +
            ' mult-line\n' +
            'comment \n' +
            '{{#> component}}\n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            ' {{/ component}}--}}</span>');
        test_fragment(
            '<div unformatted="{{#if}}{{!-- \n' +
            ' mult-line\n' +
            'comment \n' +
            '{{#> component}}\n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            ' {{/ component}}--}}{{/if}}">{{!-- \n' +
            ' mult-line\n' +
            'comment \n' +
            '{{#> component}}\n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            ' {{/ component}}--}}</div>');
        test_fragment(
            '<div unformatted="{{#if  }}    {{!-- \n' +
            ' mult-line\n' +
            'comment \n' +
            '{{#> component}}\n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            ' {{/ component}}--}}{{/if}}">{{!-- \n' +
            ' mult-line\n' +
            'comment \n' +
            '{{#> component}}\n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            ' {{/ component}}--}}</div>');
        test_fragment(
            '<div class="{{#if thingIs "value"}}{{!-- \n' +
            ' mult-line\n' +
            'comment \n' +
            '{{#> component}}\n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            ' {{/ component}}--}}{{/if}}"></div>');
        test_fragment(
            '<div class="{{#if thingIs \'value\'}}{{!-- \n' +
            ' mult-line\n' +
            'comment \n' +
            '{{#> component}}\n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            ' {{/ component}}--}}{{/if}}"></div>');
        test_fragment(
            '<div class=\'{{#if thingIs "value"}}{{!-- \n' +
            ' mult-line\n' +
            'comment \n' +
            '{{#> component}}\n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            ' {{/ component}}--}}{{/if}}\'></div>');
        test_fragment(
            '<div class=\'{{#if thingIs \'value\'}}{{!-- \n' +
            ' mult-line\n' +
            'comment \n' +
            '{{#> component}}\n' +
            ' mult-line\n' +
            'comment  \n' +
            '     with spacing\n' +
            ' {{/ component}}--}}{{/if}}\'></div>');
        test_fragment('<span>{{condition < 0 ? "result1" : "result2"}}</span>');
        test_fragment('<span>{{condition1 && condition2 && condition3 && condition4 < 0 ? "resForTrue" : "resForFalse"}}</span>');

        // Handlebars Indenting On - (indent_handlebars = "true", wrap_line_length = "80")
        reset_options();
        set_name('Handlebars Indenting On - (indent_handlebars = "true", wrap_line_length = "80")');
        opts.indent_handlebars = true;
        opts.wrap_line_length = 80;
        test_fragment('{{page-title}}');
        test_fragment(
            '{{page-title}}\n' +
            '{{a}}\n' +
            '{{value-title}}');
        test_fragment(
            '{{em-input label="Some Labe" property="amt" type="text" placeholder=""}}\n' +
            '{{em-input label="Type*" property="type" type="text" placeholder="(LTD)"}}\n' +
            '{{em-input label="Place*" property="place" type="text" placeholder=""}}');
        test_fragment('{{#if 0}}{{/if}}');
        test_fragment('{{#if 0}}content{{/if}}');
        test_fragment(
            '{{#if 0}}\n' +
            '{{/if}}');
        test_fragment(
            '{{#if     words}}{{/if}}',
            //  -- output --
            '{{#if words}}{{/if}}');
        test_fragment(
            '{{#if     words}}content{{/if}}',
            //  -- output --
            '{{#if words}}content{{/if}}');
        test_fragment(
            '{{#if     words}}content{{/if}}',
            //  -- output --
            '{{#if words}}content{{/if}}');
        test_fragment(
            '{{#if 1}}\n' +
            '    <div>\n' +
            '    </div>\n' +
            '{{/if}}');
        test_fragment(
            '{{#if 1}}\n' +
            '<div>\n' +
            '</div>\n' +
            '{{/if}}',
            //  -- output --
            '{{#if 1}}\n' +
            '    <div>\n' +
            '    </div>\n' +
            '{{/if}}');
        test_fragment(
            '<div>\n' +
            '    {{#if 1}}\n' +
            '    {{/if}}\n' +
            '</div>');
        test_fragment(
            '<div>\n' +
            '{{#if 1}}\n' +
            '{{/if}}\n' +
            '</div>',
            //  -- output --
            '<div>\n' +
            '    {{#if 1}}\n' +
            '    {{/if}}\n' +
            '</div>');
        test_fragment(
            '{{#if}}\n' +
            '{{#each}}\n' +
            '{{#if}}\n' +
            'content\n' +
            '{{/if}}\n' +
            '{{#if}}\n' +
            'content\n' +
            '{{/if}}\n' +
            '{{/each}}\n' +
            '{{/if}}',
            //  -- output --
            '{{#if}}\n' +
            '    {{#each}}\n' +
            '        {{#if}}\n' +
            '            content\n' +
            '        {{/if}}\n' +
            '        {{#if}}\n' +
            '            content\n' +
            '        {{/if}}\n' +
            '    {{/each}}\n' +
            '{{/if}}');
        test_fragment(
            '{{#if 1}}\n' +
            '    <div>\n' +
            '    </div>\n' +
            '{{/if}}');
        test_fragment(
            '<div>\n' +
            '    <small>SMALL TEXT</small>\n' +
            '    <span>\n' +
            '        {{#if isOwner}}\n' +
            '    <span><i class="fa fa-close"></i></span>\n' +
            '        {{else}}\n' +
            '            <span><i class="fa fa-bolt"></i></span>\n' +
            '        {{/if}}\n' +
            '    </span>\n' +
            '    <strong>{{userName}}:&nbsp;</strong>{{text}}\n' +
            '</div>',
            //  -- output --
            '<div>\n' +
            '    <small>SMALL TEXT</small>\n' +
            '    <span>\n' +
            '        {{#if isOwner}}\n' +
            '            <span><i class="fa fa-close"></i></span>\n' +
            '        {{else}}\n' +
            '            <span><i class="fa fa-bolt"></i></span>\n' +
            '        {{/if}}\n' +
            '    </span>\n' +
            '    <strong>{{userName}}:&nbsp;</strong>{{text}}\n' +
            '</div>');
        test_fragment(
            '<div>\n' +
            '    <small>SMALL TEXT</small>\n' +
            '    <span>\n' +
            '        {{#if isOwner}}\n' +
            '            <span><i class="fa fa-close"></i></span>\n' +
            '        {{else}}\n' +
            '            <span><i class="fa fa-bolt"></i></span>\n' +
            '        {{/if}}\n' +
            '    </span>\n' +
            '    <strong>{{userName}}:&nbsp;</strong>{{text}}\n' +
            '</div>');
        test_fragment(
            '{{#if 1}}\n' +
            '    content\n' +
            '    {{else}}\n' +
            '    content\n' +
            '{{/if}}',
            //  -- output --
            '{{#if 1}}\n' +
            '    content\n' +
            '{{else}}\n' +
            '    content\n' +
            '{{/if}}');
        test_fragment(
            '{{#if 1}}\n' +
            '    {{else}}\n' +
            '    {{/if}}',
            //  -- output --
            '{{#if 1}}\n' +
            '{{else}}\n' +
            '{{/if}}');
        test_fragment(
            '{{#if thing}}\n' +
            '{{#if otherthing}}\n' +
            '    content\n' +
            '    {{else}}\n' +
            'content\n' +
            '    {{/if}}\n' +
            '       {{else}}\n' +
            'content\n' +
            '{{/if}}',
            //  -- output --
            '{{#if thing}}\n' +
            '    {{#if otherthing}}\n' +
            '        content\n' +
            '    {{else}}\n' +
            '        content\n' +
            '    {{/if}}\n' +
            '{{else}}\n' +
            '    content\n' +
            '{{/if}}');
        test_fragment(
            '<div{{someStyle}}></div>',
            //  -- output --
            '<div {{someStyle}}></div>');
        test_fragment(
            '<dIv{{#if test}}class="foo"{{/if}}>content</dIv>',
            //  -- output --
            '<dIv {{#if test}} class="foo" {{/if}}>content</dIv>');
        test_fragment(
            '<diV{{#if thing}}{{somestyle}}class="{{class}}"{{else}}class="{{class2}}"{{/if}}>content</diV>',
            //  -- output --
            '<diV {{#if thing}} {{somestyle}} class="{{class}}" {{else}} class="{{class2}}" {{/if}}>content</diV>');
        test_fragment(
            '<span{{#if condition}}class="foo"{{/if}}>content</span>',
            //  -- output --
            '<span {{#if condition}} class="foo" {{/if}}>content</span>');
        test_fragment('<div unformatted="{{#if}}content{{/if}}">content</div>');
        test_fragment('<div unformatted="{{#if  }}    content{{/if}}">content</div>');
        test_fragment('<div class="{{#if thingIs "value"}}content{{/if}}"></div>');
        test_fragment('<div class="{{#if thingIs \'value\'}}content{{/if}}"></div>');
        test_fragment('<div class=\'{{#if thingIs "value"}}content{{/if}}\'></div>');
        test_fragment('<div class=\'{{#if thingIs \'value\'}}content{{/if}}\'></div>');
        test_fragment('<span>{{condition < 0 ? "result1" : "result2"}}</span>');
        test_fragment('<span>{{condition1 && condition2 && condition3 && condition4 < 0 ? "resForTrue" : "resForFalse"}}</span>');


        //============================================================
        // Handlebars Else tag indenting
        reset_options();
        set_name('Handlebars Else tag indenting');
        opts.indent_handlebars = true;
        test_fragment(
            '{{#if test}}<div></div>{{else}}<div></div>{{/if}}',
            //  -- output --
            '{{#if test}}\n' +
            '    <div></div>\n' +
            '{{else}}\n' +
            '    <div></div>\n' +
            '{{/if}}');
        test_fragment('{{#if test}}<span></span>{{else}}<span></span>{{/if}}');
        test_fragment(
            '<a class="navbar-brand">\n' +
            '    {{#if connected}}\n' +
            '        <i class="fa fa-link" style="color:green"></i> {{else if sleep}}\n' +
            '        <i class="fa fa-sleep" style="color:yellow"></i>\n' +
            '    {{else}}\n' +
            '        <i class="fa fa-unlink" style="color:red"></i>\n' +
            '    {{/if}}\n' +
            '</a>',
            //  -- output --
            '<a class="navbar-brand">\n' +
            '    {{#if connected}}\n' +
            '        <i class="fa fa-link" style="color:green"></i>\n' +
            '    {{else if sleep}}\n' +
            '        <i class="fa fa-sleep" style="color:yellow"></i>\n' +
            '    {{else}}\n' +
            '        <i class="fa fa-unlink" style="color:red"></i>\n' +
            '    {{/if}}\n' +
            '</a>');


        //============================================================
        // Unclosed html elements
        reset_options();
        set_name('Unclosed html elements');
        test_fragment(
            '<source>\n' +
            '<source>');
        test_fragment(
            '<br>\n' +
            '<br>');
        test_fragment(
            '<input>\n' +
            '<input>');
        test_fragment(
            '<meta>\n' +
            '<meta>');
        test_fragment(
            '<link>\n' +
            '<link>');
        test_fragment(
            '<colgroup>\n' +
            '    <col>\n' +
            '    <col>\n' +
            '</colgroup>');


        //============================================================
        // Unformatted tags
        reset_options();
        set_name('Unformatted tags');
        test_fragment(
            '<ol>\n' +
            '    <li>b<pre>c</pre></li>\n' +
            '</ol>',
            //  -- output --
            '<ol>\n' +
            '    <li>b\n' +
            '        <pre>c</pre>\n' +
            '    </li>\n' +
            '</ol>');
        test_fragment(
            '<ol>\n' +
            '    <li>b<code>c</code></li>\n' +
            '</ol>');
        test_fragment(
            '<ul>\n' +
            '    <li>\n' +
            '        <span class="octicon octicon-person"></span>\n' +
            '        <a href="/contact/">Kontakt</a>\n' +
            '    </li>\n' +
            '</ul>');
        test_fragment('<div class="searchform"><input type="text" value="" name="s" id="s" /><input type="submit" id="searchsubmit" value="Search" /></div>');
        test_fragment('<div class="searchform"><input type="text" value="" name="s" id="s"><input type="submit" id="searchsubmit" value="Search"></div>');
        test_fragment(
            '<p>\n' +
            '    <a href="/test/"><img src="test.jpg" /></a>\n' +
            '</p>');
        test_fragment(
            '<p>\n' +
            '    <a href="/test/"><img src="test.jpg" /></a><a href="/test/"><img src="test.jpg" /></a>\n' +
            '</p>');
        test_fragment(
            '<p>\n' +
            '    <a href="/test/"><img src="test.jpg" /></a><a href="/test/"><img src="test.jpg" /></a><a href="/test/"><img src="test.jpg" /></a><a href="/test/"><img src="test.jpg" /></a>\n' +
            '</p>');
        test_fragment(
            '<p>\n' +
            '    <span>image: <img src="test.jpg" /></span><span>image: <img src="test.jpg" /></span>\n' +
            '</p>');
        test_fragment(
            '<p>\n' +
            '    <strong>image: <img src="test.jpg" /></strong><strong>image: <img src="test.jpg" /></strong>\n' +
            '</p>');


        //============================================================
        // File starting with comment
        reset_options();
        set_name('File starting with comment');
        test_fragment(
            '<!--sample comment -->\n' +
            '\n' +
            '<html>\n' +
            '<body>\n' +
            '    <span>a span</span>\n' +
            '</body>\n' +
            '\n' +
            '</html>');


        //============================================================
        // Issue 1478 - Space handling inside self closing tag
        reset_options();
        set_name('Issue 1478 - Space handling inside self closing tag');
        test_fragment(
            '<div>\n' +
            '    <br/>\n' +
            '    <br />\n' +
            '</div>',
            //  -- output --
            '<div>\n' +
            '    <br />\n' +
            '    <br />\n' +
            '</div>');


        //============================================================
        // Single line comment after closing tag
        reset_options();
        set_name('Single line comment after closing tag');
        test_fragment(
            '<div class="col">\n' +
            '    <div class="row">\n' +
            '        <div class="card">\n' +
            '\n' +
            '            <h1>Some heading</h1>\n' +
            '            <p>Some text for the card.</p>\n' +
            '            <img src="some/image.jpg" alt="">\n' +
            '\n' +
            '            </div>    <!-- /.card -->\n' +
            '    </div>\n' +
            '            <!-- /.row -->\n' +
            '</div> <!-- /.col -->',
            //  -- output --
            '<div class="col">\n' +
            '    <div class="row">\n' +
            '        <div class="card">\n' +
            '\n' +
            '            <h1>Some heading</h1>\n' +
            '            <p>Some text for the card.</p>\n' +
            '            <img src="some/image.jpg" alt="">\n' +
            '\n' +
            '        </div> <!-- /.card -->\n' +
            '    </div>\n' +
            '    <!-- /.row -->\n' +
            '</div> <!-- /.col -->');


        //============================================================
        // Regression Tests
        reset_options();
        set_name('Regression Tests');
        
        // #1202
        test_fragment('<a class="js-open-move-from-header" href="#">5A - IN-SPRINT TESTING</a>');
        test_fragment('<a ">9</a">');
        test_fragment('<a href="javascript:;" id="_h_url_paid_pro3" onmousedown="_h_url_click_paid_pro(this);" rel="nofollow" class="pro-title" itemprop="name">WA GlassKote</a>');
        test_fragment('<a href="/b/yergey-brewing-a-beer-has-no-name/1745600">"A Beer Has No Name"</a>');


        //============================================================
        // Php formatting
        reset_options();
        set_name('Php formatting');
        test_fragment(
            '<h1 class="content-page-header"><?=$view["name"]; ?></h1>',
            //  -- output --
            '<h1 class="content-page-header">\n' +
            '    <?=$view["name"]; ?>\n' +
            '</h1>');
        test_fragment(
            '<?php\n' +
            'for($i = 1; $i <= 100; $i++;) {\n' +
            '    #count to 100!\n' +
            '    echo($i . "</br>");\n' +
            '}\n' +
            '?>');
        test_fragment(
            '<?php ?>\n' +
            '<!DOCTYPE html>\n' +
            '\n' +
            '<html>\n' +
            '\n' +
            '<head></head>\n' +
            '\n' +
            '<body></body>\n' +
            '\n' +
            '</html>');
        test_fragment(
            '<?= "A" ?>\n' +
            '<?= "B" ?>\n' +
            '<?= "C" ?>');
        test_fragment(
            '<?php\n' +
            'echo "A";\n' +
            '?>\n' +
            '<span>Test</span>');


        //============================================================
        // Support simple language specific option inheritance/overriding - (js = "{ "indent_size": 3 }", css = "{ "indent_size": 5 }")
        reset_options();
        set_name('Support simple language specific option inheritance/overriding - (js = "{ "indent_size": 3 }", css = "{ "indent_size": 5 }")');
        opts.js = { 'indent_size': 3 };
        opts.css = { 'indent_size': 5 };
        test_fragment(
            '<head>\n' +
            '    <script>\n' +
            '        if (a == b) {\n' +
            '           test();\n' +
            '        }\n' +
            '    </script>\n' +
            '    <style>\n' +
            '        .selector {\n' +
            '             font-size: 12px;\n' +
            '        }\n' +
            '    </style>\n' +
            '</head>');

        // Support simple language specific option inheritance/overriding - (html = "{ "js": { "indent_size": 3 }, "css": { "indent_size": 5 } }")
        reset_options();
        set_name('Support simple language specific option inheritance/overriding - (html = "{ "js": { "indent_size": 3 }, "css": { "indent_size": 5 } }")');
        opts.html = { 'js': { 'indent_size': 3 }, 'css': { 'indent_size': 5 } };
        test_fragment(
            '<head>\n' +
            '    <script>\n' +
            '        if (a == b) {\n' +
            '           test();\n' +
            '        }\n' +
            '    </script>\n' +
            '    <style>\n' +
            '        .selector {\n' +
            '             font-size: 12px;\n' +
            '        }\n' +
            '    </style>\n' +
            '</head>');

        // Support simple language specific option inheritance/overriding - (indent_size = "9", html = "{ "js": { "indent_size": 3 }, "css": { "indent_size": 5 }, "indent_size": 2}", js = "{ "indent_size": 5 }", css = "{ "indent_size": 3 }")
        reset_options();
        set_name('Support simple language specific option inheritance/overriding - (indent_size = "9", html = "{ "js": { "indent_size": 3 }, "css": { "indent_size": 5 }, "indent_size": 2}", js = "{ "indent_size": 5 }", css = "{ "indent_size": 3 }")');
        opts.indent_size = 9;
        opts.html = { 'js': { 'indent_size': 3 }, 'css': { 'indent_size': 5 }, 'indent_size': 2};
        opts.js = { 'indent_size': 5 };
        opts.css = { 'indent_size': 3 };
        test_fragment(
            '<head>\n' +
            '  <script>\n' +
            '    if (a == b) {\n' +
            '       test();\n' +
            '    }\n' +
            '  </script>\n' +
            '  <style>\n' +
            '    .selector {\n' +
            '         font-size: 12px;\n' +
            '    }\n' +
            '  </style>\n' +
            '</head>');


        //============================================================
        // underscore.js  formatting
        reset_options();
        set_name('underscore.js  formatting');
        test_fragment(
            '<div class="col-sm-9">\n' +
            '    <textarea id="notes" class="form-control" rows="3">\n' +
            '        <%= notes %>\n' +
            '    </textarea>\n' +
            '</div>');


        //============================================================
        // Linewrap length
        reset_options();
        set_name('Linewrap length');
        opts.wrap_line_length = 80;
        
        // This test shows how line wrapping is still not correct.
        test_fragment(
            '<body>\n' +
            '    <div>\n' +
            '        <div>\n' +
            '            <p>Reconstruct the schematic editor the EDA system <a href="http://www.jedat.co.jp/eng/products.html"><i>AlphaSX</i></a> series</p>\n' +
            '        </div>\n' +
            '    </div>\n' +
            '</body>',
            //  -- output --
            '<body>\n' +
            '    <div>\n' +
            '        <div>\n' +
            '            <p>Reconstruct the schematic editor the EDA system <a href="http://www.jedat.co.jp/eng/products.html"><i>AlphaSX</i></a>\n' +
            '                series</p>\n' +
            '        </div>\n' +
            '    </div>\n' +
            '</body>');
        
        // This test shows how line wrapping is still not correct. Should wrap before 0015.
        test_fragment(
            '<span>0 0001 0002 0003 0004 0005 0006 0007 0008 0009 0010 0011 0012 0013 0014 0015 0016 0017 0018 0019 0020</span>',
            //  -- output --
            '<span>0 0001 0002 0003 0004 0005 0006 0007 0008 0009 0010 0011 0012 0013 0014 0015\n' +
            '    0016 0017 0018 0019 0020</span>');


        //============================================================
        // Indent with tabs
        reset_options();
        set_name('Indent with tabs');
        opts.indent_with_tabs = true;
        test_fragment(
            '<div>\n' +
            '<div>\n' +
            '</div>\n' +
            '</div>',
            //  -- output --
            '<div>\n' +
            '\t<div>\n' +
            '\t</div>\n' +
            '</div>');


        //============================================================
        // Indent without tabs
        reset_options();
        set_name('Indent without tabs');
        opts.indent_with_tabs = false;
        test_fragment(
            '<div>\n' +
            '<div>\n' +
            '</div>\n' +
            '</div>',
            //  -- output --
            '<div>\n' +
            '    <div>\n' +
            '    </div>\n' +
            '</div>');


        //============================================================
        // Indent body inner html by default
        reset_options();
        set_name('Indent body inner html by default');
        test_fragment(
            '<html>\n' +
            '<body>\n' +
            '<div></div>\n' +
            '</body>\n' +
            '\n' +
            '</html>',
            //  -- output --
            '<html>\n' +
            '<body>\n' +
            '    <div></div>\n' +
            '</body>\n' +
            '\n' +
            '</html>');


        //============================================================
        // indent_body_inner_html set to false prevents indent of body inner html
        reset_options();
        set_name('indent_body_inner_html set to false prevents indent of body inner html');
        opts.indent_body_inner_html = false;
        test_fragment(
            '<html>\n' +
            '<body>\n' +
            '<div></div>\n' +
            '</body>\n' +
            '\n' +
            '</html>');


        //============================================================
        // Indent head inner html by default
        reset_options();
        set_name('Indent head inner html by default');
        test_fragment(
            '<html>\n' +
            '\n' +
            '<head>\n' +
            '<meta>\n' +
            '</head>\n' +
            '\n' +
            '</html>',
            //  -- output --
            '<html>\n' +
            '\n' +
            '<head>\n' +
            '    <meta>\n' +
            '</head>\n' +
            '\n' +
            '</html>');


        //============================================================
        // indent_head_inner_html set to false prevents indent of head inner html
        reset_options();
        set_name('indent_head_inner_html set to false prevents indent of head inner html');
        opts.indent_head_inner_html = false;
        test_fragment(
            '<html>\n' +
            '\n' +
            '<head>\n' +
            '<meta>\n' +
            '</head>\n' +
            '\n' +
            '</html>');


        //============================================================
        // Inline tags formatting
        reset_options();
        set_name('Inline tags formatting');
        test_fragment(
            '<div><span></span></div><span><div></div></span>',
            //  -- output --
            '<div><span></span></div><span>\n' +
            '    <div></div>\n' +
            '</span>');
        test_fragment(
            '<div><div><span><span>Nested spans</span></span></div></div>',
            //  -- output --
            '<div>\n' +
            '    <div><span><span>Nested spans</span></span></div>\n' +
            '</div>');
        test_fragment(
            '<p>Should remove <span><span \n' +
            '\n' +
            'class="some-class">attribute</span></span> newlines</p>',
            //  -- output --
            '<p>Should remove <span><span class="some-class">attribute</span></span> newlines</p>');
        test_fragment('<div><span>All</span> on <span>one</span> line</div>');
        test_fragment('<span class="{{class_name}}">{{content}}</span>');
        test_fragment('{{#if 1}}<span>{{content}}</span>{{/if}}');


        //============================================================
        // unformatted to prevent formatting changes
        reset_options();
        set_name('unformatted to prevent formatting changes');
        opts.unformatted = ['u'];
        test_fragment('<u><div><div>Ignore block tags in unformatted regions</div></div></u>');
        test_fragment('<div><u>Don\'t wrap unformatted regions with extra newlines</u></div>');
        test_fragment(
            '<u>  \n' +
            '\n' +
            '\n' +
            '  Ignore extra """whitespace mostly  \n' +
            '\n' +
            '\n' +
            '  </u>',
            //  -- output --
            '<u>\n' +
            '\n' +
            '\n' +
            '  Ignore extra """whitespace mostly  \n' +
            '\n' +
            '\n' +
            '  </u>');
        test_fragment(
            '<u><div \n' +
            '\t\n' +
            'class=""">Ignore whitespace in attributes\t</div></u>');
        test_fragment(
            '<u \n' +
            '\n' +
            '\t\t  class="">Ignore whitespace\n' +
            'in\tattributes</u>',
            //  -- output --
            '<u\n' +
            '\n' +
            '\t\t  class="">Ignore whitespace\n' +
            'in\tattributes</u>');


        //============================================================
        // content_unformatted to prevent formatting content
        reset_options();
        set_name('content_unformatted to prevent formatting content');
        opts.content_unformatted = ['script', 'style', 'p', 'span', 'br'];
        test_fragment(
            '<html><body><h1>A</h1><script>if(1){f();}</script><style>.a{display:none;}</style></body></html>',
            //  -- output --
            '<html>\n' +
            '<body>\n' +
            '    <h1>A</h1>\n' +
            '    <script>if(1){f();}</script>\n' +
            '    <style>.a{display:none;}</style>\n' +
            '</body>\n' +
            '\n' +
            '</html>');
        test_fragment(
            '<div><p>Beautify me</p></div><p><div>But not me</div></p>',
            //  -- output --
            '<div>\n' +
            '    <p>Beautify me</p>\n' +
            '</div>\n' +
            '<p><div>But not me</div></p>');
        test_fragment(
            '<div><p\n' +
            '  class="beauty-me"\n' +
            '>Beautify me</p></div><p><div\n' +
            '  class="iamalreadybeauty"\n' +
            '>But not me</div></p>',
            //  -- output --
            '<div>\n' +
            '    <p class="beauty-me">Beautify me</p>\n' +
            '</div>\n' +
            '<p><div\n' +
            '  class="iamalreadybeauty"\n' +
            '>But not me</div></p>');
        test_fragment('<div><span>blabla<div>something here</div></span></div>');
        test_fragment('<div><br /></div>');
        test_fragment(
            '<div><pre>var a=1;\n' +
            'var b=a;</pre></div>',
            //  -- output --
            '<div>\n' +
            '    <pre>var a=1; var b=a;</pre>\n' +
            '</div>');
        test_fragment(
            '<div><pre>\n' +
            'var a=1;\n' +
            'var b=a;\n' +
            '</pre></div>',
            //  -- output --
            '<div>\n' +
            '    <pre>\n' +
            '        var a=1; var b=a;\n' +
            '    </pre>\n' +
            '</div>');


        //============================================================
        // default content_unformatted and inline element test
        reset_options();
        set_name('default content_unformatted and inline element test');
        test_fragment(
            '<html><body><h1>A</h1><script>if(1){f();}</script><style>.a{display:none;}</style></body></html>',
            //  -- output --
            '<html>\n' +
            '<body>\n' +
            '    <h1>A</h1>\n' +
            '    <script>\n' +
            '        if (1) {\n' +
            '            f();\n' +
            '        }\n' +
            '    </script>\n' +
            '    <style>\n' +
            '        .a {\n' +
            '            display: none;\n' +
            '        }\n' +
            '    </style>\n' +
            '</body>\n' +
            '\n' +
            '</html>');
        test_fragment(
            '<div><p>Beautify me</p></div><p><p>But not me</p></p>',
            //  -- output --
            '<div>\n' +
            '    <p>Beautify me</p>\n' +
            '</div>\n' +
            '<p>\n' +
            '    <p>But not me</p>\n' +
            '</p>');
        test_fragment(
            '<div><p\n' +
            '  class="beauty-me"\n' +
            '>Beautify me</p></div><p><p\n' +
            '  class="iamalreadybeauty"\n' +
            '>But not me</p></p>',
            //  -- output --
            '<div>\n' +
            '    <p class="beauty-me">Beautify me</p>\n' +
            '</div>\n' +
            '<p>\n' +
            '    <p class="iamalreadybeauty">But not me</p>\n' +
            '</p>');
        test_fragment('<div><span>blabla<div>something here</div></span></div>');
        test_fragment('<div><br /></div>');
        test_fragment(
            '<div><pre>var a=1;\n' +
            'var b=a;</pre></div>',
            //  -- output --
            '<div>\n' +
            '    <pre>var a=1;\n' +
            'var b=a;</pre>\n' +
            '</div>');
        test_fragment(
            '<div><pre>\n' +
            'var a=1;\n' +
            'var b=a;\n' +
            '</pre></div>',
            //  -- output --
            '<div>\n' +
            '    <pre>\n' +
            'var a=1;\n' +
            'var b=a;\n' +
            '</pre>\n' +
            '</div>');
        
        // Test for #1041
        test_fragment(
            '<p><span class="foo">foo <span class="bar">bar</span></span></p>\n' +
            '\n' +
            '<aside><p class="foo">foo <span class="bar">bar</span></p></aside>\n' +
            '<p class="foo"><span class="bar">bar</span></p>',
            //  -- output --
            '<p><span class="foo">foo <span class="bar">bar</span></span></p>\n' +
            '\n' +
            '<aside>\n' +
            '    <p class="foo">foo <span class="bar">bar</span></p>\n' +
            '</aside>\n' +
            '<p class="foo"><span class="bar">bar</span></p>');
        
        // Test for #1167
        test_fragment(
            '<span>\n' +
            '    <span><img src="images/off.svg" alt=""></span>\n' +
            '    <span><img src="images/on.svg" alt=""></span>\n' +
            '</span>');
        
        // Test for #882
        test_fragment(
            '<tr><th><h3>Name</h3></th><td class="full-width"></td></tr>',
            //  -- output --
            '<tr>\n' +
            '    <th>\n' +
            '        <h3>Name</h3>\n' +
            '    </th>\n' +
            '    <td class="full-width"></td>\n' +
            '</tr>');
        
        // Test for #1184
        test_fragment(
            '<div><div></div>Connect</div>',
            //  -- output --
            '<div>\n' +
            '    <div></div>Connect\n' +
            '</div>');


        //============================================================
        // New Test Suite
        reset_options();
        set_name('New Test Suite');


    }

    function beautifier_unconverted_tests()
    {
        sanitytest = test_obj;

        reset_options();
        //============================================================
        test_fragment(null, '');

        reset_options();
        //============================================================
        set_name('end_with_newline = true');
        opts.end_with_newline = true;

        test_fragment('', '\n');
        test_fragment('<div></div>\n');
        test_fragment('<div></div>\n\n\n', '<div></div>\n');
        test_fragment('<head>\n' +
            '    <script>\n' +
            '        mocha.setup("bdd");\n' +
            '\n' +
            '    </script>\n' +
            '</head>\n');


        reset_options();
        //============================================================
        set_name('Error cases');
        // error cases need love too
        bth('<img title="Bad food!" src="foo.jpg" alt="Evil" ">');
        bth("<!-- don't blow up if a comment is not complete"); // -->

        reset_options();
        //============================================================
        set_name('Basic beautify');

        test_fragment(
            '<head>\n' +
            '    <script>\n' +
            '        mocha.setup("bdd");\n' +
            '    </script>\n' +
            '</head>');

        test_fragment('<div></div>\n', '<div></div>');
        bth('<div></div>');
        bth('<div>content</div>');
        bth('<div><div></div></div>',
            '<div>\n' +
            '    <div></div>\n' +
            '</div>');
        bth('<div><div>content</div></div>',
            '<div>\n' +
            '    <div>content</div>\n' +
            '</div>');
        bth('<div>\n' +
            '    <span>content</span>\n' +
            '</div>');
        bth('<div>\n' +
            '</div>');
        bth('<div>\n' +
            '    content\n' +
            '</div>');
        bth('<div>\n' +
            '    </div>',
            '<div>\n' +
            '</div>');
        bth('    <div>\n' +
            '    </div>',
            '<div>\n' +
            '</div>');
        bth('<div>\n' +
            '</div>\n' +
            '    <div>\n' +
            '    </div>',
            '<div>\n' +
            '</div>\n' +
            '<div>\n' +
            '</div>');
        bth('    <div>\n' +
            '</div>',
            '<div>\n' +
            '</div>');
        bth('<div        >content</div>',
            '<div>content</div>');
        bth('<div     thinger="preserve  space  here"   ></div  >',
            '<div thinger="preserve  space  here"></div>');
        bth('content\n' +
            '    <div>\n' +
            '    </div>\n' +
            'content',
            'content\n' +
            '<div>\n' +
            '</div>\n' +
            'content');
        bth('<li>\n' +
            '    <div>\n' +
            '    </div>\n' +
            '</li>');
        bth('<li>\n' +
            '<div>\n' +
            '</div>\n' +
            '</li>',
            '<li>\n' +
            '    <div>\n' +
            '    </div>\n' +
            '</li>');
        bth('<li>\n' +
            '    content\n' +
            '</li>\n' +
            '<li>\n' +
            '    content\n' +
            '</li>');

        bth('<img>content');
        bth('<img> content');
        bth('<img>   content', '<img> content');

        bth('<img><img>content');
        bth('<img> <img>content');
        bth('<img>   <img>content', '<img> <img>content');

        bth('<img><b>content</b>');
        bth('<img> <b>content</b>');
        bth('<img>   <b>content</b>', '<img> <b>content</b>');

        bth('<div>content<img>content</div>');
        bth('<div> content <img> content</div>');
        bth('<div>    content <img>    content </div>',
            '<div> content <img> content </div>');
        bth('Text <a href="#">Link</a> Text');

        reset_options();
        //============================================================
        set_name('content_unformatted = ["script", "style"]');
        var content_unformatted = opts.content_unformatted;
        opts.content_unformatted = ['script', 'style'];
        bth('<script id="javascriptTemplate" type="text/x-kendo-template">\n' +
            '  <ul>\n' +
            '  # for (var i = 0; i < data.length; i++) { #\n' +
            '    <li>#= data[i] #</li>\n' +
            '  # } #\n' +
            '  </ul>\n' +
            '</script>');
        bth('<style>\n' +
            '  body {background-color:lightgrey}\n' +
            '  h1   {color:blue}\n' +
            '</style>');

        reset_options();
        //============================================================
        set_name('inline = ["custom-element"]');

        inline_tags = opts.inline;
        opts.inline = ['custom-element'];
        test_fragment('<div>should <custom-element>not</custom-element>' +
                      ' insert newlines</div>',
                      '<div>should <custom-element>not</custom-element>' +
                      ' insert newlines</div>');
        opts.inline = inline_tags;

        bth('<div><span>content</span></div>');

        // Handlebars tests
        // Without the indent option on, handlebars are treated as content.

        opts.wrap_line_length = 0;
        //...---------1---------2---------3---------4---------5---------6---------7
        //...1234567890123456789012345678901234567890123456789012345678901234567890
        bth('<div>Some text that should not wrap at all.</div>',
            /* expected */
            '<div>Some text that should not wrap at all.</div>');

        // A value of 0 means no max line length, and should not wrap.
        //...---------1---------2---------3---------4---------5---------6---------7---------8---------9--------10--------11--------12--------13--------14--------15--------16--------17--------18--------19--------20--------21--------22--------23--------24--------25--------26--------27--------28--------29
        //...12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890
        bth('<div>Some text that should not wrap at all. Some text that should not wrap at all. Some text that should not wrap at all. Some text that should not wrap at all. Some text that should not wrap at all. Some text that should not wrap at all. Some text that should not wrap at all.</div>',
            /* expected */
            '<div>Some text that should not wrap at all. Some text that should not wrap at all. Some text that should not wrap at all. Some text that should not wrap at all. Some text that should not wrap at all. Some text that should not wrap at all. Some text that should not wrap at all.</div>');

        opts.wrap_line_length = "0";
        //...---------1---------2---------3---------4---------5---------6---------7
        //...1234567890123456789012345678901234567890123456789012345678901234567890
        bth('<div>Some text that should not wrap at all.</div>',
            /* expected */
            '<div>Some text that should not wrap at all.</div>');

        // A value of "0" means no max line length, and should not wrap
        //...---------1---------2---------3---------4---------5---------6---------7---------8---------9--------10--------11--------12--------13--------14--------15--------16--------17--------18--------19--------20--------21--------22--------23--------24--------25--------26--------27--------28--------29
        //...12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890
        bth('<div>Some text that should not wrap at all. Some text that should not wrap at all. Some text that should not wrap at all. Some text that should not wrap at all. Some text that should not wrap at all. Some text that should not wrap at all. Some text that should not wrap at all.</div>',
            /* expected */
            '<div>Some text that should not wrap at all. Some text that should not wrap at all. Some text that should not wrap at all. Some text that should not wrap at all. Some text that should not wrap at all. Some text that should not wrap at all. Some text that should not wrap at all.</div>');

        //BUGBUG: This should wrap before 40 not after.
        opts.wrap_line_length = 40;
        //...---------1---------2---------3---------4---------5---------6---------7
        //...1234567890123456789012345678901234567890123456789012345678901234567890
        bth('<div>Some test text that should wrap_inside_this section here.</div>',
            /* expected */
            '<div>Some test text that should wrap_inside_this\n' +
            '    section here.</div>');

        opts.wrap_line_length = "40";
        //...---------1---------2---------3---------4---------5---------6---------7
        //...1234567890123456789012345678901234567890123456789012345678901234567890
        bth('<div>Some test text that should wrap_inside_this section here.</div>',
            /* expected */
            '<div>Some test text that should wrap_inside_this\n' +
            '    section here.</div>');

        opts.indent_size = 1;
        opts.indent_char = '\t';
        opts.preserve_newlines = false;
        bth('<div>\n\tfoo\n</div>', '<div> foo </div>');

        opts.preserve_newlines = true;
        bth('<div>\n\tfoo\n</div>');



        // test preserve_newlines and max_preserve_newlines
        opts.preserve_newlines = false;
        bth('<div>Should not</div>\n\n\n' +
            '<div>preserve newlines</div>',
            '<div>Should not</div>\n' +
            '<div>preserve newlines</div>');

        opts.preserve_newlines = true;
        opts.max_preserve_newlines  = 0;
        bth('<div>Should</div>\n\n\n' +
            '<div>preserve zero newlines</div>',
            '<div>Should</div>\n' +
            '<div>preserve zero newlines</div>');

        opts.max_preserve_newlines  = 1;
        bth('<div>Should</div>\n\n\n' +
            '<div>preserve one newline</div>',
            '<div>Should</div>\n\n' +
            '<div>preserve one newline</div>');

        opts.max_preserve_newlines  = null;
        bth('<div>Should</div>\n\n\n' +
            '<div>preserve one newline</div>',
            '<div>Should</div>\n\n\n' +
            '<div>preserve one newline</div>');
    }

    beautifier_tests();
    beautifier_unconverted_tests();
}

if (typeof exports !== "undefined") {
    exports.run_html_tests = run_html_tests;
}
