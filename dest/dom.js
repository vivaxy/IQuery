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
    global.$ = function (selector) {
        return new Dom(selector);
    };

    // for multiple elements and single elements
    p.get = function (index) {
        if (index !== undefined) {
            return this[index];
        } else {
            return Array.prototype.slice.call(this);
        }
    };

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

    p.addClass = function (name) {
        this.each(function (ele) {
            ele.classList.add(name);
        });
        return this;
    };

    p.removeClass = function (name) {
        this.each(function (ele) {
            ele.classList.remove(name);
        });
        return this;
    };

    // for single element
    var singleElementMethodErrorString = 'Dom: element\'s size does not fit';

    p.hasClass = function (name) {
        if (this.length === 1) {
            return this[0].classList.contains(name);
        } else {
            throw singleElementMethodErrorString;
        }
    };

    p.find = function (selector) {
        if (this.length === 1) {
            return new Dom(this.selector + ' ' + selector);
        } else {
            throw singleElementMethodErrorString;
        }
    };

    // treat multiple elements and single elements differently
    p.html = function (html) {
        if (html) {
            this.each(function (ele) {
                ele.innerHTML = html;
            });
            return this;
        } else {
            if (this.length === 1) {
                return this[0].innerHTML;
            } else {
                throw singleElementMethodErrorString;
            }
        }
    };

    p.append = function (html) {
        if (typeof html === 'string') {
            this.each(function (ele) {
                ele.insertAdjacentHTML('beforeEnd', html);
            });
        } else {
            if (this.length === 1) {
                // single element
                this[0].appendChild(html);
            } else {
                throw 'Dom: elements\' size does not fit the argument';
            }
        }
        return this;
    };

    p.data = function (key, value) {
        if (value === undefined) {
            // get
            if (this.length === 1) {
                return this[0].dataset[key];
            } else {
                throw singleElementMethodErrorString;
            }
        } else {
            // set
            this.each(function (ele) {
                ele.dataset[key] = value;
            });
            return this;
        }
    };

    p.text = function (text) {
        if (text !== undefined) {
            // set
            this.each(function (ele) {
                ele.textContent = text;
            });
            return this;
        } else {
            // get
            if (this.length === 1) {
                return this[0].textContent;
            } else {
                throw singleElementMethodErrorString;
            }
        }
    };

})(window);
