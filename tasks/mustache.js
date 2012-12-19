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
    grunt.config.requires('mustache.dist.options.varname');    
    var mustacheSrc    = grunt.file.expand(this.file.src);
    var mustacheDest    = this.file.dest;
    var templateOutput  = '';

    var varName = grunt.config('mustache.dist.options.varname');

    templateOutput += varName + ' = {';
    grunt.file.recurse(this.file.src, mustacheCallback);
    templateOutput += templateContent.replace( /\r|\n|\t|\s\s/g, '');
    templateOutput += '"done":true};';
    
    //grunt.log.writeln(templateOutput);
    grunt.file.write(mustacheDest, templateOutput);
    grunt.log.writeln('File "' + mustacheDest + '" created.');
  });

  // ==========================================================================
  // CALLBACKS
  // ==========================================================================

  function mustacheCallback(abspath, rootdir, subdir, filename){
    if(abspath.indexOf('.svn') === -1){
      templateCount++;
      templateContent += '"' + filename.split('.mustache')[0] + '"' + " : '" + grunt.file.read(abspath) + "',";
    }
  }


};
