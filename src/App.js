import axios from 'axios';
import { useState } from 'react';
import styles from './app.module.css';
import { Doughnut } from 'react-chartjs-2';

const App = () => {
  const [name, setName] = useState('')
  const [data, setData] = useState('')
  const chartData = {
    labels: data && data.country.map(el => el.country_id),
    datasets: [{
      label: 'Name Popularity',
      data: data && data.country.map(el => el.probability),
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    }]
  }

  const submitForm = (e) => {
    e.preventDefault();
    axios.get(`https://api.nationalize.io?name=${name}`)
    .then(res => setData(res.data))
  }

  return (
    <div className="App">
      <form onSubmit={(e) => submitForm(e)}>
        <label for="name" className={styles.fill_name}>Name: </label>
        <input value={name} onChange={(e) => setName(e.target.value)} className={styles.input_style} id="name"/>
        <label for="country" className={styles.fill_name}>Country: </label>
        <input className={styles.input_style} id="country"/>
        <button type="submit">Submit</button>
      </form>
      {data && 
        <div style={{ width: "500px"}}>
          <h1 className={styles.fill_name}>{data.name}</h1>
          <Doughnut data={chartData} />
        </div>
      }
    </div>
  );
}

export default App;
