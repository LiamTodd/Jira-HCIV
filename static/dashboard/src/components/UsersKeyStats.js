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

export default function UsersKeyStats({ users, usersCategorised, preText }) {
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
          {Object.entries(users).reduce(getMaxCount)[0]}
        </Typography>
        <Box display='flex'>
          <Typography variant='caption'>
            {preText}{' '}
            <Typography variant='body1' display='inline'>
              {Object.entries(users).reduce(getMaxCount)[1]}
            </Typography>{' '}
            human-centric issue
            {Object.entries(users).reduce(getMaxCount)[1] !== 1 && 's'}
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
          <CategorisedStats data={usersCategorised}></CategorisedStats>
        </Collapse>
      </CardContent>
    </Card>
  );
}
