# Yarn 2, Webpack 4, Typescript 3.9 Starter with ESlint + Prettier Support

![Y2WT Test Runner](https://github.com/TheGrimSilence/yarn-berry-webpack-typescript/workflows/Y2WT%20Test%20Runner/badge.svg?branch=master&event=push)

I created this simple repository since I found a severe lack of examples and explanations for various errors I came across when trying to get things working. Feel free to use it for new projects, or even just a code-based documentation like me because I'm forgetful.

This is mostly for me, and over time I'll tweak this as I see fit over time for the best possible performance. I left web development for a long time to focus on Kotlin and Java so I forgot a lot about built tools, but I still have a favoritism for the bleeding edge.

## Table of Contents

- [Express](#express)
  - [supertest](#testing-with-supertest)
- [Workspaces](#workspaces)
- [ESLint + Prettier](#eslint-+-prettier)
- [Testing](#testing)
- [Known Issues](#⚠-known-issues-⚠)
  - [ESCMAScript Modules](#yarn-2-ecmascript-modules)
  - [Webpack](#webpack)

---

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


### Testing with `supertest`

One caveat to testing Express with Supertest is that you have to separate `app.listen()` from your main endpoints. Otherwise Jest will complain about open handles (yarn jest --detectOpenHandles) and won't exit correctly.

---

## Workspaces

Yarn 2 comes with a revamp of workspaces, smarter and faster. There are a few caveats of course, in that while some dependencies can be added at the root level, others must be added on a per-workspace basis. For example, TypeScript is a global workspace tool, but Express is an individual workspace module. They all use the same `.yarn/cache` but have independent needs. This makes sense, why globally install Chalk if only one workspace uses it? Unfortunately you can't add express globally and expect it to work, TypeScript will tell you the dependency doesn't exist.

---

## ESLint + Prettier

> In the TypeScript 2019 Roadmap, the TypeScript core team explains that ESLint has a more performant architecture than TSLint and that they will only be focusing on ESLint when providing editor linting integration for TypeScript. For that reason, I would recommend using ESLint for linting TypeScript projects. -- [Robert Cooper](https://www.robertcooper.me/using-eslint-and-prettier-in-a-typescript-project).

You can read about his implementation by following that link to his website.

In order to get things working with Yarn 2, simply run `yarn pnpify --sdk` if you're having issues with ESLint and Prettier extensions in VS Code. It's that simple!

---

## Testing

I've chosen Jest as my test package for it's ease-of-use and support. As much as I absolutely *__hate__* Babel, it was required to get the ball rolling on account of various errors. I could simply convert the test structure to use independent `test.tsconfig.json`s but that would add to the repetitive tasks. I like the global configs and independent dependency trees approach I have.

For Express, I'm using Supertest, and plan on adding Enzyme for React soon as well to cover the main areas of concern. Or, I may begin to branch these out for individual use cases. Still deciding.

---

## ⚠ Known Issues ⚠

### Yarn 2 ECMAScript Modules

Under normal circumstances, simple adding `"type": "module"` to your package.json would enable `import` methods. However, it gets complicated with *Y2*. When you *enable modules* you have to make a few changes, and repeat those changes when importing new plugins for *Y2*. Read [Make yarn work inside a workspace with "type": "module" #1354](https://github.com/yarnpkg/berry/pull/1354) and [[Bug] Yarn Nightly and "type": "module" fail to work #985](https://github.com/yarnpkg/berry/issues/985) for more information on this. To summarize:

```bash
# Edit .yarnrc.yml to match
# ...
# yarnPath ".yarn/releases/yarn-berry.cjs"
# ...

# If you have plugins, rename those too
# ...
# plugins:
#   - path: .yarn/plugins/@yarnpkg/plugin-typescript.cjs
#     spec: "@yarnpkg/plugin-typescript"
#   - path: .yarn/plugins/@yarnpkg/plugin-workspace-tools.cjs
#     spec: "@yarnpkg/plugin-workspace-tools"
# ...

# Rename your binary
mv .\.yarn\releases\yarn-berry.js .\.yarn\releases\yarn-berry.cjs
# Rename your plugins
mv .\.yarn\plugins\@yarnpkg\plugin-typescript.js .\.yarn\plugins\@yarnpkg\plugin-typescript.cjs
mv .\.yarn\plugins\@yarnpkg\plugin-workspace-tools.js .\.yarn\plugins\@yarnpkg\plugin-workspace-tools.cjs
# ...
```

### Webpack

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
