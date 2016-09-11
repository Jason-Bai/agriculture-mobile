/**
 * Created by Chenjr on 2015/7/7.
 */

require('./index.less');

var $ = require('lib/zepto/main'),
    loading = require('../../components/loading/index'),
    header = require('../../components/header/index');

loading.start();
header.render(document.getElementById('headerWrap'));
header.setTitle('detail');

setTimeout(function() {
    loading.end();
    loading.subloading(document.getElementById('contentWrap'), 500);
    setTimeout(function() {
        $('#contentWrap').text('content here.');
    }, 3000);
}, 1000);
