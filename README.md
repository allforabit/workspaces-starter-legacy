# Y2WT Starter

![Y2WT Test Runner](https://github.com/TheGrimSilence/yarn-berry-webpack-typescript/workflows/Y2WT%20Test%20Runner/badge.svg?branch=master&event=push)

Get started faster with this Yarn 2, Webpack and TypeScript starter template.

I created this simple repository since I found a severe lack of examples and explanations for various errors I came across when trying to get things working. Feel free to use it for new projects, or even just a code-based documentation like me because I'm forgetful.

This is mostly for me, and over time I'll tweak this as I see fit over time for the best possible performance. I left web development for a long time to focus on Kotlin and Java so I forgot a lot about built tools, but I still have a favoritism for the bleeding edge. It goes without saying, although this is a template repository, it's heavily opinionated for me and my company software.

## 🗣 By the way!

I'm not the best developer. No one is. This repository is a mess because while it _is_ stable, it's still experimental as well. I'm often fond of _**build fast, optimize later, idiomatic minifying last**_. So, "_it goes without saying that we're praying that they don't get out_" The Stupendium, [Slip Into the Void](https://www.youtube.com/watch?v=n6gGE9kxe1M).

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

I've chosen Jest as my test package for it's ease-of-use and support. As much as I absolutely _**hate**_ Babel, it was required to get the ball rolling on account of various errors. I could simply convert the test structure to use independent `test.tsconfig.json`s but that would add to the repetitive tasks. I like the global configs and independent dependency trees approach I have.

For Express, I'm using Supertest, and for React I use both Enzyme and React Testing Library across two separate test files: `.test.tsx` for Enzyme and `.spec.tsx` for React Testing Library. I do this for personal reasons, `spec` implies user interaction, where `test` implies data. Enzyme is best suited for the latter since it offers deep integration testing for an individual component, and RTL allows a high-level interactivity test. This this completely opinionated for me and my software practices, but I like to easily know where to find certain tests.

Another note, I may switch to using `.(test | spec).tsx` instead of naming them, since they're named by their component folders. I prefer to reduce the amount of complexity as much as possible.

---

## ⚠ Known Issues ⚠

### Yarn 2 ECMAScript Modules

Previously I mentioned that simply renaming yarn's files was fix for implementing modules, unfortunately I found that although this is a reported fix, it doesn't play nice with VS Code extensions, Linting and TSC both fail to start completely.

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
