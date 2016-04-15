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
    connect = require('gulp-connect'),
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
    connectOpts = {
        root: source,
        livereload: true
    },
    css = {
        in : saas + "style.scss",
        out : (!devBuild) ? cssDest : cssSource,
        watch : [saas + "*.scss"],
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
        },
    html = {
       in : source + "*.html"
       
    },
    json = {
        in : jsSource + "*.json"
    };

gulp.task('coffee',function(){
    gulp.src(coffee.coffeeSources).pipe(gulpcoffee({ bare : true }).on('error',gulputil.log)).pipe(gulp.dest(js.in));
})

gulp.task('js',function(){
    gulp.src(js.jsSources).pipe(concat('script.js')).pipe(browserify()).pipe(gulp.dest(js.source)).pipe(connect.reload());
});

gulp.task('compass',function(){
    gulp.src(css.in).pipe(compass(css.compassOpts)).on('error',gulputil.log).pipe(gulp.dest(css.out)).pipe(connect.reload());
});

gulp.task('html',function(){
   gulp.src(html.in).pipe (connect.reload());  
});

gulp.task('json',function(){
   gulp.src(json.in).pipe(connect.reload());
   
});

gulp.task('watch',function(){
    gulp.watch(coffee.coffeeSources,['coffee']);
    gulp.watch(js.jsSources,['js']);
    gulp.watch(css.watch,['compass']);
    gulp.watch(html.in,['html']);
    gulp.watch(json.in,['json']);
});


gulp.task('connect',function(){
   connect.server(connectOpts);
});

gulp.task('default',['html','json','coffee','js','compass','connect','watch'],function(){
    
})
