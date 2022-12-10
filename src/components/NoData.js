import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomText from './CustomText'

const NoData = () => {
    return (
        <View style={styles.container}>
            <CustomText text="No Data Found" textStyle={{ color: "#9A9A9A" }} fontSize={25} />
        </View>
    )
}

export default NoData

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' }
})