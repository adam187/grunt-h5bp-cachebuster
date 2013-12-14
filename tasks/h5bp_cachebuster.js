/*
 * grunt-h5bp-cachebuster
 * https://github.com/adam187/grunt-h5bp-cachebuster
 *
 * Copyright (c) 2013 Adam Misiorny
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.registerMultiTask('h5bp_cachebuster', 'add assets checksum in css files', function () {
    var crc, options, onlyUnique, findUrls, getBasePath, urlParse, isBase64, isLocalFile, generateChecksum, cssBust;

    crc = require('crc');

    options = this.options({
      algorithm: 'crc32'
    });

    onlyUnique = function (value, index, self) {
      return self.indexOf(value) === index;
    };

    findUrls = function(source) {
      return source.match(/url\([^\)]+\)/gi);
    };

    generateChecksum = function (filePath, algorithm) {
      return Math.abs(crc[algorithm](new Buffer(grunt.file.read(filePath)).toString('base64')));
    };

    urlParse = function(url) {
      var m = url.match(/(url\( *['"]?)(([A-Za-z0-9_\-\.\/:;,]+)(\.(jpg|png|gif)))(['"]? *\))/i);
      return m ? {url: m[0], prefix: m[1], file: m[2], base: m[3], ext: m[5], sufix: m[6]} : null;
    };

    isBase64 = function(url) {
      return url.match(/data:[a-z\-]+\/[a-z]+;base64,/) ? true : false;
    };

    isLocalFile = function(filePath) {
      return filePath.match(/^((https?|ftp):)?\/\//) ? false : true;
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
        urls.filter(onlyUnique).forEach(function(url) {
          var parsedUrl, filePath, checksum, replacement;

          parsedUrl = urlParse(url);

          if (!parsedUrl) {
            if (isBase64(url)) {
              grunt.verbose.writeln('Skipping "' + url + '" - base64');
            } else {
              grunt.log.warn('Cannot parse "' + url + '"');
            }
          } else if (!isLocalFile(parsedUrl.file)) {
            grunt.verbose.writeln('Skipping "' + parsedUrl.file + '" - not a local file');
          } else {
            filePath = basePath + parsedUrl.file;
            if (grunt.file.exists(filePath)) {
              checksum = generateChecksum(filePath, options.algorithm);
              replacement = parsedUrl.prefix + parsedUrl.base + '.' + checksum + '.' + parsedUrl.ext + parsedUrl.sufix;
              source = source.replace(parsedUrl.url, replacement);
            } else {
              grunt.log.warn('Asset file "' + filePath + '" not found.');
            }
          }

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
