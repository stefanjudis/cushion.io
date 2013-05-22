'use strict';

module.exports = function(grunt) {
  var Config = {
    src: [
      {
        id: 'cushion',
        path: 'pages/cushion/',
      }, {
        id: 'cushion-cli',
        path: 'pages/cushion-cli/'
      }
    ]
  };


  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    compass: {                  // Task
      dist: {                   // Target
        options: {              // Target options
          sassDir: './assets/sass',
          cssDir: './dist/css',
          environment: 'production'
        }
      },
      dev: {                    // Another target
        options: {
          sassDir: './assets/sass',
          cssDir: './dist/css'
        }
      }
    },


    // grunt-contrib-concat
    concat: {
      readme: {
        src: Config.src.map(
          function(src) {
            return './dist/' + src.path + 'Readme.html';
          }
        ),
        dest: './dist/readmes.html'
      }
    },


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
          layout: 'assets/html/section.html',
          sanitize: false,
          separator: '</section><section>'
        },
        files: [{
          dest: 'dist/',
          expand: true,
          ext: '.html',
          src: Config.src.map(
            function(src) {
              return src.path + 'Readme.md';
            }
          )
        }]
      }
    },

    // grunt-contrib-uglify
    uglify: {
      options: {
        report: 'gzip'
      },
      dev: {
        options: {
          mangle: false,
          compress: false
        },
        files: {
          'dist/js/main.js': ['assets/js/main.js']
        }
      },
      dist: {
        options: {

        }
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
      },
      styles:{
        files: [
          './assets/sass/**/*.scss'
        ],
        tasks: ['compass:dev']
      }
    }
  });

  // basic
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // js
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // html
  grunt.loadNpmTasks('grunt-contrib-htmlmin');

  // css
  grunt.loadNpmTasks('grunt-contrib-compass');

  // markdown
  grunt.loadNpmTasks('grunt-md2html');

  grunt.registerTask(
    'renderReadmeHtml',
    'Generate index.html depending on configuration',
    function() {
      var src = Config.src,
          i = 0;

      for (i; i < src.length; i++) {
        grunt.file.write(
          './dist/' + src[i].path + 'Readme.html',
          grunt.template.process(
            grunt.file.read('./dist/' + src[i].path + 'Readme.html'),
            { data: src[i] }
          )
        );

        grunt.log.writeln('Generated new "./dist/' + src[i].path + 'Readme.html"');
      }
    }
  );

  grunt.registerTask(
    'renderIndexHtml',
    'Generate index.html depending on configuration',
    function() {
      grunt.file.write(
        './dist/index.html',
        grunt.template.process(
          grunt.file.read('./assets/html/index.html'),
          { data: { readme: grunt.file.read('./dist/readmes.html') } }
        )
      );

      grunt.log.writeln('Generated new completed "./dist/index.html."');
    }
  );

  grunt.registerTask('default', ['jshint', 'markdown', 'htmlmin', 'copy']);
  grunt.registerTask('dist', ['markdown', 'htmlmin', 'copy', 'compass:dist']);

  // whole markdown process
  grunt.registerTask('markdown', ['md2html', 'renderReadmeHtml', 'concat:readme', 'renderIndexHtml']);

  grunt.registerTask('html', ['markdown', 'htmlmin']);
  grunt.registerTask('scripts', ['jshint', 'uglify']);
  grunt.registerTask('css',['compass']);
};
