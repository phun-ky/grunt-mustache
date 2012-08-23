/*
 * grunt-mustache
 * https://github.com/phun-ky/grunt-mustache
 *
 * Copyright (c) 2012 Alexander Vassbotn R�yne-Helgesen
 * Licensed under the GPL license.
 */

var templateContent = '';
var templateCount = 0;

module.exports = function(grunt) {

  // Please see the grunt documentation for more information regarding task and
  // helper creation: https://github.com/cowboy/grunt/blob/master/docs/toc.md

  // ==========================================================================
  // TASKS
  // ==========================================================================

  grunt.registerMultiTask('mustache', 'Concat mustache templates into a JSON string.', function() {
    var mustachePath    = this.file.src;
    var mustacheDest    = this.file.dest;    
    var templateOutput  = '';

    templateOutput      += 'SB.TMPL = {';

    grunt.file.recurse(mustachePath,grunt.helper('mustache'));    

    templateOutput += templateContent.replace( /\r|\n|\t|\s\s/g, "");

    templateOutput += '"done":true};';

    grunt.file.write(mustacheDest, templateOutput);
  });

  // ==========================================================================
  // HELPERS
  // ==========================================================================

  grunt.registerHelper('readTemplateFile', function(abspath, rootdir, subdir, filename) {
    templateCount++;
    templateContent += ;'"' + filename.replace('.mustache','') + '"' + " : '" + grunt.file.read(abspath) + "',"
  });

};
