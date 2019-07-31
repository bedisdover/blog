---
title: react ts 引入资源文件
date: 2019-07-22 11:29:27
tags:
  - TypeScript
  - module
  - assets
  - svg
categories: React
---

在 `react ts` 项目中引入静态资源时，出现报错 `Can't find module xxx`，需要在资源文件夹下新建 `index.d.ts` 声明文件，内容如下：

```typescript
// `svg`, `jpg` 等
declare module '*.svg' {
  const content: string;
  export default content;
}

// css module、scss module 等
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
```
