import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CustomText = (props) => {

    const { text, fontSize,textStyle } = props
    return (
        <Text
            style={[styles(fontSize).heading, textStyle]} {...props}>
            {text}
        </Text>

    )
}

export default CustomText

const styles = (fontSize) => StyleSheet.create({
    heading: {
        fontWeight: 'normal',
        color:'#171717',
        fontSize:fontSize
    }
})