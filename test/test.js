/*jslint node: true */
'use strict';

var grunt = require('grunt');
var path = require('path');
var mustache = require('../tasks/lib/mustache').init(grunt);

exports.nodeunit = {
  check_simple_template: function(test) {
    var actual = grunt.file.read('tmp/templates_without_prefix.js');
    var ctx = eval(actual);

    test.equal(actual.charAt( actual.length - 1 ), ';', 'should add a semicolon in the end of the string');
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

//console.log(some_prefix.template3.inStart1);
    test.ok(some_prefix.template1, "should have the template 1");
    test.ok(some_prefix.template2, "should have the template 2");
    test.ok(some_prefix.template3.base, "should have template 3 base");
    test.equal(some_prefix.template3.base, '<div>{{start}}<span>sometext</span>{{inStart}}{{end}}</div>', 'base should have the correct content');
    test.ok(some_prefix.template3.start, "should have template 3 start");
    test.equal(some_prefix.template3.start, '<h1>start</h1>{{inStart1}}', 'start should have the correct content');
    test.ok(some_prefix.template3.end, "should have template 3 end");
    test.equal(some_prefix.template3.end, '<h1>end</h1>', 'end should have the correct content');
    test.ok(some_prefix.template3.inStart, "should have template 3 instart");
    test.equal(some_prefix.template3.inStart, '<p>inStart again</p>', 'inStart should have the correct content');
    test.ok(some_prefix.template3.inStart1, "should have template 3 instart1");
    test.equal(some_prefix.template3.inStart1, '<p>inStart</p>', 'inStart1 should have the correct content');

    test.done();
  },

  "templates with dashes in the file name are replaced by underscores": function(test) {
    var actual = grunt.file.read('tmp/templates_with_underscores.js');

    var ctx = eval(actual);

    test.ok(ctx.template_underscore_1, "should have template_underscore_1, not template-underscore-1");
    test.ok(ctx.template_underscore_2, "should have template_underscore_2, not template-underscore-2");

    test.equal(ctx.template_underscore_1, '<div>Hello world!</div>', "should have template_underscore_1, not template-underscore-1");
    test.equal(ctx.template_underscore_2, '<div>Hello people!</div>', "should have template_underscore_2, not template-underscore-2");

    test.done();
  }
};
