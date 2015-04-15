/**
 * @since 150331 16:30
 * @author vivaxy
 */
'use strict';
(function (global) {

    var p = Node.prototype;

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
        return this.insertAdjacentHTML('beforeEnd', html);
    };

    global.$ = function (selector) {
        var list = Array.prototype.slice.call(document.querySelectorAll(selector));
        return list.length === 0 ? null :
            list.length === 1 ? document.querySelector(selector) :
                list;
    };

})(window);
