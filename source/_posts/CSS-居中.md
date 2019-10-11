---
title: CSS 居中
date: 2019-10-01 20:33:39
tags:
  - text-align
  - margin
  - inline-block
  - vertical-align
  - flex
  - grid
  - transform
categories: CSS
---

本文总结了 CSS 中常见的水平、垂直居中方案，本文涉及基础 HTML 如下:

```HTML
<!-- 单个元素 -->
<div class="outer">
  <div class="inner"></div>
</div>
```

### 水平居中

#### 内联元素

```CSS
.outer {
  text-align: center;
}
```

<!-- more -->

#### 块元素

margin 属性在相同方向上具有以下特性：
- 如果一侧定值，一侧 auto，auto 那侧填满剩余空间
- 如果两侧均为 auto, 则平分剩余空间

所以可以通过以下方式来实现水平居中

```CSS
.inner {
  margin: 0 auto;
}
```

**注意**
不能同时设置 float 属性，float 属性会破坏正常流
若 inner 为 absolute 定位，可以使用 `left: 0; right: 0` 来恢复流体特性

#### 多个块元素

一般可通过两种方式实现：
- inline-block
```CSS
.outer {
  text-align: center;
}
.inner {
  display: inline-block;
}
```

- flex
```CSS
.outer {
  display: flex;
  justify-content: center;
}
```

### 垂直居中

#### 单行文本

HTML 如下：
```HTML
<div class="single-line-text">
  单行文本居中。。
</div>
```

```CSS
.single-line-text {
  height: 100px;
  line-height: 100px;
  white-space: nowrap;
}
```

#### 多行文本

```CSS
.inner {
  display: inline-block;
  vertical-align: middle;
}
```

或使用 flex
```CSS
.outer {
  display: flex;
  align-items: center;
}
```

### 水平垂直居中

- flex
```CSS
.outer {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

- absolute 定位 + transform
```CSS
.outer {
  position: relative;
}
.inner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

- grid
```CSS
.outer {
  display: grid;
}
.inner {
  margin: auto;
}
```
