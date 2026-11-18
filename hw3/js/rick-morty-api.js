BASE_URL = 'https://rickandmortyapi.com/api';
CHARACTER_PATH = '/character';

let characterList = null;
let currentCharacter = null;


// get single charcter info
async function getCharacterInfo(index)
{
    try 
    {
        // if below 1, no go
        if (index < 1)
        {
            throw new Error("charcter index is below 1");
        }

        let url = `${BASE_URL}${CHARACTER_PATH}/${index}`;
        let res = await fetch(url);
        let data = await res.json();

        // check for error response
        if(data.error)
        {
            throw new Error(data.error);
        }

        // return data
        return data;
    }
    catch (error)
    {
        console.error(error);
    }
}

// get random character data
async function getRandomCharacter()
{
    // if we haven't fetched the character list before, get it
    if(characterList === null)
    {
        try
        {
            let url = `${BASE_URL}${CHARACTER_PATH}`;
            let res = await fetch(url);
            characterList = await res.json();
        }
        catch (error)
        {
            console.error(error);
        }

    }

    // character count
    let charCount = characterList.info.count;
    // random charcter index
    let randomIndex = Math.floor(Math.random() * (charCount-1));
    // get character info
    currentCharacter = await getCharacterInfo(randomIndex);
    console.info(currentCharacter);

    // return character
    return currentCharacter;
}