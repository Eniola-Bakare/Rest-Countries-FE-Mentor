'use strict'
import dataJSON from './data.json' assert {type: 'json'};


const themeIcon = document.querySelector('.theme-icon')
const body = document.querySelector('body');
const allCountryWrapper = document.querySelector('.all-countries-wrapper')
const searchContainer = document.querySelector('.search-container')
const searchBar = document.querySelector('.search-bar')
const searchBarInput = document.querySelector('.search-input')
const selectedFilterVal = document.querySelector('#region-filter')
const backBTN = document.querySelector('.back-btn')

let filteredArr = []
let countryTextInput = ''
let region = ''
let regionArr = []
let regionArrfilter = []
let themeState = false;

const detailsFunc = function(country){
  allCountryWrapper.innerHTML =''
  if (document.querySelector('.country-details')) {
    document.querySelector('.country-details').remove()
  }
   body.insertAdjacentHTML('beforeend', `
  
          <section class="country-details">
            <img src=${country.flags.png} alt= ${country.name +'s' + ' flag'} >
  
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
                    <span class="detail-type">Currencies: </span> ${country.currencies?.map(each => {each.code})}
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

          // for borders
        document.querySelectorAll('.border-countries-btn').forEach(border => {
          border.addEventListener('click', function(){
            let borderMatch = border.textContent.toLowerCase().trim()
            const borerMatched = dataJSON.filter(country => {
              return country.alpha3Code.toLowerCase() === borderMatch
            })
            for (const country of borerMatched) {
              detailsFunc(country)
            }
          })
        })
         // for borders theme
         if(!themeState){
          document.querySelectorAll('.border-countries-btn').forEach(each => {
            each.style.color = 'var(--white-Dark-Mode-Text--Light-Mode-Elements)';
            each.style.backgroundColor =  'var(--very-dark-Blue-Light-Mode-Text)';
           
          })
          document.querySelectorAll('.detail-type').forEach(each => {
            each.style.color = 'var(--white-Dark-Mode-Text--Light-Mode-Elements)';
          })
        }else if(themeState){
          document.querySelectorAll('.border-countries-btn').forEach(each => {
            each.style.color = 'var(--very-dark-Blue-Light-Mode-Text)';
            each.style.backgroundColor =  'var(--white-Dark-Mode-Text--Light-Mode-Elements)';
          })
          document.querySelectorAll('.detail-type').forEach(each => {
            each.style.color = 'var(--very-dark-Blue-Light-Mode-Text)';
          })
        }

}

const themeFuncElem = function(colorElems, forBody, colorText){
  const header = document.querySelector('.header');
  const searchIcon = document.querySelector('.fa-solid')
  const searchInputPlaceHolder = document.querySelector('.search-input')
  const infoType = document.querySelectorAll('.info-item')
  const backBtn = document.querySelector('.back-btn > button')
  // const borderCountries = 
 

  // texts
      body.style.color = 
      backBtn.style.color =
      selectedFilterVal.style.color = 
      searchBar.style.color = 
      colorText;
      infoType.forEach(each => {
        each.style.color = colorText
      })
      document.querySelectorAll('.border-countries-btn').forEach(each => {
        each.style.color = colorText;
        each.style.backgroundColor = colorElems;
      })
      document.querySelectorAll('.detail-type').forEach(each => {
        each.style.color = colorText;
      })
  // elems
      body.style.backgroundColor = forBody;
      backBtn.style.backgroundColor =
      header.style.backgroundColor =
      selectedFilterVal.style.backgroundColor = 
      searchBar.style.backgroundColor = 
        colorElems
   
      document.querySelectorAll('.all-countries-wrapper > .country-card').forEach(country => {
        country.style.backgroundColor = colorElems
      })
}


const styleFuncHide = function(elem){
  elem.style.display = 'none'
  elem.style.visibility = 'hidden'
}
const styleFuncShow = function(elem){
  elem.style.display = 'flex'
  elem.style.visibility = 'visible'
}

const updateUI = function(data){
  styleFuncHide(backBTN)

    styleFuncShow(allCountryWrapper)

    styleFuncShow(searchContainer)

    if (document.querySelector('.country-details')) {
      console.log('country details here____')
      document.querySelector('.country-details').remove()
    }

    allCountryWrapper.innerHTML =''
    data.map(eachCountry => {
      return allCountryWrapper.insertAdjacentHTML('beforeend', `
      <section class="country-card">
        
      <img loading="lazy" src= ${eachCountry.flags.png} alt="${eachCountry.name} flag image">
        <div class="country-info">
          <h4 class="country-name">${eachCountry.name}</h4>
          <p class="country-population"><span class="info-item">Population: </span>${eachCountry.population}</p>
          <p class="country-region"><span class="info-item">Region: </span>${eachCountry.region}</p>
          <p class="country-capital"><span class="info-item">Capital: </span>${eachCountry.subregion}</p>
        </div>
      </section>
      `)
  })


 
    document.querySelectorAll('.country-card ').forEach(eachCountryCard => {
    return eachCountryCard.addEventListener('click', function(e){
      let test = eachCountryCard.childNodes[3]
      
      styleFuncShow(backBTN)

     styleFuncHide(allCountryWrapper)

      styleFuncHide(searchContainer)

        // const countryName = eachCountryCard.childNodes[2].textContent
        const countryName = test.childNodes[1].textContent.toLowerCase();
        const matchingCountry = dataJSON.filter(eachCountry => {
          return eachCountry.name.toLowerCase() === countryName.toLowerCase()
        })
        for (const country of matchingCountry) {
          detailsFunc(country)
        }

        backBTN.addEventListener('click', function(){updateUI(dataJSON)})
    })
  })
   if(!themeState){
    themeFuncElem('var(--dark-blue-Dark-Mode-Elements)', 'var(--very-dark-blue-Dark-Mode-Background)', 'var(--white-Dark-Mode-Text--Light-Mode-Elements)') 
  }else if(themeState){
    themeFuncElem('var(--white-Dark-Mode-Text--Light-Mode-Elements)', 'var(--very-light-gray-Light-Mode-Background', 'var(--very-dark-Blue-Light-Mode-Text)')
  }
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
    region = ''
    selectedFilterVal.value = 'Filter by Region'
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

themeIcon.addEventListener('click', function(){
  if(!themeState){
    console.log(themeState)
    // for elems
    searchBar.classList.add('active')
    themeFuncElem('var(--white-Dark-Mode-Text--Light-Mode-Elements)', 'var(--very-light-gray-Light-Mode-Background', 'var(--very-dark-Blue-Light-Mode-Text)')
     themeState = !themeState

    }else if (themeState) {
      console.log(themeState)
        searchBar.classList.remove('active')
        themeFuncElem('var(--dark-blue-Dark-Mode-Elements)', 'var(--very-dark-blue-Dark-Mode-Background)', 'var(--white-Dark-Mode-Text--Light-Mode-Elements)') 
        themeState = !themeState
    }
})
