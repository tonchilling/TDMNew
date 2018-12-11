$.fn.visible = function () {
    return this.css('visibility', 'visible');
};

$.fn.invisible = function () {
    return this.css('visibility', 'hidden');
};

$.fn.visibilityToggle = function () {
    return this.css('visibility', function (i, visibility) {
        return (visibility == 'visible') ? 'hidden' : 'visible';
    });
};


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}