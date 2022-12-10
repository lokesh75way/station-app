import {
  ScrollView,
  StyleSheet,
  View,
  Alert,
  Dimensions,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import constant from '../constant';
import ActivityLoader from '../components/ActivityLoader';
import NoData from '../components/NoData';
import Listlist from '../components/Leadlist';
import { SearchBar } from 'react-native-elements';

const { height } = Dimensions.get('screen');
const AllLeads = ({ navigation }) => {
  const [data, setdata] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loader, setloader] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  const updateSearch = (srch) => {
    setSearch(srch);
  };

  const filter = () => {
    const list = data.filter(item => item.id.toString().includes(search) || item.name.includes(search));
    setFilteredData(list);
  }

  useEffect(() => {
    filter();
  }, [data, search])

  const fetchListData = async () => {
    setloader(true);
    const config = {
      // headers: {
      //   Authorization: `Bearer ${userData[0].token}`,
      // },
    };

    try {
      const response = await axios.get(
        `${constant.BASE_URL}unknown?page=${page}`,
        config,
      );
      if (response.status === 200) {
        let bodyData = response.data.data;
        setdata([...data, ...bodyData]);
        setTotalPages(response.data.total_pages)
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        Alert.alert('Error', error.response.data.message);
      }
    } finally {
      setloader(false);
    }
  };

  useEffect(() => {
    fetchListData();
  }, [page]);

  const nextPage = () => {
    const pg =  page + 1 > totalPages ? page : page + 1;
    setPage(pg)
  }

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

  if (loader && data.length < 1) {
    return <ActivityLoader />;
  }

  return (
    <>
      <SearchBar
        placeholder="Search by ID, Name, City"
        onChangeText={updateSearch}
        lightTheme
        searchIcon={{ iconStyle: styles.searchIcon }}
        // inputStyle={{backgroundColor: 'white'}}
        containerStyle={{ backgroundColor: '#F0F4F5', borderRadius: 11, height: 60 }}
        placeholderTextColor={'#ADB7C6'}

        inputContainerStyle={{ backgroundColor: '#F0F4F5' }}
        value={search}
      />
      {filteredData.length > 0 ? (
        <View style={styles.Content}>
          <ScrollView style={styles.contentContainer} onScroll={({nativeEvent}) => {
      if (isCloseToBottom(nativeEvent)) {
        nextPage();
      }
    }}
    scrollEventThrottle={400}>
            {filteredData.map((item, index) => (
              <Listlist
                item={item}
                key={index}
                navigation={navigation}
              />
            ))}
          </ScrollView>

        </View>
      ) : (
        <NoData />
      )}
    </>
  );
};

export default AllLeads;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  }, 
  container: {
    flex: 1,
    backgroundColor: '#0099AB',
  },
  searchContainer: {

  },
  title: {
    fontWeight: 'bold',
  },
  subcontainer: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 16,
  },
  divider: {
    height: 15,
  },
  Content: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    paddingBottom: height * 0.1,
    height: height - 340
  },
  searchIcon: {
    height: 18,
    width: 18,
    color: '#ADB7C6'
  }
});
