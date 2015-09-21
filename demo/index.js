(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @since 15-09-02 15:40
 * @author vivaxy
 */
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _srcDomJs = require('../src/dom.js');

var _srcDomJs2 = _interopRequireDefault(_srcDomJs);

console.log((0, _srcDomJs2['default'])('li').get(0));

},{"../src/dom.js":2}],2:[function(require,module,exports){
/**
 * @since 150422 11:19
 * @author vivaxy
 */
'use strict';
Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Dom = (function () {
    function Dom(selector) {
        _classCallCheck(this, Dom);

        var _this = this,
            elements = undefined;
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
        this.singleElementMethodErrorString = 'Dom: element\'s size does not fit';
    }

    // for multiple elements and single elements

    _createClass(Dom, [{
        key: 'get',
        value: function get(index) {
            if (index !== undefined) {
                return this[index];
            } else {
                return Array.prototype.slice.call(this);
            }
        }
    }, {
        key: 'on',
        value: function on(type, callback) {
            this.each(function (ele) {
                ele.addEventListener(type, callback, false);
            });
            return this;
        }
    }, {
        key: 'off',
        value: function off(type, callback) {
            this.each(function (ele) {
                ele.removeEventListener(type, callback, false);
            });
            return this;
        }
    }, {
        key: 'trigger',
        value: function trigger(type) {
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
        }
    }, {
        key: 'each',
        value: function each(callback) {
            for (var i = 0; i < this.length; i++) {
                callback(this[i], i);
            }
            return this;
        }
    }, {
        key: 'addClass',
        value: function addClass(name) {
            this.each(function (ele) {
                ele.classList.add(name);
            });
            return this;
        }
    }, {
        key: 'removeClass',
        value: function removeClass(name) {
            this.each(function (ele) {
                ele.classList.remove(name);
            });
            return this;
        }

        // for single element
    }, {
        key: 'hasClass',
        value: function hasClass(name) {
            if (this.length === 1) {
                return this[0].classList.contains(name);
            } else {
                throw new Error(this.singleElementMethodErrorString);
            }
        }
    }, {
        key: 'find',
        value: function find(selector) {
            if (this.length === 1) {
                return new Dom(this.selector + ' ' + selector);
            } else {
                throw new Error(this.singleElementMethodErrorString);
            }
        }

        // treat multiple elements and single elements differently
    }, {
        key: 'html',
        value: function html(_html) {
            if (_html) {
                this.each(function (ele) {
                    ele.innerHTML = _html;
                });
                return this;
            } else {
                if (this.length === 1) {
                    return this[0].innerHTML;
                } else {
                    throw new Error(this.singleElementMethodErrorString);
                }
            }
        }
    }, {
        key: 'append',
        value: function append(html) {
            if (typeof html === 'string') {
                this.each(function (ele) {
                    ele.insertAdjacentHTML('beforeEnd', html);
                });
            } else {
                if (this.length === 1) {
                    // single element
                    this[0].appendChild(html);
                } else {
                    throw new Error('Dom: elements\' size does not fit the argument');
                }
            }
            return this;
        }
    }, {
        key: 'data',
        value: function data(key, value) {
            if (value === undefined) {
                // get
                if (this.length === 1) {
                    return this[0].dataset[key];
                } else {
                    throw new Error(this.singleElementMethodErrorString);
                }
            } else {
                // set
                this.each(function (ele) {
                    ele.dataset[key] = value;
                });
                return this;
            }
        }
    }, {
        key: 'text',
        value: function text(_text) {
            if (_text !== undefined) {
                // set
                this.each(function (ele) {
                    ele.textContent = _text;
                });
                return this;
            } else {
                // get
                if (this.length === 1) {
                    return this[0].textContent;
                } else {
                    throw new Error(this.singleElementMethodErrorString);
                }
            }
        }
    }]);

    return Dom;
})();

exports['default'] = function (selector) {
    return new Dom(selector);
};

module.exports = exports['default'];

},{}]},{},[1]);
