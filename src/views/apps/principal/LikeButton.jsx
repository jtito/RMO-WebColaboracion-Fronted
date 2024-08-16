import React, { useState } from 'react'

import Button from '@mui/material/Button'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import Badge from '@mui/material/Badge'

const LikeButton = ({ count }) => {
  const [likes, setlikes] = useState(count)

  const handleDislike = () => {
    setlikes(likes + 1)
  }

  return (
    <Button onClick={handleDislike} color='primary' startIcon={<ThumbUpIcon />}>
      {likes}
    </Button>
  )
}

export default LikeButton
