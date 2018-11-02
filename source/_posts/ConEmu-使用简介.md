---
title: ConEmu 使用简介
date: 2018-11-02 18:13:02
tags:
  - ConEmu
categories:
  - 开发工具
---

`Linux` 系统中经常使用`Tmux` 实现分屏，`windows` 系统中可以使用`ConEmu` 实现类似功能。

[ConEmu](https://conemu.github.io/) 是个可以集中托管各种终端窗口的控制台应用程序，通过它你可以在一个应用中同时使用`cmd`，`Git Bash`，`PowerShell`等多个应用程序。当然也可以间接实现同一个控制台应用的分屏操作。

### 安装

直接下载[安装包](https://www.fosshub.com/ConEmu.html)，双击安装即可。

<!-- more -->

### 配置

#### 粘贴文本

`ConEmu` 支持多行粘贴(`Ctrl + v`)与单行粘贴(`Shift + Ins`)。

默认支持鼠标右键粘贴文本，可通过 `Settings` -> `Keys & Macro` -> `Mouse` -> `Mouse button actions` 关闭。

#### 中文支持

`Settings` -> `Startup` -> `Environment`，添加以下内容：

```
chcp utf8
```

### 分屏后保留当前路径

- bash

`~/.bashrc` 添加以下内容：

```
if [[ -n "${ConEmuPID}" ]]; then
  PROMPT_COMMAND='ConEmuC -StoreCWD'
fi
```

- zsh

`~/.zshrc` 添加以下内容：

```
set_conemu_cwd() { ConEmuC -StoreCWD }
precmd_functions+=set_conemu_cwd
```
