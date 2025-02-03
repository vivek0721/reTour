// context/useProductContext.js
import React, { useState, createContext, useContext, useEffect } from 'react';
import Axios from '../services/axios';

const ProductContext = createContext(null);

export const ProductContextProvider = ({ children }) => {
   
    const [item, setItem] = useState(null);
    
    const setFunc = (data) => {
        try {
            setItem(data);
        } catch (error) {
            console.log('Error updating item:', error);
        }
    }

    const [products, setProduct]= useState([]);
  


  const getData= async ()=>{
    try {
      const data=await Axios.get("/items/allItems")
      setProduct(data.data)
      //console.log(data.data)
    } catch (error) {
      console.log("Error getting product data")
    }
  }

useEffect(()=>{
  getData()
},[item])

    if (!children) {
        console.log('No children provided to ProductContextProvider');
        return null;
    }

    return (
        <ProductContext.Provider value={{ item,products, setFunc,getData }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProduct = () => {
    const context = useContext(ProductContext);
    
    return context;
};