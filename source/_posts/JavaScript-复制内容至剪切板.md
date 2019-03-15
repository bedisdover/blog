---
title: JavaScript 复制内容至剪切板
date: 2019-03-15 11:05:12
tags:
  - 剪切板
  - clipboard
  - document.execCommand
  - Range
  - Selection
  - Clipboard API
categories: JavaScript
---

### 复制 input

```js
function copy(input) {
  input.select()
  alert(document.execCommand('copy'))
}
```

### 复制文本

```js
function copy(text) {
  const e = document.createElement('textarea')
  e.value = text
  e.setAttribute('readonly', 'readonly')
  document.body.appendChild(e)
  e.select()
  alert(document.execCommand('copy'))
  document.body.removeChild(e)
}
```

<!-- more -->

### 复制图片

```js
function copyImg(img) {
  const range = document.createRange()
  range.selectNode(img)

  const selection = window.getSelection()
  selection.removeAllRanges()
  selection.addRange(range)

  alert(document.execCommand('copy'))
}
```

### Clipboard API

```js
function copy(text) {
  navigator.clipboard.writeText(newClip)
    .then(function() {
      console.log('success')
    })
    .catch(function(e) {
      console.log('error:', e)
    });
}
```

### 其他方案

* [clipboard.js](https://github.com/zenorocha/clipboard.js/)
