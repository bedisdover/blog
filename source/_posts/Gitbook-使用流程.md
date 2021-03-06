---
title: Gitbook 使用流程
date: 2018-10-27 17:34:28
tags: gitbook
categories: 日常记录
---

### 安装

```bash
npm install gitbook -g
```

### 新建项目

```bash
gitbook init
```

<!-- more -->

### 配置信息

新建  `book.json`  文件，内容如下：

```json
{
	"title": "title",
	"description": "description",
	"author": "bedisdover",
	"language" : "zh-hans",
	"links": {
		"sidebar": {
		// 侧边栏链接
		}
	},
	"plugins": [
		// 插件列表
	],
	"pluginsConfig": {
		// 插件配置
	}
}
```

### 配置插件

常用插件列表：

```text
"toggle-chapters"
"splitter"
"prism"
"disqus"
```

配置结束后，安装插件

```bash
gitbook install
```

### 运行服务器

```bash
gitbook serve
```

默认访问路径为  `localhost:4000`

### 编译静态 html

```bash
gitbook build
```
