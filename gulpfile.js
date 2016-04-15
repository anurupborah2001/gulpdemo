/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 * GULP Tutorial
 */

var gulp = require('gulp'),
    gulputil = require('gulp-util'),
    gulpcoffee = require('gulp-coffee');

//Assign Variable
var components ="components/",
    coffee = components + "coffee/",
    coffeeSources = [coffee + 'tagline.coffee'],
    coffeeAll = coffee + "*.coffee",
    saas =  components + "sass/",
    js = components + "scripts/",
    build = "builds/",
    source = build + "development/",
    dest =  build + "production/";

gulp.task('coffee',function(){
    gulp.src(coffeeSources).pipe(gulpcoffee({ bare : true }).on('error',gulputil.log)).pipe(gulp.dest(js));
})
