import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import numeral from 'numeral';
import React from 'react';
import { Link } from 'react-router-dom';
import Error from '../Error/Error'
import { getDayOneDataByCountry, getSummaryStats } from '../../api';
import { ReactComponent as Bag } from '../../assets/bag.svg';
import { ReactComponent as Recovery } from '../../assets/recovery.svg';
import { ReactComponent as Skull } from '../../assets/skull.svg';
import Chart from '.././Chart/Chart';
import { LoadingContext } from './../../App';
import './Country.styles.scss';

const Country = ({match: {params: { slug }}}) => {
  const [error, setError] = React.useState(false);

  const [countryStats, setCountryStats] = React.useState({
    Country: '',
    CountryCode: '',
    Slug: '',
    NewConfirmed: 0,
    TotalConfirmed: 0,
    NewDeaths: 0,
    TotalDeaths: 0,
    NewRecovered: 0,
    TotalRecovered: 0,
    Date: null,
  });
  const [allData, setAllData] = React.useState([]);
  const percentage = !countryStats.Country ? 0 : Math.round((countryStats.TotalRecovered * 100) / countryStats.TotalConfirmed);

  const { setLoading } = React.useContext(LoadingContext);

  const fetchData = () => {
    setLoading(true);
    setError(false);

    getSummaryStats().then((summary) => {
      setCountryStats(summary.Countries.find((i) => i.Slug.toLowerCase() === slug));
    });

    const allFetchPromises = [
      getDayOneDataByCountry(slug, 'confirmed'),
      getDayOneDataByCountry(slug, 'deaths'),
      getDayOneDataByCountry(slug, 'recovered'),
    ];

    Promise.all(allFetchPromises)
      .then(([cases, deaths, recovered]) => {
        cases.forEach((c, i) => {
          const date = new Date(c.Date);
          c.Date = `${date.getDate()}/${date.getMonth() + 1}`;
          cases[i].Deaths = deaths[i].Cases;
          cases[i].Recovered = recovered[i].Cases;
        });

        setAllData(cases.length > 30 ? cases.splice(cases.length - 30) : cases);
      })
      .catch(() => setError(true))
      .finally(() => {
        setLoading(false);
      });
  }

  React.useEffect(() => {
    fetchData();
  }, [slug]);

  return (
    <React.Fragment>
      {error ? <Error retryCallback={fetchData} /> : null}
      <div className="country">
        <Link to="/" className="go-back-link">
          <FontAwesomeIcon icon={faArrowCircleLeft} />
          Back to Home
        </Link>
        <div className="info-box">
          <div className="title">
            {countryStats.CountryCode ? (
              <img className="country-img" src={`https://www.countryflags.io/${countryStats.CountryCode}/flat/64.png`} alt="Flag" />
            ) : null}
            <h2 className="country-name">{countryStats.Country}</h2>
          </div>

          <div className="stats">
            <div className="info">
              <Bag className="bag" />
              <div className="titles">
                <h2>Total Cases</h2>
                <h5>New Cases</h5>
              </div>
              <div className="numbers cases">
                <h2>{numeral(countryStats.TotalConfirmed).format('0,0')}</h2>
                <h5>{numeral(countryStats.NewConfirmed).format('0,0')}</h5>
              </div>
            </div>
            <div className="info">
              <Skull className="skull" />
              <div className="titles">
                <h2>Total Deaths</h2>
                <h5>New Deaths</h5>
              </div>
              <div className="numbers deaths">
                <h2>{numeral(countryStats.TotalDeaths).format('0,0')}</h2>
                <h5>{numeral(countryStats.NewDeaths).format('0,0')}</h5>
              </div>
            </div>
            <div className="info">
              <Recovery className="recovery" />
              <div className="titles">
                <h2>Total Recovered</h2>
                <h5>New Recovered</h5>
              </div>
              <div className="numbers recovered">
                <h2>{numeral(countryStats.TotalRecovered).format('0,0')}</h2>
                <h5>{numeral(countryStats.NewRecovered).format('0,0')}</h5>
              </div>
            </div>
          </div>

          <div className="recovered-bar">
            <div className="d-flex">
              <h6>Recovered:</h6>
              <h6 className="ml-auto">100%</h6>
            </div>
            <div className="bar">
              <div className="bg"></div>
              <div className="progress" style={{ width: `${percentage}%` }}>
                <span className="progress-text">{percentage}%</span>
              </div>
            </div>
          </div>
        </div>

        <Chart data={allData} />
      </div>
    </React.Fragment>
  );
};
export default Country;
