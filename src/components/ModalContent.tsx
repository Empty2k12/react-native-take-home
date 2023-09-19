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
    <View style={styles.container}>
      <View style={styles.modalContent}>
        <TouchableOpacity onPress={completedOnpress} style={styles.modalOption}>
          <ResponsiveText
            text={'Completed Tasks'}
            style={styles.modalOptionText}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={inCompletedOnPress}
          style={styles.modalOption}>
          <ResponsiveText
            text={'Incompleted Tasks'}
            style={styles.modalOptionText}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={allTaskOnpress} style={styles.cancelButton}>
        <ResponsiveText text={'Cancel'} style={styles.modalOptionText} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: wp(4),
    backgroundColor: 'transparent',
    alignSelf: 'flex-end',
    paddingVertical: wp(1),
  },
  modalContent: {
    height: hp(12),
    width: wp(97),
    borderRadius: wp(4),
    backgroundColor: 'white',
    alignSelf: 'flex-end',
  },
  modalOption: {
    height: hp(6),
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: 'grey',
    borderBottomWidth: wp(0.1),
  },
  cancelButton: {
    height: hp(6),
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: 'white',
    borderRadius: wp(4),
    marginTop: wp(4),
  },
  modalOptionText: {
    fontSize: typography.size_normal,
    fontWeight: '500',
  },
});

export default ModalContent;
