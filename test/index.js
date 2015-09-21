(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
/**
 * @since 150331 15:25
 * @author vivaxy
 */
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _srcDomJs = require('../src/dom.js');

var _srcDomJs2 = _interopRequireDefault(_srcDomJs);

var assert = chai.assert;
var result = 0;
var addResultValue = function addResultValue(e) {
    e.stopPropagation();
    result++;
};

describe('$(`selector`)', function () {
    it('should select the 4 div in the nav', function () {
        var dom = (0, _srcDomJs2['default'])((0, _srcDomJs2['default'])('nav div'));
        assert.equal(dom.length, 4);
    });
});

describe('$(`Dom object`)', function () {
    it('should select the 4 div in the nav', function () {
        var dom = (0, _srcDomJs2['default'])((0, _srcDomJs2['default'])('nav div'));
        assert.equal(dom.length, 4);
    });
});

describe('$(`HTMLElement object`)', function () {
    it('should select the first div in the nav', function () {
        var dom = (0, _srcDomJs2['default'])((0, _srcDomJs2['default'])('nav div')[0]);
        assert.equal(dom.length, 1);
    });
});

describe('$(`function`)', function () {
    it('should throw error: Dom: selector type error', function () {
        try {
            (0, _srcDomJs2['default'])(addResultValue);
        } catch (e) {
            assert.equal(e, 'Dom: selector type error');
        }
    });
});

describe('length', function () {
    it('should the length be 4', function () {
        var dom = (0, _srcDomJs2['default'])('nav div');
        assert.equal(dom.length, 4);
    });
});

describe('selector', function () {
    it('should the selector be `nav div`', function () {
        var dom = (0, _srcDomJs2['default'])('nav div');
        assert.equal(dom.selector, 'nav div');
    });
});

describe('on(`type`, `function`)', function () {
    it('should select the 4 div in the nav', function () {
        var dom = (0, _srcDomJs2['default'])('nav div');
        dom.on('click', addResultValue);
        dom.trigger('click');
        dom.off('click', addResultValue);
        assert.equal(result, 4);
        result = 0;
    });
});

describe('trigger(`type`, `data`)', function () {
    it('should trigger 4 times add result value function', function () {
        var dom = (0, _srcDomJs2['default'])('nav div');
        dom.on('click', addResultValue);
        dom.trigger('click');
        dom.off('click', addResultValue);
        assert.equal(result, 4);
        result = 0;
    });
});

describe('off(`type`[, `function`])', function () {
    it('should not trigger add result value function', function () {
        var dom = (0, _srcDomJs2['default'])('nav div');
        dom.on('click', addResultValue);
        dom.off('click', addResultValue);
        dom.trigger('click');
        assert.equal(result, 0);
        result = 0;
    });
});

describe('each(function(`element`, `index`))', function () {
    it('should select the divs, and execute in each divs', function () {
        var dom = (0, _srcDomJs2['default'])('nav div');
        var eleText = '';
        var indexValue = 0;
        dom.each(function (ele, index) {
            eleText += ele.innerText;
            indexValue += index;
        });
        assert.equal(eleText, '1234');
        assert.equal(indexValue, 6);
    });
});

describe('html(`html`)', function () {
    it('should replace divs inner html', function () {
        var dom = (0, _srcDomJs2['default'])('nav div');
        dom.html('5');
        var eleText = '';
        dom.each(function (ele, index) {
            eleText += ele.innerText;
            ele.innerHTML = index + 1;
        });
        assert.equal(eleText, '5555');
    });
});

describe('append(`element`)', function () {
    it('should throw error: Dom: elements\' size does not fit the argument', function () {
        var dom = (0, _srcDomJs2['default'])('nav div');
        var div = document.createElement('div');
        div.innerText = '0';
        try {
            dom.append(div);
        } catch (e) {
            assert.equal(e.message, 'Dom: elements\' size does not fit the argument');
        }
    });
});

describe('append(`element`)', function () {
    it('should append a single div in nav', function () {
        var dom = (0, _srcDomJs2['default'])('nav');
        var div = document.createElement('div');
        div.innerText = '5';
        dom.append(div);
        assert.equal((0, _srcDomJs2['default'])('nav div').length, 5);
    });
});

describe('append(`html`)', function () {
    it('should append a single div in nav', function () {
        var dom = (0, _srcDomJs2['default'])('nav');
        dom.append('<div>6</div>');
        assert.equal((0, _srcDomJs2['default'])('nav div').length, 6);
    });
});

describe('addClass(`className`)', function () {
    it('should add class `test` to nav', function () {
        var dom = (0, _srcDomJs2['default'])('nav');
        dom.addClass('test');
        assert.equal(dom[0].className, 'test');
    });
});

describe('removeClass(`className`)', function () {
    it('should remove class `test` to nav', function () {
        var dom = (0, _srcDomJs2['default'])('nav');
        dom.removeClass('test');
        assert.equal(dom[0].className, '');
    });
});

describe('hasClass(`className`)', function () {
    it('should return if `nav` has class `test`', function () {
        var dom = (0, _srcDomJs2['default'])('nav');
        assert.equal(dom.hasClass('test'), false);
    });
});

describe('find(`selector`)', function () {
    it('should get the 6 divs in nav', function () {
        var dom = (0, _srcDomJs2['default'])('nav');
        var subDom = dom.find('div');
        assert.equal(subDom.length, 6);
    });
});

describe('data(`key`[, `value`])', function () {
    it('should set the data to nav', function () {
        var dom = (0, _srcDomJs2['default'])('nav');
        dom.data('nameSpace', 'myDomSelector');
        assert.equal(dom.data('nameSpace'), 'myDomSelector');
    });
});

describe('get(`index`)', function () {
    it('should get element at index', function () {
        var ele = (0, _srcDomJs2['default'])('nav div').get(1);
        assert.equal(ele, document.querySelectorAll('nav div')[1]);
    });
});

describe('get()', function () {
    it('should get all elements as an array', function () {
        var elements = (0, _srcDomJs2['default'])('nav div').get();
        assert.equal(elements.length, document.querySelectorAll('nav div').length);
    });
});

describe('text(`string`)', function () {
    it('should set element text to `string`', function () {
        var ele = (0, _srcDomJs2['default'])('nav div').text('haha');
        assert.equal('haha', document.querySelectorAll('nav div')[1].textContent);
    });
});

describe('text()', function () {
    it('should get the first element text content', function () {
        var text = (0, _srcDomJs2['default'])('nav div:first-child').text();
        assert.equal(text, 'haha');
        (0, _srcDomJs2['default'])('nav div').each(function (div, index) {
            div.innerHTML = index;
        });
    });
});

},{"../src/dom.js":1}]},{},[2]);
