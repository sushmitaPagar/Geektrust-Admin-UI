const validateData = (updatedData) => {
    if(updatedData.name === "" || updatedData.email === "" || updatedData.role === "")
        return false;
    
    return true;
};

export default validateData;