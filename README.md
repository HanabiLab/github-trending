# github-trend-crawler
---
Crawler for github trending page

## Install

    npm install github-trend-crawler

##Usage

    var trend = require('github-trend-crawler');

    scraper = new trend.Crawler();

    scraper.fetchTrendRepos("", function(repos){
        repos.forEach(function(repo){
            console.log(repo.owner);
            console.log(repo.name);
            console.log(repo.desc);
        });
    }).catch(function(err){
        console.log(err.message);
    });
    
Crawler will fetch 5 kinds data of each repo:

	link:   Repo link
	name:	Repo name
	desc:	Repo desciption
	lang:	Repo main language
	stars:  Repo stars today