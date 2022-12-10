import { View, Text } from 'react-native'
import React from 'react'

const UserContext = React.createContext({
    userData: [],
    addUser : (task) => {},
    deleteUser : (taskId) => {}
});


export default UserContext