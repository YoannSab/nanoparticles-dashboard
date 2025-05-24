import { 
  Box, 
  Heading, 
  Text, 
  SimpleGrid, 
  Stat, 
  StatLabel, 
  StatNumber, 
  StatHelpText,
  Container,
  Alert,
  AlertIcon,
  VStack,
  HStack,
  Card,
  CardHeader,
  CardBody,
  Badge,
  Button,
  Flex,
  Icon
} from "@chakra-ui/react";
import { Link as RouterLink } from 'react-router-dom';
import { HiChartBar, HiTrendingUp } from 'react-icons/hi';
import { useData } from "../context/DataContext";

const Home = () => {
  const { 
    data, 
    loading, 
    error,
    getBatches,
    getWeeks,
  } = useData();

  const batches = getBatches();
  
  const headingColor = 'teal.700';
  const cardBg = 'white';

  if (loading) {
    return (
      <Box p={10} textAlign="center">
        <Text fontSize="xl">Chargement des données...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={10}>
        <Alert status="error">
          <AlertIcon />
          Erreur: {error}
        </Alert>
      </Box>
    );
  }

  // Calculer les statistiques globales
  const calculateStats = () => {
    let totalTests = 0;
    let totalBuffers = 0;
    let totalWeeks = 0;
    
    if (!data) return { totalTests, totalBuffers, totalWeeks };
    
    batches.forEach(batch => {
      const weeks = getWeeks(batch);
      totalWeeks += weeks.length;
      
      weeks.forEach(week => {
        const buffers = Object.keys(data[batch][week]);
        totalBuffers += buffers.length;
        
        buffers.forEach(buffer => {
          // Compter les tests sauf "Cellules" qui est un cas spécial
          const tests = Object.keys(data[batch][week][buffer]).filter(t => t !== "Cellules");
          totalTests += tests.length;
          
          // Pour "Cellules", compter chaque type de cellule comme un test
          if (data[batch][week][buffer]["Cellules"]) {
            const cellTypes = Object.keys(data[batch][week][buffer]["Cellules"]);
            totalTests += cellTypes.length;
          }
        });
      });
    });
    
    return { totalTests, totalBuffers, totalWeeks };
  };
  
  const stats = calculateStats();

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">        
        <Box textAlign="center" py={10}>
          <Heading as="h1" size="2xl" mb={4} color={headingColor}>
            Dashboard Nanoparticules
          </Heading>
          <Text fontSize="xl" mb={8}>
            Visualisation et analyse des données de stabilité des nanoparticules
          </Text>
          
          <Flex justify="center" gap={6} mb={8}>
            <Button 
              as={RouterLink} 
              to="/dashboard" 
              size="lg" 
              colorScheme="teal" 
              leftIcon={<Icon as={HiChartBar} />}
              px={8}
            >
              Consulter le Dashboard
            </Button>
          </Flex>
        </Box>

        {/* Statistiques globales */}
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={6}>
          <Stat bg={cardBg} p={5} borderRadius="lg" boxShadow="md" textAlign="center">
            <StatLabel fontSize="lg">Batches</StatLabel>
            <StatNumber fontSize="4xl" color="teal.500">{batches.length}</StatNumber>
          </Stat>
          
          <Stat bg={cardBg} p={5} borderRadius="lg" boxShadow="md" textAlign="center">
            <StatLabel fontSize="lg">Semaines de tests</StatLabel>
            <StatNumber fontSize="4xl" color="blue.500">{stats.totalWeeks}</StatNumber>
          </Stat>
          
          <Stat bg={cardBg} p={5} borderRadius="lg" boxShadow="md" textAlign="center">
            <StatLabel fontSize="lg">Buffers analysés</StatLabel>
            <StatNumber fontSize="4xl" color="purple.500">{stats.totalBuffers}</StatNumber>
          </Stat>
          
          <Stat bg={cardBg} p={5} borderRadius="lg" boxShadow="md" textAlign="center">
            <StatLabel fontSize="lg">Tests effectués</StatLabel>
            <StatNumber fontSize="4xl" color="green.500">{stats.totalTests}</StatNumber>
          </Stat>
        </SimpleGrid>

        {/* Dosages en calixarène */}
        <Box bg={cardBg} p={6} borderRadius="lg" boxShadow="md">
          <Heading as="h2" size="md" mb={4} color={headingColor}>
            Dosages en calixarène par batch
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
            <Box p={3} borderWidth="1px" borderRadius="md" textAlign="center">
              <Heading size="sm" mb={2}>Batch 1</Heading>
              <Text fontWeight="medium">1 X Calix</Text>
            </Box>
            <Box p={3} borderWidth="1px" borderRadius="md" textAlign="center">
              <Heading size="sm" mb={2}>Batch 2</Heading>
              <Text fontWeight="medium">2 X Calix</Text>
            </Box>
            <Box p={3} borderWidth="1px" borderRadius="md" textAlign="center">
              <Heading size="sm" mb={2}>Batch 3</Heading>
              <Text fontWeight="medium">1,5 X Calix</Text>
            </Box>
          </SimpleGrid>
        </Box>
        
        {/* Informations sur les Buffers */}
        <Box bg={cardBg} p={6} borderRadius="lg" boxShadow="md">
          <Heading as="h2" size="md" mb={4} color={headingColor}>
            Composition des Buffers
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            <Box p={3} borderWidth="1px" borderRadius="md">
              <Text fontWeight="bold">Buffer 1</Text>
              <Text>Potassium Phosphate 5 mM + 0.1 % Tween 20 pH 7,2 (PPT7)</Text>
            </Box>
            <Box p={3} borderWidth="1px" borderRadius="md">
              <Text fontWeight="bold">Buffer 2</Text>
              <Text>PPT7 + 0.02 % Proclin 300</Text>
            </Box>
            <Box p={3} borderWidth="1px" borderRadius="md">
              <Text fontWeight="bold">Buffer 3</Text>
              <Text>PPT7 + 0.02 % Sodium Azide + 0.05 % BSA</Text>
            </Box>
            <Box p={3} borderWidth="1px" borderRadius="md">
              <Text fontWeight="bold">Buffer 4</Text>
              <Text>PPT7 + 0.02 % Sodium Azide</Text>
            </Box>
            <Box p={3} borderWidth="1px" borderRadius="md">
              <Text fontWeight="bold">Buffer 5</Text>
              <Text>PPT7 + 0.1 % BSA</Text>
            </Box>
            <Box p={3} borderWidth="1px" borderRadius="md">
              <Text fontWeight="bold">Calix</Text>
              <Text>Calixarène (avant bioconjugaison)</Text>
            </Box>
          </SimpleGrid>
        </Box>

              {/* Instructions */}
        <Box bg={cardBg} p={6} borderRadius="lg" boxShadow="md">
          <Heading as="h2" size="md" mb={4} color={headingColor}>
            Comment utiliser ce dashboard
          </Heading>
          <VStack align="stretch" spacing={3}>
            <Text>
              1. Utilisez la barre de navigation en haut pour sélectionner un batch, une semaine, un buffer et un type de test.
            </Text>
            <Text>
              2. Visualisez les résultats détaillés et les images associées au test sélectionné.
            </Text>
            <Text>
              3. Utilisez les onglets pour comparer l'évolution des paramètres dans le temps ou entre différents buffers.
            </Text>
            <Text>
              4. Pour visualiser les images des cellules, sélectionnez "Cellules" dans le menu déroulant des tests.
            </Text>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default Home;
