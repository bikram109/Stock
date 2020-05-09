import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { AgChartsReact } from "ag-charts-react";
import "./App.css";
import configs from "./configs";


function getHistory(symbol) {
  const url = `${configs.hostUrl}/history?symbol=${symbol}`;
  return fetch(url).then((res) => res.json());
}

const getDatedHistory = async (symbol, date) => {
  const url = `${configs.hostUrl}/history?symbol=${symbol}&from=${date}`;
  return fetch(url).then((res) => res.json());
}

function Chart(props) {
  const data = props.stockHistory;
  const options = {
    data: data,
    series: [
      {
        xKey: "timestamp",
        yKey: "close",
        xName: "Day",
        yName: "Closing Price",
      },
    ],
    legend: {
      position: "top",
    },
    scales: {
      xAxes: [
        {
          ticks: {
            display: false,
          },
        },
      ],
    },
  };

  return <AgChartsReact options={options} />;
}

function StockDetail({ match }) {
  const [searchSymbol, setSearchSymbol] = useState("");
  const [searchIndustry, setSearchIndustry] = useState("");
  const [date, setDate] = useState("");
  const [stockHistory, setHistory] = useState("");

  useEffect(() => {
    fetchHistoryStock();
    console.log(match.params.id);
  }, []);


  const fetchHistoryStock = async () => {
    console.log(match);
    const stockHistoryUrl = `http://131.181.190.87:3001/history?symbol=${match.params.id}`;
    const fetchStock = await fetch(stockHistoryUrl);
    const historyData = await fetchStock.json();
    historyData.forEach((itm) => {
      itm.timestamp = itm.timestamp.split("T")[0];
    });
    setHistory(historyData);
  };
  const stockSymbol = match.params.id;


  const columns = [
  
    { headerName: "Date", field: "timestamp" },
    { headerName: "Open", field: "open" },
    { headerName: "High", field: "high" },
    { headerName: "Low", field: "low" },
    { headerName: "Close", field: "close" },
    { headerName: "Volumes", field: "volumes" },
  ];

  async function searchFromDate(date) {
    if (!date) {
      alert("Please select a valid date");
    } else {
      const newData = await getDatedHistory(stockSymbol, date);
      newData.forEach((itm) => {
        itm.timestamp = itm.timestamp.split("T")[0];
      });
      setHistory(newData);
    }
  }

  if (stockHistory) {
  return (
    <div className="displaytable">
      <div>
        <p>Search date from</p>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button onClick={() => searchFromDate(date)}>Search</button>
      </div>
      <p>Showing stocks for the {stockHistory[0].name}</p>
      <div
        className="ag-theme-balham"
        style={{ height: "300px", width: "100%" }}
      >
        <AgGridReact
          columnDefs={columns}
          rowData={stockHistory}
          // pagination={true}
          // paginationPageSize={10}
        ></AgGridReact>
        <Chart stockHistory={stockHistory}/>
      </div>
    </div>
  );}
  return null;
}

export default StockDetail;
