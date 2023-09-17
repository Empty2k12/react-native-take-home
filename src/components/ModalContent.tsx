import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {typography} from '../helpers/Typograpgy';
import ResponsiveText from './ResponsiveText';

interface ModalContentProps {
  completedOnpress: () => void;
  inCompletedOnPress: () => void;
  allTaskOnpress: () => void;
}

const ModalContent: React.FC<ModalContentProps> = ({
  completedOnpress,
  inCompletedOnPress,
  allTaskOnpress,
}) => {
  return (
    <View style={styles.modalContent}>
      <TouchableOpacity onPress={completedOnpress} style={styles.modalOption}>
        <ResponsiveText
          text={'Completed Tasks'}
          style={styles.modalOptionText}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={inCompletedOnPress} style={styles.modalOption}>
        <ResponsiveText
          text={'Incompleted Tasks'}
          style={styles.modalOptionText}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={allTaskOnpress} style={styles.modalOption}>
        <ResponsiveText text={'Cancel'} style={styles.modalOptionText} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    height: hp(20),
    width: wp(100),
    borderRadius: wp(4),
    backgroundColor: 'white',
    alignSelf: 'flex-end',
  },
  modalOption: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: wp(0.15),
  },
  modalOptionText: {
    fontSize: typography.size_normal,
    fontWeight: '500',
  },
});

export default ModalContent;
