/**
 * @since 150331 15:25
 * @author vivaxy
 */

var logHtml = function (e) {
    e.stopPropagation();
    console.log(this.innerHTML);
    $('nav').off('click', logHtml);
};

$('nav').on('click', logHtml);

$('nav div').forEach(function (item, index) {
    item.on('click', function (e) {
        e.stopPropagation();
        console.log(index);
    });
});
