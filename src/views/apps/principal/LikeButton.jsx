
import React from 'react';

import Button from '@mui/material/Button';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Badge from '@mui/material/Badge';

const LikeButton = ({ count }) => {
  return (
    <Button variant="text" startIcon={
      <Badge badgeContent={count} color="primary">
        <ThumbUpIcon />
      </Badge>
    }>
      
    </Button>
  );
};

export default LikeButton;
