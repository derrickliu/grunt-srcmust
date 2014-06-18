/*
 * grunt-srcmust
 * https://github.com/derrickliu/grunt-srcmust
 *
 * Copyright (c) 2014 derrickliu
 * Licensed under the MIT license.
 */

'use strict';
var fs = require('fs');
module.exports = function(grunt) {

  function replaceSrc(options,src){
    var dirfiles;
    var srcStr = grunt.file.read(src, 'utf8');
    if(options.jsdir){
      dirfiles = fs.readdirSync(options.jsdir);
      srcStr = _replace(dirfiles,srcStr);
    }
    if(options.cssdir){
      dirfiles = fs.readdirSync(options.cssdir);
      srcStr = _replace(dirfiles,srcStr);
    }
    if(options.imagesdir){
      dirfiles = fs.readdirSync(options.imagesdir);
      srcStr = _replace(dirfiles,srcStr);
    }
   
    return srcStr;
  }

  function _replace(dirfiles,srcStr){
    dirfiles.forEach(function(file){
        var s = file.split('.');
        if(s[2] !== undefined){ 
            var fileName = s[1] + '.' + s[2];
            var cifReg = new RegExp('(\\w{8}\.)*' + fileName,'g');
            srcStr = srcStr.replace(cifReg, file);
            grunt.log.writeln('src "' + fileName + '" replace with: "' + file + '"');
        }
    });
    return srcStr;
  }

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('srcmust', 'resource in page cache control', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
        jsdir: '',
        cssdir: '',
        imagesdir: ''
    });

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        var src = replaceSrc(options,filepath);
        fs.writeFileSync(filepath,src); 
      });


      // Print a success message.
      grunt.log.writeln('File "' + f.src + '" replaced.');
    });
  });

};
