import './css/styles.css';
import debounce from 'lodash.debounce';
import {clearList, clearInfo, fetchCountries} from "./helpers/fetch-countries"

const DEBOUNCE_DELAY = 300;

const refs = {
    countryInput: document.querySelector("#search-box"),
}

refs.countryInput.addEventListener("input", debounce(onSelectedCountry, DEBOUNCE_DELAY))

function onSelectedCountry(event) {
    const country = event.target.value.trim();
    if(country === ""){
        clearList();
        clearInfo();
    } else {
        fetchCountries(country)
    }
}


