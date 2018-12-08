var currentuser = getCookie("username");

//course-related functions here
function loadCourseList() {
    //get all user's courses
    const http = new XMLHttpRequest();
    const url = "api/students/" + currentuser + "/courses";
    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
            //alert(http.responseText);
            courseList = JSON.parse(http.responseText);
        }
    }
    http.open('GET', url, false);
    http.setRequestHeader('Content-type','application/json; charset=utf-8');
    http.send(null);

    var i;
    var thisCourse;
    for(i=0; i<courseList.length; i++) {
        thisCourse = document.createElement("option");
        thisCourse.value = courseList[i].Course_ID;
        document.getElementById("courses").appendChild(thisCourse);

    }
}

function loadCourseInfo() {
    var course = document.getElementById("selection").value;
    var courseInfo;

    const http = new XMLHttpRequest();
    const url = "api/students/" + currentuser + "/courses/" + course;
    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
            //alert(http.responseText);
            courseInfo = JSON.parse(http.responseText);
        }
    }
    http.open('GET', url, false);
    http.setRequestHeader('Content-type','application/json; charset=utf-8');
    http.send(null);

    var assessList = getAssessments(courseInfo.id);
    var i;
}

function getAssessments(courseId) {
    var assessInfo;

    const http2 = new XMLHttpRequest();
    var url2 = "api/students/" + currentuser + "/courses/" + courseId + "/assess";
    http2.onreadystatechange = function() {//Call a function when the state changes.
        if(http2.readyState == 4 && http2.status == 200) {
            assessInfo = JSON.parse(http2.responseText);
           console.log(assessInfo)
        }
    }
    http2.open('GET', url2, false);
    http2.setRequestHeader('Content-type','application/json; charset=utf-8');
    http2.send(null);     

    return assessInfo;
}

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