
const { DateTime } = require("luxon");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const htmlmin = require("html-minifier");

module.exports = (function(eleventyConfig) {
    // 日付表示変換フィルタ
    eleventyConfig.addFilter("readableDate", dateObj => {
        return DateTime.fromJSDate(dateObj).setLocale('ja').toFormat("yyyy'年'M'月'd'日'");
    });

    // シンタックスハイライト
    eleventyConfig.addPlugin(syntaxHighlight);

    // HTMLのminify
    eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
        // Eleventy 1.0+: use this.inputPath and this.outputPath instead
        if( outputPath.endsWith(".html") ) {
            let minified = htmlmin.minify(content, {
                useShortDoctype: true,
                removeComments: true,
                collapseWhitespace: true
            });
            return minified;
        }

        return content;
    });

    // 11ty設定
    return {
        templateFormats: [
            "md",
            "njk",
            "html"
        ],
        pathPrefix: "/",
        markdownTemplateEngine: "liquid",
        htmlTemplateEngine: "njk",
        dataTemplateEngine: "njk",
        passthroughFileCopy: true,
        dir: {
            input: "src/html",
            data: "_data",
            output: "dist"
        }
    };
});
