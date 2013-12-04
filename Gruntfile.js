module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    clean: {
      default: ['tmp'],
    },

    nodeunit: {
      all: ['test/test.js']
    },

    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js'
      ],
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
      }
    },

    mustache: {
      without_prefix: {
        files: {
          src: 'test/include/',
          dest: 'tmp/templates_without_prefix.js'
        }
      },
      with_prefix: {
        files: {
          src: 'test/include/',
          dest: 'tmp/templates_with_prefix.js'
        },
        options: {
          prefix: 'some_prefix = '
        }
      },
      with_prefix_and_postfix: {
        files: {
          src: 'test/include/',
          dest: 'tmp/templates_with_prefix_and_postfix.js'
        },
        options: {
          prefix: 'some_prefix = ',
          postfix: ';'
        }
      }
    },

    watch: {
      files: '<config:lint.files>',
      tasks: 'default'
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Load local tasks.
  grunt.loadTasks('tasks');

  // Default task.
  grunt.registerTask('default', ['clean', 'mustache:without_prefix', 'mustache:with_prefix', 'mustache:with_prefix_and_postfix', 'test']);
  grunt.registerTask('test', ['nodeunit']);

};
