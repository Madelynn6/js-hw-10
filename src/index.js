import './css/styles.css';
import {fetchCountries} from "./fetchCountries.js";
import _ from 'lodash'
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const listBox = document.querySelector('.country-list');
const infoBox = document.querySelector('.country-info');

function handleInput(e) {  
        const name = e.target.value;
        fetchCountries(name)
        .then((r) => {
            const countries = r.filter(el => el['name']['common'].toLowerCase().includes(name.toLowerCase()))
            renderCountry(countries);
            })
        .catch((error) => console.log(error));
}

input.addEventListener('input', _.debounce(handleInput,DEBOUNCE_DELAY));


function renderCountry(countries) {
    if(countries.length>=2 && countries.length<=10){
        const listMarkup = countries
        .map((el) => {
          return `
              <li>
                <p><span><img width="30" src="${el.flags.svg}" /></span>   ${el.name.common}</p>
              </li>
              `;
            })
            .join("");
          listBox.innerHTML = listMarkup;
    }
    else if(countries.length>10){
        Notify.info('Too many matches found. Please enter a more specific name.')}
    else if(countries.length===1){
        listBox.classList.add('hidden')
        const countryMarkup = countries
        .map((el) => {
          return `
            <h2><span><img width="30" src="${el.flags.svg}" /></span>   ${el.name.common}</h2>
                <li><span>Capital: </span>${el.capital}</li>
                <li><span>Population: </span>${el.population}</li>
                <li><span>Languages: </span>${Object.values(el.languages)}</li>
                
              `;
            })
            .join("");
            infoBox.innerHTML = countryMarkup;
            }
    else if(countries.length===0){
        listBox.classList.add('hidden')
        infoBox.classList.add('hidden')
        Notify.failure('Oops, there is no country with that name')}
        }