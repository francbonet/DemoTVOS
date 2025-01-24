import React, { useCallback, useRef } from 'react';
import { FlatList, StyleSheet, Text, TVFocusGuideView } from 'react-native';
import MovieCard from '../MovieCard/MovieCard';
import { dataMovies } from '../../services/movies.service';

interface MovieListProps {
  title?: string;
}

const MovieList = ({ title }: MovieListProps) => {
    const numColumnas = 6;
    const flatListRef = useRef<any>(null);

    const handleFocus = useCallback((index: number) => {
      const rowIndex = Math.floor(index / numColumnas);
      flatListRef.current.scrollToIndex({
        index: rowIndex,
        animated: true,
        viewPosition: 0.35,
      });
    }, [numColumnas]);

    return (
          <TVFocusGuideView
            focusable={true}
            autoFocus={true}
           >
            <FlatList
              ref={flatListRef}
              data={dataMovies}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item, index }) => (
                <MovieCard forceFocus={index === 0} index={index} movie={item} onFocus={()=>{
                  handleFocus(index);
                }}/>
              )}
              removeClippedSubviews={false}
              numColumns={numColumnas}
              scrollEnabled={true}
              contentContainerStyle={styles.list}
              ListHeaderComponent={
                <Text style={styles.title}>{title}</Text>
              }
              showsVerticalScrollIndicator={false}
            />
            </TVFocusGuideView>
    );
};

const styles = StyleSheet.create({
  list: {
    alignItems: 'flex-start',
  },
  title: {
    color: '#fff',
    fontSize: 30,
    marginLeft: 10,
  },
});


export default MovieList;
