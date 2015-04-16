/**
 * @since 150331 16:30
 * @author vivaxy
 */
'use strict';
(function (global) {

    var p = Node.prototype,
        getNode = function (selector, parent) {
            var list = Array.prototype.slice.call(parent.querySelectorAll(selector));
            return list.length === 0 ? null :
                list.length === 1 ? parent.querySelector(selector) :
                    list;
        };

    p.on = function (type, callback) {
        this.addEventListener(type, callback, false);
        return this;
    };

    p.off = function (type, callback) {
        this.removeEventListener(type, callback, false);
        return this;
    };

    p.html = function (html) {
        this.innerHTML = html;
        return this;
    };

    p.addClass = function (name) {
        this.classList.add(name);
        return this;
    };

    p.removeClass = function (name) {
        this.classList.remove(name);
        return this;
    };

    p.hasClass = function (name) {
        return this.classList.contains(name);
    };

    p.append = function (html) {
        if (typeof html === 'string') {
            return this.insertAdjacentHTML('beforeEnd', html);
        } else {
            return this.appendChild(html);
        }
    };

    p.find = function (selector) {
        return getNode(selector, this);
    };

    global.$ = function (selector) {
        return getNode(selector, document);
    };

})(window);
