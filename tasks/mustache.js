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

module.exports = function(grunt) {

  // Please see the grunt documentation for more information regarding task and
  // helper creation: https://github.com/cowboy/grunt/blob/master/docs/toc.md

  // ==========================================================================
  // TASKS
  // ==========================================================================

  grunt.registerMultiTask('mustache', 'Concat mustache templates into a JSON string.', function() {

    grunt.config.requires('mustache.files.options.prefix'); 
    grunt.config.requires('mustache.files.options.postfix'); 

    
    var _mustacheDest     = this.file.dest;
    var _templateOutput   = '';
    var _prefix           = grunt.config('mustache.files.options.prefix');
    var _postfix          = grunt.config('mustache.files.options.postfix');

    // Append prefix if set
    if(typeof _prefix !== 'undefined'){
      _templateOutput += _prefix;  
    } 
    
    _templateOutput += '{';   
    
    
    this.data.src.forEach(function(source){        
      
      grunt.file.recurse( source, mustacheCallback);
      
      _templateOutput += templateContent.replace( /\r|\n|\t|\s\s/g, "");
      
      
    });

    templateContent = '';
    _templateOutput += ' "done": "true"}';

    if(typeof _postfix !== 'undefined'){
      _templateOutput += _postfix;
    }     
    
    grunt.file.write(_mustacheDest, _templateOutput);
    grunt.log.writeln('File "' + _mustacheDest + '" created.');
  });

  // ==========================================================================
  // CALLBACKS
  // ==========================================================================

  function mustacheCallback(abspath, rootdir, subdir, filename){

    if(abspath.indexOf('.mustache') != -1){

      templateCount++;
      templateContent += '"' + filename.split('.mustache')[0] + '"' + " : '" + grunt.file.read(abspath) + "',";
    }
  }


};
