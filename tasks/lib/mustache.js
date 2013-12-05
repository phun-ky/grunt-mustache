/* node: true */

'use strict';

var templateCount = 0;
var extension = 'mustache';

exports.init = function (grunt) {
    return {
        count: function () {
            return "" + templateCount;
        },

        compile: function (templateDirs, options) {

            options = options || {};
            extension = options.extension || extension;

            var prefix = options.prefix || '(',
                postfix = options.postfix || '',
                templates = '';

            if( prefix === '(') {
              postfix = ');' + postfix;
            }

            var isTemplate = function (abspath) {
                return abspath.split('.').pop() === extension;
            };

            var templateName = function (filename) {
                if (options.keepTemplateSuffix) {
                    return filename;
                }
                var file_extension = '.' + extension;
                return filename.split(file_extension)[0];
            };

            var replace_single_quotes = function (content) {
                return content.replace(/'/g, "\\'");
            };

            var templateHandler = function(abspath, rootdir, subdir, filename) {
                if(! isTemplate(abspath) ) {
                    return;
                }
                templateCount += 1;
                var file_content = grunt.file.read(abspath);
                file_content = replace_single_quotes(file_content)
                templates += '"' + templateName(filename) + '"' + ' : \'' + file_content + '\','+"\n";
                
                if (options.verbose) {
                    grunt.log.writeln('Reading file: '.white + filename.yellow);
                }   
            };

            templateCount = 0;
            templateDirs.forEach( function(file) {
                grunt.file.recurse(file, templateHandler);
            });

            templates = '{\n    ' + templates.replace( /\r|\n|\t|\s\s/g, '') + "\n";
            templates += '    "done": "true"\n  }';

            return prefix + templates + postfix;

        }
    };
}