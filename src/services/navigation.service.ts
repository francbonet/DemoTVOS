import { createNavigationContainerRef, useNavigationState } from '@react-navigation/native';
import { MenuItem, Movie } from '../interfaces/interfaces';
import { useEffect, useState } from 'react';

type RootStackParamList = {
  Home: undefined;
  Series: undefined;
  Movies: undefined;
  Originals: undefined;
  Settings: undefined;
  Movie: { movie: Movie };
  DetailMovie: { movie: Movie };
};

type RouteParams = {
  isFullScreen?: boolean;
  [key: string]: any;
};

interface Route {
  key: string;
  name: string;
  params?: RouteParams;
  path?: string;
}

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export const NavigationMenuItems: MenuItem[] = [
  { label: 'Search', route: 'Search', icon: 'magnifying-glass', action: () => console.log('Navigate to Search') },
  { label: 'Home', route: 'Home', icon: 'house', action: () => console.log('Navigate to Home') },
  { label: 'Movies', route: 'Movies', icon: 'film', action: () => console.log('Navigate to Movies') },
  { label: 'Originals', route: 'Originals', icon: 'film', action: () => console.log('Navigate to Originals') },
  { label: 'Series', route: 'Series', icon: 'film', action: () => console.log('Navigate to Series') },
  { label: 'Settings', route: 'Settings', icon: 'gear', action: () => console.log('Navigate to Settings') },
];

export const getCurrentRoute = () => {
  return navigationRef.current?.getCurrentRoute();
};

export const navigate = (name: string, params?: any ) => {
  if (navigationRef.isReady()) {
      navigationRef.navigate(name, params);
  }
};

export const useLastMenuFocus = () => {
  const [lastFocus, setLastFocus] = useState<string>('Home');

  const updateLastMenuFocus = (focus: string) => {
    setLastFocus(focus);
  };

  return {
    lastFocus,
    updateLastMenuFocus,
  };
};

export const useIsFullScreen = () => {
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const navigationState = useNavigationState((state) => state);
  const currentRoute: Route = navigationState?.routes[navigationState.index];

  useEffect(() => {
    if (currentRoute?.params?.isFullScreen) {
      setIsFullScreen(true);
    } else {
      setIsFullScreen(false);
    }
  }, [currentRoute]);

  return isFullScreen;
};


