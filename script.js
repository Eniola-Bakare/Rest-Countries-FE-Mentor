'use strict'
import dataJSON from './data.json' assert {type: 'json'};


const themeIcon = document.querySelector('.theme-icon')
const body = document.querySelector('body');
const allCountryWrapper = document.querySelector('.all-countries-wrapper')
const searchBarInput = document.querySelector('.search-input')
const selectedFilterVal = document.querySelector('#region-filter')



let filteredArr = []
let countryTextInput = ''
let region = ''
let regionArr = []
let regionArrfilter = []

const updateUI = function(data){
  allCountryWrapper.innerHTML =''
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

    document.querySelectorAll('.country-card > *').forEach(eachCountryCard => {
    return eachCountryCard.addEventListener('click', function(){
        const countryName = eachCountryCard.childNodes[1].textContent
        const matchingCountry = dataJSON.filter(eachCountry => {
          // console.log(eachCountry.name.toLowerCase() === countryName.toLowerCase())
          return eachCountry.name.toLowerCase() === countryName.toLowerCase()
        })
        for (const country of matchingCountry) {
          body.innerHTML = '';
          body.insertAdjacentHTML('beforeend', `
          <header class="header">
            <h1 class="header-title">Where in the world?</h1>
            <p class="theme-icon"><i class="fa-sharp fa-solid fa-moon"></i> Dark Mode</p>
          </header>
          <section class="back-btn">
            <button>
              <i class="fa-sharp fa-solid fa-arrow-left"></i> Back
            </button>
          </section>
  
          <section class="country-details">
            <!--<img src=${country.flags.png} alt= ${country.name +'s' + ' flag'} >-->
  
            <div class="details">
              <h2 class="details-country-name">${country.name}</h2>
              <div class="extra-details">
                <div class="detail-left">
                  <p class="detail-item">
                    <span class="detail-type">Native Name: </span> ${country.nativeName}
                  </p>
                  <p class="detail-item">
                    <span class="detail-type">Population: </span> ${country.population}
                  </p>
                  <p class="detail-item">
                    <span class="detail-type">Region: </span> ${country.region}
                  </p>
                  <p class="detail-item">
                    <span class="detail-type">Sub Region: </span> ${country.subregion}
                  </p>
                  <p class="detail-item">
                    <span class="detail-type">Capital: </span> ${country.capital}
                  </p>
                </div>
  
                <div class="detail-right">
                  <p class="detail-item">
                    <span class="detail-type">Top Level Domain: </span> ${country.topLevelDomain}
                  </p>
                  <p class="detail-item">
                    <span class="detail-type">Currencies: </span> ${country.currencies[0].code}
                  </p>
                  <p class="detail-item">
                    <span class="detail-type">Languages: </span> ${country.languages.map(lang => lang.name).join(', ')}
                  </p>                    
                </div>
              </div>
  
              <div class="border-countries">
                <p class="border-countries-para">Border Countries:</p>
                ${//console.log(country?.borders)
                  country.borders?.map(eachBorder => {
                    return `<button class="border-countries-btn">
                      ${eachBorder}
                    </button>`
                  }).join('')
                }

            </div>
          </section>
          `)
          // backbtn
        }
        const backBtn = document.querySelector('.back-btn')
        console.log(backBtn)
        backBtn.addEventListener('click', updateUI(dataJSON))
    })
  })
}

updateUI(dataJSON)

// filter by country name
const forCountry = function(dataArr){
  return dataArr.filter(eachCountry => {
  return countryTextInput.length === 1
  ?
    eachCountry.name[0].toLowerCase().includes(countryTextInput.toLowerCase())
  :
    eachCountry.name.toLowerCase().includes(countryTextInput.toLowerCase())
})
}


//
const filterByCountryNameFunc = function(){
  countryTextInput = searchBarInput.value

  if(searchBarInput.value === '' && region || searchBarInput.value === '' && !region){
    console.log('empty')
    region = ''
    selectedFilterVal.value = 'Filter by Region'
    console.log(filteredArr)
    return updateUI(dataJSON)
  }else if(region){
    searchBarInput.textContent = ''
    regionArrfilter = forCountry(dataJSON).filter(eachCount => {
      console.log(eachCount.region.toLowerCase() === region)
      return eachCount.region.toLowerCase() === region
    }).filter((eachCountryInregion, i, arr) => {
      console.log(arr)
      // console.log(countryTextInput.toLowerCase())
      console.log(eachCountryInregion.name.toLowerCase().includes(countryTextInput.toLowerCase()))
      return eachCountryInregion.name.toLowerCase().includes(countryTextInput.toLowerCase())
    })
    console.log(regionArrfilter)
    console.log(regionArr)
    // allCountryWrapper.innerHTML = ''
    return updateUI(regionArrfilter)
  }else{
    filteredArr = forCountry(dataJSON)
    return updateUI(filteredArr)
  }

  // allCountryWrapper.innerHTML = ''
}

searchBarInput.addEventListener('keyup', filterByCountryNameFunc)
selectedFilterVal.addEventListener('change', function(){
  searchBarInput.value = ''
  region = selectedFilterVal.value

  regionArr = dataJSON.filter(eachCountry => {
    return eachCountry.region.toLowerCase().includes(region)
  })

  // allCountryWrapper.innerHTML = ''
  return updateUI(regionArr)
})
