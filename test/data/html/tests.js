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

exports.test_data = {
  default_options: [
    { name: "indent_size", value: "4" },
    { name: "indent_char", value: "' '" },
    { name: "indent_with_tabs", value: "false" },
    { name: "preserve_newlines", value: "true" },
    { name: "jslint_happy", value: "false" },
    { name: "keep_array_indentation", value: "false" },
    { name: "brace_style", value: "'collapse'" },
    { name: "extra_liners", value: "['html', 'head', '/html']" }
  ],
  groups: [{
    name: "Handle inline and block elements differently",
    description: "",
    matrix: [{}],
    tests: [{
      fragment: true,
      input: '<body><h1>Block</h1></body>',
      output: [
        '<body>',
        '    <h1>Block</h1>',
        '</body>'
      ]
    }, {
      fragment: true,
      unchanged: '<body><i>Inline</i></body>'
    }]
  }, {
    name: "End With Newline",
    description: "",
    matrix: [{
        options: [
          { name: "end_with_newline", value: "true" }
        ],
        eof: '\n'
      }, {
        options: [
          { name: "end_with_newline", value: "false" }
        ],
        eof: ''
      }

    ],
    tests: [
      { fragment: true, input: '', output: '{{eof}}' },
      { fragment: true, input: '<div></div>', output: '<div></div>{{eof}}' },
      // { fragment: true, input: '   \n\n<div></div>\n\n\n\n', output: '   <div></div>{{eof}}' },
      { fragment: true, input: '\n', output: '{{eof}}' }
    ]
  }, {
    name: "Custom Extra Liners (empty)",
    description: "",
    matrix: [{
        options: [
          { name: "extra_liners", value: "[]" }
        ]
      }

    ],
    tests: [{
      fragment: true,
      input: '<html><head><meta></head><body><div><p>x</p></div></body></html>',
      output: '<html>\n<head>\n    <meta>\n</head>\n<body>\n    <div>\n        <p>x</p>\n    </div>\n</body>\n</html>'
    }]
  }, {
    name: "Custom Extra Liners (default)",
    description: "",
    matrix: [{
        options: [
          { name: "extra_liners", value: "null" }
        ]
      }

    ],
    tests: [{
      fragment: true,
      input: '<html><head></head><body></body></html>',
      output: '<html>\n\n<head></head>\n\n<body></body>\n\n</html>'
    }]
  }, {
    name: "Custom Extra Liners (p, string)",
    description: "",
    matrix: [{
        options: [
          { name: "extra_liners", value: "'p,/p'" }
        ]
      }

    ],
    tests: [{
      fragment: true,
      input: '<html><head><meta></head><body><div><p>x</p></div></body></html>',
      output: '<html>\n<head>\n    <meta>\n</head>\n<body>\n    <div>\n\n        <p>x\n\n        </p>\n    </div>\n</body>\n</html>'
    }]
  }, {
    name: "Custom Extra Liners (p)",
    description: "",
    matrix: [{
        options: [
          { name: "extra_liners", value: "['p', '/p']" }
        ]
      }

    ],
    tests: [{
      fragment: true,
      input: '<html><head><meta></head><body><div><p>x</p></div></body></html>',
      output: '<html>\n<head>\n    <meta>\n</head>\n<body>\n    <div>\n\n        <p>x\n\n        </p>\n    </div>\n</body>\n</html>'
    }]
  }, {
    name: "Tests for script and style types (issue 453, 821)",
    description: "Only format recognized script types",
    tests: [{
        unchanged: '<script type="text/unknown"><div></div></script>'
      }, {
        unchanged: '<script type="text/unknown">Blah Blah Blah</script>'
      }, {
        input: '<script type="text/unknown">    Blah Blah Blah   </script>',
        output: '<script type="text/unknown"> Blah Blah Blah   </script>'
      }, {
        input: '<script type="text/javascript"><div></div></script>',
        output: [
          '<script type="text/javascript">',
          '    < div > < /div>',
          '</script>'
        ]
      }, {
        input: '<script><div></div></script>',
        output: [
          '<script>',
          '    < div > < /div>',
          '</script>'
        ]
      }, {
        input: '<script>var foo = "bar";</script>',
        output: [
          '<script>',
          '    var foo = "bar";',
          '</script>'
        ]
      }, {
        input: '<script type="text/javascript">var foo = "bar";</script>',
        output: [
          '<script type="text/javascript">',
          '    var foo = "bar";',
          '</script>'
        ]
      }, {
        input: '<script type="application/javascript">var foo = "bar";</script>',
        output: [
          '<script type="application/javascript">',
          '    var foo = "bar";',
          '</script>'
        ]
      }, {
        input: '<script type="application/javascript;version=1.8">var foo = "bar";</script>',
        output: [
          '<script type="application/javascript;version=1.8">',
          '    var foo = "bar";',
          '</script>'
        ]
      }, {
        input: '<script type="application/x-javascript">var foo = "bar";</script>',
        output: [
          '<script type="application/x-javascript">',
          '    var foo = "bar";',
          '</script>'
        ]
      }, {
        input: '<script type="application/ecmascript">var foo = "bar";</script>',
        output: [
          '<script type="application/ecmascript">',
          '    var foo = "bar";',
          '</script>'
        ]
      }, {
        input: '<script type="dojo/aspect">this.domNode.style.display="none";</script>',
        output: [
          '<script type="dojo/aspect">',
          '    this.domNode.style.display = "none";',
          '</script>'
        ]
      }, {
        input: '<script type="dojo/method">this.domNode.style.display="none";</script>',
        output: [
          '<script type="dojo/method">',
          '    this.domNode.style.display = "none";',
          '</script>'
        ]
      }, {
        input: '<script type="text/javascript1.5">var foo = "bar";</script>',
        output: [
          '<script type="text/javascript1.5">',
          '    var foo = "bar";',
          '</script>'
        ]
      }, {
        input: '<script type="application/json">{"foo":"bar"}</script>',
        output: [
          '<script type="application/json">',
          '    {',
          '        "foo": "bar"',
          '    }',
          '</script>'
        ]
      }, {
        input: '<script type="application/ld+json">{"foo":"bar"}</script>',
        output: [
          '<script type="application/ld+json">',
          '    {',
          '        "foo": "bar"',
          '    }',
          '</script>'
        ]
      }, {
        unchanged: '<style type="text/unknown"><tag></tag></style>'
      }, {
        input: '<style type="text/css"><tag></tag></style>',
        output: [
          '<style type="text/css">',
          '    <tag></tag>',
          '</style>'
        ]
      }, {
        input: '<style><tag></tag></style>',
        output: [
          '<style>',
          '    <tag></tag>',
          '</style>'
        ]
      }, {
        input: '<style>.selector {font-size:12px;}</style>',
        output: [
          '<style>',
          '    .selector {',
          '        font-size: 12px;',
          '    }',
          '</style>'
        ]
      }, {
        input: '<style type="text/css">.selector {font-size:12px;}</style>',
        output: [
          '<style type="text/css">',
          '    .selector {',
          '        font-size: 12px;',
          '    }',
          '</style>'
        ]
      }

    ]
  }, {
    name: "Attribute Wrap alignment with spaces",
    description: "Ensure attributes are internally aligned with spaces when the indent_character is set to tab",
    matrix: [{
      options: [
        { name: "wrap_attributes", value: "'force-aligned'" },
        { name: "indent_with_tabs", value: "true" }
      ]
    }],
    tests: [{
      fragment: true,
      input: '<div><div a="1" b="2"><div>test</div></div></div>',
      output: '<div>\n\t<div a="1"\n\t     b="2">\n\t\t<div>test</div>\n\t</div>\n</div>'
    }]
  }, {
    name: "Attribute Wrap de-indent",
    description: "Tags de-indent when attributes are wrapped",
    matrix: [{
      options: [
        { name: "wrap_attributes", value: "'force-aligned'" },
        { name: "indent_with_tabs", value: "false" }
      ]
    }],
    tests: [{
        fragment: true,
        input: '<div a="1" b="2"><div>test</div></div>',
        output: '<div a="1"\n     b="2">\n    <div>test</div>\n</div>'
      },
      {
        fragment: true,
        input: '<p>\n    <a href="/test/" target="_blank"><img src="test.jpg" /></a><a href="/test/" target="_blank"><img src="test.jpg" /></a>\n</p>',
        output: '<p>\n    <a href="/test/"\n       target="_blank"><img src="test.jpg" /></a><a href="/test/"\n       target="_blank"><img src="test.jpg" /></a>\n</p>'
      },
      {
        fragment: true,
        input: '<p>\n    <span data-not-a-href="/test/" data-totally-not-a-target="_blank"><img src="test.jpg" /></span><span data-not-a-href="/test/" data-totally-not-a-target="_blank"><img src="test.jpg" /></span>\n</p>',
        output: '<p>\n    <span data-not-a-href="/test/"\n          data-totally-not-a-target="_blank"><img src="test.jpg" /></span><span data-not-a-href="/test/"\n          data-totally-not-a-target="_blank"><img src="test.jpg" /></span>\n</p>'
      }
    ]
  }, {
    name: "Attribute Wrap",
    description: "Wraps attributes inside of html tags",
    matrix: [{
      options: [
        { name: "wrap_attributes", value: "'force'" }
      ],
      indent_attr: '\n    ',
      indent_attr_first: ' ',
      indent_end: '',
      indent_end_selfclosing: ' ',
      indent_content80_selfclosing: ' ',
      indent_content80: ' ',
      indent_over80: '\n    '
    }, {
      options: [
        { name: "wrap_attributes", value: "'force'" },
        { name: "wrap_line_length", value: "80" }
      ],
      indent_attr: '\n    ',
      indent_attr_first: ' ',
      indent_end: '',
      indent_end_selfclosing: ' ',
      indent_content80_selfclosing: ' ',
      indent_content80: '\n    ',
      indent_over80: '\n    '
    }, {
      options: [
        { name: "wrap_attributes", value: "'force'" },
        { name: "wrap_attributes_indent_size", value: "8" }
      ],
      indent_attr: '\n        ',
      indent_attr_first: ' ',
      indent_end: '',
      indent_end_selfclosing: ' ',
      indent_content80_selfclosing: ' ',
      indent_content80: ' ',
      indent_over80: '\n        '
    }, {
      options: [
        { name: "wrap_attributes", value: "'auto'" },
        { name: "wrap_line_length", value: "80" },
        { name: "wrap_attributes_indent_size", value: "0" }
      ],
      indent_attr: ' ',
      indent_attr_first: ' ',
      indent_end: '',
      indent_end_selfclosing: ' ',
      indent_content80_selfclosing: '\n    ',
      indent_content80: '\n    ',
      indent_over80: '\n'
    }, {
      options: [
        { name: "wrap_attributes", value: "'auto'" },
        { name: "wrap_line_length", value: "80" },
        { name: "wrap_attributes_indent_size", value: "4" }
      ],
      indent_attr: ' ',
      indent_attr_first: ' ',
      indent_end: '',
      indent_end_selfclosing: ' ',
      indent_content80_selfclosing: '\n    ',
      indent_content80: '\n    ',
      indent_over80: '\n    '
    }, {
      options: [
        { name: "wrap_attributes", value: "'auto'" },
        { name: "wrap_line_length", value: "0" }
      ],
      indent_attr: ' ',
      indent_attr_first: ' ',
      indent_end: '',
      indent_end_selfclosing: ' ',
      indent_content80_selfclosing: ' ',
      indent_content80: ' ',
      indent_over80: ' '
    }, {
      options: [
        { name: "wrap_attributes", value: "'force-aligned'" }
      ],
      indent_attr: '\n     ',
      indent_attr_faligned: ' ',
      indent_attr_first: ' ',
      indent_end: '',
      indent_end_selfclosing: ' ',
      indent_content80_selfclosing: ' ',
      indent_content80: ' ',
      indent_over80: '\n     '
    }, {
      options: [
        { name: "wrap_attributes", value: "'force-aligned'" },
        { name: "wrap_line_length", value: "80" }
      ],
      indent_attr: '\n     ',
      indent_attr_faligned: ' ',
      indent_attr_first: ' ',
      indent_end: '',
      indent_end_selfclosing: ' ',
      indent_content80_selfclosing: ' ',
      indent_content80: '\n    ',
      indent_over80: '\n     '
    }, {
      options: [
        { name: "wrap_attributes", value: "'aligned-multiple'" },
        { name: "wrap_line_length", value: "80" }
      ],
      indent_attr: ' ',
      indent_attr_first: ' ',
      indent_end: '',
      indent_attr_aligned: ' ',
      indent_end_selfclosing: ' ',
      indent_content80_selfclosing: '\n    ',
      indent_content80: '\n    ',
      indent_over80: '\n     '
    }, {
      options: [
        { name: "wrap_attributes", value: "'aligned-multiple'" }
      ],
      indent_attr: ' ',
      indent_attr_first: ' ',
      indent_end: '',
      indent_end_selfclosing: ' ',
      indent_content80_selfclosing: ' ',
      indent_content80: ' ',
      indent_over80: ' '
    }, {
      options: [
        { name: "wrap_attributes", value: "'force-aligned'" },
        { name: "wrap_attributes_indent_size", value: "8" }
      ],
      indent_attr: '\n     ',
      indent_attr_faligned: ' ',
      indent_attr_first: ' ',
      indent_end: '',
      indent_end_selfclosing: ' ',
      indent_content80_selfclosing: ' ',
      indent_content80: ' ',
      indent_over80: '\n     '
    }, {
      options: [
        { name: "wrap_attributes", value: "'force-expand-multiline'" },
        { name: "wrap_attributes_indent_size", value: "4" }
      ],
      indent_attr: '\n    ',
      indent_attr_first: '\n    ',
      indent_end: '\n',
      indent_end_selfclosing: '\n',
      indent_content80_selfclosing: ' ',
      indent_content80: ' ',
      indent_over80: '\n    '
    }, {
      options: [
        { name: "wrap_attributes", value: "'force-expand-multiline'" },
        { name: "wrap_attributes_indent_size", value: "4" },
        { name: "wrap_line_length", value: "80" }
      ],
      indent_attr: '\n    ',
      indent_attr_first: '\n    ',
      indent_end: '\n',
      indent_end_selfclosing: '\n',
      indent_content80_selfclosing: ' ',
      indent_content80: '\n    ',
      indent_over80: '\n    '
    }, {
      options: [
        { name: "wrap_attributes", value: "'force-expand-multiline'" },
        { name: "wrap_attributes_indent_size", value: "8" }
      ],
      indent_attr: '\n        ',
      indent_attr_first: '\n        ',
      indent_end: '\n',
      indent_end_selfclosing: '\n',
      indent_content80_selfclosing: ' ',
      indent_content80: ' ',
      indent_over80: '\n        '
    }],
    tests: [{
      fragment: true,
      input: '<div  >This is some text</div>',
      output: '<div>This is some text</div>'
    }, {
      fragment: true,
      input: '<span>0 0001 0002 0003 0004 0005 0006 0007 0008 0009 0010 0011 0012 0013 0014 0015 0016 0017 0018 0019 0020</span>',
      output: '<span>0 0001 0002 0003 0004 0005 0006 0007 0008 0009 0010 0011 0012 0013 0014{{indent_content80}}0015 0016 0017 0018 0019 0020</span>'
    }, {
      fragment: true,
      comment: 'Issue 1222 -- P tags are formatting correctly',
      input: '<p>Our forms for collecting address-related information follow a standard design. Specific input elements will vary according to the form’s audience and purpose.</p>',
      output: '<p>Our forms for collecting address-related information follow a standard{{indent_content80}}design. Specific input elements will vary according to the form’s audience{{indent_content80}}and purpose.</p>'
    }, {
      fragment: true,
      input: '<div attr="123"  >This is some text</div>',
      output: '<div attr="123">This is some text</div>'
    }, {
      fragment: true,
      input: '<div attr0 attr1="123" data-attr2="hello    t here">This is some text</div>',
      output: '<div{{indent_attr_first}}attr0{{indent_attr}}attr1="123"{{indent_attr}}data-attr2="hello    t here"{{indent_end}}>This is some text</div>'
    }, {
      fragment: true,
      input: '<div lookatthissuperduperlongattributenamewhoahcrazy0="true" attr0 attr1="123" data-attr2="hello    t here" heymanimreallylongtoowhocomesupwiththesenames="false">This is some text</div>',
      output: '<div{{indent_attr_first}}lookatthissuperduperlongattributenamewhoahcrazy0="true"{{indent_attr}}attr0{{indent_attr}}attr1="123"{{indent_over80}}data-attr2="hello    t here"{{indent_attr}}heymanimreallylongtoowhocomesupwiththesenames="false"{{indent_end}}>This{{indent_content80_selfclosing}}is some text</div>'
    }, {
      fragment: true,
      input: '<img attr0 attr1="123" data-attr2="hello    t here"/>',
      output: '<img{{indent_attr_first}}attr0{{indent_attr}}attr1="123"{{indent_attr}}data-attr2="hello    t here"{{indent_end_selfclosing}}/>'
    }, {
      fragment: true,
      input: '<?xml version="1.0" encoding="UTF-8" ?><root attr1="foo" attr2="bar"/>',
      output: '<?xml version="1.0" encoding="UTF-8" ?>\n<root{{indent_attr_first}}attr1="foo"{{indent_attr}}{{indent_attr_faligned}}attr2="bar"{{indent_end_selfclosing}}/>'
    }, {
      fragment: true,
      input: '<link href="//fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,400,600,700,300&amp;subset=latin" rel="stylesheet" type="text/css">',
      output: '<link{{indent_attr_first}}href="//fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,400,600,700,300&amp;subset=latin"{{indent_over80}}{{indent_attr_faligned}}{{indent_attr_aligned}}rel="stylesheet"{{indent_attr}}{{indent_attr_faligned}}type="text/css"{{indent_end}}>'
    }]
  }, {
    name: "Handlebars Indenting Off",
    description: "Test handlebar behavior when indenting is off",
    template: "^^^ $$$",
    options: [
      { name: "indent_handlebars", value: "false" }
    ],
    tests: [{
        fragment: true,
        input_: '{{#if 0}}\n' +
          '    <div>\n' +
          '    </div>\n' +
          '{{/if}}',
        output: '{{#if 0}}\n' +
          '<div>\n' +
          '</div>\n' +
          '{{/if}}'
      }, {
        fragment: true,
        input_: '<div>\n' +
          '{{#each thing}}\n' +
          '    {{name}}\n' +
          '{{/each}}\n' +
          '</div>',
        output: '<div>\n' +
          '    {{#each thing}}\n' +
          '    {{name}}\n' +
          '    {{/each}}\n' +
          '</div>'
      },
      {
        input_: [
          '{{em-input label="Some Labe" property="amt" type="text" placeholder=""}}',
          '   {{em-input label="Type*" property="type" type="text" placeholder="(LTD)"}}',
          '       {{em-input label="Place*" property="place" type="text" placeholder=""}}'
        ],
        output: [
          '{{em-input label="Some Labe" property="amt" type="text" placeholder=""}}',
          '{{em-input label="Type*" property="type" type="text" placeholder="(LTD)"}}',
          '{{em-input label="Place*" property="place" type="text" placeholder=""}}'
        ]
      },
      {
        input_: [
          '{{#if callOn}}',
          '{{#unless callOn}}',
          '      {{translate "onText"}}',
          '   {{else}}',
          '{{translate "offText"}}',
          '{{/unless callOn}}',
          '   {{else if (eq callOn false)}}',
          '{{translate "offText"}}',
          '        {{/if}}'
        ],
        output: [
          '{{#if callOn}}',
          '{{#unless callOn}}',
          '{{translate "onText"}}',
          '{{else}}',
          '{{translate "offText"}}',
          '{{/unless callOn}}',
          '{{else if (eq callOn false)}}',
          '{{translate "offText"}}',
          '{{/if}}'
        ]
      }
    ]
  }, {
    name: "Handlebars Indenting On",
    description: "Test handlebar formatting",
    template: "^^^ $$$",
    matrix: [{
      options: [
        { name: "indent_handlebars", value: "true" }
      ],
      content: '{{field}}',
      indent_over80: ' '
    }, {
      options: [
        { name: "indent_handlebars", value: "true" }
      ],
      content: '{{em-input label="Some Labe" property="amt" type="text" placeholder=""}}',
      indent_over80: ' '
    }, {
      options: [
        { name: "indent_handlebars", value: "true" }
      ],
      content: '{{! comment}}',
      indent_over80: ' '
    }, {
      options: [
        { name: "indent_handlebars", value: "true" }
      ],
      content: '{{!-- comment--}}',
      indent_over80: ' '
    }, {
      options: [
        { name: "indent_handlebars", value: "true" }
      ],
      content: '{{Hello "woRld"}} {{!-- comment--}} {{heLloWorlD}}',
      indent_over80: ' '
    }, {
      options: [
        { name: "indent_handlebars", value: "true" }
      ],
      content: '{pre{{field1}} {{field2}} {{field3}}post',
      indent_over80: ' '
    }, {
      options: [
        { name: "indent_handlebars", value: "true" }
      ],
      content: '{{! \n mult-line\ncomment  \n     with spacing\n}}',
      indent_over80: ' '
    }, {
      options: [
        { name: "indent_handlebars", value: "true" }
      ],
      content: '{{!-- \n mult-line\ncomment  \n     with spacing\n--}}',
      indent_over80: ' '
    }, {
      options: [
        { name: "indent_handlebars", value: "true" }
      ],
      content: '{{!-- \n mult-line\ncomment \n{{#> component}}\n mult-line\ncomment  \n     with spacing\n {{/ component}}--}}',
      indent_over80: ' '
    }, {
      options: [
        { name: "indent_handlebars", value: "true" },
        { name: "wrap_line_length", value: "80" }
      ],
      content: 'content',
      indent_over80: '\n    '
    }],
    tests: [
      { unchanged: '{{page-title}}' },
      {
        unchanged: [
          '{{page-title}}',
          '{{a}}',
          '{{value-title}}'
        ]
      },
      {
        unchanged: [
          '{{textarea value=someContent}}',
          '',
          '^^^&content$$$',
          '{{#if condition}}',
          '    <div class="some-class">{{helper "hello"}}<strong>{{helper "world"}}</strong></div>',
          '{{/if}}',
          '^^^&content$$$'
        ]
      },
      {
        comment: "error case",
        unchanged: [
          '{{page-title}}',
          '{{ myHelper someValue}}',
          '^^^&content$$$',
          '{{value-title}}'
        ]
      },
      {
        unchanged: [
          '{{em-input label="Some Labe" property="amt" type="text" placeholder=""}}',
          '^^^&content$$$',
          '{{em-input label="Type*" property="type" type="text" placeholder="(LTD)"}}',
          '{{em-input label="Place*" property="place" type="text" placeholder=""}}'
        ]
      },
      { unchanged: '{{#if 0}}{{/if}}' },
      { fragment: true, unchanged: '{{#if 0}}^^^&content$$${{/if}}' },
      { fragment: true, unchanged: '{{#if 0}}\n{{/if}}' }, {
        fragment: true,
        input_: '{{#if     words}}{{/if}}',
        output: '{{#if words}}{{/if}}'
      }, {
        fragment: true,
        input_: '{{#if     words}}^^^&content$$${{/if}}',
        output: '{{#if words}}^^^&content$$${{/if}}'
      }, {
        fragment: true,
        input_: '{{#if     words}}^^^&content$$${{/if}}',
        output: '{{#if words}}^^^&content$$${{/if}}'
      }, {
        fragment: true,
        unchanged: '{{#if 1}}\n' +
          '    <div>\n' +
          '    </div>\n' +
          '{{/if}}'
      }, {
        fragment: true,
        input_: '{{#if 1}}\n' +
          '<div>\n' +
          '</div>\n' +
          '{{/if}}',
        output: '{{#if 1}}\n' +
          '    <div>\n' +
          '    </div>\n' +
          '{{/if}}'
      }, {
        fragment: true,
        unchanged: '<div>\n' +
          '    {{#if 1}}\n' +
          '    {{/if}}\n' +
          '</div>'
      }, {
        fragment: true,
        input_: '<div>\n' +
          '{{#if 1}}\n' +
          '{{/if}}\n' +
          '</div>',
        output: '<div>\n' +
          '    {{#if 1}}\n' +
          '    {{/if}}\n' +
          '</div>'
      }, {
        fragment: true,
        input_: '{{#if}}\n' +
          '{{#each}}\n' +
          '{{#if}}\n' +
          '^^^&content$$$\n' +
          '{{/if}}\n' +
          '{{#if}}\n' +
          '^^^&content$$$\n' +
          '{{/if}}\n' +
          '{{/each}}\n' +
          '{{/if}}',
        output: '{{#if}}\n' +
          '    {{#each}}\n' +
          '        {{#if}}\n' +
          '            ^^^&content$$$\n' +
          '        {{/if}}\n' +
          '        {{#if}}\n' +
          '            ^^^&content$$$\n' +
          '        {{/if}}\n' +
          '    {{/each}}\n' +
          '{{/if}}'
      }, {
        fragment: true,
        unchanged: '{{#if 1}}\n' +
          '    <div>\n' +
          '    </div>\n' +
          '{{/if}}'
      },

      // Issue #576 -- Indent Formatting with Handlebars
      {
        fragment: true,
        input_: ['<div>',
          '    <small>SMALL TEXT</small>',
          '    <span>',
          '        {{#if isOwner}}',
          '    <span><i class="fa fa-close"></i></span>',
          '        {{else}}',
          '            <span><i class="fa fa-bolt"></i></span>',
          '        {{/if}}',
          '    </span>',
          '    <strong>{{userName}}:&nbsp;</strong>{{text}}',
          '</div>'
        ],
        output: ['<div>',
          '    <small>SMALL TEXT</small>',
          '    <span>',
          '        {{#if isOwner}}',
          '            <span><i class="fa fa-close"></i></span>',
          '        {{else}}',
          '            <span><i class="fa fa-bolt"></i></span>',
          '        {{/if}}',
          '    </span>',
          '    <strong>{{userName}}:&nbsp;</strong>{{text}}',
          '</div>'
        ]
      }, {
        fragment: true,
        unchanged: ['<div>',
          '    <small>SMALL TEXT</small>',
          '    <span>',
          '        {{#if isOwner}}',
          '            <span><i class="fa fa-close"></i></span>',
          '        {{else}}',
          '            <span><i class="fa fa-bolt"></i></span>',
          '        {{/if}}',
          '    </span>',
          '    <strong>{{userName}}:&nbsp;</strong>{{text}}',
          '</div>'
        ]
      },

      // Test {{else}} aligned with {{#if}} and {{/if}}
      {
        fragment: true,
        input_: '{{#if 1}}\n' +
          '    ^^^&content$$$\n' +
          '    {{else}}\n' +
          '    ^^^&content$$$\n' +
          '{{/if}}',
        output: '{{#if 1}}\n' +
          '    ^^^&content$$$\n' +
          '{{else}}\n' +
          '    ^^^&content$$$\n' +
          '{{/if}}'
      }, {
        fragment: true,
        input_: '{{#if 1}}\n' +
          '    {{else}}\n' +
          '    {{/if}}',
        output: '{{#if 1}}\n' +
          '{{else}}\n' +
          '{{/if}}'
      }, {
        fragment: true,
        input_: '{{#if thing}}\n' +
          '{{#if otherthing}}\n' +
          '    ^^^&content$$$\n' +
          '    {{else}}\n' +
          '^^^&content$$$\n' +
          '    {{/if}}\n' +
          '       {{else}}\n' +
          '^^^&content$$$\n' +
          '{{/if}}',
        output: '{{#if thing}}\n' +
          '    {{#if otherthing}}\n' +
          '        ^^^&content$$$\n' +
          '    {{else}}\n' +
          '        ^^^&content$$$\n' +
          '    {{/if}}\n' +
          '{{else}}\n' +
          '    ^^^&content$$$\n' +
          '{{/if}}'
      },
      {
        comment: 'ISSUE #800 and #1123: else if and #unless',
        input_: [
          '{{#if callOn}}',
          '{{#unless callOn}}',
          '      ^^^&content$$$',
          '   {{else}}',
          '{{translate "offText"}}',
          '{{/unless callOn}}',
          '   {{else if (eq callOn false)}}',
          '^^^&content$$$',
          '        {{/if}}'
        ],
        output: [
          '{{#if callOn}}',
          '    {{#unless callOn}}',
          '        ^^^&content$$$',
          '    {{else}}',
          '        {{translate "offText"}}',
          '    {{/unless callOn}}',
          '{{else if (eq callOn false)}}',
          '    ^^^&content$$$',
          '{{/if}}'
        ]
      },
      // Test {{}} inside of <> tags, which should be separated by spaces
      // for readability, unless they are inside a string.
      {
        fragment: true,
        input_: '<div{{someStyle}}></div>',
        output: '<div {{someStyle}}></div>'
      }, {
        fragment: true,
        input_: '<dIv{{#if test}}class="foo"{{/if}}>^^^&content$$$</dIv>',
        output: '<dIv {{#if test}} class="foo" {{/if}}>^^^&content$$$</dIv>'
      }, {
        fragment: true,
        input_: '<diV{{#if thing}}{{somestyle}}class="{{class}}"{{else}}class="{{class2}}"{{/if}}>^^^&content$$$</diV>',
        output: '<diV {{#if thing}} {{somestyle}} class="{{class}}" {{else}} class="{{class2}}"^^^&indent_over80$$${{/if}}>^^^&content$$$</diV>'
      }, {
        fragment: true,
        input_: '<span{{#if condition}}class="foo"{{/if}}>^^^&content$$$</span>',
        output: '<span {{#if condition}} class="foo" {{/if}}>^^^&content$$$</span>'
      }, {
        fragment: true,
        unchanged: '<div unformatted="{{#if}}^^^&content$$${{/if}}">^^^&content$$$</div>'
      }, {
        fragment: true,
        unchanged: '<div unformatted="{{#if  }}    ^^^&content$$${{/if}}">^^^&content$$$</div>'
      },

      // Quotes found inside of Handlebars expressions inside of quoted
      // strings themselves should not be considered string delimiters.
      {
        fragment: true,
        unchanged: '<div class="{{#if thingIs "value"}}^^^&content$$${{/if}}"></div>'
      }, {
        fragment: true,
        unchanged: '<div class="{{#if thingIs \\\'value\\\'}}^^^&content$$${{/if}}"></div>'
      }, {
        fragment: true,
        unchanged: '<div class=\\\'{{#if thingIs "value"}}^^^&content$$${{/if}}\\\'></div>'
      }, {
        fragment: true,
        unchanged: '<div class=\\\'{{#if thingIs \\\'value\\\'}}^^^&content$$${{/if}}\\\'></div>'
      }, {
        fragment: true,
        unchanged: '<span>{{condition < 0 ? "result1" : "result2"}}</span>'
      }, {
        fragment: true,
        unchanged: '<span>{{condition1 && condition2 && condition3 && condition4 < 0 ? "resForTrue" : "resForFalse"}}</span>'
      }
    ]
  }, {
    name: "Handlebars Else tag indenting",
    description: "Handlebar Else tags should be newlined after formatted tags",
    template: "^^^ $$$",
    options: [
      { name: "indent_handlebars", value: "true" }
    ],
    tests: [{
        input_: '{{#if test}}<div></div>{{else}}<div></div>{{/if}}',
        output: '{{#if test}}\n' +
          '    <div></div>\n' +
          '{{else}}\n' +
          '    <div></div>\n' +
          '{{/if}}'
      }, {
        unchanged: '{{#if test}}<span></span>{{else}}<span></span>{{/if}}'
      },
      // Else if handling
      {
        input: ['<a class="navbar-brand">',
          '    {{#if connected}}',
          '        <i class="fa fa-link" style="color:green"></i> {{else if sleep}}',
          '        <i class="fa fa-sleep" style="color:yellow"></i>',
          '    {{else}}',
          '        <i class="fa fa-unlink" style="color:red"></i>',
          '    {{/if}}',
          '</a>'
        ],
        output: ['<a class="navbar-brand">',
          '    {{#if connected}}',
          '        <i class="fa fa-link" style="color:green"></i>',
          '    {{else if sleep}}',
          '        <i class="fa fa-sleep" style="color:yellow"></i>',
          '    {{else}}',
          '        <i class="fa fa-unlink" style="color:red"></i>',
          '    {{/if}}',
          '</a>'
        ]
      }
    ]
  }, {
    name: "Unclosed html elements",
    description: "Unclosed elements should not indent",
    options: [],
    tests: [
      { unchanged: '<source>\n<source>' },
      { unchanged: '<br>\n<br>' },
      { unchanged: '<input>\n<input>' },
      { unchanged: '<meta>\n<meta>' },
      { unchanged: '<link>\n<link>' },
      { unchanged: '<colgroup>\n    <col>\n    <col>\n</colgroup>' }
    ]
  }, {
    name: "Unformatted tags",
    description: "Unformatted tag behavior",
    options: [],
    tests: [{
        fragment: true,
        input: '<ol>\n    <li>b<pre>c</pre></li>\n</ol>',
        output: [
          '<ol>',
          '    <li>b',
          '        <pre>c</pre>',
          '    </li>',
          '</ol>'
        ]
      },
      { fragment: true, unchanged: '<ol>\n    <li>b<code>c</code></li>\n</ol>' },
      { fragment: true, unchanged: '<ul>\n    <li>\n        <span class="octicon octicon-person"></span>\n        <a href="/contact/">Kontakt</a>\n    </li>\n</ul>' },
      { fragment: true, unchanged: '<div class="searchform"><input type="text" value="" name="s" id="s" /><input type="submit" id="searchsubmit" value="Search" /></div>' },
      { fragment: true, unchanged: '<div class="searchform"><input type="text" value="" name="s" id="s"><input type="submit" id="searchsubmit" value="Search"></div>' },
      { fragment: true, unchanged: '<p>\n    <a href="/test/"><img src="test.jpg" /></a>\n</p>' },
      { fragment: true, unchanged: '<p>\n    <a href="/test/"><img src="test.jpg" /></a><a href="/test/"><img src="test.jpg" /></a>\n</p>' },
      { fragment: true, unchanged: '<p>\n    <a href="/test/"><img src="test.jpg" /></a><a href="/test/"><img src="test.jpg" /></a><a href="/test/"><img src="test.jpg" /></a><a href="/test/"><img src="test.jpg" /></a>\n</p>' },
      { fragment: true, unchanged: '<p>\n    <span>image: <img src="test.jpg" /></span><span>image: <img src="test.jpg" /></span>\n</p>' },
      { fragment: true, unchanged: '<p>\n    <strong>image: <img src="test.jpg" /></strong><strong>image: <img src="test.jpg" /></strong>\n</p>' }
    ]
  }, {
    name: "File starting with comment",
    description: "Unformatted tag behavior",
    options: [],
    tests: [{
      unchanged: [
        '<!--sample comment -->',
        '',
        '<html>',
        '<body>',
        '    <span>a span</span>',
        '</body>',
        '',
        '</html>'
      ]
    }]
  }, {
    name: "ISSUE #545 and #944 Ignore directive works in html",
    description: "",
    options: [],
    tests: [{
      unchanged: [
        '<!-- beautify ignore:start -->',
        '@{',
        '',
        '    ViewBag.Title = "Dashboard";',
        '    string firstName = string.Empty;',
        '    string userId = ViewBag.UserId;',
        '',
        '    if( !string.IsNullOrEmpty(ViewBag.FirstName ) ) {',
        '',
        '         firstName = "<h2>Hi " + ViewBag.FirstName + "</h2>";',
        '',
        '    }',
        '',
        '}',
        '<!-- beautify ignore:end -->',
        '',
        '<header class="layout-header">',
        '',
        '    <h2 id="logo"><a href="/">Logo</a></h2>',
        '',
        '    <ul class="social">',
        '',
        '        <li class="facebook"><a href="#">Facebook</a></li>',
        '        <li class="twitter"><a href="#">Twitter</a></li>',
        '',
        '    </ul>',
        '',
        '</header>'
      ]
    }]
  }, {
    name: "Issue 1478 - Space handling inside self closing tag",
    description: "Properly indent following text after self closing tags regardless of space",
    options: [],
    tests: [{
      input: [
        '<div>',
        '    <br/>',
        '    <br />',
        '</div>'
      ],
      output: [
        '<div>',
        '    <br />',
        '    <br />',
        '</div>'
      ]
    }]
  }, {
    name: "Single line comment after closing tag",
    description: "Keep single line comments as they are after closing tags",
    options: [],
    tests: [{
      input: [
        '<div class="col">',
        '    <div class="row">',
        '        <div class="card">',
        '',
        '            <h1>Some heading</h1>',
        '            <p>Some text for the card.</p>',
        '            <img src="some/image.jpg" alt="">',
        '',
        '            </div>    <!-- /.card -->',
        '    </div>',
        '            <!-- /.row -->',
        '</div> <!-- /.col -->'
      ],
      output: [
        '<div class="col">',
        '    <div class="row">',
        '        <div class="card">',
        '',
        '            <h1>Some heading</h1>',
        '            <p>Some text for the card.</p>',
        '            <img src="some/image.jpg" alt="">',
        '',
        '        </div> <!-- /.card -->',
        '    </div>',
        '    <!-- /.row -->',
        '</div> <!-- /.col -->'
      ]
    }]
  }, {
    name: "Regression Tests",
    description: "Regression Tests",
    options: [],
    tests: [{
        comment: '#1202',
        fragment: true,
        unchanged: '<a class="js-open-move-from-header" href="#">5A - IN-SPRINT TESTING</a>'
      },
      { fragment: true, unchanged: '<a ">9</a">' },
      { fragment: true, unchanged: '<a href="javascript:;" id="_h_url_paid_pro3" onmousedown="_h_url_click_paid_pro(this);" rel="nofollow" class="pro-title" itemprop="name">WA GlassKote</a>' },
      { fragment: true, unchanged: '<a href="/b/yergey-brewing-a-beer-has-no-name/1745600">"A Beer Has No Name"</a>' },
      {
        comment: '#1304',
        unchanged: '<label>Every</label><input class="scheduler__minutes-input" type="text">'
      }
    ]
  }, {
    name: "Php formatting",
    description: "Php (<?php ... ?> and <?= ... ?>) treated as comments.",
    options: [],
    tests: [{
      input: '<h1 class="content-page-header"><?=$view["name"]; ?></h1>',
      output: '<h1 class="content-page-header">\n    <?=$view["name"]; ?>\n</h1>'
    }, {
      unchanged: [
        '<?php',
        'for($i = 1; $i <= 100; $i++;) {',
        '    #count to 100!',
        '    echo($i . "</br>");',
        '}',
        '?>'
      ]
    }, {
      fragment: true,
      unchanged: [
        '<?php ?>',
        '<!DOCTYPE html>',
        '',
        '<html>',
        '',
        '<head></head>',
        '',
        '<body></body>',
        '',
        '</html>'
      ]
    }, {
      unchanged: [
        '<?= "A" ?>',
        '<?= "B" ?>',
        '<?= "C" ?>'
      ]
    }, {
      unchanged: [
        '<?php',
        'echo "A";',
        '?>',
        '<span>Test</span>'
      ]
    }]
  }, {
    name: "Support simple language specific option inheritance/overriding",
    description: "Support simple language specific option inheritance/overriding",
    matrix: [{
        options: [
          { name: "js", value: "{ 'indent_size': 3 }" },
          { name: "css", value: "{ 'indent_size': 5 }" }
        ],
        h: '    ',
        c: '     ',
        j: '   '
      },
      {
        options: [
          { name: "html", value: "{ 'js': { 'indent_size': 3 }, 'css': { 'indent_size': 5 } }" }
        ],
        h: '    ',
        c: '     ',
        j: '   '
      },
      {
        options: [
          { name: "indent_size", value: "9" },
          { name: "html", value: "{ 'js': { 'indent_size': 3 }, 'css': { 'indent_size': 5 }, 'indent_size': 2}" },
          { name: "js", value: "{ 'indent_size': 5 }" },
          { name: "css", value: "{ 'indent_size': 3 }" }
        ],
        h: '  ',
        c: '     ',
        j: '   '
      }
    ],
    tests: [{
      fragment: true,
      unchanged: [
        '<head>',
        '{{h}}<script>',
        '{{h}}{{h}}if (a == b) {',
        '{{h}}{{h}}{{j}}test();',
        '{{h}}{{h}}}',
        '{{h}}</script>',
        '{{h}}<style>',
        '{{h}}{{h}}.selector {',
        '{{h}}{{h}}{{c}}font-size: 12px;',
        '{{h}}{{h}}}',
        '{{h}}</style>',
        '</head>'
      ]
    }]
  }, {
    name: "underscore.js  formatting",
    description: "underscore.js templates (<% ... %>) treated as comments.",
    options: [],
    tests: [{
      unchanged: [
        '<div class="col-sm-9">',
        '    <textarea id="notes" class="form-control" rows="3">',
        '        <%= notes %>',
        '    </textarea>',
        '</div>'
      ]
    }]
  }, {
    name: "Linewrap length",
    description: "",
    options: [{ name: "wrap_line_length", value: "80" }],
    tests: [{
      comment: "This test shows how line wrapping is still not correct.",
      fragment: true,
      input: [
        '<body>',
        '    <div>',
        '        <div>',
        '            <p>Reconstruct the schematic editor the EDA system <a href="http://www.jedat.co.jp/eng/products.html"><i>AlphaSX</i></a> series</p>',
        '        </div>',
        '    </div>',
        '</body>'
      ],
      output: [
        '<body>',
        '    <div>',
        '        <div>',
        '            <p>Reconstruct the schematic editor the EDA system <a href="http://www.jedat.co.jp/eng/products.html"><i>AlphaSX</i></a>',
        '                series</p>',
        '        </div>',
        '    </div>',
        '</body>'
      ]
    }, {
      fragment: true,
      input: '<span>0 0001 0002 0003 0004 0005 0006 0007 0008 0009 0010 0011 0012 0013 0014 0015 0016 0017 0018 0019 0020</span>',
      output: [
        '<span>0 0001 0002 0003 0004 0005 0006 0007 0008 0009 0010 0011 0012 0013 0014',
        '    0015 0016 0017 0018 0019 0020</span>'
      ]
    }]
  }, {
    name: "Indent with tabs",
    description: "Use one tab instead of several spaces for indentation",
    template: "^^^ $$$",
    options: [
      { name: "indent_with_tabs", value: "true" }
    ],
    tests: [{
      fragment: true,
      input_: '<div>\n' +
        '<div>\n' +
        '</div>\n' +
        '</div>',
      output: '<div>\n' +
        '\t<div>\n' +
        '\t</div>\n' +
        '</div>'
    }]
  }, {
    name: "Indent without tabs",
    description: "Use several spaces for indentation",
    template: "^^^ $$$",
    options: [
      { name: "indent_with_tabs", value: "false" }
    ],
    tests: [{
      fragment: true,
      input_: '<div>\n' +
        '<div>\n' +
        '</div>\n' +
        '</div>',
      output: '<div>\n' +
        '    <div>\n' +
        '    </div>\n' +
        '</div>'
    }]
  }, {
    name: "Indent body inner html by default",
    description: "",
    tests: [{
      fragment: true,
      input: '<html>\n<body>\n<div></div>\n</body>\n\n</html>',
      output: '<html>\n<body>\n    <div></div>\n</body>\n\n</html>'
    }]
  }, {
    name: "indent_body_inner_html set to false prevents indent of body inner html",
    description: "",
    options: [
      { name: 'indent_body_inner_html', value: "false" }
    ],
    tests: [{
      fragment: true,
      unchanged: '<html>\n<body>\n<div></div>\n</body>\n\n</html>'
    }]
  }, {
    name: "Indent head inner html by default",
    description: "",
    tests: [{
      fragment: true,
      input: '<html>\n\n<head>\n<meta>\n</head>\n\n</html>',
      output: '<html>\n\n<head>\n    <meta>\n</head>\n\n</html>'
    }]
  }, {
    name: "indent_head_inner_html set to false prevents indent of head inner html",
    description: "",
    options: [
      { name: 'indent_head_inner_html', value: "false" }
    ],
    tests: [{
      fragment: true,
      unchanged: '<html>\n\n<head>\n<meta>\n</head>\n\n</html>'
    }]
  }, {
    name: "Inline tags formatting",
    description: "",
    template: "^^^ $$$",
    tests: [{
      fragment: true,
      input: '<div><span></span></div><span><div></div></span>',
      output: '<div><span></span></div><span>\n    <div></div>\n</span>'
    }, {
      fragment: true,
      input: '<div><div><span><span>Nested spans</span></span></div></div>',
      output: [
        '<div>',
        '    <div><span><span>Nested spans</span></span></div>',
        '</div>'
      ]
    }, {
      fragment: true,
      input: '<p>Should remove <span><span \n\nclass="some-class">attribute</span></span> newlines</p>',
      output: [
        '<p>Should remove <span><span class="some-class">attribute</span></span> newlines</p>'
      ]
    }, {
      fragment: true,
      unchanged: '<div><span>All</span> on <span>one</span> line</div>'
    }, {
      fragment: true,
      unchanged: '<span class="{{class_name}}">{{content}}</span>'
    }, {
      fragment: true,
      unchanged: '{{#if 1}}<span>{{content}}</span>{{/if}}'
    }]
  }, {
    name: "unformatted to prevent formatting changes",
    description: "",
    options: [
      { name: 'unformatted', value: "['u']" }
    ],
    tests: [{
      fragment: true,
      unchanged: '<u><div><div>Ignore block tags in unformatted regions</div></div></u>'
    }, {
      fragment: true,
      unchanged: '<div><u>Don\\\'t wrap unformatted regions with extra newlines</u></div>'
    }, {
      fragment: true,
      input_: '<u>  \n\n\n  Ignore extra """whitespace mostly  \n\n\n  </u>',
      output: '<u>\n\n\n  Ignore extra """whitespace mostly  \n\n\n  </u>'
    }, {
      fragment: true,
      unchanged: '<u><div \n\t\nclass=""">Ignore whitespace in attributes\t</div></u>'
    }, {
      fragment: true,
      input_: '<u \n\n\t\t  class="">Ignore whitespace\nin\tattributes</u>',
      output: '<u\n\n\t\t  class="">Ignore whitespace\nin\tattributes</u>'
    }]
  }, {
    name: "content_unformatted to prevent formatting content",
    description: "",
    options: [
      { name: 'content_unformatted', value: "['?php', 'script', 'style', 'p', 'span', 'br']" }
    ],
    tests: [{
      fragment: true,
      input: '<html><body><h1>A</h1><script>if(1){f();}</script><style>.a{display:none;}</style></body></html>',
      output: [
        '<html>',
        '<body>',
        '    <h1>A</h1>',
        '    <script>if(1){f();}</script>',
        '    <style>.a{display:none;}</style>',
        '</body>',
        '',
        '</html>'
      ]
    }, {
      fragment: true,
      input: '<div><p>Beautify me</p></div><p><div>But not me</div></p>',
      output: [
        '<div>',
        '    <p>Beautify me</p>',
        '</div>',
        '<p><div>But not me</div></p>'
      ]
    }, {
      fragment: true,
      input: '<div><p\n  class="beauty-me"\n>Beautify me</p></div><p><div\n  class="iamalreadybeauty"\n>But not me</div></p>',
      output: [
        '<div>',
        '    <p class="beauty-me">Beautify me</p>',
        '</div>',
        '<p><div',
        '  class="iamalreadybeauty"',
        '>But not me</div></p>'
      ]
    }, {
      fragment: true,
      unchanged: '<div><span>blabla<div>something here</div></span></div>'
    }, {
      fragment: true,
      unchanged: '<div><br /></div>'
    }, {
      input: '<div><pre>var a=1;\nvar b=a;</pre></div>',
      output: [
        '<div>',
        '    <pre>var a=1;',
        '        var b=a;</pre>',
        '</div>'
      ]
    }, {
      unchanged: [
        '<?php',
        '/**',
        ' * Comment',
        ' */',
        '',
        '?>',
        '<div class="">',
        '',
        '</div>'
      ]
    }, {
      input: '<div><pre>\nvar a=1;\nvar b=a;\n</pre></div>',
      output: [
        '<div>',
        '    <pre>',
        '        var a=1;',
        '        var b=a;',
        '    </pre>',
        '</div>'
      ]
    }]
  }, {
    name: "default content_unformatted and inline element test",
    description: "",
    options: [],
    tests: [{
      fragment: true,
      input: '<html><body><h1>A</h1><script>if(1){f();}</script><style>.a{display:none;}</style></body></html>',
      output: [
        '<html>',
        '<body>',
        '    <h1>A</h1>',
        '    <script>',
        '        if (1) {',
        '            f();',
        '        }',
        '    </script>',
        '    <style>',
        '        .a {',
        '            display: none;',
        '        }',
        '    </style>',
        '</body>',
        '',
        '</html>'
      ]
    }, {
      input: '<div><p>Beautify me</p></div><p><p>But not me</p></p>',
      output: [
        '<div>',
        '    <p>Beautify me</p>',
        '</div>',
        '<p>',
        '    <p>But not me</p>',
        '</p>'
      ]
    }, {
      fragment: true,
      input: '<div><p\n  class="beauty-me"\n>Beautify me</p></div><p><p\n  class="iamalreadybeauty"\n>But not me</p></p>',
      output: [
        '<div>',
        '    <p class="beauty-me">Beautify me</p>',
        '</div>',
        '<p>',
        '    <p class="iamalreadybeauty">But not me</p>',
        '</p>'
      ]
    }, {
      fragment: true,
      unchanged: '<div><span>blabla<div>something here</div></span></div>'
    }, {
      fragment: true,
      unchanged: '<div><br /></div>'
    }, {
      fragment: true,
      input: '<div><pre>var a=1;\nvar b=a;</pre></div>',
      output: [
        '<div>',
        '    <pre>var a=1;',
        'var b=a;</pre>',
        '</div>'
      ]
    }, {
      fragment: true,
      input: '<div><pre>\nvar a=1;\nvar b=a;\n</pre></div>',
      output: [
        '<div>',
        '    <pre>',
        'var a=1;',
        'var b=a;',
        '</pre>',
        '</div>'
      ]
    }, {
      comment: "Test for #1041",
      fragment: true,
      input: [
        '<p><span class="foo">foo <span class="bar">bar</span></span></p>',
        '',
        '<aside><p class="foo">foo <span class="bar">bar</span></p></aside>',
        '<p class="foo"><span class="bar">bar</span></p>'
      ],
      output: [
        '<p><span class="foo">foo <span class="bar">bar</span></span></p>',
        '',
        '<aside>',
        '    <p class="foo">foo <span class="bar">bar</span></p>',
        '</aside>',
        '<p class="foo"><span class="bar">bar</span></p>'
      ]
    }, {
      comment: "Test for #1167",
      fragment: true,
      unchanged: [
        '<span>',
        '    <span><img src="images/off.svg" alt=""></span>',
        '    <span><img src="images/on.svg" alt=""></span>',
        '</span>'
      ]
    }, {
      comment: "Test for #882",
      fragment: true,
      input: '<tr><th><h3>Name</h3></th><td class="full-width"></td></tr>',
      output: [
        '<tr>',
        '    <th>',
        '        <h3>Name</h3>',
        '    </th>',
        '    <td class="full-width"></td>',
        '</tr>'
      ]
    }, {
      comment: "Test for #1184",
      fragment: true,
      input: '<div><div></div>Connect</div>',
      output: [
        '<div>',
        '    <div></div>Connect',
        '</div>'
      ]
    }, {
      comment: "Test for #1383",
      fragment: true,
      input: [
        '<p class="newListItem">',
        '  <svg height="40" width="40">',
        '              <circle cx="20" cy="20" r="18" stroke="black" stroke-width="0" fill="#bddffa" />',
        '              <text x="50%" y="50%" text-anchor="middle" stroke="#1b97f3" stroke-width="2px" dy=".3em">1</text>',
        '            </svg> This is a paragraph after an SVG shape.',
        '</p>'
      ],
      output: [
        '<p class="newListItem">',
        '    <svg height="40" width="40">',
        '        <circle cx="20" cy="20" r="18" stroke="black" stroke-width="0" fill="#bddffa" />',
        '        <text x="50%" y="50%" text-anchor="middle" stroke="#1b97f3" stroke-width="2px" dy=".3em">1</text>',
        '    </svg> This is a paragraph after an SVG shape.',
        '</p>'
      ]
    }]
  }, {
    name: "New Test Suite"
  }]
};