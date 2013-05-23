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


    // // grunt-contrib-clean
    clean: {
      build: ['./dist/js', './dist/css', './dist/pages']
    },


    // grunt-contrib-compass
    compass: {
      dist: {
        options: {
          cssDir: './dist/css',
          environment: 'production',
          outputStyle: 'compressed',
          sassDir: './assets/sass'
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
          layout: 'assets/html/section.html',
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
          mangle: true,
          compress: true
        },
        files: {
          'dist/js/main.min.js': ['assets/js/main.js']
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
        tasks: ['default'],
        options: {
          nospawn: true,
        }
      },
      html: {
        files: [
          './assets/html/**/*.html'
        ],
        tasks: ['default'],
        options: {
          nospawn: true
        }
      },
      styles:{
        files: [
          './assets/sass/**/*.scss'
        ],
        tasks: ['default'],
        options: {
          nospawn: true
        }
      }
    }
  });

  // basic
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');

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

        grunt.log.writeln('Generated file: "./dist/' + src[i].path + 'Readme.html"');
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
          { data: {
        readme: grunt.file.read('./dist/readmes.html'),
        script: grunt.file.read('./dist/js/main.js'),
        style: grunt.file.read('./dist/css/main.css'),
        src: Config.src
      } }
        )
      );

      grunt.file.delete('./dist/readmes.html');
      grunt.log.writeln('Deleted file: "./dist/readmes.html');

      grunt.log.writeln('Generated new File: "./dist/index.html"');
      grunt.log.writeln('  Included File: "./dist/readmes.html"');
      grunt.log.writeln('  Included File: "./dist/js/main.js"');
      grunt.log.writeln('  Included File: "./dist/css/main.css"');
    }
  );


  // whole markdown process
  grunt.registerTask('markdown', ['md2html', 'renderReadmeHtml', 'concat:readme']);

  grunt.registerTask('default', ['markdown', 'scripts', 'css', 'renderIndexHtml', 'htmlmin', 'clean:build']);

  grunt.registerTask('scripts', ['jshint', 'uglify']);

  grunt.registerTask('css',['compass']);
};
