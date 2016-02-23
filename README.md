# github-trending
---
Crawler for github trending page

## Install

    npm install github-trending

##Usage

    var test = require('github_trending_node');

    scraper = new test.Crawler();

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