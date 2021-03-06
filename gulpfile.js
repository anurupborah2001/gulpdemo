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
    gulpif = require('gulp-if'),
    minifyHTML = require('gulp-minify-html'),
    uglify =  require('gulp-uglify'),
    jsonMinify = require('gulp-jsonminify'),
    imagemin = require('gulp-imagemin'),
    pngcrush = require('imagemin-pngcrush'),
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
    }
    
var 
    components = "components/",
    coffeePath =  components + "coffee/",
    imageSource = envOutputDir + "images/",
    imageDev = source + "images/",
    cssSource =  envOutputDir + "css/",
    jsSource = envOutputDir + "js/",
    jsDev = source + "js/*.json",
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
        compassOpts : { 
                sass : saas,
                image : imageSource,
                style : sassStyle
        }
    },
   images = {
       in  : imageDev + "**/*.*",
       out : imageSource,
       imagminOpts : {
           progressive  :true,
           svgoPlugins : [{ removeViewBox : false }],
           use : [pngcrush()]
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
       out : envOutputDir,
       devPath : source + "*.html"
    },
    json = {
        in : jsDev,
        out : jsSource
    };

gulp.task('coffee',function(){
    gulp.src(coffee.coffeeSources).pipe(gulpcoffee({ bare : true }).on('error',gulputil.log)).pipe(gulp.dest(js.in));
})

gulp.task('js',function(){
    gulp.src(js.jsSources).pipe(concat('script.js')).pipe(browserify()).pipe(gulpif(!devBuild,uglify())).pipe(gulp.dest(js.source)).pipe(connect.reload());
});

gulp.task('compass',function(){
    gulp.src(css.in).pipe(compass(css.compassOpts)).on('error',gulputil.log).pipe(gulp.dest(css.out)).pipe(connect.reload());
});

gulp.task('images',function(){
    gulp.src(images.in).pipe(gulpif(!devBuild,imagemin(images.imagminOpts))).pipe(gulpif(!devBuild,gulp.dest(images.out))).pipe(connect.reload());
});

gulp.task('html',function(){
   gulp.src(html.devPath).pipe(gulpif(!devBuild,minifyHTML())).pipe(gulpif(!devBuild,gulp.dest(html.out))).pipe (connect.reload());  
});

gulp.task('json',function(){
   gulp.src(json.in).pipe(gulpif(!devBuild,jsonMinify())).pipe(gulpif(!devBuild,gulp.dest(json.out))).pipe(connect.reload());
});

gulp.task('watch',function(){
    gulp.watch(coffee.coffeeSources,['coffee']);
    gulp.watch(js.jsSources,['js']);
    gulp.watch(css.watch,['compass']);
    gulp.watch(html.devPath,['html']);
    gulp.watch(json.in,['json']);
    gulp.watch(images.in,['images']);
});


gulp.task('connect',function(){
   connect.server(connectOpts);
});

gulp.task('default',['html','json','coffee','js','compass','images','connect','watch'],function(){
    
})
