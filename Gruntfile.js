/*
 * grunt-srcmust
 * https://github.com/derrickliu/grunt-srcmust
 *
 * Copyright (c) 2014 derrickliu
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    rev: {
        files: {
            src: ['release/js/contact/main.js','release/css/contact.css'] 
        }
     },

     srcmust: {
        options: {
          type: 'rename'
        },
        contact: {
          options: {
            cssdir: 'release/css/',
            jsdir: 'release/js/contact/',
            imagesdir: 'release/css/images/'
          },
          files: [
            {
              src: 'pim/contact.jsp'
            }
          ]
        },

        sms: {
           options: {
            cssdir: 'release/css/',
            jsdir: 'release/js/sms/',
            imagesdir: 'release/css/images/'
          },
          files: [
            {
              src: 'pim/sms.jsp'
            }
          ]
        }
     }

  });


  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-rev');
  grunt.loadNpmTasks('grunt-srcmust');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['rev', 'srcmust']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['rev', 'srcmust']);

};
