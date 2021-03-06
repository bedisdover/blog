---
title:  sql 注入
date: 2018-12-13 11:24:08
tags:
  -  sql
categories:
  - 日常记录
---

###  sql  注入

 `sql`  注入是发生于应用程序与数据库层的安全漏洞。简而言之，是在输入的字符串之中注入 `sql` 指令，在设计不良的程序当中忽略了字符检查，那么这些注入进去的恶意指令就会被数据库服务器误认为是正常的 `sql` 指令而运行，因此遭到破坏或是入侵。

#### 漏洞检测

##### 页面相似度

分别发送一个逻辑正确的和一个逻辑错误的 `sql` 语句给业务网站 `URL` 的参数，然后通过页面相似度算法，比对业务网站返回的正确页面和错误页面与业务原始页面的相似度，通过相似度判断业务网站 `URL` 是否存在 `sql` 注入漏洞。

<!-- more -->

##### 时间延迟

分别发送一个逻辑正确的和一个逻辑错误的 `sql` 语句给业务网站 `URL` 的参数， `sql` 语句中包含 `sleep()` 函数，正确的逻辑能让 `HTTP` 请求延迟若干秒后返回，从而判断业务网站 `URL` 是否存在 `sql` 注入漏洞。

##### 报错信息

发送畸形字符串 `’”\` 给业务网站 `URL` 的参数，然后通过检测返回内容是否存在数据库报错信息，判断业务网站 `URL` 是否存在 `sql` 注入漏洞。

##### 联合查询

发送 `order by` 和 `union` 语句给业务网站 `URL` 的参数，判断出后端业务查询的字段数，然后通过替换查询内容，判断业务网站 `URL` 是否存在 `sql` 注入漏洞。

#### 漏洞修复

##### 参数化查询

参数化查询（`Parameterized Query` 或 `Parameterized Statement`）是指在设计与数据库链接并访问数据时，在需要填入数值或数据的地方，使用参数 `Parameter` 来给值，这个方法目前已被视为最有效可预防 `sql` 注入攻击的攻击手法的防御方式。

##### 数据校验

对用户传递过来的数据进行严格的数据校验，如果接收的参数为数字型参数，判断参数值是否为数字型，如果不是数字型，拒绝处理；如果接收的参数为字符型参数，对单引号、双引号、反斜杠和 `NULL` 字节进行转义。
