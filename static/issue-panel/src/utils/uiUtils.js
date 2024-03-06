import { Chip, TableCell, TableRow } from '@mui/material';
import { THEME_COLOURS_DICT } from '../constants';
import { combineClassifications } from './misc';

export const generateCategoryChips = (data) => {
  if (data) {
    return Object.keys(data).map((category) => {
      if (data[category]) {
        return (
          <Chip
            label={category}
            sx={{
              backgroundColor: THEME_COLOURS_DICT[category].background,
              color: THEME_COLOURS_DICT[category].text,
              marginRight: '1vw',
            }}
          />
        );
      }
      return null;
    });
  }
};

export const generateCommentChips = (data) => {
  if (data) {
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
  }
};

export const generateCommentRows = (data) => {
  console.log(data);
  if (data) {
    return Object.entries(data)
      .filter(([key, _]) => key.startsWith('comment'))
      .map((comment) => {
        return (
          <TableRow>
            <TableCell sx={{ width: '60%', fontStyle: 'italic' }}>
              {comment[1].content}
            </TableCell>
            <TableCell>
              {generateCategoryChips(comment[1].predictions)}
            </TableCell>
          </TableRow>
        );
      });
  }
};
