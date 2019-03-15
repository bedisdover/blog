---
title: 解决 phpunit 中出现的 PDOException
date: 2019-02-15 11:18:07
tags:
  - PHP
  - phpunit
  - PDO
  - PDOException
categories:
  - 日常记录
---

使用 `phpunit` 进行单元测试，在 `bootstrap.php` 中初始化 `PDO` 对象，会出现如下报错：

```
PDOException : You cannot serialize or unserialize PDO instances
```

`phpunit` 默认会备份全局对象，操作 `PDO` 时就会报错，要解决这个问题，只需要在配置文件中取消备份即可

```xml
<!-- phpunit.xml -->
<phpunit
    bootstrap="test/bootstrap.php"
    backupGlobals="false">
</phpunit>
```
