import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Chart = ({ data }) => {
  return (
    <div className=" info-box">
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{
            top: 25,
            right: 45,
            left: 25,
            bottom: 25,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Cases" stroke="#70C8D6" strokeWidth="2" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="Deaths" stroke="#EF8B8B" strokeWidth="2" activeDot={{ r: 5 }} />
          <Line type="monotone" dataKey="Recovered" stroke="#93D352" strokeWidth="2" activeDot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
export default Chart;
