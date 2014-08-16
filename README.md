btSimpleSelect
==============

##Bootstrap themed Select box

This is a simplified version of silviomoreto's bootstrap-select.

I noticed that when I had a large number of select elements in a view the page would take a while to load.  Removing some features seemed to do the trick.
This is literally a Bootstrap 3 themed select box with no bells and whistles.

To initialize with default settings:
```javascript
$(el).btSimpleSelect();
```

To initialize with custom settings:
```js
$(el).btSimpleSelect({
			multiple 	: true,   // multiple selectbox
			values 		: '',     // default values
			width 		: 0,      // Percent of parent element
			listHeight	: 100,  //
			checkIcon	: 'glyphicon glyphicon-ok',   // using @Twitter Bootstrap's glyphicon library
			caret		: '<span class="caret pull-right" style="margin-top: 7px;"></span>' // default caret for button
});
```

## Methods

There are only 2 methods in this plugin

**'val'**
Sets the value of the hidden <select> element.
```js
$(el).btSimpleSelect('val','foo');

$(el).btSimpleSelect('val',['foo','bar']);
```
**'refresh'**
Refreshes the checkmarks to reflect the value of the relative <select> item.
$(el).btSimpleSelect('refresh');



Any feedback is appreciated 
Thanks!

