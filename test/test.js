/*jslint node: true */
'use strict';

var grunt = require('grunt');

exports.nodeunit = {
  check_simple_template: function(test) {
    var actual = grunt.file.read('tmp/templates_without_prefix.js');
    var expected = grunt.file.read('test/expected/templates_without_prefix.js');
    test.equal(actual, expected);
    test.done();
  },

  check_template_with_prefix: function(test) {
    var actual = grunt.file.read('tmp/templates_with_prefix.js');
    var expected = grunt.file.read('test/expected/templates_with_prefix.js');
    test.equal(actual, expected);
    test.done();
  },

  check_template_with_prefix_and_postfix: function (test) {
    var actual = grunt.file.read('tmp/templates_with_prefix_and_postfix.js');
    var expected = grunt.file.read('test/expected/templates_with_prefix_and_postfix.js');
    test.equal(actual, expected);
    test.done();
  }
};
