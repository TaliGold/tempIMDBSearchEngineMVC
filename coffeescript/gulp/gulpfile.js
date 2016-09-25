var gulp = require('gulp'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    livereload = require('gulp-livereload'),
    lr = require('tiny-lr'),
    server = lr();


var jsSources = ['components/coffee/main.coffee'];

//Use the 'gulp' object and it's method, 'task'
//Give the task a name (first parameter)
//and execute a function (second parameter)
gulp.task('transMain' , function(){
    //pass the location of our source files.
    // So whenever you work with Gulp JS, usually,
    // the first command is identify Where the files are that you want to process with this task.
    // And you do that by using the gulp.src method, and to that method usually pass in a file name.
    gulp.src(jsSources)
        .pipe(gulp.dest('scripts/mainFromCoffeeScript.js'))
});
//
// //This task is going to be called watch.
// // And, the job of this task is going to be to look for changes in any of the files in the project,
// // (the files in the 'jsSources' array)
// // Look for a change in any of these scripts in 'jsSources,
// // and if one of those scripts changed - execute the JavaScript task 'js'.
// gulp.task('watch', function(){
//     // Create a server that is going to execute a function called "livereload".
//     // Now What that's going to do is actually push things into our browser.
//     // So if we have a HTML page that we're looking at in a browser, it's going to create a server and have that server monitor everything.
//     //And then push any changes and inject them into an HTML document that we're previewing on our browser.
//     var server = livereload();
//     gulp.watch(jsSources , ['js']);
//     //This line right here will take care of updating just the page when anything changes in my script file as well as any html document.
//     gulp.watch(['scripts/*.js' , '*.html'], function (e) {
//         server.changed(e.path);
//     });
// });
//

// The default task is sort of like an index.html page.
// If the task is called "default", it's going to execute it.
// And you won't have to include the name of the task.
// When we were running the terminal before, we executed the 'js' task by typing in 'gulp', and then 'js'.
// The default task is going to be the task that runs automatically,
// and you don't have to type in a name for it.
// So this is what's going to happen: When I run 'gulp',
// it's going to notice that there's a default task.
// It's going to then go through this array, and do the tasks that I list right here.
// // By default, the first task is the JavaScript task.
// gulp.task('default', ['js' , 'watch'] );