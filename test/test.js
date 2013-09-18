/*jslint node: true, -W061:true */
'use strict';
var path = require('path');
var grunt = require('grunt');
var mustache = require('../tasks/lib/mustache.js').init(grunt);

var templateDirs = [path.join(__dirname, 'templates')];

var removeWrappingParens = function(templateString) {
  return templateString.replace(/^\(|\)$/g, '');
};

exports.mustache = {
  simple: function(test) {
    var compiled = mustache.compile(templateDirs);
    var templates = JSON.parse(removeWrappingParens(compiled));

    test.expect(2);
    test.ok(templates.hello, "should have the correct key");
    test.ok(templates.hello.match(/Hello \{\{name\}\}!/), "should cope with mustache vars");
    test.done();
  },

  should_handle_quotes: function(test) {
    var compiled = mustache.compile(templateDirs);
    var templates = JSON.parse(removeWrappingParens(compiled));

    test.expect(3);
    test.ok(templates["with.quotes"], "should have the correct key");
    test.ok(templates["with.quotes"].match(/has \'embedded\'/), "should cope with single quotes");
    test.ok(templates["with.quotes"].match(/\"quotes\"/), "should cope with double quotes");
    test.done();
  },

  should_handle_utf8: function(test) {
    var compiled = mustache.compile(templateDirs);
    var templates = JSON.parse(removeWrappingParens(compiled));

    test.expect(2);
    test.ok(templates["with.utf-8"], "should have the correct key");
    test.ok(templates["with.utf-8"].match(/\{\{\^english\?\}\}Iñtërnâtiônàlizætiøn\{\{\/english\?\}\}/),
            "should cope with utf-8 chars");
    test.done();
  },

  should_allow_different_prefix_and_postfix: function(test) {
    var compiled = mustache.compile(templateDirs, {
      prefix: "my.templates = ",
      postfix: ";"
    });
    var my = {};

    test.expect(6);
    test.ok(compiled.match(/^my\.templates = \{/), "should use supplied prefix");
    test.ok(compiled.match(/\};/), "should use supplied suffix");
    eval(compiled);
    test.ok(my.templates.hello, "should evaluate without errors");
    test.ok(my.templates["with.quotes"], "should evaluate without errors");
    test.ok(my.templates["with.utf-8"], "should evaluate without errors");
    test.ok(my.templates.hello.match(/hello/i), "should evaluate without errors");
    test.done();
  },

  should_allow_keeping_template_file_suffix: function(test) {
    var compiled = mustache.compile(templateDirs, {
      keepTemplateSuffix: true
    });
    var templates = JSON.parse(removeWrappingParens(compiled));

    test.expect(4);
    test.ok(templates["hello.mustache"], "should keep template file suffix");
    test.ok(templates["hello.mustache"].match(/hello/i), "should keep template file suffix");
    test.ok(templates["with.quotes.mustache"], "should keep template file suffix");
    test.ok(templates["with.utf-8.mustache"], "should keep template file suffix");
    test.done();
  },

  should_log_file_reads_with_verbose_option: function(test) {
    var originalGruntLog = grunt.log;
    var log = [];
    grunt.log = {
      writeln: function(line) { log.push(line); }
    };
    var mustache = require('../tasks/lib/mustache.js').init(grunt);
    var compiled = mustache.compile(templateDirs, { verbose: true });
    test.ok(log[0].match(/reading file.*hello\.mustache/i), "should log template filename");
    test.ok(log[1].match(/reading file.*with\.quotes\.mustache/i), "should log template filename");
    test.ok(log[2].match(/reading file.*with\.utf-8\.mustache/i), "should log template filename");

    grunt.log = originalGruntLog;
    test.done();
  },

  should_not_log_file_reads_without_verbose_option: function(test) {
    var originalGruntLog = grunt.log;
    var log = [];
    grunt.log = {
      writeln: function(line) { log.push(line); }
    };
    var mustache = require('../tasks/lib/mustache.js').init(grunt);
    var compiled = mustache.compile(templateDirs);
    test.equal(log.length, 0, "expected no log lines");

    grunt.log = originalGruntLog;
    test.done();
  },

  should_return_a_count_of_templates: function(test) {
    var compiled = mustache.compile(templateDirs);

    test.expect(1);
    test.equal(mustache.count(), 3, "expected 3 templates");
    test.done();
  },

  should_cope_when_list_of_templates_is_empty: function(test) {
    var compiled = mustache.compile([]);

    test.expect(1);
    test.equal(mustache.count(), 0, "expected 0 templates");
    test.done();
  }
};
