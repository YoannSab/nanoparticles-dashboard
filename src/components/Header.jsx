import { 
  Box, 
  Flex, 
  Heading, 
  HStack,
  Link as ChakraLink
} from "@chakra-ui/react";
import { Link } from 'react-router-dom';

const Header = () => {
  const bg = 'teal.800';
  const textColor = 'white';
  
  return (
    <Box bg={bg} px={6} py={3} shadow="md" position="sticky" top="0" zIndex={10}>
      <Flex justifyContent="space-between" alignItems="center">
        <ChakraLink as={Link} to="/" _hover={{ textDecoration: 'none' }}>
          <Heading as="h1" size="lg" color={textColor}>
            Nanoparticules Dashboard
          </Heading>
        </ChakraLink>
        
        <HStack spacing={6}>
          <ChakraLink as={Link} to="/" color="white" fontWeight="medium">Accueil</ChakraLink>
          <ChakraLink as={Link} to="/dashboard" color="white" fontWeight="medium">Dashboard</ChakraLink>
          <ChakraLink as={Link} to="/about" color="white" fontWeight="medium">À propos</ChakraLink>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;
