/*jslint node:true */
'use strict';

var templateCount = 0;

exports.init = function(grunt) {
  return {
    count: function() {
      return "" + templateCount;
    },
    compile: function(templateDirs, options) {
      options = options || {};

      // Set *fixes, if not set, wrap object in parens (why?)
      var prefix = options.prefix || '(';
      var postfix = options.postfix || ')';
      var templates = {};

      var isTemplate = function(abspath) {
        return abspath.split('.').pop() === 'mustache';
      };

      var templateName = function(filename) {
        if (options.keepTemplateSuffix) {
          return filename;
        }
        return filename.split('.mustache')[0];
      };

      var templateHandler = function(abspath, rootdir, subdir, filename) {
        if (! isTemplate(abspath)) {
          return;
        }
        templateCount += 1;
        templates[templateName(filename)] = grunt.file.read(abspath);
        if (options.verbose) {
          grunt.log.writeln('Reading file: '.white + filename.yellow);
        }
      };

      templateCount = 0;
      templateDirs.forEach(function(file) {
        grunt.file.recurse(file, templateHandler);
      });

      return prefix + JSON.stringify(templates) + postfix;
    }
  };
};
