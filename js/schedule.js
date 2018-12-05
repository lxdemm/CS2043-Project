var currentuser = getCookie("username");

//course-related functions here

//complete
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

//complete
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

//complete
function checkCookie() {
    var user = getCookie("username");
    if (user == "") {
        window.location.href = "http://127.0.0.1:8000/";
    } else {
        setCookie("username", user, 0.05);
    }
}

//complete
function logOut() {    
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    window.location.href = "http://127.0.0.1:8000/";
}