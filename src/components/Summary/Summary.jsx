import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import numeral from 'numeral';
import React from 'react';
import './Summary.styles.scss';
const Summary = ({ global, lastUpdate }) => {
  return (
    <div className="summary">
      <div className="section-title">
        <h6>
          <FontAwesomeIcon icon={faGlobe} /> <span>World Wide</span>
        </h6>
        {lastUpdate ? <p>Last updated: {new Date(lastUpdate).toDateString()}</p> : null}
      </div>
      <div className="info-box info">
        <div className="stat total-cases">
          <h4>Total Cases</h4>
          <h1>{numeral(global.TotalConfirmed).format('0,0')}</h1>
        </div>
        <div className="stat deaths">
          <h4>Deaths</h4>
          <h1>{numeral(global.TotalDeaths).format('0,0')}</h1>
        </div>
        <div className="stat recovered">
          <h4>Recovered</h4>
          <h1>{numeral(global.TotalRecovered).format('0,0')}</h1>
        </div>
      </div>
    </div>
  );
};
export default Summary;
