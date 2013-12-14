
'use strict';

var grunt = require('grunt');

exports.h5bp_cachebuster = {

  css_bust: function(test) {
    test.expect(9);

    var taskConfig = grunt.config.get('h5bp_cachebuster.css_bust_all_files'),
        expectedConfig = {
        expand: true,
        cwd: 'tests/fixtures',
        src: 'css/*.css',
        dest: 'tmp/',
        ext: '.css'
      };

    test.deepEqual(taskConfig, expectedConfig, 'config sould be the same');

    ['style.css', 'print.css', 'min.css', 'base64.css'].forEach(function(file) {
      var actual, expected;
      test.ok(grunt.file.exists('tmp/css/' + file), 'should create ' + file + ' file');
      actual = grunt.file.read('tmp/css/' + file);
      expected = grunt.file.read('tests/expected/css/' + file);
      test.equal(actual, expected, 'CSS urls should have checksum');
    });

    test.done();
  }

};
