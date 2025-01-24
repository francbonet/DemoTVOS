import React, { useRef, useState } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { MenuItem as MenuItemType } from '../../interfaces/interfaces';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';


interface MenuItemProps {
  item: MenuItemType;
  isExpanded: boolean;
  hasTVPreferredFocus?: boolean;
  isActive: boolean;
  onMenuItemPress: (item: MenuItemType) => void;
  expandSidebar: () => void;
  collapseSidebar: () => void;
}

const SideBarMenuItem: React.FC<MenuItemProps> = ({ item, isExpanded, hasTVPreferredFocus, isActive = false, onMenuItemPress, expandSidebar, collapseSidebar }) => {
  const [isFocused, setIsFocused] = useState(false);
  const menuItemRef = useRef<any>(null);

  const handleFocus = () => {
    expandSidebar();
    setIsFocused(true);
  };

  const handleBlur = () => {
    collapseSidebar();
    setIsFocused(false);
  };


  return (
    <TouchableOpacity
      key={item.label}
      ref={menuItemRef}
      hasTVPreferredFocus={isExpanded && hasTVPreferredFocus}
      activeOpacity={1}
      onFocus={handleFocus}
      onPress={() => onMenuItemPress(item)}
      onBlur={handleBlur}
      style={[styles.container, isExpanded && styles.containerExpanded]}
    >
      <View style={[styles.menuItem, isExpanded && styles.menuItemExpanded]}>
        <FontAwesome6 style={[styles.icon, isActive && styles.iconActive ]} color={'white'} name={item.icon as any} size={18} iconStyle="solid" />
        {isExpanded && (
          <Text style={[styles.label , isFocused && styles.labelFocused, isActive && styles.labelActive ]}>{item.label}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 5,
    borderRadius: 5,
    width: 140,
  },
  containerExpanded: {
    width: 140,
  },
  menuItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    padding: 5,
    borderRadius: 5,
    overflow: 'hidden',
    height: 50,
  },
  menuItemExpanded: {
    alignSelf: 'flex-start',
  },
  icon: {
    marginRight: 7,
    opacity: 0.3,
    paddingTop: 2,
    paddingRight: 3,
    borderRadius: 5,
  },
  iconActive: {
    opacity: 1,
  },
  label: {
    borderLeftWidth: 2,
    borderColor: 'transparent',
    paddingLeft: 6,
    color: '#fff',
    opacity: 0.7,
    fontSize: 18,
  },
  labelFocused: {
    borderColor: '#fff',
    color: '#fff',
    opacity: 0.7,
  },
  labelActive: {
    color: '#fff',
    fontWeight: 'bold',
    opacity: 1,
  },
});

export default SideBarMenuItem;
