import { 
  Box, 
  Flex, 
  Heading, 
  Select, 
  HStack, 
  Text,
} from "@chakra-ui/react";
import { useData } from "../context/DataContext";

const Header = () => {
  const { 
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
    getTests
  } = useData();

  const batches = getBatches();
  const weeks = getWeeks(selectedBatch);
  const buffers = getBuffers(selectedBatch, selectedWeek);
  const tests = getTests(selectedBatch, selectedWeek, selectedBuffer);

  const bg = 'teal.800';
  const textColor = 'white';
  
  return (
    <Box bg={bg} px={6} py={3} shadow="md" position="sticky" top="0" zIndex={10}>
      <Flex justifyContent="space-between" alignItems="center">
        <Heading as="h1" size="lg" color={textColor}>
          Nanoparticules Dashboard
        </Heading>
        
        <HStack spacing={4}>
          <Box>
            <Text fontSize="sm" color="teal.100" mb={1}>Batch</Text>
            <Select 
              value={selectedBatch} 
              onChange={(e) => setSelectedBatch(e.target.value)}
              bg="white"
              size="sm"
            >
              {batches.map((batch) => (
                <option key={batch} value={batch}>
                  Batch {batch}
                </option>
              ))}
            </Select>
          </Box>
          
          <Box>
            <Text fontSize="sm" color="teal.100" mb={1}>Semaine</Text>
            <Select 
              value={selectedWeek} 
              onChange={(e) => setSelectedWeek(e.target.value)}
              bg="white"
              size="sm"
            >
              {weeks.map((week) => (
                <option key={week} value={week}>
                  Semaine {week}
                </option>
              ))}
            </Select>
          </Box>
          
          <Box>
            <Text fontSize="sm" color="teal.100" mb={1}>Buffer</Text>
            <Select 
              value={selectedBuffer} 
              onChange={(e) => setSelectedBuffer(e.target.value)}
              bg="white"
              size="sm"
            >
              {buffers.map((buffer) => (
                <option key={buffer} value={buffer}>
                  {buffer}
                </option>
              ))}
            </Select>
          </Box>
          
          <Box>
            <Text fontSize="sm" color="teal.100" mb={1}>Test</Text>
            <Select 
              value={selectedTest} 
              onChange={(e) => setSelectedTest(e.target.value)}
              bg="white"
              size="sm"
            >
              {tests.map((test) => (
                <option key={test} value={test}>
                  {test}
                </option>
              ))}
              <option value="Cellules">Cellules</option>
            </Select>
          </Box>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;
