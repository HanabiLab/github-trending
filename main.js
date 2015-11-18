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
})