'use strict'
import dataJSON from './data.json' assert {type: 'json'};


const themeIcon = document.querySelector('.theme-icon')
const body = document.querySelector('body');
const allCountryWrapper = document.querySelector('.all-countries-wrapper')
const searchBarInput = document.querySelector('.search-input')
const selectedFilterVal = document.querySelector('#region-filter')


let filteredCountryArr = []
let countryTextInput = ''
let region = ''

const updateUI = function(data){
  data.map(eachCountry => {
    return allCountryWrapper.insertAdjacentHTML('beforeend', `
      <section class="country-card">
        

        <div class="country-info">
          <h4 class="country-name">${eachCountry.name}</h4>
          <p class="country-population"><span class="info-item">Population: </span>${eachCountry.population}</p>
          <p class="country-region"><span class="info-item">Region: </span>${eachCountry.region}</p>
          <p class="country-capital"><span class="info-item">Capital: </span>${eachCountry.subregion}</p>
        </div>
      </section>
    `)
  })
}

updateUI(dataJSON)

// filter by country name
const filterByCountryNameFunc = function(){
  // e.preventDefault()
  countryTextInput = searchBarInput.value
  filteredCountryArr = dataJSON.filter(eachCountry => {
    return countryTextInput.length === 1
    ?
      eachCountry.name[0].toLowerCase().includes(countryTextInput.toLowerCase())
    :
      eachCountry.name.toLowerCase().includes(countryTextInput.toLowerCase())
  })
  allCountryWrapper.innerHTML = ''
  return updateUI(filteredCountryArr)
}
searchBarInput.addEventListener('keyup', filterByCountryNameFunc)


selectedFilterVal.addEventListener('change', function(){
  region = selectedFilterVal.value
  filteredCountryArr = dataJSON.filter(eachCountry => {
    return eachCountry.region.toLowerCase().includes(region)
  })
  allCountryWrapper.innerHTML = ''
  return updateUI(filteredCountryArr)
})