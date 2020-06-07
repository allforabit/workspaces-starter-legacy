# Y2WT Starter

![Y2WT Test Runner](https://github.com/TheGrimSilence/yarn-berry-webpack-typescript/workflows/Y2WT%20Test%20Runner/badge.svg?branch=master&event=push)

Get started faster with this Yarn 2, Webpack and TypeScript (referred to as "Y2WT") starter template.

I created this simple repository since I found a severe lack of examples and explanations for various errors I came across when trying to get things working. Feel free to use it for new projects, or even just a code-based documentation like me because I'm forgetful.

This is mostly for me, and over time I'll tweak this as I see fit over time for the best possible performance. I left web development for a long time to focus on Kotlin and Java so I forgot a lot about built tools, but I still have a favoritism for the bleeding edge. It goes without saying, although this is a template repository, it's heavily opinionated for me and my company software.

## 🗣 By the way!

I'm not the best developer. No one is. This repository is a mess because while it _is_ stable, it's still experimental as well. I'm often fond of _**build fast, optimize later, idiomatic minifying last**_. So, "_it goes without saying that we're praying that they don't get out_" The Stupendium, [Slip Into the Void](https://www.youtube.com/watch?v=n6gGE9kxe1M). For any information, feel free to check out the small [wiki](https://github.com/TheGrimSilence/Yarn-2-Webpack-TypeScript/wiki).

---

## Workspaces

Yarn 2 comes with a revamp of workspaces, smarter and faster. There are a few caveats of course, in that while some dependencies can be added at the root level, others must be added on a per-workspace basis. For example, TypeScript is a global workspace tool, but Express is an individual workspace module. They all use the same `.yarn/cache` but have independent needs. This makes sense, why globally install Chalk if only one workspace uses it? Unfortunately you can't add express globally and expect it to work, TypeScript will tell you the dependency doesn't exist.
