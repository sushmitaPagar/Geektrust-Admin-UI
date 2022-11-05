import React from "react";
import "../css/SearchBar.css";

const SearchBar = ({ handleSearch }) => {
    return (
        <>
            <input
                onChange={(e) => handleSearch(e.target.value)} 
                className="SearchBar" 
                type="text" 
                placeholder="Search by name, email or role">
                </input>
        </>
    );
};

export default SearchBar;