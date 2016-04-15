/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 * GULP Tutorial
 */

var gulp = require('gulp'),
    gulputil = require('gulp-util'),
    gulpcoffee = require('gulp-coffee'),
    concat = require('gulp-concat'),
    browserify = require('gulp-browserify'),
    compass= require('gulp-compass');

//Assign Variable
var build = "builds/",
    source = build + "development/",
    dest =  build + "production/",
    components = "components/",
    coffeePath =  components + "coffee/",
    imageSource = source + "images/",
    imageDest = dest + + "images/",
    cssSource =  source + "css/",
    cssDest = dest + + "css/",
    jsSource = source + "js/",
    jsDest =  dest + "js/",
    saas =  components + "sass/",
    jsPath = components + "scripts/",
    devBuild = ((process.env.NODE_ENV || 'development').trim().toLowerCase()!=='production')
    coffee = { 
        in : coffeePath,
        coffeeAll : coffeePath + "*.coffee",
        coffeeSources : [coffeePath + 'tagline.coffee'] 
    },
    css = {
        in : saas + "style.scss",
        out : (!devBuild) ? cssDest : cssSource,
        compassOpts : 
           { 
                sass : saas,
                image : imageSource,
                style : 'expanded'
        }
    },
   
    js = {
        in : jsPath,
        source : jsSource,
        dest : jsDest,
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
    gulp.src(js.jsSources).pipe(concat('script.js')).pipe(browserify()).pipe(gulp.dest(js.source));
});

gulp.task('compass',function(){
    gulp.src(css.in).pipe(compass(css.compassOpts)).on('error',gulputil.log).pipe(gulp.dest(css.out));
});


gulp.task('default',['coffee','js','compass'],function(){
    
})
