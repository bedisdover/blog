---
title: Hexo 新建文章后自动打开 vim
date: 2018-10-28 17:53:08
tags:
  - vim
categories:
  - 日常记录
---

`Hexo` 项目根目录下，新建脚本 `scripts/edit.js`, 内容如下：

```js
const { spawn } = require('child_process')

hexo.on('new', function(data) {
  spawn('vim', [data.path], { stdio: 'inherit' })
})
```
