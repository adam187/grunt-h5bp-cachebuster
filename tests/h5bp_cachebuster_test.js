
'use strict';

var grunt = require('grunt');

exports.h5bp_cachebuster = {

  css_bust: function(test) {
    test.expect(3);

    var taskConfig = grunt.config.get('h5bp_cachebuster.css_bust_all_files'),
        expectedConfig = {
        expand: true,
        cwd: 'tests/fixtures',
        src: 'css/*.css',
        dest: 'tmp/',
        ext: '.css'
      };

    test.deepEqual(taskConfig, expectedConfig, 'config sould be the same');

    test.ok(grunt.file.exists('tmp/css/style.css'), 'should create style.css file');
    test.ok(grunt.file.exists('tmp/css/print.css'), 'should create print.css file');

    test.done();
  }

};
