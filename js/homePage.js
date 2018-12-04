var currentuser = getCookie("username");

//complete
function createCourse(){
    var cName = document.getElementById('cName').value;
    var cNumber = document.getElementById('cNumber').value;
    var cSection = document.getElementById('cSection').value;
    var cInst = document.getElementById('cInst').value;

    var newCourse = {
        Course_ID: cNumber,
        Course_Name: cName,
        Section_ID: cSection,
        Instructor: cInst
    }

    var newCourseJSON = JSON.stringify(newCourse);

    const http = new XMLHttpRequest();
    const url = "api/students/" + currentuser + "/courses";
    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
            alert(http.responseText);
        }
    }
    http.open('POST', url, true);
    http.setRequestHeader('Content-type','application/json; charset=utf-8');
    http.send(newCourseJSON);
}

//implement after "add class" has dropdowns and shit
function createClass(){
    var curr1 = document.getElementById('curr1').value;
    var cType = document.getElementById('cType').value;
    var cDay = document.getElementById('cDay').value;
    var cStart = document.getElementById('cStart').value;
    var cEnd = document.getElementById('cEnd').value;
}

//fix up grade details
function addDetails(){
    var course = document.getElementById('curr2').value;
    var goal = document.getElementById('cGoal').value;
    var cHours = document.getElementById('cHours').value;
    var grade = document.getElementById('cGrade').value;
    
    var aP = parseInt(document.getElementById('aP').value);
    var a = parseInt(document.getElementById('a').value);
    var aM = parseInt(document.getElementById('aM').value);
    var bP = parseInt(document.getElementById('bP').value);
    var b = parseInt(document.getElementById('b').value);
    var bM = parseInt(document.getElementById('bM').value);
    var cP = parseInt(document.getElementById('cP').value);
    var c = parseInt(document.getElementById('c').value);
    var cM = parseInt(document.getElementById('cM').value);
    var d = parseInt(document.getElementById('d').value);
    var f = parseInt(document.getElementById('f').value);

    var newDetails = {
        Credit_Hours: cHours,
        Goal_Grade: goal,
        Final_Grade: grade,
       // Grade_Scheme: [aP, a, aM, bP, b, bM, cP, c, cM, d, f]
    }

    var newDetailsJSON = JSON.stringify(newDetails);

    const http = new XMLHttpRequest();
    const url = "api/students/" + currentuser + "/courses/" + course;
    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
           // alert(http.responseText);
        }
    }
    http.open('PUT', url, true);
    http.setRequestHeader('Content-type','application/json; charset=utf-8');
    http.send(newDetailsJSON);
}

//fix up due date layout and type once dropdowns are implemented
function addAssessment(){
    var course = document.getElementById('curr3').value;
    var courseInfo;
    var courseId;
    var aName = document.getElementById('aName').value;
    var aValue = parseInt(document.getElementById('aValue').value);
    var aDue = document.getElementById('aDue').value;

    var newAssess = {
        Title: aName,
        Due_Date: aDue
    }

    var newAssessJSON = JSON.stringify(newAssess);

    const http = new XMLHttpRequest();
    var url = "api/students/" + currentuser + "/courses/" + course;
    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
           courseInfo = JSON.parse(http.responseText);
           console.log(courseInfo)
           courseId = courseInfo[0].id;
           console.log("ID: " + courseId)
        }
    }
    http.open('GET', url, false);
    http.setRequestHeader('Content-type','application/json; charset=utf-8');
    http.send(null);    

    console.log("ID after request: " + courseId)

    const http2 = new XMLHttpRequest();

    url = "api/students/" + currentuser + "/courses/" + courseId + "/assess";
    http2.onreadystatechange = function() {//Call a function when the state changes.
        if(http2.readyState == 4 && http2.status == 200) {
           // alert(http.responseText);
        }
    }
    http2.open('POST', url, true);
    http2.setRequestHeader('Content-type','application/json; charset=utf-8');
    http2.send(newAssessJSON);
}

//complete
function addGrade(){
    var course = document.getElementById('curr4').value; //course
    var assessment = document.getElementById('aGradeName').value; //assessment
    var grade = parseInt(document.getElementById("aGrade").value); //grade

    var newGrade = {
        Complete: true,
        Grade: grade
    }

    var newGradeJSON = JSON.stringify(newGrade);

    //put request to set complete to true and add grade
    const http = new XMLHttpRequest();
    var url = "api/students/" + currentuser + "/courses/" + course;
    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
           courseInfo = JSON.parse(http.responseText);
           console.log(courseInfo)
           courseId = courseInfo[0].id;
           console.log("ID: " + courseId)
        }
    }
    http.open('GET', url, false);
    http.setRequestHeader('Content-type','application/json; charset=utf-8');
    http.send(null);    

    console.log("ID after request: " + courseId)

    assessment.replace(" ", "%20");

    const http2 = new XMLHttpRequest();
    url = "api/students/" + currentuser + "/courses/" + courseId + "/assess/" + assessment;
    http2.onreadystatechange = function() {//Call a function when the state changes.
        if(http2.readyState == 4 && http2.status == 200) {
           assessInfo = JSON.parse(http2.responseText);
           console.log(assessInfo)
           //assessId = assessInfo[0].Title;
           //console.log("ID: " + assessId)
        }
    }
    http2.open('PUT', url, true);
    http2.setRequestHeader('Content-type','application/json; charset=utf-8');
    http2.send(newGradeJSON);
}

/*function viewCourse(){
    var curr5 = document.getElementById('curr5').value;
    var det = "";

    var viewAss = "<br>ASSESSMENTS<br>";
    var viewGoal = "COURSE GOAL<br><br>";
  
    var progress = 0;
    var track = 0;
    var projPer = 0;
    var projLetter = "";
    var perGoal = 0;
    var suggestion = 0;
  
    //var suggestion = ((100*perGoal-(projPer*progress))/(100-progress));

    var strSugg = "";

    /*if (projPer >= perGoal){
        strSugg = strSugg + "You are on track to reach your achieve your goal!";
    }
    else if (projPer < perGoal){
        strSugg = strSugg + "You must average " + suggestion + "% on your remaining assessments to achieve your goal";
    }*/
/*}

function viewGPS(){

}

/*var m1 = document.getElementById('AddCourse');
var m2 = document.getElementById('AddClass');
var m3 = document.getElementById('AddDetails');
var m4 = document.getElementById('AddAssessment');
var m5 = document.getElementById('AddGrades');
var m6 = document.getElementById('viewCourses');
var m7 = document.getElementById('viewGPS');

window.onclick = function(event) {
    if (event.target == m1) {
        m1.style.display = "none";
    }
    else if (event.target == m2) {
        m2.style.display = "none";
    }
    else if (event.target == m3) {
        m3.style.display = "none";
    }
    else if (event.target == m4) {
        m4.style.display = "none";
    }
    else if (event.target == m5) {
        m5.style.display = "none";
    }
    else if (event.target == m6) {
        m6.style.display = "none";
    }
    else if (event.target == m7) {
        m7.style.display = "none";
    }
}*/

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