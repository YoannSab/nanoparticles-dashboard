import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Container,
  Alert,
  AlertIcon,
  VStack,
  Button,
  Flex,
  Icon,
  Divider,
  Image,
} from "@chakra-ui/react";
import { Link as RouterLink } from 'react-router-dom';
import { HiChartBar } from 'react-icons/hi';
import { useData } from "../context/DataContext";

const Home = () => {
  const {
    loading,
    error,
    getBatches,
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

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center" py={10}>
          {/* Header */}
          <Heading as="h1" size="xl" mb={5} color={headingColor}>
            Nanoparticules d'Or Fonctionnalisées <br />pour le Diagnostic du Cancer du Sein
          </Heading>
          <Divider mb={8} />
          <Text fontSize="lg" textAlign="center" mb={8}>
            Résultats de la maîtrise de recherche de Charline Courbon
          </Text>

          {/* Logos */}
          <VStack spacing={4} align="center">
            <Flex justify="center" gap={16} mb={10}>
              <Image
                src="./polymtl.png"
                alt="Polytechnique Montréal"
                height="100px"
                objectFit="contain"
              />
              <Image
                src="./lp2l.png"
                alt="Laboratoire LP2L"
                height="100px"
                objectFit="contain"
              />
            </Flex>
            <Button
                  as={RouterLink}
                  to="/dashboard"
                  size="xl"
                  colorScheme="teal"
                  leftIcon={<Icon as={HiChartBar} boxSize={8} />}
                  px={10}
                  py={7}
                  fontSize={25}
                >
              Consulter le Dashboard
            </Button>
          </VStack>
        </Box>

        {/* Statistiques globales */}
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={6}>
          <Stat bg={cardBg} p={5} borderRadius="lg" boxShadow="md" textAlign="center">
            <StatLabel fontSize="lg">Batches</StatLabel>
            <StatNumber fontSize="4xl" color="teal.500">{batches.length}</StatNumber>
          </Stat>

          <Stat bg={cardBg} p={5} borderRadius="lg" boxShadow="md" textAlign="center">
            <StatLabel fontSize="lg">Semaines de tests</StatLabel>
            <StatNumber fontSize="4xl" color="blue.500">{6}</StatNumber>
          </Stat>

          <Stat bg={cardBg} p={5} borderRadius="lg" boxShadow="md" textAlign="center">
            <StatLabel fontSize="lg">Buffers analysés</StatLabel>
            <StatNumber fontSize="4xl" color="purple.500">{6}</StatNumber>
          </Stat>

          <Stat bg={cardBg} p={5} borderRadius="lg" boxShadow="md" textAlign="center">
            <StatLabel fontSize="lg">Tests effectués</StatLabel>
            <StatNumber fontSize="4xl" color="green.500">{648}</StatNumber>
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
