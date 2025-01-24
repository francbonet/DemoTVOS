import React, { useRef, useState } from 'react';
import { StyleSheet, Animated, TVFocusGuideView } from 'react-native';
import SideBarMenuItem from '../Shared/SideBarMenuItem';
import { MenuItem } from '../../interfaces/interfaces';
import { getCurrentRoute, useIsFullScreen, useLastMenuFocus } from '../../services/navigation.service';

interface SidebarProps {
    menuItems: MenuItem[];
    onMenuItemPress: (item:MenuItem) => void;
    onSidebarStateChange: (isExpanded: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ menuItems, onMenuItemPress, onSidebarStateChange }) => {
    const sidebarPosition = useRef(new Animated.Value(-110)).current;
    const [isExpanded, setIsExpanded] = useState(false);
    const current = getCurrentRoute();
    const menuFocus =  useLastMenuFocus();
    const isFullScreen = useIsFullScreen();

    const expandSidebar = () => {
        setIsExpanded(true);
        onSidebarStateChange(true);
        Animated.timing(sidebarPosition, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
        }).start();
    };

    const collapseSidebar = () => {
        setIsExpanded(false);
        onSidebarStateChange(false);
        Animated.timing(sidebarPosition, {
        toValue: -110,
        duration: 300,
        useNativeDriver: true,
        }).start();
    };

    const onPress = (item: MenuItem) => {
        console.log(current?.name);
        if(menuFocus.lastFocus !==  item.label || current?.name === 'DetailMovie' ) {
            menuFocus.updateLastMenuFocus(item.label);
            collapseSidebar();
            onMenuItemPress(item);
        }
    };

    const getHasTVPreferredFocus = (item: MenuItem): boolean => {
        return isExpanded && menuFocus.lastFocus === item.label;
    };

    const getIsActive = (item: MenuItem): boolean => {
        return menuFocus.lastFocus === item.label;
    };

    return(
        <Animated.View style={[
          styles.sidebar,
          { transform: [{ translateX: sidebarPosition }] },
        ]}>
        <TVFocusGuideView
        focusable={!isFullScreen}
        autoFocus={!isFullScreen}
        trapFocusDown
        trapFocusUp
        >
        {menuItems.map((item, index) => (
            <SideBarMenuItem
                hasTVPreferredFocus={getHasTVPreferredFocus(item)}
                isActive={getIsActive(item)}
                isExpanded={isExpanded}
                key={index}
                item={item}
                onMenuItemPress={onPress}
                expandSidebar={expandSidebar}
                collapseSidebar={collapseSidebar}
            />
        ))}
        </TVFocusGuideView>
      </Animated.View>
    );
};

const styles = StyleSheet.create({
    sidebar: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 15,
        width: 160,
        backgroundColor: '#000',
    },
    menuItem: {
        color: '#fff',
        fontSize: 18,
        marginVertical: 10,
    },
});

export default Sidebar;
