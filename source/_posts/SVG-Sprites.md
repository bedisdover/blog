---
title: SVG Sprites
date: 2019-06-15 16:40:47
tags:
  - svg
  - object
  - embed
  - iframe
  - SVG Sprites
  - use
  - symbol
categories:
  - CSS
---
本文简单介绍 svg 图标的使用以及 SVG Sprites 的实现。给定一个简单的矩形 `rect.svg` 如下：
```html
<svg xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="20" height="10"/>
</svg>
```

## 使用 `SVG`

### 使用 img
```html
<img src="rect.svg" alt="a 20*10 rect">
```

### 使用 CSS backgroud-image
```css
.rect {
  backgroud-image: url(rect.svg);
}
```

<!-- more -->

### 使用 object, iframe, embed
```html
<object data="rect.svg" type="image/svg+xml">
</object>
<iframe src="rect.svg">
</iframe>
<embed src="rect.svg" type="image/svg+xml"/>
```

### 使用内联 SVG
```html
<!-- 直接写在 html 中 -->
<svg xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="20" height="10"/>
</svg>
```

## 缩放 `SVG`
SVG(Scalable Vector Graphics) 的最大优势就是可以任意缩放不失真，但是修改 `img` 的 `width`, `height` 只能改变元素的大小，而矩形本身的大小始终为 `20*10`。要实现 SVG 的缩放，需要添加 `viewBox` 属性，该属性指定了视区坐标系，SVG 中的所有元素都基于该坐标系，修改后如下：
```
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 10">
  <rect x="0" y="0" width="20" height="10"/>
</svg>
```
需要注意的是，SVG 图形的缩放是等比例的，比如如下元素无法得到 `100*100` 的矩形:
```
<img src="rect.svg" alt="a 100*100 rect" width="100px" height="100px">
```

## 默认尺寸
若未设置默认尺寸，则 img 元素会填满整个空间（比例2:1），可以通过 SVG 的 `width`, `height` 属性设置默认尺寸，如下:
```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 10" width="200" height="100">
  <rect x="0" y="0" width="20" height="10"/>
</svg>
```

## 添加交互
我们可以通过 SVG 的 `style` 元素为矩形添加一个 hover 效果（仅适用于 object, embed, iframe 与内联 SVG, img, backgroud-image 无效），如下：
```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 10" width="200" height="100">
  <style>
    rect:hover {
      fill: red;
    }
  </style>
  <rect x="0" y="0" width="20" height="10"/>
</svg>
```

## Data URL
对于一些小的 SVG 图标，可以将其转换为 `Data URL` 内联在 html 或 css 文件中，以减少请求次数。

### 使用 Base64 编码
Base64 是网页中较为常见的编码方式，Base64 编码存在两个问题，编码后的尺寸大于原始尺寸，且每次修改 SVG 后都得重新编码
```html
<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAxMCIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxMDAiPgogICAgPHN0eWxlPgogICAgICAgIHJlY3Q6aG92ZXIgewogICAgICAgIGZpbGw6IHJlZDsKICAgICAgICB9CiAgICA8L3N0eWxlPgogICAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjEwIi8+Cjwvc3ZnPgo="
     alt="a 200*100 rect encoded in Base64">
```

### 直接内联 SVG
其实我们可以不用编码直接内联 SVG，使用 `data:image/svg+xml;charset=UTF-8,` 标头即可。由于 SVG 内部使用双引号，需要注意将 img 的引号改为单引号，以免解析出错。
```html
<img src='data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 10" width="200" height="100"><style>rect:hover{fill:red;}</style><rect x="0" y="0" width="20" height="10"/></svg>'
     alt="a 200*100 rect not encoded">
```

### 使用 encodeURI 编码
IE浏览器不支持直接内联 SVG 的写法，使用 encodeURI 编码后可以正常使用
```html
<img src="data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2020%2010%22%20width=%22200%22%20height=%22100%22%3E%3Cstyle%3Erect:hover%7Bfill:red;%7D%3C/style%3E%3Crect%20x=%220%22%20y=%220%22%20width=%2220%22%20height=%2210%22/%3E%3C/svg%3E"
     alt="a 200*100 rect encoded by encodeURI()">
```

## 优雅降级
[SVG 的浏览器支持](https://caniuse.com/#feat=svg,svg-img,svg-css,svg-html5)已经非常优秀了，如果要支持低版本 IE，可以使用如下方式：
```html
<img src="rect.svg" alt="a 200*100 rect" onerror="this.src='rect.png'">
<!-- 或使用 srcset -->
<img src="rect.svg" srcset="rect.png" alt="a 200*100 rect">
```
```CSS
.rect {
  background-image: 'url(rect.svg)'
  background-image: 'url(rect.png)'
}
```

## SVG Sprites
### 基本使用
为了减少网络请求，png, jpg 图标多使用 `CSS Sprites` 进行聚合，SVG 图标同样可以将多个图标聚合至一个 `icon.svg` 文件。将每个图标封装在 symbol 元素中，并设置唯一id即可。如下为简单的矩形与圆的聚合：
```html
<svg xmlns="http://www.w3.org/2000/svg">
  <symbol id="rect" viewBox="0 0 20 10">
    <rect x="0" y="0" width="20" height="10"/>
  </symbol>
  <symbol id="circle" viewBox="0 0 10 10">
    <circle cx="5" cy="5" r="5"/>
  </symbol>
</svg>
```
> g 元素可实现类似功能，但其不支持 viewBox，推荐使用 symbol 元素聚合 svg

使用时通过 use 引用相应的 symbol，IE 不支持外部 svg 文件，需要将 svg 内联写入 html 中，symbol 元素不会显示，但 svg 元素仍会占空间，可以使用 `display:none;` 隐藏。另外，为了兼容性考虑，建议同时使用 `xlink:href` 属性
```html
<svg>
  <use href="icon.svg#rect"/>
</svg>
<svg>
  <use href="icon.svg#circle"/>
</svg>
```
svg 元素的默认尺寸为 `300*150`，作为图标使用时，可以设置尺寸为 `1em`，方便使用
```CSS
svg {
  width: 1em;
  height: 1em;
  overflow: hidden;
}
```

### 自定义颜色
可以通过外层 svg 的样式来实现自定义图标颜色，设置为 `currentColor` 后可通过 `color` 属性设置颜色
```
svg {
  fill: currentColor;
  stroke: red;
}
```

此方法仅支持单色图标，若想实现多色图标，可以参考 [Multi-Colored SVG Symbol Icons with CSS Variables](https://frontstuff.io/multi-colored-svg-symbol-icons-with-css-variables)

### 覆盖样式
若原 svg 中已经设置了 `fill` 和 `stroke`，则外层 svg 的样式将无法生效。想要强行覆盖颜色，可以使用内联 svg + `/deep/` 连接器实现，此方法适用场景有限，不建议使用。
```
<html>
<head>
  <style>
    svg {
      /*无法生效*/
      fill: blue;
    }
    svg /deep/ rect {
      /*有效*/
      fill: red;
    }
</style>
</head>
<body>
<svg xmlns="http://www.w3.org/2000/svg" display="none">
  <symbol id="rect" fill="black" viewBox="0 0 20 10">
    <rect x="0" y="0" width="20" height="10"/>
  </symbol>
</svg>
<svg width="200" height="100">
  <use href="#rect"/>
</svg>
</body>
</html>
```
