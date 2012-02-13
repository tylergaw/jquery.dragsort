// Opinionated drag and drop sorting using native drag and drop support.

(function ($) {
    'use strict';
    
    var settings = {};
    
    $.fn.dragsort = function (options) {
        settings = $.extend({}, $.fn.dragsort.defaults, options);
        
        this.each(function () {
            var that = $(this),
                elDragged = null;
            
            var onDragStart = function (e) {                
                e.originalEvent.dataTransfer.effectAllowed = 'move';
                e.originalEvent.dataTransfer.setData('text/html', this.innerHTML);
                
                elDragged = $(this);
                $(this).addClass(settings.draggingClass);
            };
            
            var onDragEnd = function (e) {
                that.find(settings.draggableEl).removeClass(settings.overClass)
                    .removeClass(settings.draggingClass);
            };
            
            var onDragEnter = function (e) {
               $(this).addClass(settings.overClass);
            };
            
            var onDragLeave = function (e) {
                $(this).removeClass(settings.overClass);
            };
            
            var onDragOver = function (e) {
                e.preventDefault();
                e.originalEvent.dataTransfer.dropEffect = 'move';

                return false;
            };
            
            var onDrop = function (e) {
                var elTarget = $(this),
                    elCloned = null,
                    targetIndex = elTarget.index(),
                    draggedIndex = elDragged.index();
                    
                e.stopPropagation();
                
                // We only need to take action if the element has been dragged
                // out of its original location.
                // NOTE: "this" will refer to the element that was dropped on.
                if (draggedIndex !== targetIndex) {
                    elCloned = elDragged.detach();
                    
                    // We need to determine if the element is being moved up
                    // or down the list, or left/right.        
                    if (targetIndex < draggedIndex) {
                        elCloned.insertBefore(elTarget);
                    } else {
                        elCloned.insertAfter(elTarget);
                    }
                    
                    settings.dropCallback();
                }

                return false;
            }
            
            // This is a pretty rough selector
            that.find(settings.draggableEl)
                .not(settings.draggableEl + '.' + settings.ignoreClass)
                .attr('draggable', true);
            
            // Again, the delegate element has a pretty harsh selector, maybe
            // that's an Ok trade of for the functionality?
            that.on({
               'dragstart': onDragStart,
               'dragenter': onDragEnter,
               'dragover': onDragOver,
               'dragleave': onDragLeave,
               'drop': onDrop,
               'dragend': onDragEnd
            }, (settings.draggableEl + ':not(' + settings.draggableEl + '.' + 
                settings.ignoreClass + ')'));
        });
    };
    
    $.fn.dragsort.defaults = {
        draggableEl: 'li',
        ignoreClass: 'non-draggable',
        draggingClass: 'dragging',
        overClass: 'over',
        dropCallback: $.noop
    };
    
}(jQuery));