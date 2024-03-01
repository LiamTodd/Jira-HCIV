import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  IconButton,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import React, { useState } from 'react';
import { cleanLabel } from '../utils/stringUtils';

function ProportionKeyStats({ proportion, proportionCategorised }) {
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card
      variant='outlined'
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardContent>
        <Typography variant='h3'>{proportion.toFixed(1)}%</Typography>
        <Box display='flex' alignItems='center'>
          <Typography variant='caption'>
            of issues are{' '}
            <Typography variant='body1' display='inline'>
              human-centric
            </Typography>
          </Typography>
          <CardActions>
            <IconButton
              onClick={handleExpandClick}
              sx={{
                transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s',
              }}
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
        </Box>

        <Collapse in={expanded} timeout='auto' unmountOnExit>
          <Typography variant='subtitle1'>By Category</Typography>
          {Object.entries(proportionCategorised).map((entry) => {
            return (
              <Box display='flex' justifyContent='space-between' width='100%'>
                <Typography variant='caption'>
                  {cleanLabel(entry[0])}
                </Typography>
                <Typography variant='caption'>
                  {entry[1].toFixed(1)}%
                </Typography>
              </Box>
            );
          })}
        </Collapse>
      </CardContent>
    </Card>
  );
}

export default ProportionKeyStats;
