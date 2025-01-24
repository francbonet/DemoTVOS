import React, { useState } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { IconName, IconStyle } from '@fortawesome/fontawesome-common-types';

interface MenuItemProps {
  icon: IconName;
  size?: number;
  label?: string;
  iconStyle?: IconStyle;
  hasTVPreferredFocus?: boolean;
  onPress: () => void;
}

const ActionButton: React.FC<MenuItemProps> = ({ label, icon, size = 18, hasTVPreferredFocus = false, iconStyle = 'solid', onPress }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <TouchableOpacity
      hasTVPreferredFocus={hasTVPreferredFocus}
      activeOpacity={1}
      onFocus={handleFocus}
      onPress={onPress}
      onBlur={handleBlur}
      style={[styles.container, isFocused && styles.containerFocused]}
    >
      <View style={styles.menuItem}>
        <FontAwesome6 style={styles.icon} color={isFocused ? 'black' : 'white'} name={icon as any} size={size} iconStyle={iconStyle as any} />
        { label && label?.length > 0 && (
          <Text style={[styles.label, isFocused && styles.labelFocused]}>{label}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    margin: 5,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    alignSelf: 'flex-start',
  },
  containerFocused: {
    backgroundColor: '#fff',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    height: 40,
  },
  icon: {
    marginRight: 0,
  },
  label: {
    marginLeft: 7,
    color: '#fff',
    fontSize: 18,
  },
  labelFocused: {
    color: '#000',
  },
});

export default ActionButton;
