import { Alert, StyleSheet, View, ImageBackground } from 'react-native';
import { Input, Image, Button, Text } from 'react-native-elements';
import React, { useContext, useState, useEffect } from 'react'
import { Title } from 'react-native-paper';
import axios from 'axios'
import UserContext from '../context/context'
import Constant from '../constant'
import { storeData, getstoreData,  removeValue } from '../utils/StoreData'
import ActivityLoader from '../components/ActivityLoader'
import Icon from 'react-native-vector-icons/FontAwesome';
const image = require('../assets/logo.png')
const bgImage = require('../assets/BG.png')

const Login = ({ navigation, route }) => {

    const [state, setState] = useState({
        email: '',
        password: ''
    })
    const [loader, setloader] = useState(false)
    const { addUser } = useContext(UserContext)
    const [isLog, setisLog] = useState(false)

    const handleLogin = () => {
        if (state.email != "" && state.password != "") {
            setloader(true)
            UserLogin()
        } else {
            Alert.alert("Oops", "Please Enter you email and password")
        }
    }

    const UserLogin = async () => {
        try {
            const response = await axios.post(`${Constant.BASE_URL}login`, {
                email: state.email,
                password: state.password
            })
            console.log("res =====", response.data)
            if (response.status === 200) {
                await storeData('userDetails', state.email)
                const stored = await storeData('token', response.data.token)
                if(stored) navigation.navigate('Dashboard')
            } else {
                console.log("res =====", response)
                Alert.alert("Message", response.data.message)
            }
        } catch (error) {
            if (error.response) {
                Alert.alert("Error", error.response.data.message)
            } else {
                Alert.alert("Error", error.message)
            }
            console.log("HEre is error", error.response.data.message)
        } finally {
            setloader(false)
        }
    }

    const getDataStored = async () => {
        setisLog(true)
        await removeValue('userDetails')
        try {
            const getStore = await getstoreData('userDetails')
            if (getStore) {
                addUser(getStore)
                navigation.navigate('Dashboard')
            }
        } catch (error) {
            console.log(error.message)
        } finally {
            setisLog(false)
        }

    }

    useEffect(() => {
        getDataStored()
    }, [])

    if (isLog) {
        return <ActivityLoader />
    }

    return (

        <View style={styles.container}>
            <ImageBackground source={bgImage} resizeMode="stretch" style={styles.image} imageStyle={styles.backgroundStyle}>

                <Image source={image}
                    style={{ width: 88, height: 81 }} />
                <Title style={styles.logintitle}>Login</Title>
                <Input
                    placeholder='Email'
                    containerStyle={styles.input}
                    onChangeText={text => setState({ ...state, email: text })}
                    leftIcon={
                        <Icon
                            name='at'
                            size={24}
                            color='#DD1D21'
                        />
                    }
                />
                <Input
                    placeholder='Password'
                    containerStyle={styles.input}
                    secureTextEntry={true}
                    onChangeText={text => setState({ ...state, password: text })}
                    leftIcon={
                        <Icon
                            name='lock'
                            size={24}
                            color='#DD1D21'
                        />
                    }
                />
                <Button
                    title="Login"
                    loading={false}
                    loadingProps={{ size: 'small', color: 'white' }}
                    buttonStyle={{
                        backgroundColor: '#DD1D21',
                        borderRadius: 50,
                    }}
                    titleStyle={{ fontWeight: "600", fontSize: 16, fontFamily: 'Poppins', lineHeight: 24 }}
                    containerStyle={{
                        height: 60,
                        width: 200,
                        marginTop: 6,
                        marginBottom: 23
                    }}
                    icon={{
                        name: 'arrow-right',
                        type: 'font-awesome',
                        size: 15,
                        color: 'white',
                      }}
                      iconRight
                      iconContainerStyle={{ marginLeft: 10, marginRight: -10 }}
                    onPress={() => handleLogin()}
                />
                <Text>Forgot Password?</Text>
            </ImageBackground>

        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: '14%',
        backgroundColor: '#ffff'
    },
    loginTitle: {
        fontFamily: 'Poppins',
        color: '#171717',
        marginTop: 48,
        fontSize: 21,
        fontWeight: 700,
        lineHeight: 32
    }, 
    input: {
        width: '74%',
    },
    image: {
        height: '100%',
        width: '100%',
        flex: 1,
        alignItems: 'center',
        position: 'relative'
    },
    backgroundStyle: {
        height: '40%',
        position: 'absolute',
        bottom: 0,
        top: '50%'
      }
})