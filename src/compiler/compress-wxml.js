///@ts-check
"use strict";
var gulp = require("gulp");
var htmlmin = require("gulp-htmlmin");
var rename = require("gulp-rename");
var debug = require("gulp-debug");
var size = require("gulp-size");
var err = require("../log/error");

var TITLE = "wxml:";
/**
 *
 * @param {object} config
 * @param {string|string[]} wxmlsrc
 */
function compress(config, wxmlsrc) {
    return gulp
        .src(wxmlsrc, { base: config.src })
        .pipe(debug({ title: TITLE }))
        .pipe(
            htmlmin({
                caseSensitive: true,
                collapseWhitespace: true,
                collapseBooleanAttributes: false,
                removeComments: config.release,
                minifyCSS: true,
                keepClosingSlash: true,
                html5: false,
                sortClassName: true,
                includeAutoGeneratedTags: false,
                ignoreCustomFragments: [/\{{2,}[\s\S]*?\}{2,}/],
                trimCustomFragments: false,
                customEventAttributes: [/^bind:?[a-z]+/, /^catch:?[a-z]+/, /^wx:[a-z]+/],
            }),
        )
        .on("error", err(TITLE))
        .pipe(rename({ extname: ".wxml" }))
        .pipe(size({ title: TITLE, showFiles: true }))
        .pipe(gulp.dest(config.dist));
}

module.exports = compress;
