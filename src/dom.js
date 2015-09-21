/**
 * @since 150422 11:19
 * @author vivaxy
 */
'use strict';
class Dom {
    constructor(selector) {
        let _this = this, elements;
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
        Array.prototype.slice.call(elements).forEach((element, index) => {
            _this[index] = element;
        });
        this.length = elements.length;
        this.selector = selector;
        this.singleElementMethodErrorString = 'Dom: element\'s size does not fit';
    }

    // for multiple elements and single elements
    get(index) {
        if (index !== undefined) {
            return this[index];
        } else {
            return Array.prototype.slice.call(this);
        }
    }

    on(type, callback) {
        this.each(ele => {
            ele.addEventListener(type, callback, false);
        });
        return this;
    }

    off(type, callback) {
        this.each(ele => {
            ele.removeEventListener(type, callback, false);
        });
        return this;
    }

    trigger(type) {
        let specialEvents = {
                mousemove: "MouseEvents",
                mouseup: "MouseEvents",
                mousedown: "MouseEvents",
                click: "MouseEvents"
            },
            bubbles = true;
        this.each(ele => {
            let event = document.createEvent(specialEvents[type] || 'Events');
            event.initEvent(type, bubbles, true);
            ele.dispatchEvent(event);
        });
        return this;
    }

    each(callback) {
        for (let i = 0; i < this.length; i++) {
            callback(this[i], i);
        }
        return this;
    }

    addClass(name) {
        this.each(ele => {
            ele.classList.add(name);
        });
        return this;
    }

    removeClass(name) {
        this.each(ele => {
            ele.classList.remove(name);
        });
        return this;
    }

    // for single element
    hasClass(name) {
        if (this.length === 1) {
            return this[0].classList.contains(name);
        } else {
            throw new Error(this.singleElementMethodErrorString);
        }
    }

    find(selector) {
        if (this.length === 1) {
            return new Dom(this.selector + ' ' + selector);
        } else {
            throw new Error(this.singleElementMethodErrorString);
        }
    }

    // treat multiple elements and single elements differently
    html(html) {
        if (html) {
            this.each(ele => {
                ele.innerHTML = html;
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

    append(html) {
        if (typeof html === 'string') {
            this.each(ele => {
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

    data(key, value) {
        if (value === undefined) {
            // get
            if (this.length === 1) {
                return this[0].dataset[key];
            } else {
                throw new Error(this.singleElementMethodErrorString);
            }
        } else {
            // set
            this.each(ele => {
                ele.dataset[key] = value;
            });
            return this;
        }
    }

    text(text) {
        if (text !== undefined) {
            // set
            this.each(ele => {
                ele.textContent = text;
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

}

export default (selector)  => {
    return new Dom(selector);
};
