import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Alert
} from 'react-native';
import React, { useContext, useEffect } from 'react';
import HeaderWrapper from '../components/HeaderWrapper';
import { Provider } from 'react-native-paper';
import UserContext from '../context/context';
import constant from '../constant';
import axios from 'axios';
import ActivityLoader from '../components/ActivityLoader';
import { Button } from 'react-native-elements';
import { storeData, getstoreData } from '../utils/StoreData'
import AllLeads from './AllLeads';

const { width } = Dimensions.get('window');
const Dashboard = ({ navigation }) => {
  const [termsSelected, setTermsSelected] = React.useState(false);
  const [loader, setloader] = React.useState(false);
  const [data, setdata] = React.useState(null);
  const { userData } = useContext(UserContext);


  const fetchData = async () => {
    setloader(true);
    const config = {
      headers: {
        Authorization: `Bearer ${userData[0].token}`,
      },
    };
    try {
      const response = await axios.get(
        `${constant.BASE_URL}lead/dashboard`,
        config,
      );

      if (response.data.statuscode === 200) {
        // sequlizeData(response.data.body.lifetime);
        delete response.data.body.lifetime;
        // console.log(response.data.body);
        setdata(val => {
          if (response) {
            return [response.data.body];
          }
          return val;
        });
      }
    } catch (error) {
      if (error.response.status === 400) {
        console.log(error.response.data.body.name === 'TokenExpiredError');
        if (error.response.data.body.name === 'TokenExpiredError') {
          navigation.navigate('logout');
        }
        Alert.alert('Error', error.response.data.message);
      }
    } finally {
      setloader(false);
    }
  };

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const email = await getstoreData('userDetails');
      const termSelected = await getstoreData('termSelected');
      let accepted = false;
      if (termSelected) {
        accepted = JSON.parse(termSelected).includes(email);
      }
      setTermsSelected(accepted)
      // ...
    }
    fetchData();

  }, []);

  const handleAccept = async () => {
    const previous = await getstoreData("termSelected");
    const list = previous ? JSON.pase(previous) : [];
    const email = await getstoreData("userDetails");
    list.push(email);
    await storeData("termSelected", JSON.stringify(list));
    setTermsSelected(true);

  }

  useEffect(() => {
    if (userData[0]?.token) {
      fetchData();
    }
  }, []);

  const stylesisthe = {
    maxWidth: '100%'
  };

  if (loader && !data) {
    return <ActivityLoader />;
  } else {
    return (
      <Provider>
        <View style={styles.container}>
          <HeaderWrapper isDashboard title={'Select Station'} termsSelected={termsSelected} navigation={navigation} padding>
            {termsSelected ?
              <>
                <View style={{ paddingHorizontal: 34, paddingTop: 33 }}>
                  <AllLeads navigation={navigation}></AllLeads>
                </View>
              </> : <View style={{ paddingHorizontal: 34, paddingTop: 33 }}>
                <View style={styles.topLineContainer}>
                  <View style={stylesisthe}>
                    <Text style={styles.title}>Disclaimer</Text>
                  </View>
                </View>
                <View>

                  <Text style={styles.content}>
                    The information provided by the Zdaly Fuel
                    Network Optimizer app is based on historical data. Data on Zdaly Light is updated once daily at 8:00 a.m. eastern time. Any prospective information is based on that data and should not be relied on as a estimation of future performance. Any future product prices are the manufacturer's suggested retail price (MSRP) only. Sites are independent operators free to set their retail
                    price.
                  </Text>
                </View>
                <View style={styles.actionBtn}>
                  <Button
                    title="I Accept"
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
                    onPress={() => handleAccept()}
                  />
                </View>

              </View>}
          </HeaderWrapper>
        </View>
      </Provider>
    );
  }
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
  },
  topLineContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    flex: 1,
    color: '#171717',
    justifyContent: 'center',
    fontFamily: 'Poppins',
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 21,
    lineHeight: 32,
  },
  content: {
    fontFamily: 'Poppins',
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 30,
    color: '#000000',
    marginBottom: 24
  },
  wrapper: {
    marginVertical: 16,
    elevation: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  BoxContainer: {
    width: width / 2 - 32,
    borderRadius: 12,
    height: 120,
    marginTop: 15,
    elevation: 7,
  },
  BottomContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  innerBox: {
    paddingVertical: 7,
    paddingHorizontal: 10,
    height: 100,
  },
  CardImage: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  dataStyle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#0099AB',
    lineHeight: 35,
  },
  bottomarea: {},
  bottomText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  divider: {
    height: 15,
  },
  colorLabelContainer: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '30%',
  },
  subLabel: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
    overflow: 'hidden',
  },
  legendtText: {
    fontWeight: '600',
  },
  Loadercontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 18,
    color: 'red',
    fontWeight: 'bold',
  },
  actionBtn: {
    flex: 1,
    alignItems: "center"
  }
});
