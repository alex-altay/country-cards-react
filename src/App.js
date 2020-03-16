import React, { Component } from 'react';

import CountryCard from './CountryCard/CountryCard';
import EditModal from './EditModal/EditModal';
import './App.css';


const url = 'https://restcountries.eu/rest/v2/all?fields=flag;name;capital;region;population;alpha3Code';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      countries: [],
      showModal: false,
      propsForModal: {
        alpha3Code: null,
        name: null,
        capital: null,
        region: null,
        population: null,
      }
    };
  };  

  componentDidMount() {
    fetch(url)
      .then(res => res.json())
      .then( (result) => this.setState({isLoaded: true, countries: result}),
             (error) => this.setState({isLoaded: true, error: error})
             )
  };
            
  changeCountryPropertiesHandler = (alpha3Code, name, capital, region, population) => {
    const allCountries = this.state.countries.slice();
    const countryIndex = allCountries.findIndex(c => c.alpha3Code === alpha3Code);
    const country = allCountries[countryIndex];
    country.name = name;
    country.capital = capital;
    country.region = region;
    country.population = population;
    allCountries.splice(countryIndex, 1, country);
    this.setState({
      countries: allCountries, 
      showModal: false,
      propsForModal: {
        alpha3Code: null,
        name: null,
        capital: null,
        region: null,
        population: null,
      }
    });
  }
  
  toggleModalHandler = (alpha3Code, name, capital, region, population) => {
    this.setState({
      showModal: !this.state.showModal, 
      propsForModal: {
        alpha3Code: alpha3Code,
        name: name,
        capital: capital,
        region: region,
        population: population,
      }  
    });
  }

  render() {    
    let main = '';
    if (this.state.isLoaded) {
      main = this.state.countries.map(country => 
        <CountryCard 
          flag = {country.flag} 
          name = {country.name}
          capital = {country.capital}
          region = {country.region}
          population = {country.population}
          key = {country.alpha3Code}
          alpha3Code = {country.alpha3Code}          
          toggleModal = {this.toggleModalHandler}
        />
      );
    } else {
      main = (<div className='loader-container'>
                <div className="loader"></div>
                <div id='loading-text'>Data is loading...</div>
              </div>); 
    }
    
    return (
      <div className='Content'>
        <header>
          <h1>Страны мира</h1>
          <a className='api-link' href='https://restcountries.eu'>https://restcountries.eu</a>
        </header>
        <main>
          {this.state.showModal 
          ? <EditModal 
              alpha3Code = {this.state.propsForModal.alpha3Code}
              name = {this.state.propsForModal.name} 
              capital = {this.state.propsForModal.capital}
              region = {this.state.propsForModal.region}
              population = {this.state.propsForModal.population}
              change = {this.changeCountryPropertiesHandler}
              cancel = {this.toggleModalHandler}
            /> 
          : main}
        </main>
      </div>
    )
  };
}

export default App;
