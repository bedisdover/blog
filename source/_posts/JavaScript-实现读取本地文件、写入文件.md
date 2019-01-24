---
title: JavaScript 实现读取本地文件、写入文件
date: 2019-01-06 18:48:08
tags:
  - FileReader
  - URL
  - canvas
categories:
  - JavaScript
---

### 读取本地文件

使用 [FileReader](https://developer.mozilla.org/en-US/docs/Web/API/FileReader) 对象实现读取本地文件内容。

```
let reader = new FileReader()
reader.onload = function () {
  console.log(this.result)
}

// file 为 input 元素上选择文件后返回的 FileList 对象
reader.readAsText(file)  // 返回字符串
reader.readAsDataURL(file) // 返回 Base64 编码后的字符串
reader.readAsArrayBuffer() // 返回 ArrayBuffer 对象
```

<!-- more -->


### 写入文件

利用 `a` 标签的 `download` 属性实现，思路是先创建一个不可见的 `a` 标签，然后掉用其 `click` 方法

```
// content 为文件内容，必须为字符串
// filename 为文件名
function saveFile (content, filename) {
  var a = document.createElement('a')
  a.download = filename
  a.style.display = 'none'
  var blob = new Blob([content])
  a.href = URL.createObjectURL(blob)
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}
```

以上方法可以实现纯文本文件的写入，要响实现写入图片，需要借助 `canvas` 实现

```
function saveImg (img, filename) {
  var canvas = document.createElement('canvas')
  var context = canvas.getcontext('2d')
  context.drawImage(img, 0, 0)

  var a = document.createElement('a')
  a.download = filename
  a.style.display = 'none'
  // type 为图片类型，'image/jpg', 'image/png' 等
  a.href = canvas.toDataURL(type)
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}
```
