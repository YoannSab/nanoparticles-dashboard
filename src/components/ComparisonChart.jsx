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
import { useData } from '../context/DataContext';

const ComparisonChart = ({ testType }) => {
  const {
    selectedBatch,
    selectedWeek,
    compareBuffersForWeek
  } = useData();

  const [selectedValue, setSelectedValue] = useState('');
  const [chartData, setChartData] = useState([]);
  
  // Déterminer quelles propriétés sont disponibles pour chaque type de test
  const getAvailableProperties = () => {
    switch(testType) {
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

  const properties = getAvailableProperties();

  // Mettre à jour la propriété sélectionnée quand le type de test change
  useEffect(() => {
    if (properties.length > 0 && !selectedValue) {
      setSelectedValue(properties[0].key);
    }
  }, [testType, properties, selectedValue]);

  // Mettre à jour les données du graphique
  useEffect(() => {
    if (selectedValue) {
      const data = compareBuffersForWeek(selectedBatch, selectedWeek, testType, selectedValue);
      setChartData(data);
    }
  }, [selectedBatch, selectedWeek, testType, selectedValue, compareBuffersForWeek]);

  const cardBg = 'white';
  const headingColor = 'teal.700';

  // Obtenir les unités pour la valeur sélectionnée
  const getUnit = () => {
    switch(testType) {
      case 'UVVIS':
        return selectedValue === 'perc_quality' ? '%' : 'particules/mL';
      case 'DLS':
        return selectedValue === 'Z-AVG' ? 'nm' : '';
      case 'ELISA':
        return 'DO';
      default:
        return '';
    }
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
                {prop.label}
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
            <XAxis dataKey="buffer" />
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
                properties.find(p => p.key === selectedValue)?.label || selectedValue
              ]}
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
