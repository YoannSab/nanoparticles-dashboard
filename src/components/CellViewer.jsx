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
    <Box>
      <VStack spacing={6} align="stretch">
        <Box bg={cardBg} p={5} borderRadius="lg" boxShadow="md">
          <Heading size="md" mb={4} color={headingColor}>
            Visuel
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
        </Box>
      </VStack>
    </Box>
  );
};

export default CellViewer;
