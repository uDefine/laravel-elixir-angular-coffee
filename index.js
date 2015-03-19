var gulp = require('gulp');
var elixir = require('laravel-elixir');
var plugins = require('gulp-load-plugins')();
var notify = require('gulp-notify');

/*
 |----------------------------------------------------------------
 | CoffeeScript Compilation
 |----------------------------------------------------------------
 |
 | This task will compile your CoffeeScript, minify it, and then
 | optionally generate a "manifest" file that helps with your
 | browser cache-busting of previous versions of your code.
 |
 */

elixir.extend('angularCoffee', function(src, output, outputFilename) {

    var config = this;

    var baseDir = src || config.assetsDir + 'coffee/';

    gulp.task('angularCoffee', function() {

        var onError = function(err) {
            notify.onError({
                title:    "Laravel Elixir",
                subtitle: "Angular Compilation Failed!",
                message:  "Error: <%= error.message %>",
                icon: __dirname + '/../laravel-elixir/icons/fail.png'
            })(err);

            this.emit('end');
        };

        return gulp.src(baseDir)
            .pipe(plugins.if(config.sourcemaps, plugins.sourcemaps.init()))
            .pipe(plugins.coffee({bare: true}).on('error', onError))
            .pipe(plugins.ngAnnotate())
            .pipe(plugins.concat(outputFilename || 'app.js'))
            .pipe(plugins.if(config.production, plugins.uglify()))
            .pipe(plugins.if(config.sourcemaps, plugins.sourcemaps.write('.')))
            .pipe(gulp.dest(output || config.jsOutput))
            .pipe(notify({
                title: 'Laravel Elixir',
                subtitle: 'Angular Compiled!',
                icon: __dirname + '/../laravel-elixir/icons/laravel.png',
                message: ' '
            }));
    });

    this.registerWatcher('angularCoffee', baseDir);

    return this.queueTask('angularCoffee');

});
