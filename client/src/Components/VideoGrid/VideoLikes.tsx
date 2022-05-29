import { Box, Flex } from '@chakra-ui/react'
import { useState } from 'react'
import { Like } from '../../types'
import UserLikes from '../../Utils/UserLikes'
import LikeButton from './LikeButton'

type Props = {
  id: number
  rating: number
  userLikes: UserLikes
  likes: Like[]
  setLikes: (likes:Like[]) => void
}

const VideoLikes = ({
  id, rating, userLikes, likes, setLikes,
}: Props):JSX.Element => {
  const [userLike, setUserLike] = useState<number | undefined>(likes.find((l) => l.id === id)?.like);
  const likeHandler = () => {
    if (userLike === 1) {
      userLikes.deleteLike(id);
    } else {
      userLikes.addLike(id);
    }
    setLikes(userLikes.likes)
    setUserLike(userLike === 1 ? 0 : 1)
  }
  const dislikeHandler = () => {
    if (userLike === -1) {
      userLikes.deleteLike(id);
    } else {
      userLikes.addDislike(id);
    }
    setLikes(userLikes.likes)
    setUserLike(userLike === -1 ? 0 : -1)
  }
  return (
    <Flex align='center' justify='center' gap='2' mt='2'>
        <Box as='span' cursor='pointer' onClick={likeHandler}>
            <LikeButton type='like' state={userLike === 1 ? 'pressed' : 'unpressed'}/>
        </Box>
        {rating}
        <Box as='span' cursor='pointer' onClick={dislikeHandler}>
            <LikeButton type='dislike' state={userLike === -1 ? 'pressed' : 'unpressed'}/>
        </Box>
    </Flex>
  )
}

export default VideoLikes
