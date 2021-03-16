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
  ReferenceLine,
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

// pv min && pv max

const pvMin = pvAvg - pvStddev; // 1669
const pvMax = pvAvg + pvStddev; // 7019

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

// uv min && uv max

const uvMin = uvAvg - uvStddev; // 2019
const uvMax = uvAvg + uvStddev; // 3567

/* UV */

function App() {
  return (
    <LineChart
      width={1000}
      height={700}
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
      <ReferenceLine
        label=""
        stroke="#8884d8"
        strokeDasharray="1 1"
        segment={[
          { x: "Page A", y: pvMin },
          { x: "Page G", y: pvMin },
        ]}
      />
      <ReferenceLine
        label=""
        stroke="#8884d8"
        strokeDasharray="1 1"
        segment={[
          { x: "Page A", y: pvMax },
          { x: "Page G", y: pvMax },
        ]}
      />
      <ReferenceLine
        label=""
        stroke="#82ca9d"
        strokeDasharray="1 1"
        segment={[
          { x: "Page A", y: uvMin },
          { x: "Page G", y: uvMin },
        ]}
      />
      <ReferenceLine
        label=""
        stroke="#82ca9d"
        strokeDasharray="1 1"
        segment={[
          { x: "Page A", y: uvMax },
          { x: "Page G", y: uvMax },
        ]}
      />
      <defs>
        <linearGradient id="colorPv" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8884d8" />
          <stop offset="9%" stopColor="#8884d8" />
          <stop offset="9%" stopColor="red" />
          <stop offset="18.4%" stopColor="red" />
          <stop offset="18.4%" stopColor="#8884d8" />
          <stop offset="26.9214%" stopColor="#8884d8" />
          <stop offset="26.9214%" stopColor="red" />
          <stop offset="41.35%" stopColor="red" />
          <stop offset="41.35%" stopColor="#8884d8" />
          <stop offset="100%" stopColor="#8884d8" />
        </linearGradient>
        <linearGradient id="colorUv" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="red" />
          <stop offset="7.3%" stopColor="red" />
          <stop offset="7.3%" stopColor="#82ca9d" />
          <stop offset="62.8%" stopColor="#82ca9d" />
          <stop offset="62.8%" stopColor="red" />
          <stop offset="74%" stopColor="red" />
          <stop offset="74%" stopColor="#82ca9d" />
          <stop offset="100%" stopColor="#82ca9d" />
        </linearGradient>
      </defs>
      <Line
        type="monotone"
        dataKey="pv"
        stroke="url(#colorPv)"
        activeDot={{ r: 8 }}
      />
      <Line type="monotone" dataKey="uv" stroke="url(#colorUv)" />
    </LineChart>
  );
}

export default App;
