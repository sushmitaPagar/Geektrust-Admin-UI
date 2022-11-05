import React from "react";
import "../css/Checkbox.css";

const CheckBox = ({user, selectedAdmins, handleSelect}) => {

    return (
        <input 
            key={user.id}
            className="checkbox"
            type="checkbox"
            onChange={() => handleSelect(user)}
            checked={selectedAdmins.includes(user) ? true : false}
            ></input>
    );
};

export default CheckBox;