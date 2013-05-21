'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // grunt-contrib-copy
    copy: {
      css: {
        files: [
          {
            src: ['**'],
            dest: 'dist/css/vendor/',
            filter: 'isFile',
            expand: true,
            cwd: 'assets/vendor/',
          }
        ]
      }
    },


    // grunt-contrig-jshint
    jshint: {
      options: {
        asi: true,
        bitwise: true,
        boss: true,
        camelcase: true,
        curly: true,
        debug: false,
        eqeqeq: true,
        eqnull: false,
        esnext: false,
        evil: false,
        forin: true,
        funcscope: false,
        globalstrict: true,
        immed: false,
        indent: 2,
        iterator: true,
        lastsemic: false,
        latedef: true,
        laxbreak: false,
        laxcomma: false,
        loopfunc: false,
        maxdepth: 2,
        multistr: false,
        newcap: true,
        noarg: true,
        node: true,
        noempty: true,
        nomen: false,
        nonew: true,
        onecase: false,
        onevar: true,
        plusplus: false,
        proto: true,
        quotmark: 'single',
        regexdash: false,
        shadow: false,
        smarttabs: false,
        strict: true,
        sub: false,
        supernew: false,
        trailing: true,
        undef: true,
        unused: true,
        validthis: false,
        white: false
      },
      all: [
        './*.js',
        './js/**/*.js',
        '!./js/vendor/**/*.js'
      ],
    },


    // grunt-contrib-htmlmin
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true
        },
        files: {
          'dist/index.min.html': 'dist/index.html'
        }
      }
    },


    // grunt-md2html
    md2html: {
      readmes: {
        options: {
          gfm: true,
          layout: 'assets/html/index.html',
          sanitize: false
        },
        files: [{
          src: [
            'pages/cushion/Readme.md',
            'pages/cushion-cli/Readme.md'
          ],
          dest: 'dist/index.html'
        }]
      }
    },


    // grunt-contrib-watch
    watch: {
      scripts: {
        files: [
          './*.js',
          './assets/js/**/*.js'
        ],
        tasks: ['scripts'],
        options: {
          nospawn: true,
        }
      },
      html: {
        files: [
          './assets/html/**/*.html'
        ],
        tasks: ['html'],
        options: {
          nospawn: true
        }
      }
    }
  });


  // official grunt tasks
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.loadNpmTasks('grunt-md2html');

  grunt.registerTask('default', ['jshint', 'md2html', 'htmlmin', 'copy']);
  grunt.registerTask('dist', ['md2html', 'htmlmin', 'copy']);

  grunt.registerTask('html', ['md2html', 'htmlmin']);
  grunt.registerTask('scripts', ['jshint']);
};
