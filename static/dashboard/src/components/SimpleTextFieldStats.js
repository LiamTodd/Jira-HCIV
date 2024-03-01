import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  IconButton,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { getMaxCount } from '../utils/misc';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CategorisedStats from './CategorisedStats';

function SimpleTextFieldStats({ data, dataCategorised }) {
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
        <Typography variant='h3'>
          {Object.entries(data).reduce(getMaxCount)[1]}
        </Typography>
        <Box display='flex' alignItems='center'>
          <Typography variant='caption'>
            human-centric issues have{' '}
            <Typography variant='body1' display='inline'>
              {Object.entries(data).reduce(getMaxCount)[0]}
            </Typography>{' '}
            priority
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
          <CategorisedStats data={dataCategorised}></CategorisedStats>
        </Collapse>
      </CardContent>
    </Card>
  );
}

export default SimpleTextFieldStats;
