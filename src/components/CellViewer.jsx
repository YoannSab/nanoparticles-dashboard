import { useState } from 'react';
import { 
  Box, 
  VStack, 
  HStack,
  Heading, 
  Tabs, 
  TabList, 
  TabPanels, 
  Tab, 
  TabPanel,
  Text,
  Badge,
  ButtonGroup,
  Button
} from "@chakra-ui/react";
import { useData } from "../context/DataContext";
import ImageViewer from './ImageViewer';

const CellViewer = ({ data }) => {
  const { 
    selectedBatch, 
    selectedWeek, 
    selectedBuffer,
    getCellImage 
  } = useData();

  const [selectedCellType, setSelectedCellType] = useState("SK");
  
  const cellTypes = Object.keys(data);
  
  const cardBg = 'white';
  const headingColor = 'teal.700';

  // Obtenir l'image pour le type de cellule sélectionné
  const imageFile = getCellImage(selectedBatch, selectedWeek, selectedBuffer, selectedCellType);

  return (
    <Box p={6}>
      <VStack spacing={6} align="stretch">
        {/* Informations sur la sélection en cours */}
        <Box bg={cardBg} p={5} borderRadius="lg" boxShadow="md">
          <Heading size="md" mb={4} color={headingColor}>
            Imagerie cellulaire
          </Heading>
          <HStack spacing={6}>
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
          </HStack>
        </Box>        {/* Sélection du type de cellule et affichage de l'image */}
        <Box bg={cardBg} p={5} borderRadius="lg" boxShadow="md">
          <Heading size="md" mb={4} color={headingColor}>
            Image cellulaire
          </Heading>
          
          <VStack spacing={4}>
            <ButtonGroup isAttached variant="outline" size="md">
              {cellTypes.map(cellType => (
                <Button
                  key={cellType}
                  onClick={() => setSelectedCellType(cellType)}
                  colorScheme={selectedCellType === cellType ? "teal" : "gray"}
                >
                  {cellType}
                </Button>
              ))}
            </ButtonGroup>
          
            <Box textAlign="center" w="100%" mt={4}>
              {imageFile && typeof imageFile === 'string' ? (
                <ImageViewer 
                  src={`./${imageFile}`} 
                  alt={`Cellules ${selectedCellType} - Batch ${selectedBatch}, Semaine ${selectedWeek}, ${selectedBuffer}`} 
                  maxH="600px"
                />
              ) : (
                <Text>Aucune image disponible</Text>
              )}
            </Box>
          </VStack>
        </Box>        {/* Removed duplicate tabs comparison section */}
      </VStack>
    </Box>
  );
};

export default CellViewer;
