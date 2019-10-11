---
title: Git flow 使用
date: 2018-10-31 16:37:41
tags:
  - git
  - git flow
categories:
  - 开发工具
---

## git flow 使用

`git flow` 源于 `Vincent Driessen` 在 2010 年发布的 [一篇博客](https://nvie.com/posts/a-successful-git-branching-model/)，用于管理 `git` 分支。分支类型包含以下几项：

- master
- develop
- feature/\*
- hotfix/\*
- release/\*
- bugfix/\*
- support/\*

本文介绍一种简化的流程，仅包含 `master`, `develop`, `feature` 及 `hotfix`。

<!-- more -->

### 初始化

```bash
git flow init
```

### master

`master` 分支用于发布上线，随时可发布。

### develop

`develop` 分支用于日常开发，存放最新的开发版本。

### feature

`feature` 分支用于开发新需求，从 `develop` 分支新建，开发结束后需要合并回 `develop`。

```bash
# 新增 feature 分支
git flow feature start feature_branch

# 发布到远程仓库
git flow feature publish feature_branch

# 提交代码
git add <git-file>
git commit -a
git push

# 合并至develop
git flow feature finish feature_branch

# 推送至远程仓库
git push
```

### hotfix

`hotfix` 分支用于修复线上 `bug`，从 `master` 分支新建，开发结束后需要合并至 `develop` 和 `master`。

```bash
# 新增 hotfix 分支
git flow hotfix start hotfix_branch

# 发布到远程仓库
git flow hotfix publish hotfix_branch

# 提交代码
git add <git-file>
git commit -a
git push

# 合并至 master, develop
git flow hotfix finish hotfix_branch

# 推送至远程仓库(当前位于 develop 分支)
git push
git checkout master
git push
```

## 命令详情

### start

```bash
git flow feature start feature_branch
```

等价于

```bash
git config --local gitflow.branch.feature/feature_branch.base develop
git checkout -b feature/feature_branch develop
```

`git flow hotfix` 同 `git flow feature`

### publish

```bash
git flow feature publish feature_branch
```

等价于

```bash
git fetch -q origin
git push -u origin feature/feature_branch:feature/feature_branch
git fetch -q origin feature/feature_branch
git checkout feature/feature_branch
```

`git flow hotfix` 同 `git flow feature`

### finish

#### feature

```bash
git flow feature finish feature_branch
```

等价于

```bash
git fetch -q origin feature/feature_branch
git checkout develop
git merge --no-ff feature/feature_branch
git branch -d feature/feature_branch
```

### hotfix

```bash
git flow hotfix finish hotfix_branch
```

等价于

```bash
git checkout master
git merge --no-ff hotfix/hotfix_branch
git tag -a hotfix_branch
git checkout develop
git merge --no-ff hotfix_branch
git branch -d hotfix/hotfix_branch
```
