/*jslint node:true */
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

module.exports = function(grunt) {
  // Please see the grunt documentation for more information regarding task and
  // helper creation: https://github.com/cowboy/grunt/blob/master/docs/toc.md

  // ==========================================================================
  // TASKS
  // ==========================================================================
  var mustache = require('./lib/mustache.js').init(grunt);


  grunt.registerMultiTask('mustache',
                          'Concat mustache templates into a JSON string or JS object.',
                          function() {
    var destination = this.data.dest;
    var template = mustache.compile(this.filesSrc, this.options());
    grunt.file.write(destination, template);
    if(this.options().verbose){
      grunt.log.writeln('File "' + destination.yellow + '" created.');
    }
    grunt.log.ok(mustache.count().cyan + ' *.mustache templates baked into ' + destination.yellow);
  });
};
