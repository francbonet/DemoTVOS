import React from 'react';
import { StyleSheet, View } from 'react-native';
import MovieList from '../components/MovieList/MovieList';
import { getCurrentRoute } from '../services/navigation.service';


const HomeScreen: React.FC = () => {
  const current = getCurrentRoute();

  return (
      <View style={styles.container} >
           <MovieList title={current?.name ? current?.name : 'Home'}/>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
  },
  title: {
    color: '#fff',
    fontSize: 30,
    marginLeft: 10,
  },
});

export default HomeScreen;


