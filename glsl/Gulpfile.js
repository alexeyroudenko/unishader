var gulp = require("gulp");
var glslify = require("gulp-glslify");

gulp.task("default", null, function() {
    gulp.src("./src/*.{vert,frag,glsl}")
      .pipe(glslify())
      .pipe(gulp.dest("./bin/"));
});
