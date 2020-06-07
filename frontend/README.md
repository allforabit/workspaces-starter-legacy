# Y2WT Frontend

In order to push the limits and be more than a simple starter, I'm using a sort of microservice architecture that you can delete if you want. This also powers some of my upcoming software at [Blackfall Labs](https://blackfall-labs.com). 

The frontend is powered by React, and served over Express so that you don't have to worry about doing it yourself. Ideally you'd have React as your UI and express as your main application server, interacting with your [backend services](../services/README.md). It'll use [ekalinin/sitemap.js](https://github.com/ekalinin/sitemap.js) to generate a sitemap on request and cache it, as well as serve a robots.txt. If you have more suggestions feel free to make a PR!
