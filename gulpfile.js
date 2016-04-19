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
    devBuild = ((process.env.NODE_ENV || 'development').trim().toLowerCase()!=='production'),
    envOutputDir=source,
    sassStyle='expanded';
    
  if(!devBuild){
        envOutputDir = dest;
        sassStyle='compressed';
        console.log(sassStyle);
    }
    
var 
    components = "components/",
    coffeePath =  components + "coffee/",
    imageSource = envOutputDir + "images/",
    cssSource =  envOutputDir + "css/",
    jsSource = envOutputDir + "js/",
    saas =  components + "sass/",
    jsPath = components + "scripts/";
    
    coffee = { 
        in : coffeePath,
        coffeeAll : coffeePath + "*.coffee",
        coffeeSources : [coffeePath + 'tagline.coffee'] 
    },
    connectOpts = {
        root: envOutputDir,
        livereload: true
    },
    css = {
        in : saas + "style.scss",
        out : cssSource,
        watch : [saas + "*.scss"],
        compassOpts : 
           { 
                sass : saas,
                image : imageSource,
                style : sassStyle
        }
    },
   
    js = {
        in : jsPath,
        source : jsSource,
        jsSources : [
                        jsPath + "rclick.js",
                        jsPath + "pixgrid.js",
                        jsPath + "tagline.js",
                        jsPath + "template.js"
                      ]
        },
    html = {
       in : envOutputDir + "*.html",
       out : envOutputDir
       
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
   gulp.src(html.in).pipe(gulp.dest(html.out)).pipe (connect.reload());  
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
