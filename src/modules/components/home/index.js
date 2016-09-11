/**
 * 应用列表项
 * Created by Administrator on 2015/7/7.
 */

require('./index.less');

var $ = require('lib/zepto/main'),
    artT = require('lib/artTemplate/artTemplate');

module.exports = (function() {
    var _e = {};

    /**
     * 渲染一个项
     * @param dom
     * @param data
     */
    _e.render = function(dom, title) {
        var $handle = $(dom),
            render = artT.compile(require('./index.tpl')());

        $handle.append(render({title: title}));
    };

    _e.reset = function(dom) {
        $(dom).empty();
    }

    return _e;
})();
