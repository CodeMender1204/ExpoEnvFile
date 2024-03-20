import { StatusBar } from 'expo-status-bar';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import {EXPO_Url} from "@env"
import { useEffect, useState } from 'react';
import axios from 'axios';
export default function App() {
   const [userData,setUserData] = useState()
   useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${EXPO_Url}`
        );

        const users = response.data.data.data;

        setUserData(users);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetch data function
    fetchData();
  }, []);
  const renderItem = ({ item }) => (
    <View style={{ padding: 10 }}>
      <Text>Name: {`${item.name.title} ${item.name.first} ${item.name.last}`}</Text>
      <Text>Email: {item.email}</Text>
      <Text>Location: {`${item.location.city}, ${item.location.state}, ${item.location.country}`}</Text>
      <Text>Phone: {item.phone}</Text>
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={userData}
        renderItem={renderItem}
        keyExtractor={(item)=>item.login.uuid}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical:20
  },
});
