import React, { useState, useEffect } from 'react';
// import { useHistory } from './api';
import './App.css';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { AgChartsReact } from 'ag-charts-react';


function getHistory(symbol) {
  const API = "AAPL"; 
  const url = `http://131.181.190.87:3001/history?symbol=AAPL`;
  return fetch(url)
    .then(res => res.json())
}

function shorten(text,max) {
    return text && text.length > max ? text.slice(0,max).split(' ').slice(0, -1).join(' ') : text
}

function About() {
  const API = "AAA";
  const [searchSymbol, setSearchSymbol] = useState("");
  const [searchIndustry, setSearchIndustry] = useState("");
  const [history, setHistory] = useState([]);
  useEffect(()=>{
    getHistory()
    .then(historyData =>
      historyData.map(singleHistory => {
        return {
          timestamp: singleHistory.timestamp.split('T')[0],
          open: singleHistory.open,
           high: singleHistory.high,
          low: singleHistory.low,
          close: singleHistory.close,
          volumes: singleHistory.volumes
        };
      })
    )
    .then(histries => setHistory(histries));
  })

  const columns = [
    { headerName: "Timestamp", field: "timestamp" },
    { headerName: "Open", field: "open" },
    { headerName: "High", field: "high" },
    { headerName: "Low", field: "low" },
    { headerName: "Close", field: "close" },
    { headerName: "Volumes", field: "volumes" }
  ];
  
  return (
    <div className="displaytable">
      <h1> This is a {API} stock list </h1>
     <div className="ag-theme-balham" style={ {height: '300px', width: '500px'} }>
        <AgGridReact
            columnDefs={columns}
            rowData={history}
            pagination = {true}
            paginationPageSize = {10}
            >
        </AgGridReact>
        <ChartExample/>
      </div>
    </div>
  );
}
export default About;

function ChartExample() {
  const data = [
      {
          quarter: 'Q1',
          spending: 450,
      },
      {
          quarter: 'Q2',
          spending: 560,
      },
      {
          quarter: 'Q3',
          spending: 600,
      },
      {
          quarter: 'Q4',
          spending: 700,
      },
  ];

     const state = {
          options: {
              data: data,
              series: [{
                  xKey: 'quarter',
                  yKey: 'spending',
              }],
          },
      };

      return <AgChartsReact options={state.options} />;
}