function createAccount(){
    console.log("test");
    var user;
	var username1 = document.getElementById("username1").value;
	var password1 = document.getElementById("password1").value;
    var passwordRepeat = document.getElementById("passwordRepeat").value;
    const http = new XMLHttpRequest();
    const url = "api/students";

   if (password1 == passwordRepeat){
        var newStudent = {
            Username: username1, Password: password1
        };
        var newStudentJSON = JSON.stringify(newStudent);

        http.open('GET', (url + "/" + username1), true);
        http.send(null);

        http.onreadystatechange = function() {//Call a function when the state changes.
            if(http.readyState == 4 && http.status == 200) {
                response = http.responseText;
                user = JSON.parse(response);
                console.log(user);
                user = user[0];

                if (user != null) {
                    console.log("user exists")
                    document.getElementById("signuperror").innerHTML = "That username already exists. Please try again.";
                } else {
                    console.log("user does not exist")
                    http.onreadystatechange = function() {//Call a function when the state changes.
                        if(http.readyState == 4 && http.status == 200) {
                            alert(http.responseText);
                        }
                    }
                    http.open('POST', url, true);
                    http.setRequestHeader('Content-type','application/json; charset=utf-8');
                    http.send(newStudentJSON);
                    
                    document.getElementById('SignUp').style.display='none';
                    document.getElementById('SignUpSuccess').style.display='block';
                    //window.location.href = currenturl;
                }
            }
        }
    } else {
        document.getElementById("signuperror").innerHTML = "The passwords don't match. Please try again.";
    } 
}

function login(){
    var username2 = document.getElementById("username2").value;
	var password2 = document.getElementById("password2").value;
    var response;
    var currenturl = "http://127.0.0.1:8000/";
    const http = new XMLHttpRequest();

    var user;
    const url = /*currenturl +*/ "api/students/" + username2;

    //console
    http.open('GET', url, true);
    http.send(null);

    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
            response = http.responseText;
            user = JSON.parse(response);
            user = user[0];
            
            if(user == null) {
                console.log("No user found");
            } else {
                console.log(user);
                if(user.Username == username2 && user.Password == password2) {
                    console.log("Match found");

                   // set cookie and redirect to home page
                    setCookie("username", username2, 0.05);
                    console.log("Cookie set to: " + getCookie("username"));
                    window.location.href = currenturl + 'home';
                } else {
                    document.getElementById("loginerror").innerHTML = "We couldn't find a match in our records. Please try again.";
                }
            }    
        }
    }
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

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

function checkCookie() {
    var user = getCookie("username");
    if (user != "") {
        window.location.href = window.location.href + "home";
    }
}