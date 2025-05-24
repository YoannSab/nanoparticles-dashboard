import { useEffect, useState } from 'react';
import { 
  Box, 
  Grid, 
  VStack, 
  Heading, 
  Text, 
  Image, 
  Stat, 
  StatLabel, 
  StatNumber, 
  StatGroup, 
  Tabs, 
  TabList, 
  TabPanels, 
  Tab, 
  TabPanel,
  Badge
} from "@chakra-ui/react";
import { useData } from "../context/DataContext";
import CellViewer from './CellViewer';
import TestChart from './TestChart';
import ComparisonChart from './ComparisonChart';
import ImageViewer from './ImageViewer';

// Composant pour afficher une valeur de test avec unité
const TestValue = ({ label, value, unit = "" }) => {
  return (
    <Stat>
      <StatLabel>{label}</StatLabel>
      <StatNumber>{typeof value === 'number' && value < 0.001 ? value.toExponential(2) : value} {unit}</StatNumber>
    </Stat>
  );
};

const Dashboard = () => {
  const { 
    selectedBatch, 
    selectedWeek, 
    selectedBuffer, 
    selectedTest,
    getSelectedData,
  } = useData();

  const [data, setData] = useState(null);

  useEffect(() => {
    setData(getSelectedData());
  }, [selectedBatch, selectedWeek, selectedBuffer, selectedTest, getSelectedData]);

  const cardBg = 'white';
  const headingColor = 'teal.700';

  if (!data) {
    return (
      <Box p={6}>
        <Text>Aucune donnée disponible pour la sélection actuelle</Text>
      </Box>
    );
  }

  if (selectedTest === 'Cellules') {
    return <CellViewer data={data} />;
  }

  // Style de carte pour chaque section
  const cardStyle = {
    bg: cardBg,
    boxShadow: 'md',
    borderRadius: 'lg',
    p: 5,
  };

  // Déterminez quelles unités utiliser pour chaque test
  const getUnits = () => {
    switch(selectedTest) {
      case 'UVVIS':
        return {
          c_avg: 'particules/mL',
          c_peak: 'particules/mL',
          perc_quality: '%'
        };
      case 'DLS':
        return {
          'Z-AVG': 'nm',
          'PolyDis': ''
        };
      case 'ELISA':
        return {
          positive: 'DO',
          negative: 'DO',
          control1: 'DO',
          control2: 'DO'
        };
      default:
        return {};
    }
  };

  const units = getUnits();

  return (
    <Box p={6}>
      <VStack spacing={6} align="stretch">
        {/* Informations sur la sélection en cours */}
        <Box {...cardStyle}>
          <Heading size="md" mb={4} color={headingColor}>
            {selectedTest} - Test détails
          </Heading>
          <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }} gap={6}>
            <Box>
              <Badge colorScheme="teal" mb={1}>Batch</Badge>
              <Text fontWeight="bold">{selectedBatch}</Text>
            </Box>
            <Box>
              <Badge colorScheme="blue" mb={1}>Semaine</Badge>
              <Text fontWeight="bold">{selectedWeek}</Text>
            </Box>
            <Box>
              <Badge colorScheme="purple" mb={1}>Buffer</Badge>
              <Text fontWeight="bold">{selectedBuffer}</Text>
            </Box>
          </Grid>
        </Box>

        {/* Affichage des valeurs de test */}
        <Box {...cardStyle}>
          <Heading size="md" mb={4} color={headingColor}>
            Valeurs du test
          </Heading>
          
          <StatGroup>
            {Object.entries(data)
              .filter(([key]) => key !== 'file')
              .map(([key, value]) => (
                <TestValue 
                  key={key} 
                  label={key} 
                  value={value} 
                  unit={units[key] || ''} 
                />
              ))
            }
          </StatGroup>
        </Box>        {/* Affichage de l'image si elle existe */}
        {data.file && typeof data.file === 'string' ? (
          <Box {...cardStyle}>
            <Heading size="md" mb={4} color={headingColor}>
              Visuel
            </Heading>            
            <Box textAlign="center">
              <ImageViewer 
                src={`./${data.file}`} 
                alt={`${selectedTest} - Batch ${selectedBatch}, Semaine ${selectedWeek}, ${selectedBuffer}`} 
                maxH="500px"
              />
            </Box>
          </Box>
        ) : data.file && typeof data.file === 'object' && data.file.path ? (
          <Box {...cardStyle}>
            <Heading size="md" mb={4} color={headingColor}>
              Visuel
            </Heading>            
            <Box textAlign="center">
              <ImageViewer 
                src={`./${data.file.path}`} 
                alt={`${selectedTest} - Batch ${selectedBatch}, Semaine ${selectedWeek}, ${selectedBuffer}`} 
                maxH="500px"
              />
            </Box>
          </Box>
        ) : null}

        {/* Onglets pour l'analyse supplémentaire */}
        <Box {...cardStyle}>
          <Tabs colorScheme="teal" variant="enclosed">
            <TabList>
              <Tab>Suivi dans le temps</Tab>
              <Tab>Comparaison des buffers</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <TestChart testType={selectedTest} />
              </TabPanel>
              <TabPanel>
                <ComparisonChart testType={selectedTest} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </VStack>
    </Box>
  );
};

export default Dashboard;
