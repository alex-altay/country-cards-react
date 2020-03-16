import React from 'react';
import editIcon from './edit.svg';

const countryCard = (props) => {
  return (
    <div className='country-card'>
      <img className='flag' src={props.flag} alt='Country Flag' />
      <div className='description'>
        <div className='headline'>
          <h2>{props.name}</h2>
          <img className='edit' 
            onClick={() => props.toggleModal(props.alpha3Code, props.name, props.capital, props.region, props.population)} 
            src={editIcon}            
            alt='Редактировать'/>
        </div>
        <div className='capital lines'>
          <span>Столица</span>
          <span>{props.capital}</span>
        </div>
        <div className='region lines'>
          <span>Регион</span>
          <span>{props.region}</span>
        </div>
        <div className='population lines'>
          <span>Население</span>
          <span>{props.population}</span>
        </div>
      </div>
    </div>
  )
};

export default countryCard;
