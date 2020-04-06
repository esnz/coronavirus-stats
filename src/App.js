import React from 'react';
import { getSummaryStats } from './api';
import Countries from './components/Countries';
import Footer from './components/Footer';
import Header from './components/Header';
import Spinner from './components/Spinner';
import Summary from './components/Summary';
import './main.scss';

function App() {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  const [data, setData] = React.useState({
    Global: {
      TotalConfirmed: 0,
      TotalDeaths: 0,
      TotalRecovered: 0
    },
    Countries: [],
    FilteredCountries: [],
    Date: undefined
  });

  React.useEffect(() => {
    getSummaryStats()
      .then(res => {
        setData({ ...res, FilteredCountries: res.Countries });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, []);

  const countryFilter = ({ target }) => {
    setData({
      ...data,
      FilteredCountries: data.Countries.filter(item => {
        return item.Country.toLowerCase().indexOf(target.value.toLowerCase()) !== -1;
      })
    });
  };

  return (
    <React.Fragment>
      <Header />
      {error ? (
        <div className="container flex-grow-1  p-5">
          <h2 style={{textAlign: 'center'}}>Error loading data!</h2>
        </div>
      ) : null}
      {loading ? (
        <div className="container flex-grow-1 ">
          <Spinner />
        </div>
      ) : null}
      {!error && !loading ? (
        <div className="flex-grow-1">
          <Summary global={data.Global} lastUpdate={data.Date} />
          <Countries countries={data.FilteredCountries} countryFilter={countryFilter} />
        </div>
      ) : null}
      <Footer />
    </React.Fragment>
  );
}

export default App;
