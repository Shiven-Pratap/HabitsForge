function registerUser(event){
    event.preventDefault()

    let phone=document.getElementById("phone").value
    let key=document.getElementById("key").value


    let users = JSON.parse(localStorage.getItem("users")) || {};

    if(users[phone]){
        alert("User already registered!!")
        return
    }
    if((phone+"").length!=10){
        alert("Phone number should be 10 digits")
        return
    }
    if((key+"").length<4){
        alert("Your possword should be atleast 4 digiys")
        return
    }

    users[phone]={
        password:key,
        habits:[]
    }

    localStorage.setItem("users",JSON.stringify(users));

    alert("Registration successful");
    window.location.href = "login.html";    
}

function loginUser(event){
    event.preventDefault()

    let phone=document.getElementById("phone").value
    let key=document.getElementById("key").value

    let users = JSON.parse(localStorage.getItem("users")) || {};

    if((phone+"").length==0 || (key+"").length==0){
        alert("Fill all the values")
        return 
    }

    if(users[phone] && key==users[phone].password){
        alert("Login Successful");
        localStorage.setItem("currentUser", phone);

        window.location.href = "index.html";
    }
    else if(users[phone]){
        alert("User not registered")
    }
    else{
        alert("Username or password incorrect!")
    }
}
function shift_to_register(){
    window.location.href="register.html"
}
function shift_to_login(){
    window.location.href="login.html"
}
