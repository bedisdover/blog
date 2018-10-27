---
title: dpkg 安装 deb 包依赖
date: 2018-10-14 22:50:45
tags: linux, dpkg
categories: 日常记录
---

通过 `dpkg` 命令安装 `.deb` 包时，经常会出现未安装依赖的情况，如安装有道词典时报错：

```
dpkg: dependency problems prevent configuration of youdao-dict:                                                       
 youdao-dict depends on tesseract-ocr; however:    
  Package tesseract-ocr is not installed.                                                                           
 youdao-dict depends on tesseract-ocr-eng; however:
  Package tesseract-ocr-eng is not installed.                                                                       
 youdao-dict depends on tesseract-ocr-chi-sim; however:
  Package tesseract-ocr-chi-sim is not installed.
 youdao-dict depends on tesseract-ocr-chi-tra; however:
  Package tesseract-ocr-chi-tra is not installed.
 youdao-dict depends on ttf-wqy-microhei; however:
  Package ttf-wqy-microhei is not installed.
 youdao-dict depends on python3-pyqt5; however:
  Package python3-pyqt5 is not installed.
 youdao-dict depends on python3-xlib; however:
  Package python3-xlib is not installed.
 youdao-dict depends on python3-pyqt5.qtmultimedia; however:
  Package python3-pyqt5.qtmultimedia is not installed.
 youdao-dict depends on python3-pyqt5.qtquick; however:
  Package python3-pyqt5.qtquick is not installed.
 youdao-dict depends on python3-pyqt5.qtwebkit; however:
  Package python3-pyqt5.qtwebkit is not installed.
```

可以通过 `apt` 命令安装所需依赖，使用 `-f` 选项修复依赖

```
sudo apt -f -y install
```

操作完成后，再安装 `.deb` 包就不会有问题了
