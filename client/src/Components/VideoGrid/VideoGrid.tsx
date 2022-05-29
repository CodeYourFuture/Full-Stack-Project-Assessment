import { useEffect, useState } from 'react';
import {
  Center,
  Grid,
  Spinner,
} from '@chakra-ui/react';
import useFetch from '../../Hooks/useFetch';
import { Video } from '../../types';
import VideoCard from './VideoCard';
import UserLikes from '../../Utils/UserLikes';

type Props = {}

const VideoGrid = (props: Props) => {
  const userLikes:UserLikes = new UserLikes();
  const [likes, setLikes] = useState(userLikes.likes);
  useEffect(() => {
    setLikes(userLikes.likes)
  }, [userLikes.likes])
  const API_URL = process.env.REACT_APP_API_URL || '';
  const { data: videos, loading } = useFetch<Video>(API_URL);
  if (loading) {
    return <Center><Spinner size='2xl'/></Center>;
  }
  return (
    <Grid mt='5' templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)']} gap={6}>
        {videos && videos.map((video: Video) => <VideoCard key={video.id} video={video} userLikes={userLikes} likes={likes} setLikes={setLikes}/>)}
    </Grid>
  )
}

export default VideoGrid;
