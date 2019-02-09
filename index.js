const keys = require ('./key');
const fetch = require('node-fetch');

async function getWeatherByName(city, country)
{
    try 
    {
        var response;
        console.log(`city = ${city} country = ${country}`);
        if(country!=undefined && country!=``)
        {
            response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=imperial&APPID=${keys.user_api}`);
        }
        else{
            response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${keys.user_api}`);
        }
        
        const json_data = await response.json();
        parseResponse(json_data);
    }
    catch (error)
    {   
        console.log(error);
    }
}

function parseResponse(data)
{
    if(data.cod!=200)
    {
        console.log(`Error Message: ${data.message}`);
    }
    else
    {
        console.log(`${data.name} Weather:`);
        console.log(`${data.main.temp} degrees Fahrenheit.`); // units = imperial to fetch Fahrenheit degree.
    }
}

function getUserInput(question, callback)
{
    const stdin = process.stdin; 
    console.log(question);

    stdin.once('data', async (data)=>{
        const rawInput = data.toString().trim();
        if(rawInput.includes(`,`)) // city name and country name are separated by ',' city name must come first.
        {
            await callback(rawInput.split(`,`)[0],rawInput.split(`,`)[1]);
        }
        else
        {
            await callback(rawInput);
        }
        process.exit();
    })   
}

getUserInput("Where are you?", getWeatherByName);
