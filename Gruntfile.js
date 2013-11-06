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
          'src/lang/array.js',
          'src/lang/dispatcher.js',
          'src/lang/object.js',
          'src/lang/string.js',
          'src/dom/auto_link.js',
          'src/dom/class.js',
          'src/dom/contains.js',
          'src/dom/convert_to_list.js',
          'src/dom/copy_attributes.js',
          'src/dom/copy_styles.js',
          'src/dom/delegate.js',
          'src/dom/get_as_dom.js',
          'src/dom/get_attribute.js',
          'src/dom/get_parent_element.js',
          'src/dom/get_style.js',
          'src/dom/has_element_with_tag_name.js',
          'src/dom/has_element_with_class_name.js',
          'src/dom/insert.js',
          'src/dom/insert_css.js',
          'src/dom/observe.js',
          'src/dom/parse.js',
          'src/dom/remove_empty_text_nodes.js',
          'src/dom/rename_element.js',
          'src/dom/replace_with_child_nodes.js',
          'src/dom/resolve_list.js',
          'src/dom/sandbox.js',
          'src/dom/contenteditable_area.js',
          'src/dom/set_attributes.js',
          'src/dom/set_styles.js',
          'src/dom/simulate_placeholder.js',
          'src/dom/text_content.js',
          'src/dom/get_attribute.js',
          'src/dom/table.js',
          'src/dom/style.js',
          'src/quirks/clean_pasted_html.js',
          'src/quirks/ensure_proper_clearing.js',
          'src/quirks/get_correct_inner_html.js',
          'src/quirks/redraw.js',
          'src/quirks/table_cells_selection.js',
          'src/selection/selection.js',
          'src/selection/html_applier.js',
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
          'src/toolbar/dialog.js',
          'src/toolbar/modal.js',
          'src/toolbar/speech.js',
          'src/toolbar/toolbar.js',
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
