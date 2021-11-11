import Notiflix from 'notiflix';
import countryInfoTpl from "../templates/country-info.hbs"
import countryListTpl from "../templates/country-list.hbs"

const refs = {
    countryInfo: document.querySelector(".country-info"),
    countryList: document.querySelector(".country-list"),
}

export function clearInfo() {
    return refs.countryInfo.innerHTML = ""
}
export function clearList(){
    return refs.countryList.innerHTML = "";
}
export function fetchCountries(name) {
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
    .then(response => {
        if(!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
    })
    .then(country => {
        if(country.length > 10) {
            Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
        } else if(country.length > 1) {
            const countries = country.map(countryItem => {
                return countryListTpl(countryItem);
            })
            refs.countryList.innerHTML = countries;
            clearInfo();
        } else {
        const infoMarkup = countryInfoTpl(...country);
        refs.countryInfo.innerHTML = infoMarkup;
        clearList()
        }
    })
    .catch(error => {
        Notiflix.Notify.failure("Oops, there is no country with that name");
        clearList();
        clearInfo();
    })
    }
    