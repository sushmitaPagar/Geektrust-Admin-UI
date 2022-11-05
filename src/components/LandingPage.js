import React, {useState, useEffect} from "react";
import SearchBar from "./SearchBar";
import axios from "axios";
import AdminEntryTable from "./AdminEntryTable";
import PagingComponent from "./PagingComponent";
import { useSnackbar } from 'notistack';
import config from "../Services/ConfigFile";
import searchData from "../Services/OnSearch";

import "../css/LandingPage.css";

const LandingPage = () => {

    const { enqueueSnackbar } = useSnackbar();

    const [adminList, setAdminList] = useState([]);
    const [filteredAdminList, setFilteredAdminList] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [selectedAdmins, setSelectedAdmins] = useState([]);
    
    //paging details-----------------------------------------------------------------
	const endIndex = pageNumber * config.pageSize;
	const startIndex = endIndex - config.pageSize;
	const currPageData = filteredAdminList.slice(startIndex, endIndex);

	const handlePageChange = (num) => {
        const lastPageNumber = Math.ceil(filteredAdminList.length / config.pageSize);

        if(num >= 1 && num <= lastPageNumber)
            setPageNumber(num);
    };
    //--------------------------------------------------------------------------------

    // Function to select all entries
    const handleAllSelect = () => {
		if (selectedAdmins.length) {
			setSelectedAdmins([]);
		} else {
			setSelectedAdmins(adminList);
		}
	};

    // Function to select each entry on checkbox click
    const handleSelect = (user) => {
		if (selectedAdmins.includes(user)) {
			setSelectedAdmins(selectedAdmins.filter((ele) => ele.id !== user.id));
		} else {
			setSelectedAdmins([...selectedAdmins, user]);
		}
	};

    // Function to handle input into search bar
    const handleSearch = (value) => {
        let result = searchData(value, adminList);

        console.log("result :: ", result);
        setFilteredAdminList(result);
    };

    // Function to handle click on save icon after editing any entry
    const handleSave = (updatedData, user) => {
        let adminIndx = adminList.findIndex((ele) => ele.id === user.id);
        let filteredAdminIndx = filteredAdminList.findIndex((ele) => ele.id === user.id);

        adminList[adminIndx] = updatedData;
        filteredAdminList[filteredAdminIndx] = updatedData;

        enqueueSnackbar("Data saved..!", {variant: "success"});
    };

    // Function to handle click on delete icon for particular entry
    const handleDelete = (user) => {
        if(window.confirm("Are you sure you want to delete this entry?")){
            let newAdminList = adminList.filter((ele) => ele.id !== user.id);
            let newFilteredAdminList = filteredAdminList.filter((ele) => ele.id !== user.id);

            setAdminList(newAdminList);
            setFilteredAdminList(newFilteredAdminList);
        }
    };

    // Function to handle click on delete selected entries
    const handleDeleteSelected = () => {
        if(selectedAdmins.length === 0){
            enqueueSnackbar("No entries selected for delete..", {variant: "warning"});
        }else{
            if(window.confirm("Are you sure you want to delete selected entries?")){
                let newAdminList = adminList.filter((ele) => !selectedAdmins.includes(ele));
                let newFilteredAdminList = filteredAdminList.filter((ele) => !selectedAdmins.includes(ele));

                setAdminList(newAdminList);
                setFilteredAdminList(newFilteredAdminList);
            }
        }
    };

    // Function to perform API call
    const getAdminList = async () => {
        const url = config.endpoint;

        try{
            let response = await axios(url);
            return response.data;

        }catch(error){
            enqueueSnackbar( error , {variant: "error"} );
        }
    };

    // React hook
    useEffect(() => {
        const initApp = async () => {
            let data = await getAdminList();

            setAdminList(data);
            setFilteredAdminList(data);
        };

        initApp();
    }, []);

    return (
        <>
            {/* Search bar */}
            <SearchBar handleSearch={handleSearch} />
            
            {/* Admin entries table */}
            <div className="adminEntriesDiv">
                <AdminEntryTable 
                            adminList={adminList}
                            selectedAdmins={selectedAdmins}
                            currPageData={currPageData}
                            handleAllSelect={handleAllSelect}
                            handleSelect={handleSelect}
                            handleSave={handleSave}
                            handleDelete={handleDelete}
                         />
            </div>

            {/* Footer containing delete selected button and paging component */}
            <div className="footer">
                <button 
                    className="deleteSelected"
                    onClick={() => handleDeleteSelected()}>Delete Selected</button>
                <PagingComponent
                    filteredAdminList={filteredAdminList}
                    pageNumber={pageNumber}
                    handlePageChange={handlePageChange} />
            </div>
        </>
    );
};

export default LandingPage;