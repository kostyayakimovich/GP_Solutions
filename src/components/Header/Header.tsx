import React, { useCallback, useState } from "react";
import Search from "../../assets/images/search.png"
import "./style.css";

const Header = () => { 
  const [valueInput, setValueInput] = useState("");

  const handleKeyUpInput = useCallback((event) => {   
   setValueInput(event.target.value)
  }, []);

  return (
    <header className="header">
      <h1 className="logo">GP Solutuons News</h1>
      <div className = "search">
      <div className="input-wrapper" data-text={valueInput}>
      <input type="text" placeholder="Find news…" onKeyUp ={handleKeyUpInput}/>          
     </div>
     <div className="search-icon-wrapper">
     <img className = "search-icon" src = {Search} alt = "search"/>
     </div>
     </div>
     <button className="btn" >
            Add news
            </button>
    </header>
  );
};
export default Header;