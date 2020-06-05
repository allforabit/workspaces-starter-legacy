# Webpack Yarn 2 TypeScript Starter

I created this simple repository since I found a severe lack of examples and explanations for various errors I came across whem trying to get things working. Feel free to use it for new projects, or even just a code-based documentation like me because I'm forgetful.

This is mostly for me, and over time I'll tweak this as I see fit over time for the best possible performance. I left web development for a long time to focus on Kotlin and Java so I forgot a lot about built tools, but I still have a favoritism for the bleeding edge.

## TODO

There are a handlful of optimisations and additions I need to add, performance and tooling wise for future projects.

- Performance optimisations (will always need work)
- Jest Testing

## Express

One thing that's unavoidable is warnings that come from Express. I found simply turning warnings off does the trick for me. See [lukechilds/keyv #45](https://github.com/lukechilds/keyv/issues/45).

```bash
WARNING in ./.yarn/cache/express-npm-4.17.1-6815ee6bf9-3.zip/node_modules/express/lib/view.js 81:13-25
Critical dependency: the request of a dependency is an expression
 @ ./.yarn/cache/express-npm-4.17.1-6815ee6bf9-3.zip/node_modules/express/lib/application.js
 @ ./.yarn/cache/express-npm-4.17.1-6815ee6bf9-3.zip/node_modules/express/lib/express.js
 @ ./.yarn/cache/express-npm-4.17.1-6815ee6bf9-3.zip/node_modules/express/index.js
 @ ./src/server.ts
```

## Errors

Simply set your build `target` to `async-node` to fix errors about missing dependency declarations. You'll see similar errors otherwise.

```bash
Required package: fs (via "fs")
Required by: send@npm:0.17.1 (via /C:/Users/adria/Desktop/Grim/projects/yarn-berry-webpack-typescript/.yarn/cache/send-npm-0.17.1-aad5512679-3.zip/node_modules/send/index.js)

 @ ./.yarn/cache/send-npm-0.17.1-aad5512679-3.zip/node_modules/send/index.js 23:9-22
 @ ./.yarn/cache/express-npm-4.17.1-6815ee6bf9-3.zip/node_modules/express/lib/response.js
 @ ./.yarn/cache/express-npm-4.17.1-6815ee6bf9-3.zip/node_modules/express/lib/express.js
 @ ./.yarn/cache/express-npm-4.17.1-6815ee6bf9-3.zip/node_modules/express/index.js
 @ ./src/server.ts
```

## Workspaces

Yarn 2 comes with a revamp of workspaces, smarter and faster. There are a few caveats of course, in that while some dependencies can be added at the root level, others must be added on a per-workspace basis. For example, TypeScript is a global workspace tool, but Express is an individual workspace module. They all use the same `.yarn/cache` but have independent needs. This makes sense, why globally install Chalk if only one workspace uses it? Unfortunately you can't add express globally and expect it to work, TypeScript will tell you the dependency doesn't exist.
