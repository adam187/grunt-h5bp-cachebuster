/*
 * grunt-h5bp-cachebuster
 * https://github.com/adam187/grunt-h5bp-cachebuster
 *
 * Copyright (c) 2013 Adam Misiorny
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Configuration.
  grunt.initConfig({

    // Jshint
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    asset_cachebuster: {
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Load this plugin's task.
  grunt.loadTasks('tasks');

  // Load deps tasks
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Register tasks
  grunt.registerTask('test', ['clean', 'h5bp_cachebuster', 'nodeunit']);
  grunt.registerTask('default', ['jshint', 'test']);

};
