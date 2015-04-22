/**
 * @since 150422 11:19
 * @author vivaxy
 */
'use strict';
(function (global) {

    var Dom = function (selector) {
        var _this = this, elements;
        if (typeof selector === 'string') {
            elements = document.querySelectorAll(selector);
        } else if (selector instanceof HTMLElement) {
            elements = [selector];
        } else if (selector instanceof HTMLCollection) {
            elements = selector;
        } else if (selector instanceof Dom) {
            return selector;
        } else {
            throw 'Dom: selector type error';
        }
        Array.prototype.slice.call(elements).forEach(function (element, index) {
            _this[index] = element;
        });
        this.length = elements.length;
        this.selector = selector;
    }, p = {};
    Dom.prototype = p;

    p.on = function (type, callback) {
        this.each(function (ele) {
            ele.addEventListener(type, callback, false);
        });
        return this;
    };

    p.off = function (type, callback) {
        this.each(function (ele) {
            ele.removeEventListener(type, callback, false);
        });
        return this;
    };

    p.trigger = function (type) {
        var specialEvents = {
                mousemove: "MouseEvents",
                mouseup: "MouseEvents",
                mousedown: "MouseEvents",
                click: "MouseEvents"
            },
            bubbles = true;
        this.each(function (ele) {
            var event = document.createEvent(specialEvents[type] || 'Events');
            event.initEvent(type, bubbles, true);
            ele.dispatchEvent(event);
        });
        return this;
    };

    p.each = function (callback) {
        for (var i = 0; i < this.length; i++) {
            callback(this[i], i);
        }
    };

    p.html = function (html) {
        this.each(function (ele) {
            ele.innerHTML = html;
        });
        return this;
    };

    global.$ = function (selector) {
        return new Dom(selector);
    };

})(window);
