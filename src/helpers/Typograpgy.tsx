import { RFPercentage } from 'react-native-responsive-fontsize';

export const typography = {
  size_normal: RFPercentage(1.7) as number,
  title: RFPercentage(2.8) as number,
} as const;

type TypographyType = typeof typography;

export type { TypographyType };
