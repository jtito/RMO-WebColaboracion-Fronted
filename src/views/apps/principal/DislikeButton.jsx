import { useState } from 'react'

import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import { Button } from '@mui/material'

const DislikeButton = ({ count }) => {
  const [dislikes, setDislikes] = useState(count)

  const handleDislike = () => {
    setDislikes(dislikes + 1)
  }

  return (
    <Button onClick={handleDislike} startIcon={<ThumbDownIcon />}>
      {dislikes}
    </Button>
  )
}

export default DislikeButton
