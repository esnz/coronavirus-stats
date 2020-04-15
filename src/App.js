import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { getSummaryStats } from './api';
import Countries from './components/Countries/Countries';
import Country from './components/Country/Country';
import Footer from './layouts/Footer';
import Header from './layouts/Header';
import Spinner from './components/Spinner/Spinner';
import Summary from './components/Summary/Summary';
import Error from './components/Error/Error';
import './main.scss';

export const LoadingContext = React.createContext({
  loading: true,
  setLoading: () => {},
});

function App() {
  const [error, setError] = React.useState(false);

  const [loading, setLoading] = React.useState(true);
  const value = { loading, setLoading };

  const [data, setData] = React.useState({
    Global: {
      TotalConfirmed: 0,
      TotalDeaths: 0,
      TotalRecovered: 0,
    },
    Countries: [],
    FilteredCountries: [],
    Date: undefined,
  });

  const loadData = async () => {
    setLoading(true);
    setError(false);

    try {
      const res = await getSummaryStats();
      setData({ ...res, FilteredCountries: res.Countries });
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setError(true);
    }
  };

  React.useEffect(() => {
    loadData();
  }, []);

  const countryFilter = (e) => {
    setData({
      ...data,
      FilteredCountries: data.Countries.filter((item) => {
        return item.Country.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1;
      }),
    });
  };

  return (
    <React.Fragment>
      <Header />
      <LoadingContext.Provider value={value}>
        {loading ? <Spinner /> : null}
        <div className="container flex-grow-1">
          <Route path="/" exact
            render={() => {
              return (
                <React.Fragment>
                  {error ? <Error retryCallback={loadData} /> : null}
                  <Summary global={data.Global} lastUpdate={data.Date} />
                  <Countries countries={data.FilteredCountries} countryFilter={countryFilter} />
                </React.Fragment>
              );
            }}
          />
          <Route path="/:slug" component={Country} />
        </div>
      </LoadingContext.Provider>
      <Footer />
    </React.Fragment>
  );
}

export default withRouter(App);
