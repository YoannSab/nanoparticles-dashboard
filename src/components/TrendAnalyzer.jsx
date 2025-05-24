import { useState } from 'react';
import {
  Box,
  VStack,
  Grid,
  GridItem,
  Heading,
  Select,
  Text,
  FormControl,
  FormLabel,
  Switch,
  Flex,
  Badge,
  Card,
  CardBody,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Button,
  ButtonGroup
} from '@chakra-ui/react';
import { 
  LineChart, 
  Line, 
  AreaChart,
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { useData } from '../context/DataContext';

const TrendAnalyzer = () => {
  const {
    selectedBatch,
    selectedBuffer,
    selectedTest,
    trackValueOverWeeks,
    getBatches,
    getBuffers,
    getTests
  } = useData();

  const batches = getBatches();
  const buffers = getBuffers(selectedBatch, "1"); // Tous les buffers du batch à la première semaine
  const tests = batches.length > 0 && buffers.length > 0 ? getTests(selectedBatch, "1", buffers[0]) : [];

  // Variables locales pour l'analyse
  const [localBatch, setLocalBatch] = useState(selectedBatch);
  const [localBuffer, setLocalBuffer] = useState(buffers[0] || '');
  const [localTest, setLocalTest] = useState(tests[0] || '');
  const [selectedParameter, setSelectedParameter] = useState('');
  const [useAreaChart, setUseAreaChart] = useState(false);

  const cardBg = 'white';
  const headingColor = 'teal.700';

  // Obtenir les paramètres disponibles pour le test sélectionné
  const getParameters = () => {
    if (!localTest) return [];
    
    switch(localTest) {
      case 'UVVIS':
        return [
          { key: 'c_avg', label: 'Concentration moyenne' },
          { key: 'c_peak', label: 'Concentration au pic' },
          { key: 'perc_quality', label: 'Qualité (%)' }
        ];
      case 'DLS':
        return [
          { key: 'Z-AVG', label: 'Z-Average' },
          { key: 'PolyDis', label: 'Polydispersité' }
        ];
      case 'ELISA':
        return [
          { key: 'positive', label: 'Positif' },
          { key: 'negative', label: 'Négatif' },
          { key: 'control1', label: 'Contrôle 1' },
          { key: 'control2', label: 'Contrôle 2' }
        ];
      default:
        return [];
    }
  };

  const parameters = getParameters();

  // Mettre à jour le paramètre sélectionné quand le test change
  useState(() => {
    if (parameters.length > 0 && (!selectedParameter || !parameters.some(p => p.key === selectedParameter))) {
      setSelectedParameter(parameters[0].key);
    }
  }, [localTest, parameters]);
  
  // Obtenir les données de la tendance
  const trendData = selectedParameter ? trackValueOverWeeks(localBatch, localBuffer, localTest, selectedParameter) : [];

  // Calculer les statistiques
  const calculateStats = () => {
    if (trendData.length < 2) return { change: 0, percentage: 0, trend: 'neutral' };
    
    const firstValue = trendData[0].value;
    const lastValue = trendData[trendData.length - 1].value;
    const change = lastValue - firstValue;
    const percentage = (change / Math.abs(firstValue)) * 100;
    
    return {
      change,
      percentage,
      trend: percentage > 0 ? 'increase' : percentage < 0 ? 'decrease' : 'neutral'
    };
  };

  const stats = calculateStats();

  // Obtenir les unités pour la valeur sélectionnée
  const getUnit = () => {
    switch(localTest) {
      case 'UVVIS':
        return selectedParameter === 'perc_quality' ? '%' : 'particules/mL';
      case 'DLS':
        return selectedParameter === 'Z-AVG' ? 'nm' : '';
      case 'ELISA':
        return 'DO';
      default:
        return '';
    }
  };

  const unit = getUnit();

  return (
    <Box p={6}>
      <VStack spacing={6} align="stretch">
        <Heading size="lg" mb={4} color={headingColor}>
          Analyse des tendances
        </Heading>

        <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(4, 1fr)" }} gap={6}>
          {/* Sélection du batch */}
          <GridItem>
            <FormControl>
              <FormLabel>Batch</FormLabel>
              <Select 
                value={localBatch} 
                onChange={(e) => setLocalBatch(e.target.value)}
                bg={cardBg}
              >
                {batches.map((batch) => (
                  <option key={batch} value={batch}>
                    Batch {batch}
                  </option>
                ))}
              </Select>
            </FormControl>
          </GridItem>
          
          {/* Sélection du buffer */}
          <GridItem>
            <FormControl>
              <FormLabel>Buffer</FormLabel>
              <Select 
                value={localBuffer} 
                onChange={(e) => setLocalBuffer(e.target.value)}
                bg={cardBg}
              >
                {buffers.map((buffer) => (
                  <option key={buffer} value={buffer}>
                    {buffer}
                  </option>
                ))}
              </Select>
            </FormControl>
          </GridItem>
          
          {/* Sélection du test */}
          <GridItem>
            <FormControl>
              <FormLabel>Test</FormLabel>
              <Select 
                value={localTest} 
                onChange={(e) => setLocalTest(e.target.value)}
                bg={cardBg}
              >
                {tests.map((test) => (
                  <option key={test} value={test}>
                    {test}
                  </option>
                ))}
              </Select>
            </FormControl>
          </GridItem>
          
          {/* Sélection du paramètre */}
          <GridItem>
            <FormControl>
              <FormLabel>Paramètre</FormLabel>
              <Select 
                value={selectedParameter} 
                onChange={(e) => setSelectedParameter(e.target.value)}
                bg={cardBg}
              >
                {parameters.map((param) => (
                  <option key={param.key} value={param.key}>
                    {param.label}
                  </option>
                ))}
              </Select>
            </FormControl>
          </GridItem>
        </Grid>

        {/* Contrôles pour le graphique */}
        <Flex justify="space-between" align="center" bg={cardBg} p={4} borderRadius="md">
          <FormControl display="flex" alignItems="center" width="auto">
            <FormLabel htmlFor="chart-type" mb="0">
              Utiliser un graphique en aire
            </FormLabel>
            <Switch 
              id="chart-type" 
              isChecked={useAreaChart} 
              onChange={() => setUseAreaChart(!useAreaChart)}
              colorScheme="teal"
            />
          </FormControl>
          
          <ButtonGroup size="sm">
            <Button variant="outline" colorScheme="teal">Exporter les données</Button>
          </ButtonGroup>
        </Flex>
        
        {/* Statistiques et changements */}
        {trendData.length > 0 && (
          <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }} gap={6}>
            <Card bg={cardBg}>
              <CardBody>
                <Stat>
                  <StatLabel>Valeur initiale</StatLabel>
                  <StatNumber>
                    {typeof trendData[0].value === 'number' && trendData[0].value < 0.001 
                      ? trendData[0].value.toExponential(2) 
                      : trendData[0].value
                    } {unit}
                  </StatNumber>
                  <StatHelpText>Semaine {trendData[0].week}</StatHelpText>
                </Stat>
              </CardBody>
            </Card>
            
            <Card bg={cardBg}>
              <CardBody>
                <Stat>
                  <StatLabel>Valeur actuelle</StatLabel>
                  <StatNumber>
                    {typeof trendData[trendData.length - 1].value === 'number' && trendData[trendData.length - 1].value < 0.001 
                      ? trendData[trendData.length - 1].value.toExponential(2) 
                      : trendData[trendData.length - 1].value
                    } {unit}
                  </StatNumber>
                  <StatHelpText>Semaine {trendData[trendData.length - 1].week}</StatHelpText>
                </Stat>
              </CardBody>
            </Card>
            
            <Card bg={cardBg}>
              <CardBody>
                <Stat>
                  <StatLabel>Changement</StatLabel>
                  <StatNumber>
                    <StatArrow type={stats.trend === 'increase' ? 'increase' : stats.trend === 'decrease' ? 'decrease' : undefined} />
                    {Math.abs(stats.percentage).toFixed(2)}%
                  </StatNumber>
                  <StatHelpText>
                    {stats.trend === 'increase' 
                      ? <Badge colorScheme="green">Augmentation</Badge> 
                      : stats.trend === 'decrease' 
                        ? <Badge colorScheme="red">Diminution</Badge> 
                        : <Badge colorScheme="gray">Stable</Badge>}
                  </StatHelpText>
                </Stat>
              </CardBody>
            </Card>
          </Grid>
        )}
        
        {/* Graphique */}
        <Box bg={cardBg} p={5} borderRadius="lg" boxShadow="md" height="400px">
          {trendData.length > 0 ? (
            <>
              <Heading size="sm" mb={4} textAlign="center">
                Évolution de {parameters.find(p => p.key === selectedParameter)?.label || selectedParameter} 
                {unit ? ` (${unit})` : ''} pour {localBuffer} - Batch {localBatch}
              </Heading>
              <ResponsiveContainer width="100%" height="90%">
                {useAreaChart ? (
                  <AreaChart
                    data={trendData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="week" 
                      label={{ value: 'Semaine', position: 'insideBottomRight', offset: -10 }}
                      type="number"
                      domain={[1, 'dataMax']}
                      tickCount={Math.max(...trendData.map(item => item.week))}
                    />
                    <YAxis 
                      label={{ 
                        value: unit, 
                        angle: -90, 
                        position: 'insideLeft',
                        style: { textAnchor: 'middle' }
                      }} 
                    />
                    <Tooltip 
                      formatter={(value) => [
                        typeof value === 'number' && value < 0.001 
                          ? value.toExponential(2) 
                          : value.toLocaleString(), 
                        parameters.find(p => p.key === selectedParameter)?.label || selectedParameter
                      ]}
                      labelFormatter={(label) => `Semaine ${label}`}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      name={parameters.find(p => p.key === selectedParameter)?.label || selectedParameter}
                      stroke="#2C7A7B"
                      fill="#4FD1C5"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                ) : (
                  <LineChart
                    data={trendData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="week" 
                      label={{ value: 'Semaine', position: 'insideBottomRight', offset: -10 }}
                      type="number"
                      domain={[1, 'dataMax']}
                      tickCount={Math.max(...trendData.map(item => item.week))}
                    />
                    <YAxis 
                      label={{ 
                        value: unit, 
                        angle: -90, 
                        position: 'insideLeft',
                        style: { textAnchor: 'middle' }
                      }} 
                    />
                    <Tooltip 
                      formatter={(value) => [
                        typeof value === 'number' && value < 0.001 
                          ? value.toExponential(2) 
                          : value.toLocaleString(), 
                        parameters.find(p => p.key === selectedParameter)?.label || selectedParameter
                      ]}
                      labelFormatter={(label) => `Semaine ${label}`}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      name={parameters.find(p => p.key === selectedParameter)?.label || selectedParameter}
                      stroke="#2C7A7B"
                      activeDot={{ r: 8 }}
                      strokeWidth={2}
                    />
                  </LineChart>
                )}
              </ResponsiveContainer>
            </>
          ) : (
            <Text textAlign="center">Sélectionnez un paramètre pour visualiser la tendance</Text>
          )}
        </Box>
      </VStack>
    </Box>
  );
};

export default TrendAnalyzer;
