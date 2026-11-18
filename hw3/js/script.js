// data
let characters = [];

// event listeners
document.addEventListener("DOMContentLoaded", addCharacterCard);
document.querySelector("#getRandChar_btn").addEventListener("click", addCharacterCard);
document.querySelector("#getChar_btn").addEventListener("click",addIndexCharCard)
document.querySelector("#charIndex").addEventListener("blur", checkIfEmpty);

// add card to contianer and accounting
async function addCharacterCard(event, cardElement)
{
    if(!cardElement)
    {
        data = await getRandomCharacter();
        cardElement = createCharacterCard(data);
        // check again
        if (!cardElement)
        {
            console.error("cannot create card element");
            return;
        }
    }

    let card = {};
    card.id = cardElement.id;
    card.element = cardElement;
    
    // add to accounting
    characters.push(card);

    // add to container
    let charContainer = document.querySelector("#characterCards");
    charContainer.prepend(cardElement);
}

// add card with specific index 
async function addIndexCharCard(event)
{
    event.preventDefault();

    // get index from input
    let index = document.querySelector("#charIndex").value.trim();

    // check input
    if (index.length < 1)
    {
        alert("Input cannot be empty");
        return;
    }

    // fetch character, stop if index was invalid
    let data = await getCharacterInfo(index);
    if (!data)
    {
        return;
    }

    let cardElement = createCharacterCard(data);

    let card = {};
    card.id = cardElement.id;
    card.element = cardElement;
    
    // add to accounting
    characters.push(card);

    // add to container
    let charContainer = document.querySelector("#characterCards");
    charContainer.prepend(cardElement);
}


// set character info card
function createCharacterCard(data)
{
    // check data is there
    if(data === null || data.length == 0)
    {
        console.error("no data to make card");
    }

    // make new card elements
    let card = document.createElement("div");
    card.classList.add("card");
    card.classList.add("m-1");
    card.id = crypto.randomUUID();
    let cardImg = document.createElement("img");
    cardImg.classList.add("card-img-top");
    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    let cardName = document.createElement("h5");
    cardName.classList.add("card-title");

    // assemble
    cardBody.appendChild(cardName);
    card.appendChild(cardImg);
    card.appendChild(cardBody);

    if (data.image === null || data.image == "")
    {
        cardImg.classList.add("d-none");
    } else
    {
        cardImg.classList.remove("d-none");
        cardImg.src = data.image;

    }
    cardName.textContent = data.name;

    // return card
    return card;
}

// check if input is empty
function checkIfEmpty(event)
{
    let value = event.target.value;

    if(value.length < 1)
    {
        alert("Input cannot be empty");
    }
}