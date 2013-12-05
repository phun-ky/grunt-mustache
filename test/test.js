/*jslint node: true */
'use strict';

var grunt = require('grunt');
var path = require('path');
var mustache = require('../tasks/lib/mustache').init(grunt);

exports.nodeunit = {
  check_simple_template: function(test) {
    var actual = grunt.file.read('tmp/templates_without_prefix.js');
    var ctx = eval(actual);

    test.ok(ctx.template1, "should have the template 1 inside the global object");
    test.ok(ctx.template2, "should have the template 2 inside the global object");
    test.done();
  },

  check_template_with_prefix: function(test) {
    var actual = grunt.file.read('tmp/templates_with_prefix.js'),
        prefix = "some_prefix",
        some_prefix;

    eval(actual);

    test.ok(some_prefix.template1, "should have the template 1");
    test.ok(some_prefix.template2, "should have the template 2");
    test.done();
  },

  check_template_with_prefix_and_postfix: function (test) {
    var actual = grunt.file.read('tmp/templates_with_prefix_and_postfix.js'),
        prefix = "some_prefix",
        some_prefix;

    eval(actual);

    test.ok(some_prefix.template1, "should have the template 1");
    test.ok(some_prefix.template2, "should have the template 2");
    test.done();
  },

  "check template with a different extension than mustache will be parsed": function (test) {
    var actual = grunt.file.read('tmp/templates_with_different_extension.js'),
        prefix = "some_prefix",
        some_prefix;

    eval(actual);

    test.ok(some_prefix.template1, "should have the template 1");
    test.ok(some_prefix.template2, "should have the template 2");
    test.done(); 
  }
};
