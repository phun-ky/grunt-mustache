/*
 * grunt-mustache
 * https://github.com/phun-ky/grunt-mustache
 *
 * Copyright (c) 2012 Alexander Vassbotn Røyne-Helgesen
 * Modified 12/2012 Nils P. Ellingsen
 * Licensed under the GPL license.
 */

'use strict';

require('colors');

/**
 * Require path plugin from node
 *
 * @var     Object
 * @source  NodeJS
 */
var path          = require('path');

module.exports = function(grunt) {

  // Please see the grunt documentation for more information regarding task and
  // helper creation: https://github.com/cowboy/grunt/blob/master/docs/toc.md

  // ==========================================================================
  // TASKS
  // ==========================================================================

  var mustache = require('./lib/mustache.js').init(grunt);

  grunt.registerMultiTask('mustache', 'Concat mustache templates into a JSON string or JS object.', function() {

    var destination = this.data.dest || this.data.files.dest;
    var template = mustache.compile(this.filesSrc, this.options());

    grunt.file.write(destination, template);

    // Set *fixes, if not set, use () to produce correct JavaScript syntax
    var _prefix           = _opts.prefix || '(';
    var _postfix          = _opts.postfix || ')';

    _templateOutput += _prefix + '{\n';

    this.filesSrc.forEach(function(file){

      if(grunt.file.isFile(file)){

        if(grunt.option('verbose')){

          grunt.log.writeln('Combing file: "' + path.normalize(file).yellow + '"');

        }

        mustacheCallback(path.resolve(file), path.basename(file),_opts);

      } else {

        if(grunt.option('verbose')){

          grunt.log.writeln('Combing directory: "' + path.normalize(file).yellow + '"');

        }

        grunt.file.recurse( file, function(abspath, rootdir, subdir, filename){

          mustacheCallback(abspath, filename,_opts);

        });

      }

      _templateOutput += templateContent;

      if(grunt.file.isFile(file)){

        templateContent = '';

      }

    });

    templateContent = '';
    _templateOutput += '    "done": "true"\n  }' + _postfix;

    grunt.file.write(_mustacheDest, _templateOutput);

    if(grunt.option('verbose')){

      grunt.log.writeln('File "' + path.normalize(_mustacheDest).yellow + '" created.');

    }

    grunt.log.ok(mustache.count().cyan + ' *.mustache templates baked into ' + destination.yellow);

  });

  // ==========================================================================
  // CALLBACKS
  // ==========================================================================

  function mustacheCallback(abspath, filename, opts){



    // Loop through all *.mustache-files: using filename for key,
    // template contents as value
    if(abspath.split('.').pop() === 'mustache'){

      templateCount++;
      var escapeDoubleQuotes = grunt.file.read(abspath).replace(/"/g, '\\"');
      var escapeEscapedCharacters = escapeDoubleQuotes.replace(/\\\\/g, '\\');
      var fileContent =  escapeEscapedCharacters.replace( /\r|\n|\t|\s\s/g, ''); // Removes line breaks and double spaces


      templateContent += '    "' + filename.split('.mustache')[0] + '"' + ' : "' + fileContent + '",' + "\n";

      if(grunt.option('verbose')){

        grunt.log.writeln('Reading file: '.white + filename.yellow);

      }
    }
  }


};
