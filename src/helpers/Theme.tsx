export const Colors = {
  header_color: '#2A5C99',
  header_font_color: 'white',
  todo_card_color: '#fff',
  statusbar_color: '#2A5C99',
  loader_color: 'grey',
} as const;

type ColorsType = typeof Colors;

export type {ColorsType};
