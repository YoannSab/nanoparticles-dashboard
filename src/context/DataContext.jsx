import { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBatch, setSelectedBatch] = useState('1');
  const [selectedWeek, setSelectedWeek] = useState('1');
  const [selectedBuffer, setSelectedBuffer] = useState('buffer 1');
  const [selectedTest, setSelectedTest] = useState('UVVIS');
  // Chargement des données
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('./all_data.json');
        if (!response.ok) {
          throw new Error('Échec du chargement des données');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        console.error('Erreur lors du chargement des données:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Obtenir tous les batches disponibles
  const getBatches = () => {
    if (!data) return [];
    return Object.keys(data).sort((a, b) => Number(a) - Number(b));
  };

  // Obtenir toutes les semaines disponibles pour un batch
  const getWeeks = (batch) => {
    if (!data || !data[batch]) return [];
    return Object.keys(data[batch]).sort((a, b) => Number(a) - Number(b));
  };

  // Obtenir tous les buffers disponibles pour un batch et une semaine
  const getBuffers = (batch, week) => {
    if (!data || !data[batch] || !data[batch][week]) return [];
    return Object.keys(data[batch][week]).sort();
  };

  // Obtenir tous les tests disponibles pour un batch, une semaine et un buffer
  const getTests = (batch, week, buffer) => {
    if (!data || !data[batch] || !data[batch][week] || !data[batch][week][buffer]) return [];
    return Object.keys(data[batch][week][buffer]).filter(test => test !== "Cellules");
  };

  // Obtenir les types de cellules disponibles
  const getCellTypes = (batch, week, buffer) => {
    if (!data || !data[batch] || !data[batch][week] || !data[batch][week][buffer] || !data[batch][week][buffer]["Cellules"]) return [];
    return Object.keys(data[batch][week][buffer]["Cellules"]);
  };

  // Obtenir les données actuellement sélectionnées
  const getSelectedData = () => {
    if (!data || !data[selectedBatch] || !data[selectedBatch][selectedWeek] || !data[selectedBatch][selectedWeek][selectedBuffer]) {
      return null;
    }
    
    if (selectedTest === 'Cellules') {
      return data[selectedBatch][selectedWeek][selectedBuffer][selectedTest];
    } else {
      return data[selectedBatch][selectedWeek][selectedBuffer][selectedTest];
    }
  };

  // Obtenir les données d'un test spécifique pour une sélection
  const getTestData = (batch, week, buffer, test) => {
    if (!data || !data[batch] || !data[batch][week] || !data[batch][week][buffer] || !data[batch][week][buffer][test]) {
      return null;
    }
    return data[batch][week][buffer][test];
  };  // Obtenir l'image pour les cellules
  const getCellImage = (batch, week, buffer, cellType) => {
    if (!data || !data[batch] || !data[batch][week] || !data[batch][week][buffer] || 
        !data[batch][week][buffer]["Cellules"] || !data[batch][week][buffer]["Cellules"][cellType]) {
      return null;
    }
    
    const cellData = data[batch][week][buffer]["Cellules"][cellType];
    
    // Check if file is an object or string
    if (typeof cellData.file === 'object') {
      console.log('File is an object:', cellData.file);
      // If it's an object, extract the path property
      return cellData.file.path || null;
    }
    
    return cellData.file;
  };

  // Suivre les changements de valeur d'un test spécifique sur plusieurs semaines
  const trackValueOverWeeks = (batch, buffer, test, valueKey) => {
    if (!data || !data[batch]) return [];
    
    const weeks = getWeeks(batch);
    
    return weeks.map(week => {
      const value = data[batch]?.[week]?.[buffer]?.[test]?.[valueKey];
      return {
        week: Number(week),
        value: value !== undefined ? value : null
      };
    }).filter(item => item.value !== null);
  };

  // Comparer les valeurs entre différents buffers pour une semaine spécifique
  const compareBuffersForWeek = (batch, week, test, valueKey) => {
    if (!data || !data[batch] || !data[batch][week]) return [];
    
    const buffers = getBuffers(batch, week);
    
    return buffers.map(buffer => {
      const value = data[batch]?.[week]?.[buffer]?.[test]?.[valueKey];
      return {
        buffer,
        value: value !== undefined ? value : null
      };
    }).filter(item => item.value !== null);
  };

  const value = {
    data,
    loading,
    error,
    selectedBatch,
    setSelectedBatch,
    selectedWeek,
    setSelectedWeek,
    selectedBuffer,
    setSelectedBuffer,
    selectedTest,
    setSelectedTest,
    getBatches,
    getWeeks,
    getBuffers,
    getTests,
    getCellTypes,
    getSelectedData,
    getTestData,
    getCellImage,
    trackValueOverWeeks,
    compareBuffersForWeek,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
