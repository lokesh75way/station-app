import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  ImageBackground,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import CustomText from './CustomText';
import { Provider } from 'react-native-paper';

const bgImage = require('../assets/BG.png')
const { height } = Dimensions.get('window');
const HeaderWrapper = ({
  children,
  title,
  padding,
  termsSelected,
  navigation,
  isDashboard,
}) => {
  const ContentStyles = { padding: !padding ? 18 : undefined };
  return (
    <Provider style={{ flex: 1 }}>
      <ImageBackground source={bgImage} resizeMode="cover" style={styles.image} imageStyle={styles.backgroundStyle}>
        <View
          style={styles.headerContainer}>
          {!isDashboard
            && (
              <Icon
                name="arrowleft"
                onPress={() => navigation.goBack()}
                size={25}
                color="#000"
                style={{position: 'absolute', left: 32}}
              />
            )}
          {!termsSelected && isDashboard && (
            <Image
              source={require('../assets/logo.png')}
              resizeMode='contain'
              style={{ width: 88, height: 81, marginBottom: 44, marginTop: 84 }}
            />
          )}
          <View style={styles.titleContainer}>
            <CustomText
              textStyle={styles.Header}
              text={title}
              fontSize={20}
            />
          </View>
        </View>

        <View style={[styles.Contentcontainer, ContentStyles]}>{children}</View>
      </ImageBackground>

    </Provider>
  );
};

export default HeaderWrapper;

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'space-between',
    position: 'relative',
    alignItems: 'center',
    paddingTop: height * 0.02,
    paddingBottom: height * 0.02,
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 22,
    minHeight: 200,
    justifyContent: 'center'
  },
  Header: {
    color: '#000',
    textTransform: 'capitalize',
    fontFamily: 'Poppins',
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 21,
    lineHeight: 32,
  },
  Contentcontainer: {
    borderWidth: 2,
    borderColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#fff',
    flex: 7,
    width: "100%"
  },
  titleContainer: {
    alignItems: 'center',
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
    top: 0,
    bottom: '50%'
  }
});
