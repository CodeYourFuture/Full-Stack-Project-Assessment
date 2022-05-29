import { GridItem, Heading } from '@chakra-ui/react'
import ReactPlayer from 'react-player'
import { Like, Video } from '../../types'
import UserLikes from '../../Utils/UserLikes'
import VideoLikes from './VideoLikes'

type Props = {
  video: Video
  userLikes: UserLikes
  likes: Like[]
  setLikes: (likes:Like[]) => void
}

const VideoCard = ({
  video, userLikes, likes, setLikes,
}: Props) => (
    <GridItem>
        <Heading as='h4' size='md'>{video.title}</Heading>
        <ReactPlayer url={video.vurl} width='100%'/>
        <VideoLikes id={video.id} userLikes={userLikes} rating={video.rating} likes={likes} setLikes={setLikes}/>
    </GridItem>
)

export default VideoCard
