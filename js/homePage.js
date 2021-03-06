var currentuser = getCookie("username");

function displayWelcome() {
    document.getElementById('welcomeMessage').innerHTML = "Welcome, " + currentuser + "!";
}

function displayCurrentDate() {
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth() + 1;
    var year = today.getFullYear();
    var monthName = "";

    switch(month) {
        case 01: monthName="January"; break;
        case 02: monthName="February"; break;
        case 03: monthName="March"; break;
        case 04: monthName="April"; break;
        case 05: monthName="May"; break;
        case 06: monthName="June"; break;
        case 07: monthName="July"; break;
        case 08: monthName="August"; break;
        case 09: monthName="September"; break;
        case 10: monthName="October"; break;
        case 11: monthName="November"; break;
        case 12: monthName="December"; break;
    }

    document.getElementById("displayDate").innerHTML = "Today's date: " + monthName + " " + day + ", " + year
}

function enableText() {
    document.getElementById("assignNum").disabled = !(document.getElementById("assignBool").checked);
    document.getElementById("labNum").disabled = !(document.getElementById("labBool").checked);
    document.getElementById("quizNum").disabled = !(document.getElementById("quizBool").checked);
    document.getElementById("midNum").disabled = !(document.getElementById("midBool").checked);
}

//complete
function createCourse(){
    var cName = document.getElementById('cName').value;
    var cNumber = document.getElementById('cNumber').value;
    var cSection = document.getElementById('cSection').value;
    var cInst = document.getElementById('cInst').value;
    var assignNum = document.getElementById('assignNum').value;
    var labNum = document.getElementById('labNum').value;
    var quizNum = document.getElementById('quizNum').value;
    var midNum = document.getElementById('midNum').value;

    if (assignNum == '') {
        assignNum = 0;
    }
    if (labNum == '') {
        labNum = 0;
    }
    if (midNum == '') {
        midNum = 0;
    }
    if (quizNum == '') {
        quizNum = 0;
    }

    var newCourse = {
        Course_ID: cNumber,
        Course_Name: cName,
        Section_ID: cSection,
        Instructor: cInst,
        Assignments: assignNum,
        Labs: labNum,
        Quizzes: quizNum,
        Midterms: midNum
    }

    var newCourseJSON = JSON.stringify(newCourse);

    const http = new XMLHttpRequest();
    const url = "api/students/" + currentuser + "/courses";
    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
            alert(http.responseText);
        }
    }
    http.open('POST', url, false);
    http.setRequestHeader('Content-type','application/json; charset=utf-8');
    http.send(newCourseJSON);

    viewCourseList();
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
    var course = document.getElementById('courseSelect').value;
    var courseInfo;
    var courseId;
    var aName = document.getElementById('aName').value;
    var aValue = parseInt(document.getElementById('aValue').value);
    var aType = document.getElementById('aType').value;
    console.log(aType)
    var aDue = document.getElementById('aDue').value;

    if(aType != "default" && course != "Select a course...") {
        var newAssess = {
            Title: aName,
            Type: aType,
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

        document.getElementById('courseSelect').
        document.getElementById('aName').innerHTML = "";
        document.getElementById('aValue').innerHTML = "";
        document.getElementById('aDue').innerHTML = "";
        document.getElementById('AddAssessment').style.display='none';
    }
    else if(aType == "default") {
        document.getElementById("addAssessError").innerHTML = "Assessment type not selected.";
    } else if(course == "Select a course...") {
        document.getElementById("addAssessError").innerHTML = "Course not selected.";
    }
}

function dueToday() {
    var dispList = "";
    var courseList;
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth() + 1;
    var year = today.getFullYear();

    courseList = getCourses();
    console.log(courseList);
    var i;
    var j;
    for(i=0; i<courseList.length; i++) {
        assessments = getAssessments(courseList[i].id);
        console.log(assessments);
        for(j=0; j<assessments.length; j++) {
            var tempDate = assessments[j].Due_Date;
           console.log(tempDate)
            var thisDay = parseInt(tempDate.slice(0,2))
          //  console.log(thisDay)
          //  console.log(parseInt(tempDate.slice(3,5)))
          //  console.log( parseInt(tempDate.slice(6,10)))
            if (parseInt(tempDate.slice(0,2)) == day && parseInt(tempDate.slice(3,5)) == month && parseInt(tempDate.slice(6, 10)) == year) {
                dispList = dispList + assessments[j].Title + "<br />";
            }
        }
    }
    document.getElementById('dueToday').innerHTML = dispList;
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

//can't be added until course page is added
function viewCourse(){

    // document.getElementById("outDetails").innerHTML = "test"
    var course = document.getElementById('curr5').value;
    var det = "";

    var detailStr = "<br>COURSE INFO<br><br>"
    var assessStr = "<br>ASSESSMENTS<br><br>";
    var viewGoal = "<br>COURSE GOAL<br><br>";
  
    // var progress = 0; //how much of the course is completed (percentage)
    // var track = 0; //how much of ^^ that you earned
    // var projPer = 0; //current percentage grade
    // var projLetter = ""; //current letter grade
    // var perGoal = 0; //goal percentage
    // var suggestion = 0; //how much to get to goal
    var courseInfo;
    var courseId;

    const http = new XMLHttpRequest();
    var url = "api/students/" + currentuser + "/courses/" + course;
    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
           courseInfo = JSON.parse(http.responseText);
           console.log(courseInfo)
           courseId = courseInfo[0].id;
           courseInfo = courseInfo[0];
           console.log("ID: " + courseId)
        }
    }
    http.open('GET', url, false);
    http.setRequestHeader('Content-type','application/json; charset=utf-8');
    http.send(null);   

    name=courseInfo.Course_Name;
    instructor = courseInfo.Instructor;
    section = courseInfo.Section_ID;

    detailStr = detailStr + course + ": " + name + "<br>";
    detailStr = detailStr + "Instructor: " + instructor + "<br>Section: " + section + "<br>"

    document.getElementById("outDetails").innerHTML = detailStr;


    numAssign = courseInfo.Assignments;
    numLab = courseInfo.Labs;
    numQuizzes = courseInfo.Quizzes;
    numMid = courseInfo.Midterms;
    goalGrade = courseInfo.Goal_Grade;
    isClosed = courseInfo.Complete;

    if(courseInfo.Assignments != null) {
        numAssign = courseInfo.Assignments;
    } else {
        numAssign = 0;
    }
    if(courseInfo.Labs != null) {
        numLab = courseInfo.Labs;
    } else {
        numLab = 0;
    }
    if (courseInfo.Quizzes != null) {
        numQuizzes = courseInfo.Quizzes;
    } else {
        numQuizzes = 0;
    }
    if (courseInfo.Midterms != null) {
        numMid = courseInfo.Midterms;
    } else {
        numMid = 0;
    }

    var totalAssess = numAssign + numLab + numQuizzes + numMid;
    console.log("total: " + totalAssess)

    var completeCount=0;

    var assessInfo = getAssessments(courseId);

    var i;
    for(i=0; i<assessInfo.length; i++) {
        assessStr = assessStr + assessInfo[i].Title + " (due: " + assessInfo[i].Due_Date + ") (";
        if(assessInfo[i].Complete) {
            assessStr = assessStr + "complete)<br>"
            completeCount = completeCount + 1;
        } else {
            assessStr = assessStr + "incomplete)<br>"
        }
    }

    assessStr = assessStr + "<br>Total assessments completed: " + completeCount + "/" + totalAssess;
    document.getElementById("outAssessments").innerHTML = assessStr; 

    //              <p id="outDetails"></p> (name, number, instructor, section)
	// 				<p id="outSched"></p> (schedule)
	// 				<p id="outMon"></p> (classes, assessments due)
	// 				<p id="outTues"></p>
	// 				<p id="outWed"></p>
	// 				<p id="outThurs"></p>
	// 				<p id="outFri"></p>
	// 				<p id="outAssessments"></p> (all assessments for course)
	// 				<p id="outGoal"></p> (goal)
	// 				<p id="outProjected"></p> (projected grade)
	// 				<p id="outSuggestion"></p> (suggested grade)
  
    //var suggestion = ((100*perGoal-(projPer*progress))/(100-progress));

    var strSugg = "";

    /*if (projPer >= perGoal){
        strSugg = strSugg + "You are on track to achieve your goal!";
    }
    else if (projPer < perGoal){
        strSugg = strSugg + "You must average " + suggestion + "% on your remaining assessments to achieve your goal.";
    }*/
}

function getCourses() {
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

    return courseList;
}

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
   
    var thisCourse;

    var courseSelect = document.getElementsByClassName("courseSelect");
    var i;
    var j;
    for(i=0; i<courseSelect.length; i++) {
        thisCourse = document.createElement("option");
        thisCourse.innerHTML = "Select a course...";
        courseSelect[i].appendChild(thisCourse);
    }

    console.log("number of elements in courseSelect class: " + courseSelect.length)

    for(i=0; i<courseList.length; i++) {
        for(j=0; j<courseSelect.length; j++) {
            thisCourse = document.createElement("option");
            thisCourse.innerHTML = courseList[i].Course_ID;
            courseSelect[j].appendChild(thisCourse);
        }
    }
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

function viewCourseList(){
    var courseList;
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

    var dispList = "";
    var i;
    for (i=0; i<courseList.length; i++) {
        dispList = dispList + courseList[i].Course_ID + "<br />";
    }
    
    document.getElementById('courseList').innerHTML = dispList;

}

//needs to be tested
function viewGPA(){
    //option 1: define new api route that lists all completed courses (more efficient)
    //option 2: stick with what i have and search through to find completed courses

	document.getElementById('outGPA').innerHTML = "h"; //why
	
	var creditHours = 0;
	var credits = 0;
    var GPA = 0;

    var currHours;
    var currGrade;
    
    const http = new XMLHttpRequest();
    var url = "api/students/" + currentuser + "/courses/complete"
    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
           completedCourses = JSON.parse(http.responseText);
           console.log(completedCourses)
        }
    }
    http.open('GET', url, false);
    http.setRequestHeader('Content-type','application/json; charset=utf-8');
    http.send(null);    

    var i;
    for(i=0; i<completedCourses.length; i++) {
        currHours = completedCourses[i].Credit_Hours;

        switch(completedCourses[i].Final_Grade) {
            case "A+": currGrade=4.3; break;
            case "A": currGrade=4.0; break;
            case "A-": currGrade=3.7; break;
            case "B+": currGrade=3.3; break;
            case "B": currGrade=3.0; break;
            case "B-": currGrade=2.7; break;
            case "C+": currGrade=2.3; break;
            case "C": currGrade=2.0; break;
            case "D": currGrade=1.0; break;
            case "F": currGrade=0.0; break;
        }

        credits = credits+(currHours*currGrade);
        creditHours = creditHours+currHours;
    }
	
	GPA = credits/creditHours;
	document.getElementById('outGPA').innerHTML = GPA;
}

function view7(){

	var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "November", "December"];
	var day = (new Date()).getDate();
	var day1 = (new Date()).getDay();
	var dayName1 = days[day1];
	var dayName2 = "";
	var dayName3 = "";
	var dayName4 = "";
	var dayName5 = "";
	var dayName6 = "";
	var dayName7 = "";
	var month = (new Date()).getMonth();
	var month1 = months[month];
	var year = (new Date()).getFullYear();
	var strDay1 = "";
	var strDay2 = "";
	var strDay3 = "";
	var strDay4 = "";
	var strDay5 = "";
	var strDay6 = "";
	var strDay7 = "";
	
	strDay1 = dayName1 + ", " + month1 + " " + day + ", " + year + "<br>Classes:<br>";;
	if (day1+1 < 7){
		dayName2 = days[day1+1];
		strDay2 = dayName2 + ", " + month1 + " " + (day+1) + ", " + year + "<br>Classes:<br>";
	}
	else if (day1+1 >= 7){
		dayName2 = days[day1-6];
		strDay2 = dayName2 + ", " + month1 + " " + (day+1) + ", " + year + "<br>Classes:<br>";
	}
	if (day1+2 < 7){
		dayName3 = days[day1+2];
		strDay3 = dayName3 + ", " + month1 + " " + (day+2) + ", " + year + "<br>Classes:<br>";
	}
	else if (day1+2 >= 7){
		dayName3 = days[day1-5];
		strDay3 = dayName3 + ", " + month1 + " " + (day+2) + ", " + year + "<br>Classes:<br>";
	}
	if (day1+3 < 7){
		dayName4 = days[day1+3];
		strDay4 = dayName4 + ", " + month1 + " " + (day+3) + ", " + year + "<br>Classes:<br>";
	}
	else if (day1+3 >= 7){
		dayName4 = days[day1-4];
		strDay4 = dayName4 + ", " + month1 + " " + (day+3) + ", " + year + "<br>Classes:<br>";
	}
	if (day1+4 < 7){
		dayName5 = days[day1+4];
		strDay5 = dayName5 + ", " + month1 + " " + (day+4) + ", " + year + "<br>Classes:<br>";
	}
	else if (day1+4 >= 7){
		dayName5 = days[day1-3];
		strDay5 = dayName5 + ", " + month1 + " " + (day+4) + ", " + year + "<br>Classes:<br>";
	}
	if (day1+5 < 7){
		dayName6 = days[day1+5];
		strDay6 = dayName6 + ", " + month1 + " " + (day+5) + ", " + year + "<br>Classes:<br>";
	}
	else if (day1+5 >= 7){
		dayName6 = days[day1-2];
		strDay6 = dayName6 + ", " + month1 + " " + (day+5) + ", " + year + "<br>Classes:<br>";
	}
	if (day1+6 < 7){
		dayName7 = days[day1+6];
		strDay7 = dayName7 + ", " + month1 + " " + (day+6) + ", " + year + "<br>Classes:<br>";
	}
	else if (day1+6 >= 7){
		dayName7 = days[day1-1];
		strDay7 = dayName7 + ", " + month1 + " " + (day+6) + ", " + year + "<br>Classes:<br>";
	}
	
	var i = 1;
	var j = 1;
	for (i = 1; i < courses.length; i++){
		for (j = 1; j < courses[i].clsClasses.length; j++){
			if (courses[i].clsClasses[j].clsDay == dayName1){
				strDay1 = strDay1 + courses[i].clsName + ": " + courses[i].clsClasses[j].clsType + " " + courses[i].clsClasses[j].clsStart + " - " + courses[i].clsClasses[j].clsEnd + "<br>";}
			else if (courses[i].clsClasses[j].clsDay == dayName2){
				strDay2 = strDay2 + courses[i].clsName + ": " + courses[i].clsClasses[j].clsType + " " + courses[i].clsClasses[j].clsStart + " - " + courses[i].clsClasses[j].clsEnd + "<br>";}
			else if (courses[i].clsClasses[j].clsDay == dayName3){
				strDay3 = strDay3 + courses[i].clsName + ": " + courses[i].clsClasses[j].clsType + " " + courses[i].clsClasses[j].clsStart + " - " + courses[i].clsClasses[j].clsEnd + "<br>";}
			else if (courses[i].clsClasses[j].clsDay == dayName4){
				strDay4 = strDay4 + courses[i].clsName + ": " + courses[i].clsClasses[j].clsType + " " + courses[i].clsClasses[j].clsStart + " - " + courses[i].clsClasses[j].clsEnd + "<br>";}
			else if (courses[i].clsClasses[j].clsDay == dayName5){
				strDay5 = strDay5 + courses[i].clsName + ": " + courses[i].clsClasses[j].clsType + " " + courses[i].clsClasses[j].clsStart + " - " + courses[i].clsClasses[j].clsEnd + "<br>";}
			else if (courses[i].clsClasses[j].clsDay == dayName6){
				strDay6 = strDay6 + courses[i].clsName + ": " + courses[i].clsClasses[j].clsType + " " + courses[i].clsClasses[j].clsStart + " - " + courses[i].clsClasses[j].clsEnd + "<br>";}
			else if (courses[i].clsClasses[j].clsDay == dayName7){
				strDay7 = strDay7 + courses[i].clsName + ": " + courses[i].clsClasses[j].clsType + " " + courses[i].clsClasses[j].clsStart + " - " + courses[i].clsClasses[j].clsEnd + "<br>";}
			else {}
		}
	}
	
	strDay1 = strDay1 + "Assessments:<br>";
	strDay2 = strDay2 + "Assessments:<br>";
	strDay3 = strDay3 + "Assessments:<br>";
	strDay4 = strDay4 + "Assessments:<br>";
	strDay5 = strDay5 + "Assessments:<br>";
	strDay6 = strDay6 + "Assessments:<br>";
	strDay7 = strDay7 + "Assessments:<br>";
	
	i = 1;
	j = 1;
	for (i = 1; i < courses.length; i++){
		for (j = 1; j < courses[i].clsClasses.length; j++){
			if (courses[i].clsAssessments[j].clsADueMonth == month && courses[i].clsAssessments[j].clsADueDay == day){
				strDay1 = strDay1 + courses[i].clsName + ": " + courses[i].clsAssessments[j].clsAName + ", Value: " + courses[i].clsAssessments[j].clsAValue + "%<br>";}
			else if (courses[i].clsAssessments[j].clsADueMonth == month && courses[i].clsAssessments[j].clsADueDay == day+1){
				strDay2 = strDay2 + courses[i].clsName + ": " + courses[i].clsAssessments[j].clsAName + ", Value: " + courses[i].clsAssessments[j].clsAValue + "%<br>";}
			else if (courses[i].clsAssessments[j].clsADueMonth == month && courses[i].clsAssessments[j].clsADueDay == day+2){
				strDay3 = strDay3 + courses[i].clsName + ": " + courses[i].clsAssessments[j].clsAName + ", Value: " + courses[i].clsAssessments[j].clsAValue + "%<br>";}
			else if (courses[i].clsAssessments[j].clsADueMonth == month && courses[i].clsAssessments[j].clsADueDay == day+3){
				strDay4 = strDay4 + courses[i].clsName + ": " + courses[i].clsAssessments[j].clsAName + ", Value: " + courses[i].clsAssessments[j].clsAValue + "%<br>";}
			else if (courses[i].clsAssessments[j].clsADueMonth == month && courses[i].clsAssessments[j].clsADueDay == day+4){
				strDay5 = strDay5 + courses[i].clsName + ": " + courses[i].clsAssessments[j].clsAName + ", Value: " + courses[i].clsAssessments[j].clsAValue + "%<br>";}
			else if (courses[i].clsAssessments[j].clsADueMonth == month && courses[i].clsAssessments[j].clsADueDay == day+5){
				strDay6 = strDay6 + courses[i].clsName + ": " + courses[i].clsAssessments[j].clsAName + ", Value: " + courses[i].clsAssessments[j].clsAValue + "%<br>";}
			else if (courses[i].clsAssessments[j].clsADueMonth == month && courses[i].clsAssessments[j].clsADueDay == day+6){
				strDay7 = strDay7 + courses[i].clsName + ": " + courses[i].clsAssessments[j].clsAName + ", Value: " + courses[i].clsAssessments[j].clsAValue + "%<br>";}
			else {}
		}
	}
	
	document.getElementById('day1').innerHTML = strDay1;
	document.getElementById('day2').innerHTML = strDay2;
	document.getElementById('day3').innerHTML = strDay3;
	document.getElementById('day4').innerHTML = strDay4;
	document.getElementById('day5').innerHTML = strDay5;
	document.getElementById('day6').innerHTML = strDay6;
	document.getElementById('day7').innerHTML = strDay7;
}

/*
var m1 = document.getElementById('AddCourse');
var m2 = document.getElementById('AddClass');
var m3 = document.getElementById('AddDetails');
var m4 = document.getElementById('AddAssessment');
var m5 = document.getElementById('AddGrades');
var m6 = document.getElementById('ViewCourses');
var m7 = document.getElementById('ViewGPA');
var m10 = document.getElementById('View7');

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
	else if (event.target == m10) {
        m10.style.display = "none";
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