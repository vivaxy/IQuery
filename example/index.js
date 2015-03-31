/**
 * @since 150331 15:25
 * @author vivaxy
 */

$('nav').find('div').each(function (item, index) {
    item.innerText = index + '号';
}).on('click', function (e) {
    e.stopPropagation();
    console.log(this.innerText);
});
