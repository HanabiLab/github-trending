var request = require("request");
var cheerio = require("cheerio");

var Crawler = (function(){
    function Crawler(config) {
        this.config = config || {};
        this.cache = null;
    }

    Crawler.prototype.fetchTrendPage = function(lang) {
        var target = {
            url: "https://github.com/trending"
        };
        if (lang) {
            target.url += "?l=" + lang;
        }
        return new Promise(function (resolve, reject){
            request(target, function(err, res, body){
                if (err) {
                    reject(err);
                    return;
                }
                if (res.statusCode != 200) {
                    reject(new Error("Request Page Error, Status Code: " + res,statusCode));
                    return;
                }
                resolve(body);
            });
        });
    };

    Crawler.prototype.fetchTrendRepos = function (lang, callback) {
        return this.fetchTrendPage(lang).then(function (html){
            var $ = cheerio.load(html);
            // TODO: Refactor all the code below for better crawler result
            var result = [];
            $(".repo-list-item").each(function(i, elem){
                var res = []
                var after_link = $(this).children(".repo-list-name").children("a").attr("href");
                res.link = "https://github.com" + after_link;
                res.name = $(this).children(".repo-list-name").text().replace(/\s+/g, "");
                res.desc = $(this).children(".repo-list-description").text().replace(/\s+/g, " ");
                var meta = $(this).children(".repo-list-meta").text().replace(/\s+/g, '').split("•");
                res.lang = meta[0];
                res.stars = meta[1].replace("starstoday", "");
                result.push(res)
            });
            callback(result);
        });
    };

    return Crawler;

})();

exports.Crawler = Crawler;