module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    nodeunit: {
      all: ['test/test.js']
    },
    watch: {
      files: ['tasks/**/*.js',
              'test/test.js'],
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
        node: true
      },
      all: ['Gruntfile.js',
            'tasks',
            'test/test.js']
    }
  });

  // load all grunt tasks from package.json
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Load local tasks.
  grunt.loadTasks('tasks');

  // Default task.
  grunt.registerTask('default', ['jshint', 'test']);
  grunt.registerTask('test', 'nodeunit');
};
