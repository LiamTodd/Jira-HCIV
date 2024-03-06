import { Chip } from '@mui/material';
import { THEME_COLOURS_DICT } from '../constants';
import { combineClassifications } from './misc';

export const generateCategoryChips = (data) => {
  return Object.keys(data).map((category) => {
    if (data[category]) {
      return (
        <Chip
          label={category}
          sx={{
            backgroundColor: THEME_COLOURS_DICT[category].background,
            color: THEME_COLOURS_DICT[category].text,
          }}
        />
      );
    }
    return null;
  });
};

export const generateCommentChips = (data) => {
  let classification = null;
  Object.entries(data)
    .filter(([key, _]) => key.startsWith('comment'))
    .forEach((comment) => {
      if (classification === null) {
        classification = comment[1].predictions;
      } else {
        classification = combineClassifications(
          classification,
          comment[1].predictions
        );
      }
    });
  return generateCategoryChips(classification);
};
