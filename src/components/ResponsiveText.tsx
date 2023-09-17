import React from 'react';
import {Text, TextStyle} from 'react-native';
import {typography} from '../helpers/Typograpgy';

interface ResponsiveTextProps {
  text: string;
  style?: TextStyle;
  elipsisWidth?: number;
  Colors?: any;
  onPress?: () => void;
  numberOfLines?: number;
}

const ResponsiveText: React.FC<ResponsiveTextProps> = ({
  text,
  style,
  elipsisWidth,
  onPress,
  numberOfLines,
}) => {
  return (
    <Text
      ellipsizeMode={elipsisWidth ? 'tail' : undefined}
      allowFontScaling={false}
      numberOfLines={elipsisWidth ? 1 : numberOfLines}
      onPress={onPress}
      style={[
        {
          maxWidth: elipsisWidth ? elipsisWidth : undefined,
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
