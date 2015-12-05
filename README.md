# github_trending\_node
---
Crawler for github trending page

## Install

    npm install github_trending_node

##Usage

    var test = require('github_trending_node');

    scraper = new test.Crawler();

    scraper.fetchTrendRepos("").then(function(repos){
        repos.forEach(function(repo){
            console.log(repo.owner);
            console.log(repo.name);
            console.log(repo.desc);
        });
    }).catch(function(err){
        console.log(err.message);
    });
    
Crawler will fetch 5 kinds data of each repo:

	owner: Repo owner name
	name:	Repo name
	desc:	Repo desciption
	lang:	Repo main language
	stars: Repo stars today

##TODO:

Find better way to fetch data, now there are still some problems.