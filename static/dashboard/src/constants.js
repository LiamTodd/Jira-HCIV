export const BULK_PREDICT_FUNCTION_KEY = 'bulk-predict';
export const APP_USAGE = 'app-usage';
export const INCLUSIVENESS = 'inclusiveness';
export const USER_REACTION = 'user-reaction';
export const NON_HUMAN_CENTRIC = 'non-human-centric';
export const FIELDS_FOR_CLASSIFIER = ['summary', 'description', 'comment'];
export const ADDITIONAL_FIELDS = [
  { name: 'priority', prop: 'name' },
  { name: 'status', prop: 'name' },
  { name: 'assignee', prop: 'displayName' },
  { name: 'reporter', prop: 'displayName' },
  { name: 'created', prop: null },
];
export const DISTRIBUTION_TYPE_BAR = 'bar';
export const DISTRIBUTION_TYPE_PIE = 'pie';
export const APP_USAGE_COLOUR = '#3d5a80';
export const INCLUSIVENESS_COLOUR = '#98c1d9';
export const USER_REACTION_COLOUR = '#293241';
export const NON_HUMAN_CENTRIC_COLOUR = '#ee6c4d';
export const THEME_COLOURS_DICT = {};
THEME_COLOURS_DICT[APP_USAGE] = APP_USAGE_COLOUR;
THEME_COLOURS_DICT[INCLUSIVENESS] = INCLUSIVENESS_COLOUR;
THEME_COLOURS_DICT[USER_REACTION] = USER_REACTION_COLOUR;
THEME_COLOURS_DICT[NON_HUMAN_CENTRIC] = NON_HUMAN_CENTRIC_COLOUR;

export const DASHBOARD_BACKGROUND = '#EBECF0';
export const WHITE = 'white';
