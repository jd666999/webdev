const password = document.querySelector("#password");
const confirm = document.querySelector("#confirm");


function comparePasswords(){
    if(password.value ==confirm.value){

        confirm.setCustomValidity("");

    }else{

        confirm.setCustomValidity("must match password field");


    }
}

password.addEventListener("input",comparePasswords);
confirm.addEventListener("input",comparePasswords);