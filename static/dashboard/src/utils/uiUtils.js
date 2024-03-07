import { Chip } from '@mui/material';
import { THEME_COLOURS_DICT_FINE } from '../constants';

export const generateCategoryChips = (data) => {
  if (data) {
    return Object.keys(data).map((category) => {
      if (data[category]) {
        return (
          <Chip
            label={category}
            sx={{
              backgroundColor: THEME_COLOURS_DICT_FINE[category].background,
              color: THEME_COLOURS_DICT_FINE[category].text,
              marginRight: '1vw',
              marginBottom: '1vh',
            }}
          />
        );
      }
      return null;
    });
  }
};
