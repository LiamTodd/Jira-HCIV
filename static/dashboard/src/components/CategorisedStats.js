import { Box, Typography } from '@mui/material';
import React from 'react';
import { getMaxCount } from '../utils/misc';
import { cleanLabel } from '../utils/stringUtils';

function CategorisedStats({ data }) {
  return (
    <>
      <Typography variant='subtitle1'>By Category</Typography>
      {Object.entries(data).map((category) => {
        if (Object.keys(category[1]).length > 0) {
          const topUser = Object.entries(category[1]).reduce(getMaxCount);
          return (
            <Box display='flex' justifyContent='space-between' width='100%'>
              <Typography variant='caption'>
                {cleanLabel(category[0])}
              </Typography>
              <Typography variant='caption'>
                {topUser[0]} : {topUser[1]} issue
                {topUser[1] !== 1 && 's'}
              </Typography>
            </Box>
          );
        }
        return null;
      })}
    </>
  );
}

export default CategorisedStats;
