import React from "react";
import AdminEntry from "./AdminEntry";
import "../css/AdminEntryTable.css";

const AdminEntryTable = ({adminList, selectedAdmins, currPageData, handleAllSelect, handleSelect, handleSave, handleDelete}) => {

    return (
        <div className="adminEntryTable">
            <table className="table">
                <thead>
                    <tr key={0} className="tableRow">
                        <th>
                            <input  
                                className="checkbox"
                                type="checkbox"
                                onChange={handleAllSelect}
                                checked={selectedAdmins.length === adminList.length ? true : false}
                            ></input>         
                        </th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currPageData.map((user) => {
                        return (
                            <AdminEntry
                                    key={user.id}
                                    user={user}
                                    selectedAdmins={selectedAdmins}
                                    handleSelect={handleSelect}
                                    handleSave={handleSave}
                                    handleDelete={handleDelete}
                                     />
                        );
                    })
                    }
                </tbody>
            </table>
        </div>
    );
};

export default AdminEntryTable;