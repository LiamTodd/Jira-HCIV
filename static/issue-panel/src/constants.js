export const PREDICT_FUNCTION_KEY = 'predict';
export const APP_USAGE = 'app-usage';
export const INCLUSIVENESS = 'inclusiveness';
export const USER_REACTION = 'user-reaction';
export const NON_HUMAN_CENTRIC = 'non-human-centric';
export const APP_USAGE_COLOUR = '#3d5a80';
export const INCLUSIVENESS_COLOUR = '#98c1d9';
export const USER_REACTION_COLOUR = '#293241';
export const NON_HUMAN_CENTRIC_COLOUR = '#ee6c4d';
const WHITE = 'white';
const BLACK = 'black';
export const THEME_COLOURS_DICT = {};
THEME_COLOURS_DICT[APP_USAGE] = { background: APP_USAGE_COLOUR, text: WHITE };
THEME_COLOURS_DICT[INCLUSIVENESS] = {
  background: INCLUSIVENESS_COLOUR,
  text: BLACK,
};
THEME_COLOURS_DICT[USER_REACTION] = {
  background: USER_REACTION_COLOUR,
  text: WHITE,
};
THEME_COLOURS_DICT[NON_HUMAN_CENTRIC] = {
  background: NON_HUMAN_CENTRIC_COLOUR,
  text: WHITE,
};
