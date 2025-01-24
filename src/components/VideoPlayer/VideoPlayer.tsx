import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Video from 'react-native-video';
import ActionButton from '../Shared/ActionButton';
import { Movie } from '../../interfaces/interfaces';

interface VideoPlayerProps {
  movie: Movie;
  isModalVisible: boolean;
  onClose: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ movie, onClose }) => {
  const videoRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleProgress = (data: { currentTime: number }) => {
    setCurrentTime(data.currentTime);
  };

  const handleLoad = (data: { duration: number }) => {
    setDuration(data.duration);
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
        <View style={[styles.container]}>
        <Video
            ref={videoRef}
            source={{ uri: movie.video_source }}
            style={styles.video}
            controls={false}
            resizeMode="contain"
            paused={!isPlaying}
            onLoad={handleLoad}
            onProgress={handleProgress}
            onError={(error) => console.log('Video Error:', error)}
        />

        <View style={styles.closeButton}>
            <ActionButton
            hasTVPreferredFocus={true}
            icon="xmark"
            onPress={() => {
                setIsPlaying(false);
                onClose();
            }}
            />
        </View>

        <View style={styles.controls}>
            <ActionButton
            icon={isPlaying ? 'pause' : 'play'}
            label={isPlaying ? 'Pause' : 'Play'}
            onPress={handlePlayPause}
            />
            <Text style={styles.timer}>
            {formatTime(currentTime)} / {formatTime(duration)}
            </Text>
        </View>
        </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  controls: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  timer: {
    color: '#ffffff',
    fontSize: 14,
    padding: 10,
  },
});

export default VideoPlayer;
