window.onload = function(){
    document.querySelector("div#box div.content form").addEventListener("submit", validate)
};

function validate() {
    let name =
        document.getElementById("name").value;
    let subject =
        document.getElementById("subject").value;
    let phone =
        document.getElementById("phone").value;
    let email =
        document.getElementById("email").value;
    let message =
        document.getElementById("message").value;
    let error_message =
        document.getElementById("error_message");

    error_message.style.padding = "10px";

    let errors = [];

    if (name.length < 5) {
        errors.push("Please Enter a valid Name");
    }
    if (subject.length < 3) {
        errors.push("Please Enter a Correct Subject");
    }
    if (isNaN(phone) || phone.length < 9) {
        errors.push("Please Enter a valid Phone Number");
    }
    if (email.indexOf("@") == -1 || email.length < 6) {
        errors.push("Please Enter a valid Email");
    }
    if (message.length < 3) {
        errors.push("Please Enter a Message");
    }

    if (errors.length > 0) {
        error_message.innerHTML =
            errors.join("<br>");
        return false;
    }
    else {
        alert("Form Submitted Successfully!");
        return true;
    }
}