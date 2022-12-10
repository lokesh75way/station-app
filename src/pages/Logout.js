import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { removeValue } from '../utils/StoreData'
import UserContext from '../context/context'
import ActivityLoader from '../components/ActivityLoader'

const Logout = ({navigation}) => {

    const { deleteUser } = useContext(UserContext)

    const logoutUser = async () => {
        await removeValue('userDetails')
        deleteUser()
        console.log("User Logged out")
        navigation.navigate('Login')
    }

    useEffect(() => {
        logoutUser()
    }, [])

    return (
        <View style={styles.container}>
            <ActivityLoader />
        </View>
    )
}

export default Logout

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
})