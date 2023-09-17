import React from 'react';
import {Text} from 'react-native';
import {typography} from '../helpers/Typograpgy';

const ResponsiveText = ({
  text,
  style,
  elipsisWidth,
  Colors,
  onPress,
  numberOfLines,
}) => {
  return (
    <Text
      ellipsizeMode={elipsisWidth ? 'tail' : undefined}
      allowFontScaling={false}
      numberOfLines={elipsisWidth ? 1 : null}
      onPress={onPress}
      style={[
        {
          maxWidth: elipsisWidth ? elipsisWidth : null,
          color: 'black',
          fontSize: typography.size_normal,
        },
        style,
      ]}>
      {text}
    </Text>
  );
};

export default ResponsiveText;
