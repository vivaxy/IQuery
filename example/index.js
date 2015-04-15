/**
 * @since 150331 15:25
 * @author vivaxy
 */

var logHtml = function (e) {
    e.stopPropagation();
    $('body').append(this.innerHTML);
    console.log(this);
};

$('nav').on('click', logHtml);

$('nav div').forEach(function (item, index) {
    item.on('click',logHtml);
});
