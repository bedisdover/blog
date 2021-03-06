---
title: JavaScript 监听文本框内容变化
date: 2018-10-14 23:02:55
tags:
  - event
categories:
  - JavaScript
---

### html 代码

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>测试文本框内容变化</title>
</head>
<body>
<label for="text">文本框</label><input type="text" id="text">
</body>
<!-- 方便起见，使用 jQuery -->
<script src="js/jquery.min.js"></script>
</html>
```

<!-- more -->

### keydown 事件

keydown 事件监听几乎所有按键操作，在键盘按下瞬间触发，若在 keydown 事件处理函数中 <b>立即</b> 获取文本框中的内容，通常会有一个字符的偏差。

```js
$('#text').on('keydown', function() {
	console.log($('#text').val());
});
```

若延迟获取内容，则可以获取到完整的内容

```js
$('#text').on('keydown', function() {
	setTimeout(function() {
		console.log($('#text').val());
	}, 1000);
});
```

### keyup 事件

keyup 事件监听按键范围同 keydown 事件，在按键抬起瞬间触发，若在 keyup 事件处理函数中获取文本框中的内容，无法处理同一个按键按下不抬起的情况。。。

### keypress 事件

keypress 事件不监听 Shift、Ctrl、Alt、Windows 及其它控制按键，<b>不监听 Tab，监听 Enter。</b>可通过事件对象判断是否按下 Enter

```js
$('#text').on('keypress', function(e) {
	console.log($('#text').val());
	if (e.which == 13) {
		console.log('Enter is pressed');
	}
});
```

### change 事件

change 事件<b>监听 Tab、Enter 按键，同时焦点转移至其它界面组件时也会触发此事件。</b>用于文本框内容的验证较为方便

```js
$('#text').on('change', function () {
    if($('#text').val().trim() === '') {
	    console.log('text is empty');
	}
});
```
