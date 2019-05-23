const forecastUrl = 'https://api.apixu.com/v1/forecast.json?key=';
const apiKey = 'eb6a0cfda52748a7b49215129191302';
// const currentURL = "http://api.apixu.com/v1/current.json?key=";



const $input = $('#city');
const $date = $('#date');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4")];
const $weatherDivs = [$("#weather1"), $("#weather2"), $("#weather3"), $("#weather4")];
const weekDays = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];



const getForecast = async () =>{
    const urlToFetch = forecastUrl + apiKey + '&q=' + $input.val() + '&days=4&hour=11&lang=fr';
    $destination.html($input.val());
    
    try{
        const response = await fetch(urlToFetch);
         if(response.ok){
           const jsonResponse = await response.json();
           console.log(jsonResponse);
           const days = jsonResponse.forecast.forecastday;
           return days;

         }
         
       }
       catch(error){
         console.log(error);
       }
    }


const renderForecast = (days) => {
    $weatherDivs.forEach(($day, index) => {
        const currentDay = days[index];
        let weatherContent = createWeatherHTML(currentDay);
        $day.append(weatherContent);
        
    });
}


const createWeatherHTML = (currentDay) => {
    return `<h2> Max: ${currentDay.day.maxtemp_c}</h2>
      <h2> Min: ${currentDay.day.mintemp_c}</h2>
      <h2> Humidité: ${currentDay.day.avghumidity}</h2>
      <img src="https://${currentDay.day.condition.icon}" class="weathericon" />
      <h2>${weekDays[(new Date(currentDay.date)).getDay()]}</h2>`;
}


const executeSearch = () => {
    $weatherDivs.forEach(day => day.empty());
    $destination.empty();
    $container.css("visibility", "visible");
    // getCurrent.then(days => renderCurrent(days));
    getForecast().then(forecast => renderForecast(forecast));
    return false;
  }
  
  $submit.click(executeSearch);


  
