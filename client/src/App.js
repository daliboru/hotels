import './App.scss';
import './normalize.scss';
import './skeleton.scss';
import { useState } from 'react';
import Select from 'react-select';

// import Search from './components/Search';
import Hotels from './components/Hotels';

function App() {
  const [values, setValues] = useState({
    arrDate: new Date().toISOString().substr(0, 10),
    depDate: new Date().toISOString().substr(0, 10),
    numOfRooms: 1,
    price: '',
    city: '',
  });
  const [active, setActive] = useState(false);
  const [toShoot, setToShoot] = useState({
    arrDate: '',
    depDate: '',
    numOfRooms: '',
    price: '',
    city: '',
  });
  const options = [
    { value: 'Bechej, Serbia', label: 'Bechej, Serbia' },
    { value: 'Lund, Sweden', label: 'Lund, Sweden' },
    { value: 'Stockholm, Sweden', label: 'Stockholm, Sweden' },
    { value: 'Malmö, Sweden', label: 'Malmö, Sweden' },
    { value: 'Sofia, Bulgaria', label: 'Sofia, Bulgaria' },
  ];

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setToShoot({
      arrDate: new Date(values.arrDate).toISOString(),
      depDate: new Date(values.depDate).toISOString(),
      numOfRooms: values.numOfRooms,
      price: values.price,
      city: values.city,
    });
    setActive(true);
  };

  const onChangeSelect = (e) => {
    setValues({ ...values, city: e.value });
  };

  return (
    <div className='App'>
      <header>
        <h1 className='header'>
          <strong>Hotel App</strong>
        </h1>
      </header>
      <main>
        <form className='hotel-form' onSubmit={handleSubmit} noValidate>
          <div className='hotel-form-item ' style={{ width: '200px' }}>
            <Select options={options} onChange={onChangeSelect} />
          </div>
          <div className='hotel-form-item'>
            From:{' '}
            <input
              type='date'
              value={values.arrDate}
              onChange={onChange}
              name='arrDate'
            />
          </div>
          <div className='hotel-form-item'>
            To:{' '}
            <input
              type='date'
              value={values.depDate}
              onChange={onChange}
              name='depDate'
            />
          </div>
          <div className='hotel-form-item'>
            Number of rooms:{' '}
            <input
              type='number'
              value={values.numOfRooms}
              onChange={onChange}
              name='numOfRooms'
            />
          </div>
          <div className='hotel-form-item'>
            Max price:{' '}
            <input
              type='number'
              onChange={onChange}
              value={values.price}
              name='price'
            />
          </div>
          <button className='hotel-form-item' type='submit'>
            Submit
          </button>
        </form>
        <div className='card-container container'>
          {active && (
            <Hotels
              arrDate={toShoot.arrDate}
              depDate={toShoot.depDate}
              numOfRooms={parseInt(toShoot.numOfRooms)}
              price={parseInt(toShoot.price)}
              city={toShoot.city}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
