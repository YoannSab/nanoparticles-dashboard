import { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Select,
} from '@chakra-ui/react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

// Format numbers in scientific notation when needed
const formatNumber = (value) => {
  if (typeof value !== 'number') return value;
  
  const absVal = Math.abs(value);
  if (absVal < 0.001 || absVal > 10000) {
    return value.toExponential(2);
  }
  
  // For regular numbers, limit to 3 significant digits
  return Number(value.toPrecision(3));
};
import { useData } from '../context/DataContext';

const TestChart = ({ testType }) => {
  const {
    selectedBatch,
    selectedBuffer,
    trackValueOverWeeks,
    getTestParameters
  } = useData();

  const [selectedValue, setSelectedValue] = useState('');
  const [chartData, setChartData] = useState([]);
  
  // Utiliser la fonction centrale pour obtenir les paramètres du test
  const properties = getTestParameters(testType);
  // Mettre à jour la propriété sélectionnée quand le type de test change ou au chargement initial
  useEffect(() => {
    if (properties.length > 0 && (!selectedValue || !properties.some(p => p.key === selectedValue))) {
      setSelectedValue(properties[0].key);
    }
  }, [testType, properties]);

  // Mettre à jour les données du graphique
  useEffect(() => {
    if (selectedValue) {
      const data = trackValueOverWeeks(selectedBatch, selectedBuffer, testType, selectedValue);
      setChartData(data);
    }
  }, [selectedBatch, selectedBuffer, testType, selectedValue, trackValueOverWeeks]);

  const cardBg = 'white';
  const headingColor = 'teal.700';

  // Obtenir l'unité pour la valeur sélectionnée
  const getUnit = () => {
    const parameter = properties.find(p => p.key === selectedValue);
    return parameter ? parameter.unit : '';
  };

  const unit = getUnit();

  return (
    <VStack spacing={6} align="stretch">
      {/* Sélection de la propriété à suivre */}
      <Box>
        <FormControl>
          <FormLabel>Sélectionner la propriété à suivre</FormLabel>          
          <Select 
            value={selectedValue} 
            onChange={(e) => setSelectedValue(e.target.value)}
          >
            {properties.map(prop => (
              <option key={prop.key} value={prop.key}>
                {prop.label} {prop.unit ? `(${prop.unit})` : ''}
              </option>
            ))}
          </Select>
        </FormControl>
      </Box>
      
      {/* Graphique */}
      <Box height="400px">
        <Heading size="sm" mb={4} textAlign="center">
          Évolution de {properties.find(p => p.key === selectedValue)?.label || selectedValue} 
          {unit ? ` (${unit})` : ''} au cours du temps
        </Heading>
        <ResponsiveContainer width="100%" height="90%">
          <LineChart
            data={chartData}
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
              tickCount={Math.max(...chartData.map(item => item.week))}
            />            <YAxis 
              label={{ 
                value: unit, 
                angle: -90, 
                position: 'insideLeft',
                style: { textAnchor: 'middle' }
              }}
              tickFormatter={formatNumber}
              allowDataOverflow={true}
              domain={['auto', 'auto']}
            /><Tooltip 
              formatter={(value) => {
                const parameter = properties.find(p => p.key === selectedValue);
                return [
                  `${formatNumber(value)}${parameter?.unit ? ' ' + parameter.unit : ''}`,
                  parameter?.label || selectedValue
                ];
              }}
              labelFormatter={(label) => `Semaine ${label}`}
            />
            <Legend />            <Line
              type="monotone"
              dataKey="value"
              name={properties.find(p => p.key === selectedValue)?.label || selectedValue}
              stroke="#2C7A7B"
              activeDot={{ r: 8 }}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </VStack>
  );
};

export default TestChart;
