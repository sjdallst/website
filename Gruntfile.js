module.exports = function(grunt) {

    grunt.initConfig({
        nodemon: {
            dev: {
                script: 'index.js'
            }
        },
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'app/sass',
                    src: ['*.scss'],
                    dest: './public/css',
                    ext: '.css'
                }],
                options: {
                    sourcemap: 'none'
                }
            }
        },
        jshint: {
            all: [
                'app/**/*.js',
                'config/**/*.js',
                'db/**/*.js',
                'models/**/*.js',
                'utils/**/*.js',
                'Gruntfile.js',
                'index.js'
            ],
            options: {
                node: true
            }
        },
        watch: {
            css: {
                files: 'app/sass/*.scss',
                tasks: ['sass']
            },
            js: {
                files: './**/*.js',
                tasks: ['jshint']
            }
        },
        concurrent: {
            target: {
                tasks: ['watch', 'nodemon'],
                options: {
                    logConcurrentOutput: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concurrent');

    grunt.registerTask('default', ['concurrent:target']);
};