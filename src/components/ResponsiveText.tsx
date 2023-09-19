import React from 'react';
import {Text, TextStyle} from 'react-native';
import {typography} from '../helpers/Typograpgy';

interface ResponsiveTextProps {
  text: string;
  style?: TextStyle;
  elipsisWidth?: number;
  Colors?: any;
  numberOfLines?: number;
}

const ResponsiveText: React.FC<ResponsiveTextProps> = ({
  text,
  style,
  elipsisWidth,

  numberOfLines,
}) => {
  return (
    <Text
      ellipsizeMode={elipsisWidth ? 'tail' : undefined}
      allowFontScaling={false}
      numberOfLines={elipsisWidth ? 1 : numberOfLines}
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
