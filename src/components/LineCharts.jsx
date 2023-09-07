import React from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import './Charts.css'
const RevisedLineChart = ({chart}) => {
  return (
    <LineChart width={1100} height={400} data={chart} margin={{ top: 25, right: 0, bottom: 5, left: 0 }}>
      <Tooltip style={{ margin: "0 auto" }}/>
      <Legend wrapperStyle={{position: 'relative', marginTop: '15px'}}/>
      <Line type="monotone" dataKey="SMASH Maths Cohort Average" stroke="#8884d8" />
      <Line type="monotone" dataKey="Student Average" stroke="#FF0000" />
      <CartesianGrid stroke="#ccc" strokeDasharray="1 1" />
      <XAxis angle={-45} textAnchor='end' dataKey="week" />
      <text x="500" y="0" dominantBaseline="hanging" fontSize="36" fontWeight="bold">6-weeks rolling averages</text>
      <YAxis tickFormatter={tick => `${tick}%`}/>
  </LineChart>
  )
}

export default RevisedLineChart