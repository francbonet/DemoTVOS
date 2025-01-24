/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { memo, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { navigate, useIsFullScreen } from '../../services/navigation.service';
import { Movie } from '../../interfaces/interfaces';


interface MovieCardProps {
  movie: Movie;
  index: number;
  forceFocus: boolean;
  onFocus: () => void
}


const MovieCard = ({ movie, index, forceFocus, onFocus }: MovieCardProps ) => {
  const [isFocused, setIsFocused] = useState(false);
  const isFullScreen = useIsFullScreen();

  return (
    <TouchableOpacity
      key={index}
      hasTVPreferredFocus={forceFocus}
      style={[styles.card, isFocused && styles.focusedCard]}
      onFocus={() => {
        setIsFocused(true);
        onFocus();
      }}
      onBlur={() => setIsFocused(false)}
      activeOpacity={1}
      onPress={() => {
        console.log(`Seleccionaste: ${movie.title}`);
        navigate('DetailMovie', {
          screen: 'DetailMovie',
          movie,
        });
      }}
    >
      <View style={styles.content}>
        <Image source={{ uri: movie.poster_path }} style={styles.poster} resizeMode={'cover'}/>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 7,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderStyle: 'solid',
    borderColor: '#333',
    transform: [{ scale: 1 }],
    opacity: 0.75,
  },
  focusedCard: {
    transform: [{ scale: 1 }],
    borderColor: '#fff',
    borderWidth: 3,
    opacity: 1,
  },
  content: {
    position: 'relative',
    width: 130,
    height: 190,
    alignItems: 'center',
    padding: 0,
  },
  poster: {
    zIndex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  title: {
    position: 'absolute',
    bottom: 10,
    zIndex: 2,
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '85%',
    lineHeight: 16,
  },
});

export default MovieCard;
