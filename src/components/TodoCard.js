import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import ResponsiveText from './ResponsiveText';
import Icon from 'react-native-vector-icons/Octicons';
import CheckIcon from 'react-native-vector-icons/Feather';
import CrossIcon from 'react-native-vector-icons/Ionicons';

const TodoCard = ({todoListData, userName}) => {
  return (
    <View style={styles.mainView}>
      <ResponsiveText text={todoListData?.title} style={styles.todoText} />
      <View style={styles.rowWrapper}>
        <View style={styles.secondRow}>
          <Icon size={22} name={'person'} style={styles.icon} />
          <ResponsiveText text={userName} style={styles.italicText} />
        </View>
        <View style={styles.secondRow}>
          {todoListData.completed == true ? (
            <CheckIcon size={22} name={'check-circle'} style={styles.icon} />
          ) : (
            <CrossIcon size={22} name={'close'} style={styles.icon} />
          )}

          <ResponsiveText
            text={todoListData.completed == true ? 'Complete' : 'Incomplete'}
            style={styles.italicText}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    paddingHorizontal: wp(2),
    paddingVertical: wp(1),
    width: wp(94),
    backgroundColor: '#fff',
    borderColor: '#000000',
    borderWidth: 0,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    margin: 4,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    borderRadius: wp(1.5),
  },
  todoText: {
    paddingVertical: wp(2),
    fontWeight: '700',
  },
  italicText: {
    paddingVertical: wp(2),
    fontWeight: '700',
    fontStyle: 'italic',
  },
  rowWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  secondRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    paddingRight: wp(1.5),
    color: 'black',
  },
});

export default TodoCard;
