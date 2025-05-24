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
  BarChart, 
  Bar, 
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

const ComparisonChart = ({ testType }) => {
  const {
    selectedBatch,
    selectedWeek,
    compareBuffersForWeek,
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
      const data = compareBuffersForWeek(selectedBatch, selectedWeek, testType, selectedValue);
      setChartData(data);
    }
  }, [selectedBatch, selectedWeek, testType, selectedValue, compareBuffersForWeek]);

  // Obtenir l'unité pour la valeur sélectionnée
  const getUnit = () => {
    const parameter = properties.find(p => p.key === selectedValue);
    return parameter ? parameter.unit : '';
  };

  const unit = getUnit();

  // Palette de couleurs pour les différents buffers
  const getColor = (index) => {
    const colors = ['#2C7A7B', '#285E61', '#234E52', '#1D4044', '#44337A', '#322659', '#1A365D', '#2A4365'];
    return colors[index % colors.length];
  };

  return (
    <VStack spacing={6} align="stretch">
      {/* Sélection de la propriété à comparer */}
      <Box>
        <FormControl>
          <FormLabel>Sélectionner la propriété à comparer</FormLabel>          
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
          Comparaison de {properties.find(p => p.key === selectedValue)?.label || selectedValue} 
          {unit ? ` (${unit})` : ''} entre les buffers (Semaine {selectedWeek})
        </Heading>
        <ResponsiveContainer width="100%" height="90%">
          <BarChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />            
            <XAxis dataKey="buffer" />            <YAxis 
              tickFormatter={formatNumber}
              label={{ 
                value: unit, 
                angle: -90, 
                position: 'insideLeft',
                style: { textAnchor: 'middle' }
              }}
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
              />
            <Legend />
            <Bar 
              dataKey="value" 
              name={properties.find(p => p.key === selectedValue)?.label || selectedValue} 
              fill="#2C7A7B"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </VStack>
  );
};

export default ComparisonChart;
