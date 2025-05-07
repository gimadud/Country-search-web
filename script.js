const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const flag = document.getElementById('flag');
const countryName = document.getElementById('country-name');
const capitalName = document.getElementById('capital-name');
const countryCard = document.querySelector('country-card');
const Detailed = document.querySelector('Detailed-inform');
const selectedRegion = document.querySelector('#selected-region');
const countryDetail = document.querySelector('.countryDetail');

const allCountries = [];

// 국가를 받아와서 그 국가를 카드로 만드는 함수
function loadCountries(country){
  const card = document.createElement('div');
  card.classList.add('country-card');

  const flagImg = document.createElement('img');
  flagImg.src = country.flags.svg;
  flagImg.alt = `${country.name.common} 국기`;
  flagImg.classList.add('flag');

  const nameDiv = document.createElement('div');
  nameDiv.classList.add('country-name');
  nameDiv.textContent = country.name.common;

  const capitalDiv = document.createElement('div');
  capitalDiv.classList.add('capital-name');
  capitalDiv.innerHTML = `수도: <span>${country.capital?.[0] || '없음'}</span>`;

  const populationDiv = document.createElement('div');
  populationDiv.classList.add('population');
  populationDiv.innerHTML = `인구: <span>${country.population.toLocaleString()}</span>`;

  card.appendChild(flagImg);
  card.appendChild(nameDiv);
  card.appendChild(capitalDiv);
  card.appendChild(populationDiv);

  document.querySelector(".country-list").appendChild(card);

  card.addEventListener('click', () => {
    showCountryDetail(country);
  });
}

function showCountryDetail(country) {
  countryDetail.classList.remove('hidden');

  document.querySelector('.Detailed-inform').innerHTML =`
  <img src="${country.flags.svg}" class="flag" alt="${country.name.common} 국기">
  <p><strong>공식 명칭: </strong> ${country.name.official}</p>
  <p><strong>수도: </strong> ${country.capital?.[0] || '없음'}</p>
  <p><strong>인구: </strong> ${country.population.toLocaleString()}</p>
  <p><strong>지역: </strong> ${country.region} / ${country.subregion}</p>
  <p><strong>통화: </strong> ${(country.currencies)}</p>
  <p><strong>언어: </strong> ${(country.languages)}></p>
  <p><strong>시간대: </strong> ${country.timezones.join(', ')}</p>
  `;

  document.querySelector('#closeDetail').addEventListener('click', () => {
    countryDetail.classList.add('hidden');
  });
}

// 모든 값!을 가져오고 페이지도 보이게 함!
document.addEventListener("DOMContentLoaded", () => {
  fetch("https://restcountries.com/v3.1/all")
    .then(res => res.json())
    .then(data => {
      data.forEach(country => {
        allCountries.push(country);
        loadCountries(country);
    });
  });
});

// 이름으로 국가들을 필터링해주는 함수
const loadCountriesByName = (inputValue) => {
  const filteredCountries = allCountries.filter((country) =>
    country.name.common.toLowerCase().includes(inputValue)
  );

  return filteredCountries;
}

// 입력이 들어오면 작동
searchInput.addEventListener('input', () => {
  const filteredCountries = loadCountriesByName(searchInput.value); // 모든 값!을 가져오고 페이지도 보이게 함! => 리스트로 가져온거
  document.querySelector(".country-list").innerHTML = ""; // 초기화

  filteredCountries.forEach(country => {
    loadCountries(country);
  });
});

// 대륙으로 국가들을 필터링해주는 함수
const loadCountriesByRegion = (selectedValue) => {
  const filteredCountries = allCountries.filter((country) =>
    country.region.includes(selectedValue)
  );

  return filteredCountries;
}

// 선택이 되면 작동
selectedRegion.addEventListener('change', () => {
  const filteredCountries = loadCountriesByRegion(selectedRegion.value); // 모든 값!을 가져오고 페이지도 보이게 함! => 리스트로 가져온거
  document.querySelector(".country-list").innerHTML = ""; // 초기화

  if (selectedRegion.value !== "전체 대륙"){
    filteredCountries.forEach(country => {
      loadCountries(country);
    });
  } else {
    allCountries.forEach(country => {
      loadCountries(country);
    });
  }
});

