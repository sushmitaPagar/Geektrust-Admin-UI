import React, {useState} from "react";
import CheckBox from "./CheckBox";
import { useSnackbar } from 'notistack';
import validateData from "../Services/DataValidate";
import "../css/AdminEntry.css";

const AdminEntry = ({user, selectedAdmins, handleSelect, handleSave, handleDelete}) => {

    const { enqueueSnackbar } = useSnackbar();

    const [updatedUser, setUpdatedUser] = useState(user);
    const [editable, setEditable] = useState(false);

    // Function to handle input value to any field while update
    const handleFieldChange = (event, user) => {

        setUpdatedUser({...updatedUser, [event.target.name]: event.target.value});
    };

    // Function to handle click on save icon for perticular entry
    const handleUsersave = (user) => {
        if(validateData(updatedUser)){
            setEditable(!editable);
            handleSave(updatedUser, user);
        }else{
            enqueueSnackbar("Fields should not be empty..!", {variant: "error"});
        }
    };

    return (
        <tr key={user.id} className="tableRow">
                                    <td>
                                        <CheckBox 
                                                user={user} 
                                                selectedAdmins={selectedAdmins}
                                                handleSelect={handleSelect} />
                                    </td>
                                    <td>
                                        <input 
                                            className={editable ? "editabeInput" : "readOnlyInput"}
                                            type="text"
                                            name="name"
                                            defaultValue={user.name}
                                            readOnly={!editable}
                                            onChange={(e) => handleFieldChange(e, user)}>
                                        </input>
                                    </td>
                                    <td>
                                        <input 
                                            className={editable ? "editabeInput" : "readOnlyInput"}
                                            type="text"
                                            name="email"
                                            defaultValue={user.email}
                                            readOnly={!editable}
                                            onChange={(e) => handleFieldChange(e, user)}>
                                        </input>
                                    </td>
                                    <td>
                                        <input 
                                            className={editable ? "editabeInput" : "readOnlyInput"}
                                            type="text"
                                            name="role"
                                            defaultValue={user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                            readOnly={!editable}
                                            onChange={(e) => handleFieldChange(e, user)}>
                                        </input>
                                    </td>
                                    <td className="actionIcons">
                                        {editable ? 
                                                <i className="fas fa-save"
                                                    onClick={() => handleUsersave(user)}></i> 
                                                : <i className="fa-regular fa-pen-to-square"
                                                    onClick={() => setEditable(!editable)}></i> }
                                        <i className="fa-solid fa-trash delete-icon"
                                            onClick={() => handleDelete(user)}></i>
                                    </td>
            </tr>
    );
};

export default AdminEntry;