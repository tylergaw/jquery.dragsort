# jQuery Drag and Drop sort

Opinionated drag and drop sorting using native drag and drop support.

## Usage

   $('ul').dragsort({
       dropCallback: function () {
           // Dragged, dropped
       }
   });

## Options

* draggableEl: 'li' - All elements of this type that are children of the element that dragsort is applied to will be draggable.
* ignoreClass: 'non-draggable' - Any of the draggable elements with this class will not be draggable or droppable.
* draggingClass: 'dragging' - This class will be applied to an element when it is being dragged.
* overClass: 'over' - This class will be applied to an element when the dragged element is on top of it, ready to be dropped.
* dropCallback: $.noop - This function will be called each time an element is dragged and dropped in a new location.


## What's opinionated about it?

* It only supports the `move` [drag effect](https://developer.mozilla.org/En/DragDrop/Drag_Operations#drageffects)
* Probably some other stuff

## Why not just used the native Drag and Drop all together?

* Using jQuery makes it easier to do things.
* Most importantly, the native DnD does sorting weird. When using the `copy` drag effect, when one element is dragged and dropped on another, the two elements swap places. For example if you had a list (1, 2, 3, 4) and you dragged 3 to 1 the new order would be (3, 2, 1, 4). That feels really strange. With the same drag and drop, dragsort will give the following order (3, 1, 2, 4).