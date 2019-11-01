
function setCookie(name, value, days = 0) {
    var expirationDate;
    expirationDate = new Date(Date.now());
    expirationDate.setDate(expirationDate.getDate() + days);

    var cookie; 
    var sessionCookie;
    if (days < 0) {  // This for deleting the Cookies
        expirationDate = new Date(0);
        cookie = name + '=' + value + ';' + 'expires=' + expirationDate + ';';
    }
    else if (days > 0) {
        cookie = name + '=' + value + ';' + 'expires=' + expirationDate + ';';
    }
    else { 
        cookie = name + '=' + value + ';'; // session-cookies
    }
    document.cookie = cookie;
}

function updateCookie(name, value, days = 0){
    setCookie(name, value, days);
}

function getCookie(name) {
    var value = "";

    var cookies = document.cookie;
    cookies.split(';').forEach(function (pair) {
        var nameValue = pair.trim().split('=');
        if (nameValue[0] == name) {
            value = nameValue[1];
        }
    });

    return value;
}

function deleteCookie(name) {
    var found = getCookie(name);
    if (found) {
        setCookie(name, 'REMOVE', -1, true);
        return true;
    }
    else
        return false;
}