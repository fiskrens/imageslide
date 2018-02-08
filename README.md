# Imageslide

## Description
Imageslide is a responsive jQuery image slider. It has support for both desktop and smart devices (swipe support).

## Get started
Include the imageslide-1.0.js and imageslide-1.0.css.
#### Example:
```
<script type="text/javascript" src="../js/imageslide-1.0.js"></script>
<link rel="StyleSheet" href="../css/imageslide-1.0.css">
```

#### Add the following HTML with images you wish to show:
```
<div id="myImageSlide" class="imageslide">
	<div class="imageslide-images">
		<img src="images/1.jpg">
		<img src="images/2.jpg">
		<img src="images/3.jpg">
	</div>
</div>
```

#### In JS, run the command .imageslide() on selector
```
$(function() {
	$('#myImageSlide').imageslide()
});
```


## Settings
The imageslide can also start with a few settings.
```
$(function() {
	$('#myImageSlide').imageslide({
	'start': 0,
	'showthumbs': true,
	'showtext': true,
	'countertext' : '{x} of {y}'
})
});
```


| Option | Default | Description |
| ------ | ------- | ----------- |
| start  | 0       | Index value of the slide to start on. |
| showthumbs | true | Show small thumbnails or not. |
| showtext | true | Show the "countertext" ex: "1 of 5" |
| countertext | {x} of {y} | Format of the counter text. **{x}** is replaced with the current image index, while **{y}** is replaced with the total image count. |

## Methods
Methods are run på sending a string with the method name as first parameter.
```
$('#myImageSlide').imageslide('Next');
```

| Method | Description |
|------- | ----------- |
| Next() | Switch to next image in the imageslider |
| Previous() | Switch to previous image in the imageslider |
| SetFirst() | Switch to first image in the imageslider |
| SetLast() | Switch to last image in the imageslider |
| SetCurrentByIndex(**intIndex**) | Switch to image in the imageslider with the index **intIndex** |
