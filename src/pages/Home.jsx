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
  Badge
} from "@chakra-ui/react";
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
          <Text fontSize="xl">
            Visualisation et analyse des données de stabilité des nanoparticules
          </Text>
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

        {/* Aperçu des batches */}
        <Box>
          <Heading as="h2" size="lg" mb={4} color={headingColor}>
            Aperçu des batches
          </Heading>
          
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            {batches.map(batch => {
              const weeks = getWeeks(batch);
              const lastWeek = weeks[weeks.length - 1];
              
              return (
                <Card key={batch} bg={cardBg} boxShadow="md" borderRadius="lg">
                  <CardHeader pb={0}>
                    <HStack justifyContent="space-between">
                      <Heading size="md" color={headingColor}>Batch {batch}</Heading>
                      <Badge colorScheme="teal" fontSize="0.9em" borderRadius="full" px={3} py={1}>
                        {weeks.length} semaines
                      </Badge>
                    </HStack>
                  </CardHeader>
                  <CardBody>
                    <VStack align="stretch" spacing={3}>
                      <Text>
                        Dernière semaine de tests: <Badge colorScheme="blue">Semaine {lastWeek}</Badge>
                      </Text>
                      <Text>
                        Buffers disponibles: {Object.keys(data[batch][lastWeek]).length}
                      </Text>
                      <HStack wrap="wrap" spacing={2}>
                        {Object.keys(data[batch][lastWeek]).slice(0, 3).map(buffer => (
                          <Badge key={buffer} colorScheme="purple" variant="outline">
                            {buffer}
                          </Badge>
                        ))}
                        {Object.keys(data[batch][lastWeek]).length > 3 && (
                          <Badge colorScheme="purple" variant="outline">
                            +{Object.keys(data[batch][lastWeek]).length - 3} autres
                          </Badge>
                        )}
                      </HStack>
                    </VStack>
                  </CardBody>
                </Card>
              );
            })}
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
