/*
 * grunt-mustache
 * https://github.com/phun-ky/grunt-mustache
 *
 * Copyright (c) 2012 Alexander Vassbotn Røyne-Helgesen
 * Modified 12/2012 Nils P. Ellingsen
 * Licensed under the GPL license.
 */

'use strict';

var templateContent = '';
var templateCount = 0;

var colors = require('colors');

module.exports = function(grunt) {

  // Please see the grunt documentation for more information regarding task and
  // helper creation: https://github.com/cowboy/grunt/blob/master/docs/toc.md

  // ==========================================================================
  // TASKS
  // ==========================================================================

  grunt.registerMultiTask('mustache', 'Concat mustache templates into a JSON string or JS object.', function() {

    var _mustacheDest     = this.data.dest;
    var _templateOutput   = '';

    var _opts = this.options();

    var _prefix           = _opts.prefix;
    var _postfix          = _opts.postfix;

    // Append prefix if set
    if(typeof _prefix !== 'undefined'){
      _templateOutput += _prefix;
    }

    _templateOutput += '{';


    this.filesSrc.forEach(function(file){



      grunt.file.recurse( file, function(abspath, rootdir, subdir, filename){
        mustacheCallback(abspath, filename,_opts);
      });

      _templateOutput += templateContent.replace( /\r|\n|\t|\s\s/g, '');


    });

    templateContent = '';
    _templateOutput += ' "done": "true"}';

    if(typeof _postfix !== 'undefined'){
      _templateOutput += _postfix;
    }

    grunt.file.write(_mustacheDest, _templateOutput);

    if(_opts.verbose){

      grunt.log.writeln('File "' + _mustacheDest.yellow + '" created.');
    }

    grunt.log.ok(String(templateCount).cyan + ' *.mustache templates baked into ' + _mustacheDest.yellow);
  });

  // ==========================================================================
  // CALLBACKS
  // ==========================================================================

  function mustacheCallback(abspath, filename, opts){
    // loop thru all mustache-files: using filename for key, template contents as value
    if(abspath.split('.').pop() === 'mustache'){
      templateCount++;
      templateContent += '"' + filename.split('.mustache')[0] + '"' + ' : \'' + grunt.file.read(abspath) + '\',';

       if(opts.verbose){
        grunt.log.writeln('Reading file: '.white + filename.yellow);
      }
    }
  }


};
