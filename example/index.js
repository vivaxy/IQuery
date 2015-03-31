/**
 * @since 150331 15:25
 * @author vivaxy
 */

$('nav').on('click', function (e) {
    e.stopPropagation();
    console.log(this, e);
});

$('nav').find('div').each(function (item, index) {
    item.innerText = index + '名';
});
