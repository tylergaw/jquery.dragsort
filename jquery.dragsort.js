// Opinionated drag and drop sorting using native drag and drop support.

(function ($) {
    'use strict';
    
    var settings = {};
    
    $.fn.dragsort = function (options) {
        settings = $.extend({}, $.fn.dragsort.defaults, options);
        
        this.each(function () {
            var that = $(this),
                elements = that.find(settings.draggableEl),
                elDragged = null;
            
            var onDragStart = function (e) {
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/html', this.innerHTML);
                
                elDragged = $(this);
                $(this).addClass(settings.draggingClass);
            };
            
            var onDragEnd = function (e) {
                elements.removeClass(settings.overClass)
                    .removeClass(settings.draggingClass);
            };
            
            var onDragEnter = function (e) {
               $(this).addClass(settings.overClass);
            };
            
            var onDragLeave = function (e) {
                $(this).removeClass(settings.overClass);
            };
            
            var onDragOver = function (e) {
                if (e.preventDefault) {
                    e.preventDefault();
                }

                e.dataTransfer.dropEffect = 'move';

                return false;
            };
            
            var onDrop = function (e) {
                var elTarget = $(this),
                    elCloned = null,
                    targetIndex = elTarget.index(),
                    draggedIndex = elDragged.index();
                
                if (e.stopPropagation) {
                    e.stopPropagation();
                }
                
                // We only need to take action if the element has been dragged
                // out of its original location.
                // NOTE: "this" will refer to the element that was dropped on.
                if (elDragged !== this) {
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
            
            $.each(elements, function (index, el) {
                if (!$(el).hasClass(settings.ignoreClass)) {
                    $(el).attr('draggable', true);
                    el.addEventListener('dragstart', onDragStart, false);
                    el.addEventListener('dragenter', onDragEnter, false);
                    el.addEventListener('dragover', onDragOver, false);
                    el.addEventListener('dragleave', onDragLeave, false);
                    el.addEventListener('drop', onDrop, false);
                    el.addEventListener('dragend', onDragEnd, false);
                }
            });
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