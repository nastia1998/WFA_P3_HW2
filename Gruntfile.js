
module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        babel: {
            options: {
                sourceMap: true,
                presets: ['@babel/preset-env']
            },
            dist: {
                files: {
                    './es5.js': './computer.js'
                }
            }
        },
        uglify: {
            build: {
                src: 'es5.js',
                dest: 'server.min.js'
            }
        },
        watch: {
            scripts: {
                files: ['index.js'],
                tasks: ['babel', 'uglify'],
                options: {
                    spawn: false,
                },
            }
        }

    });
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['babel', 'uglify', 'watch']);

};