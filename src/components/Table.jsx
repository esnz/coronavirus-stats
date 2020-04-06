import numeral from 'numeral';
import React from 'react';
import './styles/Table.styles.scss';

const Table = ({countries}) => {
  return (
    <div className="table-wrapper">
      <table cellPadding="0" cellSpacing="0">
        <thead>
          <tr>
            <th style={{width: '25%', minWidth:'150px'}}>Country</th>
            <th style={{width: '12%'}}>Cases</th>
            <th style={{width: '12%'}}>New Cases</th>
            <th style={{width: '12%'}}>Deaths</th>
            <th style={{width: '12%'}}>New Deaths</th>
            <th style={{width: '12%'}}>Recovered</th>
          </tr>
        </thead>
        <tbody>
          { countries.length ?
          countries.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed).map((row, i) => {
            return (
              <tr key={i}>
                <td>
                  <img src={`https://www.countryflags.io/${row.CountryCode}/flat/32.png`} alt='' />
                  <span>{row.Country}</span>
                </td>
                <td>{numeral(row.TotalConfirmed).format('0,0')}</td>
                <td>{numeral(row.NewConfirmed).format('0,0')}</td>
                <td>{numeral(row.TotalDeaths).format('0,0')}</td>
                <td>{numeral(row.NewDeaths).format('0,0')}</td>
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
