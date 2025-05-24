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
  Badge,
  HStack,
  Select,
  Flex,
  StatArrow,
  StatHelpText,
  SimpleGrid
} from "@chakra-ui/react";
import { useData } from "../context/DataContext";
import CellViewer from './CellViewer';
import TestChart from './TestChart';
import ComparisonChart from './ComparisonChart';
import ImageViewer from './ImageViewer';

// Composant pour afficher une valeur de test avec unité
const TestValue = ({ label, value, unit = "" }) => {
  // Format scientific notation for small and large numbers
  const formatValue = (val) => {
    // Handle undefined or null
    if (val === undefined || val === null) return '';
    
    // If not a primitive value (object/array), convert to string representation or return placeholder
    if (typeof val === 'object') return '[Object]';
    
    // Handle numbers specially
    if (typeof val === 'number') {
      const absVal = Math.abs(val);
      if (absVal < 0.001 || absVal > 10000) {
        return val.toExponential(2);
      }
      
      // For regular numbers, limit to 3 significant digits
      return Number(val.toPrecision(3));
    }
    
    // For string values just return as is
    return val;
  };

  return (
    <Stat>
      <StatLabel>{label}</StatLabel>
      <StatNumber>{formatValue(value)} {unit}</StatNumber>
    </Stat>
  );
};

// Composant pour afficher les statistiques de changement
const ChangeStats = ({ testType }) => {
  const { 
    selectedBatch, 
    selectedBuffer, 
    calculateChangeStats,
    getTestParameters
  } = useData();
  
  const parameters = getTestParameters(testType);
  const cardBg = 'white';

  // Format scientific notation for small and large numbers
  const formatValue = (val) => {
    if (val === undefined || val === null) return '';
    
    if (typeof val === 'number') {
      const absVal = Math.abs(val);
      if (absVal < 0.001 || absVal > 10000) {
        return val.toExponential(2);
      }
      return Number(val.toPrecision(3));
    }
    
    return val;
  };

  return (
    <SimpleGrid columns={{ base: 1, md: 4 }} spacing={4}>
      {parameters.map(param => {
        const stats = calculateChangeStats(selectedBatch, selectedBuffer, testType, param.key);
        
        // Skip if we don't have valid stats
        if (stats.initialValue === null || stats.currentValue === null) return null;
        
        return (
          <Box key={param.key} p={3} bg={cardBg} borderRadius="md" boxShadow="sm">
            <Stat>
              <StatLabel fontWeight="medium">{param.label}</StatLabel>
              <StatNumber fontSize="lg">
                {stats.trend !== 'stable' && (
                  <StatArrow 
                    type={stats.trend === 'increase' ? 'increase' : 'decrease'} 
                  />
                )}
                {Math.abs(stats.percentage).toFixed(1)}%
              </StatNumber>
              <StatHelpText fontSize="sm">
                {formatValue(stats.initialValue)} → {formatValue(stats.currentValue)} {param.unit}
              </StatHelpText>
              <Badge 
                colorScheme={
                  stats.trend === 'increase' ? 'green' : 
                  stats.trend === 'decrease' ? 'red' : 'gray'
                }
                mt={1}
              >
                {stats.trend === 'increase' ? 'Augmentation' : 
                 stats.trend === 'decrease' ? 'Diminution' : 'Stable'}
              </Badge>
            </Stat>
          </Box>
        );
      })}
    </SimpleGrid>
  );
};

const Dashboard = () => {
  const { 
    selectedBatch, 
    setSelectedBatch,
    selectedWeek, 
    setSelectedWeek,
    selectedBuffer, 
    setSelectedBuffer,
    selectedTest,
    setSelectedTest,
    getSelectedData,
    getBatches,
    getWeeks,
    getBuffers,
    getTests
  } = useData();

  const [data, setData] = useState(null);
  
  const batches = getBatches();
  const weeks = getWeeks(selectedBatch);
  const buffers = getBuffers(selectedBatch, selectedWeek);
  const tests = getTests(selectedBatch, selectedWeek, selectedBuffer);

  useEffect(() => {
    setData(getSelectedData());
  }, [selectedBatch, selectedWeek, selectedBuffer, selectedTest, getSelectedData]);

  const cardBg = 'white';
  const headingColor = 'teal.700';
  
  // Selector bar styles
  const selectorBar = {
    bg: "teal.50",
    p: 4,
    borderRadius: "md",
    mb: 6,
    shadow: "sm",
  };

  // Render selector controls at the top of dashboard
  const renderSelectors = () => (
    <Box {...selectorBar}>
      <Flex direction={{ base: "column", md: "row" }} gap={4} justifyContent="center" alignItems={{ base: "stretch", md: "flex-end" }}>
        <Box>
          <Text fontSize="sm" fontWeight="medium" mb={1}>Batch</Text>
          <Select 
            value={selectedBatch} 
            onChange={(e) => setSelectedBatch(e.target.value)}
            bg="white"
            size="md"
          >
            {batches.map((batch) => (
              <option key={batch} value={batch}>
                Batch {batch}
              </option>
            ))}
          </Select>
        </Box>
        
        <Box>
          <Text fontSize="sm" fontWeight="medium" mb={1}>Semaine</Text>
          <Select 
            value={selectedWeek} 
            onChange={(e) => setSelectedWeek(e.target.value)}
            bg="white"
            size="md"
          >
            {weeks.map((week) => (
              <option key={week} value={week}>
                Semaine {week}
              </option>
            ))}
          </Select>
        </Box>
        
        <Box>
          <Text fontSize="sm" fontWeight="medium" mb={1}>Buffer</Text>
          <Select 
            value={selectedBuffer} 
            onChange={(e) => setSelectedBuffer(e.target.value)}
            bg="white"
            size="md"
          >
            {buffers.map((buffer) => (
              <option key={buffer} value={buffer}>
                {buffer}
              </option>
            ))}
          </Select>
        </Box>
        
        <Box>
          <Text fontSize="sm" fontWeight="medium" mb={1}>Test</Text>
          <Select 
            value={selectedTest} 
            onChange={(e) => setSelectedTest(e.target.value)}
            bg="white"
            size="md"
          >
            {tests.map((test) => (
              <option key={test} value={test}>
                {test}
              </option>
            ))}
          </Select>
        </Box>
      </Flex>
    </Box>
  );

  if (!data) {
    return (
      <Box p={6}>
        {renderSelectors()}
        <Text>Aucune donnée disponible pour la sélection actuelle</Text>
      </Box>
    );
  }

  if (selectedTest === 'Cellules') {
    return (
      <Box p={6}>
        {renderSelectors()}
        <CellViewer data={data} />
      </Box>
    );
  }

  // Style de carte pour chaque section
  const cardStyle = {
    bg: cardBg,
    boxShadow: 'md',
    borderRadius: 'lg',
    p: 5,
  };
  // Obtenir les paramètres du test avec leurs unités et labels
  const { getTestParameters } = useData();
  const testParameters = getTestParameters(selectedTest);
  
  // Créer un mapping des clés vers les unités et labels pour un accès facile
  const parameterMap = Object.fromEntries(
    testParameters.map(param => [param.key, { unit: param.unit, label: param.label }])
  );
  return (
    <Box p={6}>
      {renderSelectors()}
      <VStack spacing={6} align="stretch">
        {/* Informations sur la sélection en cours */}        
        <Box {...cardStyle}>
          <Heading size="md" mb={6} color={headingColor}>
            {selectedTest} - Test détails
          </Heading>
          <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }} gap={6}>
            <HStack spacing={3} align="center">
              <Badge colorScheme="teal" fontSize="xl" py={1} px={3}>Batch</Badge>
              <Text fontWeight="bold" fontSize="2xl">{selectedBatch}</Text>
            </HStack>
            <HStack spacing={3} align="center">
              <Badge colorScheme="blue" fontSize="xl" py={1} px={3}>Semaine</Badge>
              <Text fontWeight="bold" fontSize="2xl">{selectedWeek}</Text>
            </HStack>
            <HStack spacing={3} align="center">
              <Badge colorScheme="purple" fontSize="xl" py={1} px={3}>Buffer</Badge>
              <Text fontWeight="bold" fontSize="2xl">{selectedBuffer === 'calix' ? selectedBuffer : selectedBuffer.replace("buffer", "")}</Text>
            </HStack>
          </Grid>
        </Box>        {/* Affichage des valeurs de test - seulement si des valeurs existent */}
        {Object.entries(data).some(([key, value]) => 
          key !== 'file' && 
          (typeof value !== 'object' || value === null)
        ) && (
          <Box {...cardStyle}>
            <Heading size="md" mb={4} color={headingColor}>
              Valeurs du test
            </Heading>            <StatGroup>
              {Object.entries(data)
                .filter(([key, value]) => 
                  // Filter out the file key and any complex objects that aren't meant to be displayed
                  key !== 'file' && 
                  (typeof value !== 'object' || value === null)
                )
                .map(([key, value]) => (
                  <TestValue 
                    key={key} 
                    label={parameterMap[key]?.label || key} 
                    value={value} 
                    unit={parameterMap[key]?.unit || ''} 
                  />
                ))
              }
            </StatGroup>
          </Box>
        )}{/* Affichage de l'image si elle existe */}
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
        ) : null}        {/* Section de changement - affiche les statistiques d'évolution */}
        {Object.entries(data).some(([key, value]) => 
          key !== 'file' && 
          (typeof value !== 'object' || value === null)) && (
          <Box {...cardStyle}>
            <Heading size="md" mb={4} color={headingColor}>
              Évolution (Semaine 1 à Semaine 6)
            </Heading>
            <ChangeStats testType={selectedTest} />
       
            <Tabs colorScheme="teal" variant="enclosed" mt={10} align='center'>
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
        )}
      </VStack>
    </Box>
  );
};

export default Dashboard;
