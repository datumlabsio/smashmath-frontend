import React from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
// const monthsData = [
//   {
//     name : 'Jan',
//     Class_Avg: 70,
//     Cohort_Avg: 60,
//     Student_Avg: 65,
//   },
//   {
//     name : 'Feb',
//     Class_Avg: 30,
//     Cohort_Avg: 36,
//     Student_Avg: 39,
//   },
//   {
//     name : 'Mar',
//     Class_Avg: 89,
//     Cohort_Avg: 84,
//     Student_Avg: 81,
//   },
//   {
//     name : 'Apr',
//     Class_Avg: 45,
//     Cohort_Avg: 47,
//     Student_Avg: 49,
//   },
//   {
//     name : 'May',
//     Class_Avg: 34,
//     Cohort_Avg: 38,
//     Student_Avg: 40,
//   },
//   {
//     name : 'Jun',
//     Class_Avg: 70,
//     Cohort_Avg: 74,
//     Student_Avg: 70,
//   },
//   {
//     name : 'Jul',
//     Class_Avg: 69,
//     Cohort_Avg: 60,
//     Student_Avg: 69,
//   },
//   {
//     name : 'Aug',
//     Class_Avg: 65,
//     Cohort_Avg: 50,
//     Student_Avg: 70,
//   },
//   {
//     name : 'Sep',
//     Class_Avg: 40,
//     Cohort_Avg: 37,
//     Student_Avg: 43,
//   },
//   {
//     name : 'Oct',
//     Class_Avg: 56,
//     Cohort_Avg: 76,
//     Student_Avg: 80,
//   },
//   {
//     name : 'Nov',
//     Class_Avg: 52,
//     Cohort_Avg: 80,
//     Student_Avg: 47,
//   },
//   {
//     name : 'Dec',
//     Class_Avg: 60,
//     Cohort_Avg: 65,
//     Student_Avg: 70,
//   },
// ];

const LineCharts = ({chartsData}) => {
  return (
    <LineChart width={1000} height={400} data={chartsData} margin={{ top: 25, right: 0, bottom: 5, left: 0 }}>
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="CohortAvg" stroke="#8884d8" />
    <Line type="monotone" dataKey="ClassAvg" stroke="#82ca9d" />
    <Line type="monotone" dataKey="studentAvg" stroke="#FF0000" />
    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
    <XAxis dataKey="month" />
    <YAxis />
  </LineChart>
  )
}

export default LineCharts