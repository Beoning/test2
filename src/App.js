import "./App.css";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

/* PV */

// pv average

const pvAvg = Math.round(
  data
    .map((obj) => {
      return obj.pv;
    })
    .reduce((sum, current) => {
      return sum + current;
    }, 0) / data.length
);

// pv stddev

const pvStddev = Math.round(
  Math.sqrt(
    Math.round(
      data
        .map((obj) => {
          return obj.pv - pvAvg;
        })
        .map((item) => {
          return item * item;
        })
        .reduce((sum, current) => {
          return sum + current;
        }, 0) /
        (data.length - 1)
    )
  )
);

// pv min

const pvMin = pvAvg - pvStddev;

// pv max

const pvMax = pvAvg + pvStddev;

/* PV */

/* UV */

// uv average

const uvAvg = Math.round(
  data
    .map((obj) => {
      return obj.uv;
    })
    .reduce((sum, current) => {
      return sum + current;
    }, 0) / data.length
);

// uv stddev

const uvStddev = Math.round(
  Math.sqrt(
    Math.round(
      data
        .map((obj) => {
          return obj.uv - uvAvg;
        })
        .map((item) => {
          return item * item;
        })
        .reduce((sum, current) => {
          return sum + current;
        }, 0) /
        (data.length - 1)
    )
  )
);

// uv min

const uvMin = uvAvg - uvStddev;

// uv max

const uvMax = uvAvg + uvStddev;

/* UV */

function App() {
  return (
    <LineChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="pv"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
    </LineChart>
  );
}

export default App;
