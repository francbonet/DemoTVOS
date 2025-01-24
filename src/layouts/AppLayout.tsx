import React, { useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { MenuItem } from '../interfaces/interfaces';
import Sidebar from '../components/Sidebar/Sidebar';
import { navigate, NavigationMenuItems, useIsFullScreen } from '../services/navigation.service';

interface SidebarContainerProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<SidebarContainerProps> = ({ children }) => {
  const contentPosition = useRef(new Animated.Value(0)).current;
  const isFullScreen = useIsFullScreen();

  const expandSidebar = () => {
    Animated.timing(contentPosition, {
      toValue: 110,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const collapseSidebar = () => {
    Animated.timing(contentPosition, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
          <View style={[styles.sidebar, isFullScreen && styles.sidebarfFullScreen]}>
            <Sidebar
              menuItems={NavigationMenuItems}
              onMenuItemPress={(item: MenuItem) => {
                navigate(item.route);
              }}
              onSidebarStateChange={(state) => (state ? expandSidebar() : collapseSidebar())}
              />
          </View>

          <Animated.View style={[ styles.content, !isFullScreen && { transform: [{ translateX: contentPosition }]}, isFullScreen && styles.contentFullScreen ]}>
              {children}
          </Animated.View>
    </View>

  );
};

const styles = StyleSheet.create({
   container: {
    position: 'relative',
    height: '100%',
    width: '100%',
    backgroundColor: '#000',
  },
  sidebar: {
    position: 'absolute',
    left: 0,
    width: 60,
    height: '100%',
    zIndex: 1,
    opacity: 1,
  },
  sidebarfFullScreen: {
    left: -60,
    opacity: 0,
    width: 0,
  },
  content: {
    position: 'absolute',
    top: 0,
    left: 60,
    height: '100%',
    width: '100%',
    zIndex: 0,
  },
  contentFullScreen: {
    left: 0,
    // width: '100%', -> TODO: Bug - Don't change width
  },

});

export default AppLayout;
