import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ActionButton from '../components/Shared/ActionButton';
import { getCurrentRoute } from '../services/navigation.service';

const Screen: React.FC = () => {
  const current = getCurrentRoute();

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.text}>{current?.name}</Text>
        <ActionButton
          hasTVPreferredFocus={true}
          icon="magnifying-glass"
          label="Search"
          onPress={() => {
            console.log('Play');
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#333',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 60,
  },
  info: {
    alignItems: 'center',
    backgroundColor: '#333',
  },
  text: {
    fontSize: 30,
    color: '#fff',
    marginBottom: 20,
  },
});

export default Screen;
