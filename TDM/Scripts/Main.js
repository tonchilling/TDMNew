$.fn.visible = function () {
    return this.css('visibility', 'visible');
};

$.fn.invisible = function () {
    return this.css('visibility', 'hidden');
};


$.fn.invisibleAbsolute = function () {
    return this.css('visibility', 'hidden').css('position', 'absolute');
};
$.fn.visibilityToggle = function () {
    return this.css('visibility', function (i, visibility) {
        return (visibility == 'visible') ? 'hidden' : 'visible';
    });
};


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};



function getObjects(obj, key, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getObjects(obj[i], key, val));
        } else if (i == key && obj[key] == val) {
            objects.push(obj);
        }
    }
    return objects;
}


function LogoutToMain() {
    $('.btnLogout').click(function () {
        var domain = window.document.location.origin;
        if (window.parent) {
            window.parent.postMessage("58E93CEB3C710C6D79FAAA48706D539F74D9639E9EFC982E2389D1B32DA02775", domain); //send the message and target URI
        }
    });
}


function Logout() {
    $('.btnLogout').click(function () {
        var domain = window.document.location.origin;
        if (window.parent) {
            window.parent.postMessage("58E93CEB3C710C6D79FAAA48706D539F74D9639E9EFC982E2389D1B32DA02775", domain); //send the message and target URI
        }
    });
}