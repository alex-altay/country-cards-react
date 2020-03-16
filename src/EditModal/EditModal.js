import React from 'react';
import './EditModal.css';

const editModal = (props) => {
  
  const onSubmit = (event) => {
    event.preventDefault();
    const name = event.target.countryName.value;
    const capital = event.target.capitalName.value;
    const region = event.target.regionName.value;
    const population = event.target.populationNum.value;
    props.change(props.alpha3Code, name, capital, region, population);
  }
  
  const onReset = (event) => {
    event.preventDefault();
    props.cancel(null, null, null, null, null);
  }

  return(
  <div className='modal-container'>
    <div className='edit-modal-window'>
      <div className='edit-modal-header'>Изменение информации о стране</div>
      <form onSubmit={onSubmit} onReset={onReset}>
        <input type='text' name='countryName' required placeholder='Наименование страны' defaultValue={props.name} />
        <input type='text' name='capitalName'placeholder='Столица' defaultValue={props.capital} />
        <input type='text' name='regionName' placeholder='Регион'defaultValue={props.region} />
        <input type='text' name='populationNum'placeholder='Население' defaultValue={props.population} />
        <div className='buttons'>
        <button type='submit'>Сохранить</button>
        <button type='reset'>Отмена</button>
        </div>
      </form>

    </div>
  </div>
  );
}

export default editModal;
