import React from 'react';
import {StyleSheet, View, TouchableOpacity, Dimensions, Image} from 'react-native';
import CustomText from './CustomText';

const  {width} = Dimensions.get('screen')
const Leadlist = props => {
  const {item, navigation,  rest} = props;

  console.log("item =====", item);

  return (
    <TouchableOpacity
      {...rest}
      onPress={() => navigation.navigate('Listdetails', {
              ...item
            })
      }
      style={styles.container}>

      <View style={styles.imageContainer}>
         <Image
            source={require('../assets/gas.png')}
            resizeMode='contain'
            style={{ width: 35, height: 40 }}
          />
      </View>
      <View style={{width: '55%'}}>
        <CustomText
          text={item.id}
          fontSize={16}
          textStyle={styles.rsourceId}
        />
        <CustomText
          text={item.name}
          fontSize={15}
          textStyle={styles.resourceName}
        />
      </View>
      
    </TouchableOpacity>
  );
};

export default Leadlist;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    borderColor: '#EDEDED',
    paddingVertical: 10,
    alignItems: 'center',
  },
  imageContainer: {
    marginRight: 30
  },
  rsourceId: {
    fontFamily: 'Poppins',
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 18,
    lineHeight: 27,
    color: '#000000'
  },
  subtitle: {
    color: '#0099AB',
  },
  lead: {
    justifyContent: 'center',
    borderRightWidth: 1,
    borderLeftWidth: 1,
    paddingRight: 10,
    paddingLeft: 10,
    borderColor: '#EDEDED',
    alignItems: 'center',
  },
  subleads: {
    color: '#9A9A9A',
    maxWidth:width * 0.2,
    textAlign:'center'
  },
  rsourceName: {
    fontFamily: 'Poppins',
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 14,
    lineHeight: 21,
    color: '#ADB7C6'
  },
});
