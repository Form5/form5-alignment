
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*!' +
          '\n  <%= pkg.name %> v<%= pkg.version %>' +
          '\n  Written by <%= pkg.author.name %>' +
          '\n  <%= pkg.author.url %>' +
          '\n  <%= pkg.author.email %>' +
          '\n  License: <%= pkg.license %>' +
          '\n*/\n'
      },
      dist: {
        files: {
          'dist/form5-alignment.min.js': 'src/form5-alignment.js'
        }
      }
    },
    jshint: {
      dist: {
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: ['*.js'],
            dest: 'dist/'
          }
        ],
        options: {
          jshintrc: '.jshintrc' // Read hinting options from .jshintrc
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  return grunt.registerTask('build', ['jshint','uglify']);
};
