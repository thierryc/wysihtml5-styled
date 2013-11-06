/* jshint node: true */

module.exports = function(grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({

    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
              ' * Wysihtml5 v<%= pkg.version %> by @pikock and @autreplanete\n' +
              ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
              ' * Licensed under <%= _.pluck(pkg.licenses, "url").join(", ") %>\n' +
              ' *\n' +
              ' * Designed and built with all the love in the world by @pikock and @autreplanete.\n' +
              ' */\n\n',
    jqueryCheck: 'if (typeof jQuery === "undefined") { throw new Error("Wysihtml5 requires jQuery") }\n\n',

    // Task configuration.
    clean: {
      dist: ['dist']
    },

    jshint: {
      options: {
        jshintrc: 'js/.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      src: {
        src: ['js/*.js']
      },
      test: {
        src: ['js/tests/unit/*.js']
      }
    },

    concat: {
      options: {
        banner: '<%= banner %><%= jqueryCheck %>',
        stripBanners: false
      },
      bootstrap: {
        src: [
          'lib/rangy/rangy-core.js',
          'lib/base/base.js',
          'src/browser.js',
          'src/lang/*.js',
          'src/dom/*.js',
          'src/quirks/*.js',
          'src/selection/*.js',
          'src/commands/*.js',
          'src/undo_manager.js',
          'src/views/*.js',
          'src/toolbar/*.js',
          'src/keyboardShortcut.js',
          'src/predictive.js',
          'src/toolbar/dialog_createTable.js',
          'src/editor.js'
        ],
        dest: 'dist/<%= pkg.name %><%= pkg.type %>/js/<%= pkg.name %><%= pkg.type %>.js'
      }
    },

    uglify: {
      options: {
        banner: '<%= banner %>',
        report: 'min'
      },
      bootstrap: {
        src: ['<%= concat.bootstrap.dest %>'],
        dest: 'dist/js/<%= pkg.name %>.min.js'
      }
    },

    recess: {
      options: {
        compile: true,
        banner: '<%= banner %>'
      },
      editor: {
        files: {
          'dist/<%= pkg.name %>-bs2/css/wysihtml5-styled-editor-body.css': ['src/less/bootstrap-wysihtml5-styled.less'],
          'dist/<%= pkg.name %>-bs3/css/wysihtml5-styled-editor-body.css': ['src/less/bootstrap-wysihtml5-styled.less'],
          'dist/<%= pkg.name %>-bsi/css/wysihtml5-styled-editor-body.css': ['src/less/bootstrap-wysihtml5-styled.less']
        }
      },
      bs2: {
        src: ['src/less/wysihtml5-styled-editor-body.less'],
        dest: 'dist/<%= pkg.name %>-bs2/css/<%= pkg.name %>-bs2.css'
      }
    },

    copy: {
      parser_rules: {
        files: {
          'dist/<%= pkg.name %>-bs2/js/advanced.js': ['parser_rules/advanced.js'],
          'dist/<%= pkg.name %>-bs3/js/advanced.js': ['parser_rules/advanced.js'],
          'dist/<%= pkg.name %>-bsi/js/advanced.js': ['parser_rules/advanced.js']
        }
      },
    },

    // qunit: {
    //   options: {
    //     inject: 'js/tests/unit/phantom.js'
    //   },
    //   files: ['js/tests/*.html']
    // },

    jekyll: {
      docs: {}
    },

    // validation: {
    //   options: {
    //     reset: true,
    //     relaxerror: [
    //         "Bad value X-UA-Compatible for attribute http-equiv on element meta.",
    //         "Element img is missing required attribute src."
    //     ]
    //   },
    //   files: {
    //     src: ["_gh_pages/**/*.html"]
    //   }
    // },

    // watch: {
    //   src: {
    //     files: '<%= jshint.src.src %>',
    //     tasks: ['jshint:src', 'qunit']
    //   },
    //   test: {
    //     files: '<%= jshint.test.src %>',
    //     tasks: ['jshint:test', 'qunit']
    //   },
    //   recess: {
    //     files: 'less/*.less',
    //     tasks: ['recess']
    //   }
    // }
  });


  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('browserstack-runner');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-html-validation');
  grunt.loadNpmTasks('grunt-jekyll');
  grunt.loadNpmTasks('grunt-recess');

  // Docs HTML validation task
  grunt.registerTask('validate-html', ['jekyll']);

  // // Test task.
  // var testSubtasks = ['dist-css', 'jshint', 'qunit', 'validate-html'];
  // // Only run BrowserStack tests under Travis
  // if (process.env.TRAVIS) {
  //   // Only run BrowserStack tests if this is a mainline commit in twbs/bootstrap, or you have your own BrowserStack key
  //   if ((process.env.TRAVIS_REPO_SLUG === 'twbs/bootstrap' && process.env.TRAVIS_PULL_REQUEST === 'false') || process.env.TWBS_HAVE_OWN_BROWSERSTACK_KEY) {
  //     testSubtasks.push('browserstack_runner');
  //   }
  // }
  // grunt.registerTask('test', testSubtasks);

  // JS distribution task.
  grunt.registerTask('dist-js', ['concat']);

  // CSS distribution task.
  grunt.registerTask('dist-css', ['recess']);

  // Fonts distribution task.
  grunt.registerTask('dist-copy', ['copy']);

  // Default task.
  grunt.registerTask('default', ['clean', 'dist-css', 'dist-js', 'dist-copy']);


};
