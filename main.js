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

    Crawler.prototype.fetchTrendRepos = function (lang) {
        return this.fetchTrendPage(lang).then(function (html){
            var dom = cheerio.load(html);
            // TODO: Refactor all the code below for better crawler result 
            var res1 = dom(".repo-list-item .repo-list-name a")
                .toArray()
                .map(function(a){
                    var href = a.attribs['href'];
                    var match = href.match(/^\/([^\/]+)\/([^\/]+)$/);
                    return match;
                });
            var res2 = dom('.repo-list-item .repo-list-description')
                .toArray()
                .map(function(a){
                    var desc = a.children[0].data;
                    if (desc){
                        desc = desc.replace(/\s+/g, ' ');
                    }
                    else{
                        desc = "";
                    }
                    return desc;
                });
            var res3 = dom('.repo-list-item .repo-list-meta')
                .toArray()
                .map(function(a){
                    var meta = a.children[0].data;
                    meta = meta.replace(/\s+/g, ' ');
                    meta = meta.split('•');
                    return meta;
                });
            result = []
            for (var idx = 0; idx < res1.length; idx++){
                var item = [];
                item.owner = res1[idx][1];
                item.name = res1[idx][2];
                item.desc = res2[idx];
                item.lang = res3[idx][0];
                item.stars = res3[idx][1];
                result[idx] = item;
            };
            return result;
        });
    };

    return Crawler;

})();

exports.Crawler = Crawler;