'use strict';
var LIVERELOAD_PORT = 35729;
var SERVER_PORT = 9000;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};




// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'
// templateFramework: 'lodash'

module.exports = function (grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // configurable paths
    var yeomanConfig = {
        app: 'app',
        dist: 'dist'
    };

    //create the grunt configuration object...
    var config = {
        yeoman: yeomanConfig,
        watch: {
            options: {
                nospawn: true,
                livereload: true
            },
            //re-cook the css when sass files change
            compass: {
                files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['compass']
            },
            //trigger page re-load when these files change
            livereload: {
                options: {
                    livereload: LIVERELOAD_PORT
                },
                files: [
                    '<%= yeoman.app %>/*.html',
                    '{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css',
                    '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
                    '<%= yeoman.app %>/scripts/templates/*.{jst,mustache,hbs}',
                    'test/spec/**/*.js'
                ]
            },
            //compile templates when they change
            jst: {
                files: [
                    '<%= yeoman.app %>/scripts/**/*.jst.html'
                ],
                tasks: ['jst']
            },
            js: {
                files: ['<%= yeoman.app %>/scripts/**/*.js', '!<%= yeoman.app %>/scripts/**/*.{spec,mock}.js'],
                tasks: ['jshint:all', 'jasmine:active'], 
                options: {
                  livereload: true
                }
            },
            //any time a js file changes, lint, active, all
            test: {
                files: ['<%= yeoman.app %>/scripts/{,*/}*.js', 'test/spec/**/*.js', '!<%= yeoman.app %>/scripts/templates.js'],
                tasks: ['watch-task']
            }
        },

        connect: {
            options: {
                port: SERVER_PORT,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, yeomanConfig.app)
                        ];
                    }
                }
            },
            test: {
                options: {
                    port: 9001,
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'test'),
                            mountFolder(connect, yeomanConfig.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, yeomanConfig.dist)
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>'
            },
            test: {
                path: 'http://localhost:<%= connect.test.options.port %>'
            }
        },
        clean: {
            dist: ['.tmp', '<%= yeoman.dist %>/*'],
            server: '.tmp'
        },
        jshint: {
            options: {
                    'node': true,
                    'browser': true,
                    'esnext': true,
                    'bitwise': true,
                    'camelcase': true,
                    'curly': true,
                    'eqeqeq': true,
                    'immed': true,
                    'latedef': true,
                    'newcap': true,
                    'noarg': true,
                    'quotmark': 'single',
                    'regexp': true,
                    'undef': true,
                    'smarttabs': true,
                    'jquery': true,
                reporter: require('jshint-stylish'),
                globals: {
                    '_': true,
                    '$':true,
                    'ga':true,
                    'unescape':true,
                    'include': true,
                    'Backbone': true,
                    'Marionette': true,
                    'Modernizr':true,
                    'console': true,
                    'esri': true,
                    'dojo': true,
                    'window': true,
                    'setTimeout': true,
                    'clearTimeout': true,
                    'document': true,
                    'localStorage': true,
                    'describe':true,
                    'it': true,
                    'afterEach': true,
                    'beforeEach': true,
                    'expect': true,
                    'AppName':true,
                    'JST':true,
                    'util':true,
                    'alert': true
                }
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.app %>/scripts/{,*/}*.js',
                '!<%= yeoman.app %>/scripts/vendor/*',
                'test/spec/{,*/}*.js'
            ]
        },

        'gh-pages':{
            options: {
                base: 'dist',
                message: 'Auto-generated commit by grunt-gh-pages'
            },
            src:['**']
        },


        jasmine: {
            all:{

                src: ['./app/scripts/**/*.js', '!./app/scripts/bootstrapper.js'],
               
                options: {
                  specs: ['./test/spec/**/*.spec.js'],
                  helpers: [
                    './test/helpers/*.js', 
                    './test/bower_components/jasmine-jquery/lib/jasmine-query.js'
                  ],
                  template:'./test/runner.tmpl',
                  vendor:[
                    './app/bower_components/modernizr/modernizr.js',
                    './app/bower_components/jquery/dist/jquery.min.js',
                    './app/bower_components/underscore/underscore.js',
                    './app/bower_components/backbone/backbone.js',
                    './app/bower_components/marionette/lib/backbone.marionette.min.js',
                    './app/lib/lealflet-0.7.3/leaflet.js',
                    './app/lib/esri-lealflet/0.0.1-beta.5/esri-leaflet.js',
                    './app/lib/esri-lealflet/0.0.1-beta.5/esri-leaflet-clustered-feature-layer.js',
                    './app/lib/lealflet-markercluster/leaflet.markercluster.js',
                    './app/lib/compiled-templates.js'
                  ],
                  keepRunner: true
                }
            }          
        },
        compass: {
            options: {
                sassDir: '<%= yeoman.app %>/styles',
                cssDir: '.tmp/styles',
                imagesDir: '<%= yeoman.app %>/images',
                javascriptsDir: '<%= yeoman.app %>/scripts',
                fontsDir: '<%= yeoman.app %>/styles/fonts',
                importPath: '<%= yeoman.app %>/bower_components',
                relativeAssets: true
            },
            dist: {},
            server: {
                options: {
                    debugInfo: true
                }
            }
        },
        // not enabled since usemin task does concat and uglify
        // check index.html to edit your build targets
        // enable this task if you prefer defining your build targets here
        /*uglify: {
            dist: {}
        },*/
        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>'
            }
        },
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css','<%= yeoman.dist %>/styles/{,*/}*.css'],
            options: {
                dirs: ['<%= yeoman.dist %>']
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },
        cssmin: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/styles/main.css': [
                        '.tmp/styles/{,*/}*.css',
                        '<%= yeoman.app %>/styles/{,*/}*.css'
                    ]
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    /*removeCommentsFromCDATA: true,
                    // https://github.com/yeoman/grunt-usemin/issues/44
                    //collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true*/
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>',
                    src: '*.html',
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,txt}',
                        '.htaccess',
                        'images/{,*/}*.{webp,gif}',
                        'styles/fonts/{,*/}*.*',
                        'bower_components/sass-bootstrap/fonts/*.*'
                    ]
                }]
            }
        },
        jst: {
            compile: {
                options:{
                    prettify: true,
                    processName: function(filePath){
                        return filePath.replace(/app\//,'');
                    }
                },
                files: {
                    '<%= yeoman.app %>/lib/compiled-templates.js': ['<%= yeoman.app %>/scripts/**/*.jst.html']
                }
            }
        },
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/scripts/{,*/}*.js',
                        '<%= yeoman.dist %>/styles/{,*/}*.css',
                        '/styles/fonts/{,*/}*.*',
                        'bower_components/sass-bootstrap/fonts/*.*'
                    ]
                }
            }
        },
        
    };


    //initialize grunt
    grunt.initConfig(config);

    grunt.loadNpmTasks('grunt-contrib-jasmine');

    grunt.registerTask('createDefaultTemplate', function () {
        grunt.file.write('.tmp/scripts/templates.js', 'this.JST = this.JST || {};');
    });

    grunt.registerTask('server', function (target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve:' + target]);
    });

    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'open:server', 'connect:dist:keepalive']);
        }

        if (target === 'test') {
            return grunt.task.run([
                'clean:server',
                'createDefaultTemplate',
                'jst',
                'compass:server',
                'connect:test',
                'open:test',
                'watch:livereload'
            ]);
        }

        grunt.task.run([
            'clean:server',
            'createDefaultTemplate',
            'jst',
            'compass:server',
            'connect:livereload',
            'open:server',
            'watch'
        ]);
    });


    grunt.registerTask('build', [
        'clean:dist',
        'createDefaultTemplate',
        'jst',
        'compass:dist',
        'useminPrepare',
        'imagemin',
        'htmlmin',
        'concat',
        'cssmin',
        'uglify',
        'copy',
        'rev',
        'usemin'
    ]);

    grunt.registerTask('watch-task', [ 'jshint', 'jasmine:active', 'jasmine:alltests' ]);

    grunt.registerTask('default', [
        'jshint',
        'test',
        'build'
    ]);
    grunt.registerTask('deploy', [
        'build',
        'gh-pages',
      ]); 
};
