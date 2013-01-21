module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    nodeunit: {
      all: ['test/test.js']
    },
    lint: {
      files: ['grunt.js', 'tasks/**/*.js', 'test/**/*.js']
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'default'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,
        es5: true
      },
      globals: {}
    }
  });

  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Load local tasks.
  grunt.loadTasks('tasks');

  // Default task.
  grunt.registerTask('default', 'lint');
  grunt.registerTask('test', 'nodeunit');

};
