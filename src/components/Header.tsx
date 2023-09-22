import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { typography } from '../helpers/Typograpgy';
import FilterIcon from 'react-native-vector-icons/Feather';
import TodoListIcon from 'react-native-vector-icons/Octicons';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { Colors } from '../helpers/Theme';
import ResponsiveText from './ResponsiveText';

interface HeaderProps {
  title: string;
  filterStatus: string;
  filterOnPress: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, filterStatus, filterOnPress }) => {
  return (
    <View style={styles.header}>
      <TodoListIcon name={'checklist'} size={26} color={'white'} />
      <ResponsiveText style={styles.title} text={title} />
      <TouchableOpacity onPress={filterOnPress}>
        {['Completed', 'Incompleted'].includes(filterStatus) && (
          <View style={styles.filterDot}></View>
        )}

        <FilterIcon name={'filter'} size={24} style={styles.filterIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(4.5),
    backgroundColor: Colors.header_color,
    height: hp(10),
  },
  title: {
    paddingVertical: wp(2),
    paddingHorizontal: wp(2),
    fontSize: typography.title,
    fontWeight: '700',
    color: Colors.header_font_color,
  },
  filterIcon: {
    color: Colors.header_font_color,
  },
  filterDot: {
    width: wp(2.7),
    height: wp(2.7),
    borderRadius: wp(5),
    backgroundColor: 'yellow',
    position: 'absolute',
    left: wp(3.81),
    bottom: wp(3.8),
  },
});

export default Header;
