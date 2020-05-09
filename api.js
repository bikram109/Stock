import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import './App.css';


function getStock() {
    const url = `http://131.181.190.87:3001/all`;
    return fetch(url)
      .then(res => res.json())
  }

  // function getHistory(symbol) {
  //   const API = "AAPL"; 
  //   const url = `http://131.181.190.87:3001/history?symbol=AAPL`;
  //   return fetch(url)
  //     .then(res => res.json())
  // }


  // function useHistory(searchSymbol) {
  //   const [loading, setLoading] = useState(true);
  //   const [history, setHistory] = useState([]);
  //   const [error, setError] = useState(null);
  
  //   useEffect(() => {
  //       getHistory(searchSymbol)
  //       .then(history => {
  //           setHistory(history);
  //           setLoading(false);
  //       })
  //       .catch(e => {
  //         setError(e);
  //         setLoading(false);
  //       });
  //       console.log(history)
  //   }, [searchSymbol]);
  //   return {
  //     loading,
  //     history,
  //     error
  //   };
  // }
  
export function useStock() {

  const [loading, setLoading] = useState(true);
  const [stocks, setStock] = useState([]);
  const [stocksCopy, setStockCopy] = useState([]);
  const [error, setError] = useState(null);


    useEffect(() => {
            // when search is empty
    getStock()
            .then(stock => {
                setStock(stock);
                setStockCopy(stock);
              setLoading(false);
            })
            .catch(e => {
              setError(e);
              setLoading(false);
            });    
    }, []);
    return {
      loading,
      stocks,
      stocksCopy,
      error
    };
  }