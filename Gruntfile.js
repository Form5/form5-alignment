
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
    }
  });
  grunt.loadNpmTasks('grunt-contrib-uglify');
  return grunt.registerTask('build', ['uglify']);
};
