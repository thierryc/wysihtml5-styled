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
              ' * Contributors <%= pkg.contributors %>\n' +
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
        jshintrc: 'src/.jshintrc'
      },
      src: [ 'Gruntfile.js', 'src/**/*.js']
    },

    concat: {
      options: {
        banner: '<%= banner %><%= jqueryCheck %>',
        stripBanners: false
      },
      bs2: {
        src: [
          'src/wysihtml5.js',
          'lib/rangy/rangy-core.js',
          'lib/base/base.js',
          'src/browser.js',
          'src/lang/*.js',
          'src/dom/*.js',
          'src/quirks/*.js',
          'src/selection/*.js',
          'src/commands.js',
          'src/commands/addClass.js',
          'src/commands/bold.js',
          'src/commands/createLink.js',
          'src/commands/createLinkHtml5.js',
          'src/commands/removeLinkHtml5.js',
          'src/commands/fontSize.js',
          'src/commands/foreColor.js',
          'src/commands/formatBlock.js',
          'src/commands/formatInline.js',
          'src/commands/insertHTML.js',
          'src/commands/insertImage.js',
          'src/commands/insertImageHtml5.js',
          'src/commands/removeImageHtml5.js',
          'src/commands/insertLineBreak.js',
          'src/commands/insertRule.js',
          'src/commands/insertOrderedListHtml5.js',
          'src/commands/insertUnorderedListHtml5.js',
          'src/commands/italic.js',
          'src/commands/justify.js',
          'src/commands/justifyCenter.js',
          'src/commands/justifyLeft.js',
          'src/commands/justifyRight.js',
          'src/commands/justifyFull.js',
          'src/commands/redo.js',
          'src/commands/underline.js',
          'src/commands/undo.js',
          'src/commands/indent.js',
          'src/commands/outdent.js',
          'src/commands/fullscreen.js',
          'src/commands/createTable.js',
          'src/commands/mergeTableCells.js',
          'src/commands/addTableCells.js',
          'src/commands/deleteTableCells.js',
          'src/undo_manager.js',
          'src/views/view.js',
          'src/views/composer.js',
          'src/views/composer.style.js',
          'src/views/composer.observe.js',
          'src/views/synchronizer.js',
          'src/views/textarea.js',
          'src/toolbar/*.js',
          'src/keyboardShortcut.js',
          'src/predictive.js',
          'src/editor.js'
        ],
        dest: 'dist/<%= pkg.name %>-bs2/js/<%= pkg.name %>-bs2.js'
      },
      bs3: {
        src: [
          'src/wysihtml5.js',
          'lib/rangy/rangy-core.js',
          'lib/base/base.js',
          'src/browser.js',
          'src/lang/*.js',
          'src/dom/*.js',
          'src/quirks/*.js',
          'src/selection/*.js',
          'src/commands.js',
          'src/commands/addClass.js',
          'src/commands/bold.js',
          'src/commands/createLink.js',
          'src/commands/createLinkHtml5.js',
          'src/commands/removeLinkHtml5.js',
          'src/commands/fontSize.js',
          'src/commands/foreColor.js',
          'src/commands/formatBlock.js',
          'src/commands/formatInline.js',
          'src/commands/insertHTML.js',
          'src/commands/insertImage.js',
          'src/commands/insertImageHtml5.js',
          'src/commands/removeImageHtml5.js',
          'src/commands/insertLineBreak.js',
          'src/commands/insertRule.js',
          'src/commands/insertOrderedListHtml5.js',
          'src/commands/insertUnorderedListHtml5.js',
          'src/commands/italic.js',
          'src/commands/justify.js',
          'src/commands/justifyCenter.js',
          'src/commands/justifyLeft.js',
          'src/commands/justifyRight.js',
          'src/commands/justifyFull.js',
          'src/commands/redo.js',
          'src/commands/underline.js',
          'src/commands/undo.js',
          'src/commands/indent.js',
          'src/commands/outdent.js',
          'src/commands/fullscreen.js',
          'src/commands/createTable.js',
          'src/commands/mergeTableCells.js',
          'src/commands/addTableCells.js',
          'src/commands/deleteTableCells.js',
          'src/undo_manager.js',
          'src/views/view.js',
          'src/views/composer.js',
          'src/views/composer.style.js',
          'src/views/composer.observe.js',
          'src/views/synchronizer.js',
          'src/views/textarea.js',
          'src/toolbar/*.js',
          'src/keyboardShortcut.js',
          'src/predictive.js',
          'src/editor.js'
        ],
        dest: 'dist/<%= pkg.name %>-bs3/js/<%= pkg.name %>-bs3.js'
      },
      bsi: {
        src: [
          'src/wysihtml5.js',
          'lib/rangy/rangy-core.js',
          'lib/base/base.js',
          'src/browser.js',
          'src/lang/*.js',
          'src/dom/*.js',
          'src/quirks/*.js',
          'src/selection/*.js',
          'src/commands.js',
          'src/commands/addClass.js',
          'src/commands/bold.js',
          'src/commands/createLink.js',
          'src/commands/createLinkHtml5.js',
          'src/commands/removeLinkHtml5.js',
          'src/commands/fontSize.js',
          'src/commands/foreColor.js',
          'src/commands/formatBlock.js',
          'src/commands/formatInline.js',
          'src/commands/insertHTML.js',
          'src/commands/insertImage.js',
          'src/commands/insertImageHtml5.js',
          'src/commands/removeImageHtml5.js',
          'src/commands/insertLineBreak.js',
          'src/commands/insertRule.js',
          'src/commands/insertOrderedListHtml5.js',
          'src/commands/insertUnorderedListHtml5.js',
          'src/commands/italic.js',
          'src/commands/justify.js',
          'src/commands/justifyCenter.js',
          'src/commands/justifyLeft.js',
          'src/commands/justifyRight.js',
          'src/commands/justifyFull.js',
          'src/commands/redo.js',
          'src/commands/underline.js',
          'src/commands/undo.js',
          'src/commands/indent.js',
          'src/commands/outdent.js',
          'src/commands/fullscreen.js',
          'src/commands/createTable.js',
          'src/commands/mergeTableCells.js',
          'src/commands/addTableCells.js',
          'src/commands/deleteTableCells.js',
          'src/undo_manager.js',
          'src/views/view.js',
          'src/views/composer.js',
          'src/views/composer.style.js',
          'src/views/composer.observe.js',
          'src/views/synchronizer.js',
          'src/views/textarea.js',
          'src/toolbar/*.js',
          'src/keyboardShortcut.js',
          'src/predictive.js',
          'src/editor.js'
        ],
        dest: 'dist/<%= pkg.name %>-bsi/js/<%= pkg.name %>-bsi.js'
      },
      nobootstrap: {
        src: [
          'lib/bootstrap/js/bootstrap-modal.js',
          'lib/bootstrap/js/bootstrap-dropdown.js'
        ],
        dest: 'dist/<%= pkg.name %>-bsi/js/<%= pkg.name %>-nobootstrap.js'
      }
    },

    uglify: {
      options: {
        banner: '<%= banner %>',
        report: 'min'
      },
      bs2: {
        src: ['<%= concat.bs2.dest %>'],
        dest: 'dist/<%= pkg.name %>-bs2/js/<%= pkg.name %>-bs2.min.js'
      },
      bs3: {
        src: ['<%= concat.bs3.dest %>'],
        dest: 'dist/<%= pkg.name %>-bs3/js/<%= pkg.name %>-bs3.min.js'
      }
    },

    recess: {
      options: {
        compile: true,
        banner: '<%= banner %>'
      },
      editor: {
        files: {
          'dist/<%= pkg.name %>-bs2/css/wysihtml5-styled-editor-body.css': ['src/less/wysihtml5-styled-editor-body.less'],
          'dist/<%= pkg.name %>-bs3/css/wysihtml5-styled-editor-body.css': ['src/less/wysihtml5-styled-editor-body.less'],
          'dist/<%= pkg.name %>-bsi/css/wysihtml5-styled-editor-body.css': ['src/less/wysihtml5-styled-editor-body.less']
        }
      },
      bs2: {
        src: ['src/less/bootstrap-wysihtml5-styled.less'],
        dest: 'dist/<%= pkg.name %>-bs2/css/<%= pkg.name %>-bs2.css'
      },
      bs3: {
        src: ['src/less/bootstrap-wysihtml5-styled.less'],
        dest: 'dist/<%= pkg.name %>-bs3/css/<%= pkg.name %>-bs3.css'
      },
      bsi: {
        src: [
          'src/less/wysihtml5-styled.less', 
          'src/less/bootstrap-wysihtml5-styled.less'
        ],
        dest: 'dist/<%= pkg.name %>-bsi/css/<%= pkg.name %>-bsi.css'
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
      bs2imgs: {
        files: {
          'dist/<%= pkg.name %>-bs2/img/glyphicons-halflings-white.png': ['lib/bootstrap/img/glyphicons-halflings-white.png'],
          'dist/<%= pkg.name %>-bs2/img/glyphicons-halflings.png': ['lib/bootstrap/img/glyphicons-halflings.png']
        }
      },
      sprites_imgs: {
        files: {
          'dist/<%= pkg.name %>-bs2/img/sprite-ap-small-icons-white.png': ['lib/sprite-ap-small/img/sprite-ap-small-icons-white.png'],
          'dist/<%= pkg.name %>-bs2/img/sprite-ap-small-icons.png': ['lib/sprite-ap-small/img/sprite-ap-small-icons.png'],
          'dist/<%= pkg.name %>-bs3/img/sprite-ap-small-icons-white.png': ['lib/sprite-ap-small/img/sprite-ap-small-icons-white.png'],
          'dist/<%= pkg.name %>-bs3/img/sprite-ap-small-icons.png': ['lib/sprite-ap-small/img/sprite-ap-small-icons.png'],
          'dist/<%= pkg.name %>-bsi/img/sprite-ap-small-icons-white.png': ['lib/sprite-ap-small/img/sprite-ap-small-icons-white.png'],
          'dist/<%= pkg.name %>-bsi/img/sprite-ap-small-icons.png': ['lib/sprite-ap-small/img/sprite-ap-small-icons.png']
        }
      }
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

    validation: {
      options: {
        reset: true,
        relaxerror: [
            "Bad value X-UA-Compatible for attribute http-equiv on element meta.",
            "Element img is missing required attribute src."
        ]
      },
      files: {
        src: ["_gh_pages/**/*.html"]
      }
    },

    watch: {
      // src: {
      //   files: '<%= jshint.src.src %>',
      //   tasks: ['jshint:src']
      // },
      // test: {
      //   files: '<%= jshint.test.src %>',
      //   tasks: ['jshint:test', 'qunit']
      // },
      recess: {
        files: 'src/less/*.less',
        tasks: ['recess']
      }
    }
  });


  // These plugins provide necessary tasks.
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
  grunt.registerTask('validate-html', ['jekyll', 'validation']);

  // Docs HTML validation task
  grunt.registerTask('validate-js', ['jshint']);

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

  // Test distribution task.
  grunt.registerTask('test', ['validate-html']);

  // JS distribution task.
  grunt.registerTask('dist-js', ['concat', 'uglify']);

  // CSS distribution task.
  grunt.registerTask('dist-css', ['recess']);

  // Copy distribution task.
  grunt.registerTask('dist-copy', ['copy']);

  // Default task.
  grunt.registerTask('default', ['clean', 'dist-css', 'dist-js', 'dist-copy']);


};
