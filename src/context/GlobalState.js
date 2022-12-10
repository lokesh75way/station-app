import React, { useState } from "react";
import UserContext from './context';

const GlobalState = ({children}) => {

    const [userData, setuseData] = useState([])

    const addUser = (newData) => {
        const list = [...userData, newData]
        setuseData(list)
    }

    const deleteUser = () => {
        setuseData([]);
    }

    return (
        <UserContext.Provider
            value={{
                userData,addUser,deleteUser
            }}
        >{children}</UserContext.Provider>
    )

}


export default GlobalState;