// event listeners
document.querySelector("#zip").addEventListener("change", displayCity);
document.addEventListener("DOMContentLoaded", loadStates);
document.querySelector("#username").addEventListener("change", checkUsername);
document.querySelector("#signupForm").addEventListener("submit", validateForm);
document.querySelector("#state").addEventListener("change", loadCounties);
document.querySelector("#password").addEventListener("change", checkPassword);
document.querySelector("#passwordAgain").addEventListener("change", checkPassword);
document.querySelector("#password").addEventListener("click", suggestPassword);

// fetch city info based on zip
// update city, lat, and lon
async function displayCity() {
    // clear previous error message
    let zipError = document.querySelector("#zipError");
    zipError.textContent = "";
    zipError.classList.add("d-none");

    //   alert(document.querySelector("#zip").value);
    try {
        let zipCode = document.querySelector("#zip").value;
        let url = `https://csumb.space/api/geo/cityInfoAPI.php?zip=${zipCode}`;
        let response = await fetch(url);
        let data = await response.json();

        //the API returns false when the zip code is not found, so we can check for that case before trying to access the city property
        if (data === false) {
            document.querySelector("#city").textContent = "Zip code not found";
            document.querySelector("#latitude").textContent = "";
            document.querySelector("#longitude").textContent = "";
            return;
        }
        console.log(data);

        document.querySelector("#city").textContent = data.city;
        document.querySelector("#latitude").textContent = data.latitude;
        document.querySelector("#longitude").textContent = data.longitude;

    } catch (error) {
        zipError.textContent = `Unable to retrieve city (error: ${error})`;
        zipError.classList.remove('d-none');
        console.error(error);
    }
}


// fetch US states and append to state select
async function loadStates() {
    let stateMenu = document.querySelector("#state");

    stateMenu.textContent = "";

    let defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Select One";
    stateMenu.appendChild(defaultOption);

    try {
        let url = "https://csumb.space/api/allStatesAPI.php";
        let response = await fetch(url);
        let data = await response.json();

        for (let item of data) {
            let option = document.createElement("option");
            option.value = item.usps;
            option.textContent = item.state;
            stateMenu.appendChild(option);
        }
    } catch (error) {
        console.error(error);

        stateMenu.textContent = "";

        let errorOption = document.createElement("option");
        errorOption.value = "";
        errorOption.textContent = "Unable to load states";
        stateMenu.appendChild(errorOption);
    }
}

// check if username is available
async function checkUsername() {
    let username = document.querySelector("#username").value;
    let usernameError = document.querySelector("#usernameError");
    usernameError.className = "alert d-none small";

    if (username.length === 0) {
        usernameError.textContent = "Username required";
        usernameError.classList.add("alert-danger");
        usernameError.classList.remove("d-none");
        return false;
    }

    let url = `https://csumb.space/api/usernamesAPI.php?username=${username}`;
    let response = await fetch(url);
    let data = await response.json();

    if (data.available) {
        usernameError.textContent = "Username available!";
        usernameError.classList.add("alert-success");
        usernameError.classList.remove("d-none");
        return true;
    } else {
        usernameError.textContent = "Username taken";
        usernameError.classList.add("alert-danger");
        usernameError.classList.remove("d-none");
        return false;
    }
}

// validate form before submission
async function validateForm(event) {
    event.preventDefault();

    let isValid = true;

    let username = document.querySelector("#username").value;
    let usernameError = document.querySelector("#usernameError");

    usernameError.textContent = "";
    usernameError.classList.add("d-none");

    if (username.length === 0) {
        usernameError.textContent = "Username required";
        usernameError.classList.add("alert-danger");
        usernameError.classList.remove("d-none");
        isValid = false;
    } else {
        let usernameAvailable = await checkUsername();

        if (usernameAvailable === false) {
            isValid = false;
        }
    }

    // check password
    isValid = isValid && checkPassword();
    // check name
    isValid = isValid && validateName(document.querySelector("#nameError"))

    if (isValid) {
        document.querySelector("#signupForm").submit();
    }
}

// load counties into dropdown
async function loadCounties() {
    let counties = document.querySelector("#county");
    let state = document.querySelector("#state").value;
    let err = document.querySelector("#stateCountyError");

    err.textContent = "";

    // set a default value
    let defaultOption = document.createElement("option");
    defaultOption.value = "invalid";
    defaultOption.textContent = "Select county:";
    counties.innerHTML = "";
    counties.appendChild(defaultOption);

    try {
        let url = `https://csumb.space/api/geo/countyListAPI.php?state=${state}`;
        let response = await fetch(url);
        let data = await response.json();

        for (let item of data) {
            let option = document.createElement("option");
            option.value = item.county;
            option.textContent = item.county;
            counties.appendChild(option);
        }
    } catch (error) {
        console.error(error);

        err.textContent = `Unable to load counties. (${error})`;
        err.classList.remove("d-none");
        err.classList.add("alert-danger");

        let errorOption = document.createElement("option");
        errorOption.value = "";
        errorOption.textContent = "Unable to load counties";
        stateMenu.appendChild(errorOption);
    }
}

function checkPassword() {
    let password = document.querySelector("#password").value;
    let passwordError = document.querySelector("#passwordError");
    // reset error msg
    passwordError.classList.add("d-none");
    passwordError.classList.remove("alert-danger");
    passwordError.textContent = "";

    // check length
    if (password.length < 6 || password === null) {
        passwordError.classList.remove("d-none");
        passwordError.classList.add("alert-danger");
        passwordError.textContent = "Password must meet requirements: 6 or more characters.";
        return false;
    }

    // check matching entries
    let passwordAgain = document.querySelector("#passwordAgain").value;
    if (password != passwordAgain) {
        passwordError.classList.remove("d-none");
        passwordError.classList.add("alert-danger");
        passwordError.textContent = "Passwords do not match.";
        return false;
    }

    return true;
}

// validate name
function validateName(errorAlert) {
    let fname = document.querySelector("#fName").value;
    let lname = document.querySelector("#lName").value;

    // clear alert
    errorAlert.textContent = "";
    errorAlert.classList.remove("alert-danger");
    errorAlert.classList.add("d-none");


    // can't be empty
    if (fname === null || lname === null
        || fname.length < 1 || lname.length < 1
    ) {
        errorAlert.textContent = "Provide a first and last name.";
        errorAlert.classList.add("alert-danger");
        errorAlert.classList.remove("d-none");
        return false;
    }

    return true;
}

// suggest a password if one is not entered
async function suggestPassword() {
    let password = document.querySelector("#password").value;
    // if a password is already there, don't bother
    if (password.length > 0 && password !== null) {
        return;
    }
    // suggest password
    let passSuggest = document.querySelector("#passSuggest");
    try {
        let url = `https://csumb.space/api/suggestedPassword.php?length=8`;
        let response = await fetch(url);
        let data = await response.json();

        passSuggest.textContent = `Suggestion: ${data.password}`;
    } catch (error) {
        console.error(error);
        passSuggest.textContent = `Password suggestion unavailable`;
    }
}