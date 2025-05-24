import { useState } from 'react';
import { 
  Box, 
  Image, 
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalBody, 
  ModalCloseButton,
  IconButton,
  Flex,
  Text,
  useDisclosure
} from "@chakra-ui/react";

const ImageViewer = ({ src, alt, maxH = "500px" }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [zoomLevel, setZoomLevel] = useState(100);

  // Gérer le téléchargement de l'image
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = src;
    link.download = alt || 'image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box position="relative">
      {/* Image avec contrôles */}
      <Box 
        position="relative" 
        overflow="hidden" 
        borderRadius="md"
        textAlign="center"
      >
        <Image 
          src={src} 
          alt={alt} 
          maxH={maxH} 
          mx="auto" 
          cursor="pointer"
          onClick={onOpen}
          transition="transform 0.3s ease"
          _hover={{ transform: 'scale(1.02)' }}
        />
        
        {/* Contrôles sur l'image */}
        <Flex 
          position="absolute" 
          bottom="10px" 
          right="10px" 
          bg="blackAlpha.600" 
          borderRadius="md" 
          p={1}
        >          <IconButton 
            aria-label="Zoom" 
            icon={<Text fontSize="sm">🔍</Text>} 
            size="sm" 
            variant="ghost" 
            colorScheme="whiteAlpha" 
            onClick={onOpen}
            mr={1}
          />
          <IconButton 
            aria-label="Télécharger" 
            icon={<Text fontSize="sm">⬇️</Text>} 
            size="sm" 
            variant="ghost" 
            colorScheme="whiteAlpha" 
            onClick={handleDownload} 
          />
        </Flex>
      </Box>
      
      {/* Modal pour zoomer */}
      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent bg="transparent" boxShadow="none">
          <ModalCloseButton color="white" />
          <ModalBody p={0} display="flex" justifyContent="center" alignItems="center">
            <Box 
              maxW="95vw" 
              maxH="95vh" 
              overflow="auto" 
              bg="blackAlpha.700" 
              p={4} 
              borderRadius="md"
              position="relative"
            >
              <Image 
                src={src} 
                alt={alt} 
                style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'center center' }} 
              />
              
              {/* Contrôles de zoom */}
              <Flex 
                position="absolute" 
                bottom="10px" 
                right="10px" 
                bg="blackAlpha.600" 
                borderRadius="md" 
                p={2} 
                alignItems="center"
              >
                <IconButton 
                  aria-label="Zoom out" 
                  icon={<>-</>} 
                  size="sm" 
                  variant="ghost" 
                  colorScheme="whiteAlpha" 
                  onClick={() => setZoomLevel(Math.max(50, zoomLevel - 25))}
                  mr={2}
                />
                <Box color="white">{zoomLevel}%</Box>
                <IconButton 
                  aria-label="Zoom in" 
                  icon={<>+</>} 
                  size="sm" 
                  variant="ghost" 
                  colorScheme="whiteAlpha" 
                  onClick={() => setZoomLevel(Math.min(300, zoomLevel + 25))}
                  ml={2}
                />
              </Flex>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ImageViewer;
