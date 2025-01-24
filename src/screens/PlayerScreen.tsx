import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import VideoPlayer from '../components/VideoPlayer/VideoPlayer';
import { Movie } from '../interfaces/interfaces';

const Screen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { movie } = route.params as { movie: Movie };

  return (
      <VideoPlayer movie={movie} isModalVisible={true} onClose={()=>{
        navigation.goBack();
      }}/>
  );
};

export default Screen;
