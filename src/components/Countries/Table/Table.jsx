import numeral from 'numeral';
import React from 'react';
import './Table.styles.scss';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";

const Table = ({countries}) => {
  const history = useHistory();

  return (
    <div className="table-wrapper">
      <table cellPadding="0" cellSpacing="0">
        <thead>
          <tr>
            <th style={{width: '55%', minWidth:'250px'}}>Country</th>
            <th style={{width: '15%'}}>Cases</th>
            <th style={{width: '15%'}}>Deaths</th>
            <th style={{width: '15%'}}>Recovered</th>
          </tr>
        </thead>
        <tbody>
          { countries.length ?
          countries.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed).map((row, i) => {
            return (
              <tr key={i} onClick={() => history.push(`/${row.Slug}`)}>
                <td>
                  <img src={`https://www.countryflags.io/${row.CountryCode}/flat/32.png`} alt='' />
                  <Link to={`${row.Slug}`}><span>{row.Country}</span></Link>
                </td>
                <td>{numeral(row.TotalConfirmed).format('0,0')}</td>
                <td>{numeral(row.TotalDeaths).format('0,0')}</td>
                <td>{numeral(row.TotalRecovered).format('0,0')}</td>
              </tr>
            );
          }) : 
          <tr><td colSpan='6' style={{textAlign: 'center'}}><span>No result found...</span></td></tr>
          }
        </tbody>
      </table>
    </div>
  );
};
export default Table;
