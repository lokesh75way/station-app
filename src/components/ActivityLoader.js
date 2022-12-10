import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native-paper'

const ActivityLoader = () => {
  return (
    <ActivityIndicator size={50} color='#0099AB' style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />
  )
}

export default ActivityLoader
