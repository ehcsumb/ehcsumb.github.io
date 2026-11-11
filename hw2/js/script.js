document.querySelector("button").addEventListener("click", gradeQuiz);

let score = 0;

// randomize radio buttons
displayQ4Choices();
displayQ6Choices();

// init total attempts
let attempts = localStorage.getItem("total_attempts");

if (attempts === null) {
  attempts = 0;
} else {
  attempts = Number(attempts);
}

// functions down here

function setMarkImage(index, imageName, altText) {
    let markContainer = document.querySelector(`#markImg${index}`);
    markContainer.textContent = "";

    let img = document.createElement("img");
    img.src = `img/${imageName}`;
    img.alt = altText;
    markContainer.appendChild(img);
}

function rightAnswer(index) {
    let feedback = document.querySelector(`#q${index}Feedback`);
    feedback.textContent = "Correct!";
    feedback.className = "bg-success text-white";
    setMarkImage(index, "checkmark.png", "Checkmark");
    score += 10;
}

function wrongAnswer(index) {
    let feedback = document.querySelector(`#q${index}Feedback`);
    feedback.textContent = "Incorrect!";
    feedback.className = "bg-warning text-black";
    setMarkImage(index, "xmark.png", "X mark");
}

function isFormValid() {
    let isValid = true;
    let q1Response = document.querySelector("#q1").value;
    let validationFdbk = document.querySelector("#validationFdbk");

    if (q1Response === "") {
        isValid = false;
        validationFdbk.textContent = "Question 1 was not answered";
    }

    return isValid;
}

function gradeQuiz() {
    score = 0;
    let q1Response = document.querySelector("#q1").value.toLowerCase();
    let q2Response = document.querySelector("#q2").value;
    let congratsAlert = document.querySelector("#congrats");
    congratsAlert.classList.add("d-none");

    if (q1Response === "sacramento") {
        rightAnswer(1);
    } else {
        wrongAnswer(1);
    }

    if (q2Response === "mo") {
        rightAnswer(2);
    } else {
        wrongAnswer(2);
    }

    if (document.querySelector("#Jefferson").checked &&
        document.querySelector("#Roosevelt").checked &&
        !document.querySelector("#Jackson").checked &&
        !document.querySelector("#Franklin").checked) {
        rightAnswer(3);
    } else {
        wrongAnswer(3);
    }

    let selectedQ4 = document.querySelector("input[name=q4]:checked");

    if (selectedQ4 !== null && selectedQ4.value === "Rhode Island") {
        rightAnswer(4);
    } else {
        wrongAnswer(4);
    }

    // question 5
    let q5Response = document.querySelector("#q5").value.toLowerCase();
    if (q5Response === "hartford") {
        rightAnswer(5);
    } else {
        wrongAnswer(5);
    }

    // question 6
    let selectedQ6 = document.querySelector("input[name=q6]:checked");
    if (selectedQ6 !== null && selectedQ6.value === "New York") {
        rightAnswer(6);
    } else {
        wrongAnswer(6);
    }

    // question 7
    if (document.querySelector("#q7Idaho").checked &&
        document.querySelector("#q7NorthDakota").checked &&
        !document.querySelector("#q7Washington").checked &&
        !document.querySelector("#q7Utah").checked) {
        rightAnswer(7);
    } else {
        wrongAnswer(7);
    }

    // question 8
    if (document.querySelector("#q8").value === "boise") {
        rightAnswer(8);
    } else {
        wrongAnswer(8);
    }

    // question 9
    let selectedQ9 = document.querySelector("input[name=q9]:checked");
    if (selectedQ9 !== null && selectedQ9.value === "6") {
        rightAnswer(9);
    } else {
        wrongAnswer(9);
    }

    // question 10
    let q10Response = document.querySelector("#q10").value.trim().toLowerCase();
    if (q10Response === "bismarck") {
        rightAnswer(10);
    } else {
        wrongAnswer(10);
    }

    let totalScore = document.querySelector("#totalScore");
    totalScore.textContent = `Total Score: ${score}`;
    if(score < 80) {
        totalScore.classList.add("text-danger");
    } else {
        totalScore.className = "text-success";
        congratsAlert.classList.remove("d-none");
    }

    attempts++;
    document.querySelector("#totalAttempts").textContent = `Total Attempts: ${attempts}`;
    localStorage.setItem("total_attempts", attempts);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function displayQ4Choices() {
    let q4ChoicesArray = ["Maine", "Rhode Island", "Maryland", "Delaware"];
    shuffleArray(q4ChoicesArray);

    let choicesContainer = document.querySelector("#q4Choices");
    choicesContainer.textContent = "";

    for (let choice of q4ChoicesArray) {
        let holder = document.createElement("div");
        holder.className = "form-check form-check-inline";

        let input = document.createElement("input");
        input.type = "radio";
        input.name = "q4";
        input.id = choice;
        input.value = choice;
        input.className = "form-check-input";

        let label = document.createElement("label");
        label.htmlFor = choice;
        label.textContent = choice;
        label.className = "form-check-label";

        holder.appendChild(input);
        holder.appendChild(label);
        choicesContainer.appendChild(holder);
    }
}

function displayQ6Choices() {
    let q6ChoicesArray = ["Vermont", "New Hampshire", "New York", "Maine"];
    shuffleArray(q6ChoicesArray);

    let choicesContainer = document.querySelector("#q6Choices");
    choicesContainer.textContent = "";

    for (let choice of q6ChoicesArray) {
        let holder = document.createElement("div");
        holder.className = "form-check form-check-inline";

        let id = "q6" + choice.replace(" ", "");

        let input = document.createElement("input");
        input.type = "radio";
        input.name = "q6";
        input.id = id;
        input.value = choice;
        input.className = "form-check-input";

        let label = document.createElement("label");
        label.htmlFor = id;
        label.textContent = choice;
        label.className = "form-check-label";

        holder.appendChild(input);
        holder.appendChild(label);
        choicesContainer.appendChild(holder);
    }
}

// helper function I can use from console to fill all correct answers
function fillCorrectAnswers() {
    document.querySelector("#q1").value = "Sacramento";
    document.querySelector("#q2").value = "mo";

    document.querySelector("#Jackson").checked = false;
    document.querySelector("#Franklin").checked = false;
    document.querySelector("#Jefferson").checked = true;
    document.querySelector("#Roosevelt").checked = true;

    document.querySelector("input[name=q4][value='Rhode Island']").checked = true;
    document.querySelector("#q5").value = "Hartford";
    document.querySelector("input[name=q6][value='New York']").checked = true;

    document.querySelector("#q7Idaho").checked = true;
    document.querySelector("#q7NorthDakota").checked = true;
    document.querySelector("#q7Washington").checked = false;
    document.querySelector("#q7Utah").checked = false;

    document.querySelector("#q8").value = "boise";
    document.querySelector("#q9_6").checked = true;
    document.querySelector("#q10").value = "Bismarck";
}
