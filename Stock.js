import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./App.css";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { useStock } from "./api";
import { GridApi } from "ag-grid-community";
// import stocks from "./Data.json"; // remove this to use data from API

function SearchBar(props) {
  const [innerSymbolSearch, setInnerSymbolSearch] = useState("");
  const [innerIndustrySearch, setInnerIndustrySearch] = useState("");
  const { callbackFunction, stocks} = props;

  const handleSymbolChange = (e) => {
    setInnerSymbolSearch(e.target.value);
    // setInnerIndustrySearch("");
  };

  const handleIndustryChange = (e) => {
    // setInnerSymbolSearch("");
    setInnerIndustrySearch(e.target.value);
  };

  const handleSearch = () => {
    
    if (innerSymbolSearch) {
      const filteredStockArray = stocks.filter((stock) =>
        stock.symbol.includes(innerSymbolSearch.toUpperCase())
      );
      console.log(innerSymbolSearch);
      console.log(filteredStockArray);

      return callbackFunction(filteredStockArray);
    } else if (innerIndustrySearch) {
      const filteredIndustryArray = stocks.filter((stock) => {
        const stringToTest = stock.industry.toLowerCase();
        return stringToTest.includes(innerIndustrySearch.toLowerCase());
      });
      console.log(filteredIndustryArray);
      return callbackFunction(filteredIndustryArray);
    } else {
      return callbackFunction(stocks);
    }
  };

  return (
    <div>
      <input
        aria-labelledby="search-button"
        name="searchsymbol"
        id="searchsymbol"
        type="search"
        placeholder="symbol"
        value={innerSymbolSearch}
        onChange={(e) => handleSymbolChange(e)}
      />

      <button
        id="search-button"
        type="button"
        onClick={() => {
          handleSearch();
        }}
      >
        Search
      </button>

      <input
        aria-labelledby="search-button"
        name="searchindustry"
        id="searchindustry"
        type="search"
        placeholder="industry"
        value={innerIndustrySearch}
        onChange={(e) => handleIndustryChange(e)}
      />
    </div>
  );
}

function DisplayTable(props) {
  return (
    <div
      className="ag-theme-balham"
      style={{ height: "300px", width: "600px" }}
    >
      <AgGridReact
        columnDefs={props.columns}
        rowData={props.rowData}
        pagination={true}
        paginationPageSize={10}
        // onRowDoubleClicked={onButtonClick}
      ></AgGridReact>
    </div>
  );
}


function Stock() {
  const [searchSymbol, setSearchSymbol] = useState("");
  const [searchIndustry, setSearchIndustry] = useState("");
  const { loading, stocks,stocksCopy, error } = useStock(); // uncomment this to use data from API

  const [displayStockArray, setDisplayStockArray] = useState();
 
  useEffect(() => {
     setDisplayStockArray(stocks)
  },[stocks])

  // console.log(displayStockArray)
  // console.log(stocks)

  const columns = [
    {
      headerName: "Symbol",
      field: "symbol",
      cellRenderer: (params) => {
        return `<a href="/stock/${params.value}"> ${params.value} </a>`;
      },
    },
    { headerName: "Name", field: "name" },
    { headerName: "Industry", field: "industry" },
  ];
  

  return (
    <div className="displaytable">
      <SearchBar
        stocks = {stocks}
        callbackFunction={(newStockArray) =>
          setDisplayStockArray(newStockArray)
        }
      />
      <DisplayTable columns={columns} rowData={displayStockArray} />
    </div>
  );
}

export default Stock;