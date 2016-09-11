/**
 * Created by Chenjr on 2015/7/9.
 */

require('./index.less');

var loading = require('components/loading/index'),
    header = require('components/header/index');

// loading
loading.start();
/*
header.render(document.getElementById('headerWrap'));
header.setTitle('home');
*/

if(__DEV__) {
    console.log('run in dev.');
}

// 异步加载
require.ensure([], function() {
    var home = require('../../components/home/index');

    home.render(document.getElementById('contentWrap'), 'mobile page');

    setTimeout(function() {
        loading.end();
    }, 1000);
});
