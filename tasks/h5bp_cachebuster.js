/*
 * grunt-h5bp-cachebuster
 * https://github.com/adam187/grunt-h5bp-cachebuster
 *
 * Copyright (c) 2013 Adam Misiorny
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.registerMultiTask('h5bp_cachebuster', 'add assets timestamp in css files', function () {
    var crc, options, findUrls, getBasePath, urlParse, generateChecksum, cssBust;

    crc = require('crc');

    options = this.options({
      algorithm: 'crc16'
    });

    findUrls = function(source) {
      return source.match(/url\(.*\)/gi);
    };

    generateChecksum = function (filePath, algorithm) {
      return Math.abs(crc[algorithm](new Buffer(grunt.file.read(filePath)).toString('base64')));
    };

    urlParse = function(url) {
      var m = url.match(/(url\( *['"]?)(([A-Za-z0-9_\-\.\/]+)(\.(jpe?g|png|gif|svg)))(['"]? *\))/i);
      return m ? {url: m[0], prefix: m[1], file: m[2], base: m[3], ext: m[5], sufix: m[6]} : null;
    };

    getBasePath = function(filePath) {
      return filePath.substr(0, filePath.lastIndexOf('/') + 1);
    };

    cssBust = function(file) {
      var source, urls, basePath;

      basePath = getBasePath(file);
      source = grunt.file.read(file);
      urls = findUrls(source);

      if (urls) {
        urls.forEach(function(url) {
          var parsedUrl, checksum, replacement;

          parsedUrl = urlParse(url);
          checksum = generateChecksum(basePath + parsedUrl.file, options.algorithm);
          replacement = parsedUrl.prefix + parsedUrl.base + '.' + checksum + '.' + parsedUrl.ext + parsedUrl.sufix;
          source = source.replace(parsedUrl.url, replacement);
        });
      }

      return source;
    };

    this.files.forEach(function (files) {
      var output = files.src.map(cssBust).join();
      grunt.file.write(files.dest, output);
    });

  });

};
