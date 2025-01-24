import React from 'react';
import { Dimensions, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Movie } from '../interfaces/interfaces';
import ActionButton from '../components/Shared/ActionButton';
import LinearGradient from 'react-native-linear-gradient';
import { navigate } from '../services/navigation.service';

const DetailMovieScreen: React.FC = () => {
  const route = useRoute();
  const { movie } = route.params as { movie: Movie };
  const { width } = Dimensions.get('screen');

  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: movie.backdrop_path }} style={[styles.cover, { width: width - 60 } ]}>
        <LinearGradient
          colors={['#00000000', '#000000']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.gradient} />
      </ImageBackground>

      <View style={styles.info}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.description}>{movie.overview}</Text>
        <ActionButton
        hasTVPreferredFocus={true}
        icon="play"
        label="Play"
        onPress={() => {
            navigate('Player', { isFullScreen: true, movie: movie });
        }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: '#000',
    height: '100%',
    width: '100%',
    paddingRight: 60,
  },
  cover: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  gradient: {
    width: '100%',
    height: '100%',
  },
  info: {
    position: 'absolute',
    bottom: 30,
    marginLeft: 30,
    paddingRight: 30,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
  },
  description: {
    fontSize: 20,
    fontWeight: 'normal',
    color: '#fff',
    marginBottom: 20,
  },
});

export default DetailMovieScreen;


