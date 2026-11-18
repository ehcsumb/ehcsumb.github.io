BASE_NAME_URL = "https://www.behindthename.com/api";
NAME_LOOKUP_PATH = "/lookup.json";
RELATED_LOOKUP_PATH = "/related.json";
NAME_API_KEY = "er083253705";

// get specific name info
async function getNameInfo(name, callback)
{
    try
    {
        let url = `${BASE_NAME_URL}${NAME_LOOKUP_PATH}?name=${name}&key=${NAME_API_KEY}`;
        let res = await fetch(url);
        let data = await res.json();

        if(callback) callback(data);
    }
    catch (error)
    {
        console.error(error);
    }
}

// get related names
async function getRelatedNames(name, callback)
{
    try
    {
        let url = `${BASE_NAME_URL}${RELATED_LOOKUP_PATH}?name=${name}&key=${NAME_API_KEY}`;
        let res = await fetch(url);
        let data = await res.json();

        if(callback) callback(data);
    }
    catch (error)
    {
        console.error(error);
    }
}


// test callback
function logData(data)
{
    console.log(data);
}