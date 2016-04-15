/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 * GULP Tutorial
 */

var gulp = require('gulp'),
    gulputil = require('gulp-util'),
    gulpcoffee = require('gulp-coffee'),
    concat = require('gulp-concat');

//Assign Variable
var build = "builds/",
    source = build + "development/",
    dest =  build + "production/",
    components = "components/",
    coffeePath =  components + "coffee/",
    jsPath = components + "scripts/",
    coffee = { 
        in : coffeePath,
        coffeeAll : coffeePath + "*.coffee",
        coffeeSources : [coffeePath + 'tagline.coffee'] 
    },
    saas =  components + "sass/",
    js = {
        in : jsPath,
        source : source + "js/",
        dest : dest + "js/",
        jsSources : [
                        jsPath + "rclick.js",
                        jsPath + "pixgrid.js",
                        jsPath + "tagline.js",
                        jsPath + "template.js"
                      ]
        };

gulp.task('coffee',function(){
    gulp.src(coffee.coffeeSources).pipe(gulpcoffee({ bare : true }).on('error',gulputil.log)).pipe(gulp.dest(js.in));
})

gulp.task('js',function(){
    gulp.src(js.jsSources).pipe(concat('script.js')).pipe(gulp.dest(js.source));
});
