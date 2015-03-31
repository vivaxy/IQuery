/**
 * @since 150331 16:30
 * @author vivaxy
 */
(function (global) {

    var slice = Array.prototype.slice,

        IQuery = function (selector) {
            var _this = this;
            this.selector = selector;
            this.nodeList = slice.call(document.querySelectorAll(selector));
            this.nodeList.forEach(function (node, index) {
                _this[index] = node;
            });
            this.length = this.nodeList.length;
        },
        p = {};

    IQuery.prototype = p;

    p.on = function (type, callback) {
        this.nodeList.forEach(function (node) {
            node.addEventListener(type, function (event) {
                callback.call(node, event);
            }, false);
        });
        return this;
    };

    p.each = function (callback) {
        this.nodeList.forEach(function (node, index) {
            callback(node, index);
        });
        return this;
    };

    p.find = function (selector) {
        return new IQuery(this.selector + ' ' + selector);
    };

    global.$ = function (selector) {
        return new IQuery(selector);
    };

})(window);