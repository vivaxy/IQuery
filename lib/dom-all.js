/**
 * @since 150418 21:59
 * @author vivaxy
 */

'use strict';
(function (global) {

    var p = NodeList.prototype,
        slice = Array.prototype.slice,
        each = function (callback) {
            slice.call(this).forEach(function (ele) {
                callback(ele);
            });
            return this;
        },
        getNode = function (selector, parent) {
            return parent.querySelectorAll(selector);
        };

    p.on = function (type, callback) {
        each.call(this, function (ele) {
            ele.addEventListener(type, callback, false);
        });
        return this;
    };

    p.off = function (type, callback) {
        each.call(this, function (ele) {
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
            bubbles = true,
            event = document.createEvent(specialEvents[type] || 'Events');
        event.initEvent(type, bubbles, true);
        each.call(this, function (ele) {
            ele.dispatchEvent(event);
        });
        return this;
    };

    p.html = function (html) {
        each.call(this, function (ele) {
            ele.innerHTML = html;
        });
        return this;
    };

    p.addClass = function (name) {
        each.call(this, function (ele) {
            ele.classList.add(name);
        });
        return this;
    };

    p.removeClass = function (name) {
        each.call(this, function (ele) {
            ele.classList.remove(name);
        });
        return this;
    };

    p.append = function (html) {
        if (typeof html === 'string') {
            each.call(this, function (ele) {
                ele.insertAdjacentHTML('beforeEnd', html);
            });
        } else {
            each.call(this, function (ele) {
                ele.appendChild(html);
            });
        }
        return this;
    };

    global.$ = function (selector) {
        return getNode(selector, document);
    };

})(window);
