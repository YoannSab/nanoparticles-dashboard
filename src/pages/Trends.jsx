import { Box, Container } from '@chakra-ui/react';
import TrendAnalyzer from '../components/TrendAnalyzer';

const Trends = () => {
  return (
    <Container maxW="container.xl" py={8}>
      <Box>
        <TrendAnalyzer />
      </Box>
    </Container>
  );
};

export default Trends;
