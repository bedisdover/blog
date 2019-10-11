---
title: Ubuntu 亮度调节
date: 2018-10-07 22:32:31
tags: Linux
categories: 日常记录
---

### 问题描述：
ubuntu 系统中无法调节亮度，且系统设置中无亮度调节

### 解决方案

```bash
sudo vim /usr/share/X11/xorg.conf.d/20-intel.conf

# 写入以下内容
Section "Device"
        Identifier  "card0"
        Driver      "intel"
        Option      "Backlight"  "intel_backlight"
        BusID       "PCI:0:2:0"
EndSection
```

重启后即可正常调节亮度
