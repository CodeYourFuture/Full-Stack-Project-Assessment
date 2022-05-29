import {
  ChakraProvider,
  Box,
  Grid,
  theme,
} from '@chakra-ui/react';
import Header from './Components/Header/Header';
import VideoGrid from './Components/VideoGrid/VideoGrid';

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <Header />
        <VideoGrid />
      </Grid>
    </Box>
  </ChakraProvider>
);
