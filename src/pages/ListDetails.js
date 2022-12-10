import {
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import HeaderWrapper from '../components/HeaderWrapper';
import CustomText from '../components/CustomText';

const { height, width } = Dimensions.get('window');
import { Button, Icon } from 'react-native-elements';
const ListDetails = ({ navigation, route }) => {
  const [counter, setCounter] = useState(0);
  const [showStop, setShowStop] = useState(true);
  const increment = useRef(null);

  useEffect(() => {
    increment.current = setInterval(() => {
      setCounter(prev => prev + 1)
    }, 1000);
    return () => clearInterval(increment.current);
  }, []);

  const handleStop = () => {
    clearInterval(increment.current);
    setShowStop(false);
  }

  return (
    <>
      <ScrollView style={styles.container}>
        <HeaderWrapper navigation={navigation} title={'Details'} padding>
          <View style={styles.subcontainer}>
            <CustomText text={'Station Subscribed'} textStyle={styles.title} fontSize={19} />
          </View>
          <View style={styles.cardContainer}>
            <View style={styles.card}>
              <CustomText text={'Active from'} textStyle={styles.cardTitle} fontSize={19} />
              <View style={styles.cardDetails}>
                <View style={styles.leftSection}>
                  <View style={styles.counterContainer}>
                    <CustomText text={counter} textStyle={styles.counter} fontSize={19} />
                    <CustomText text={"seconds"} textStyle={styles.units} fontSize={19} />
                  </View>
                  <View style={styles.moreDetails}>
                    <CustomText text={'More info'} textStyle={styles.info} fontSize={19} />
                    <Icon
                      name='chevron-down'
                      type='font-awesome'
                      iconStyle={{ fontSize: 10 }}
                      containerStyle={styles.iconContainer}
                      color='#000000' />
                  </View>
                </View>
                {showStop && <Button
                  title="Stop"
                  loading={false}
                  loadingProps={{ size: 'small', color: 'white' }}
                  buttonStyle={{
                    backgroundColor: '#DD1D21',
                    borderRadius: 50,
                  }}
                  titleStyle={{ fontWeight: "600", fontSize: 12, fontFamily: 'Poppins', lineHeight: 12 }}
                  containerStyle={{
                    height: 28,
                    width: 110,
                    marginTop: 5
                  }}
                  onPress={() => handleStop()}
                />}
              </View>
            </View>

          </View>
        </HeaderWrapper>
      </ScrollView>
    </>
  );
};

export default ListDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cardContainer: {
    height: 165,
    background: "#FFF",
    borderRadius: 16,
    shadowColor: '#00000038',
    shadowOffset: { width: -2, height: 4 },
    shadowRadius: 3,
    elevation: 11,
    marginHorizontal: 12
  },
  card: {
    background: "#FFF",
    borderRadius: 16,
    zIndex: 999,
    paddingVertical: 35,
    paddingHorizontal: 25
  },
  moreDetails: {
    fontFamily: 'Poppins',
    fontStyle: "normal",
    flexDirection: 'row',
    alignItems: 'center'
  },
  info: {
    fontWeight: "600",
    fontSize: 10,
    lineHeight: 15,
    textTransform: 'uppercase',
    marginRight: 11
  },
  iconContainer: {
    backgroundColor: '#E2E8E1',
    padding: 5,
    borderRadius: 20
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  counter: {
    fontFamily: 'Poppins',
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 36,
    lineHeight: 54,
  },
  units: {
    fontFamily: 'Poppins',
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 11,
    lineHeight: 16,
    marginTop: 5
  },
  counterContainer: {
    flexDirection: 'row'
  },
  title: {
    fontWeight: 'bold',
    fontFamily: 'Poppins',
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 21,
    lineHeight: 32,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontFamily: 'Poppins',
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 24,
    color: "#000000",
    textTransform: 'uppercase'
  },
  subcontainer: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 16,
  },
  divider: {
    height: 10,
    backgroundColor: '#EFEFEF',
  },
  Content: {
    paddingVertical: 16,
    paddingBottom: height * 0.1
  },
});


