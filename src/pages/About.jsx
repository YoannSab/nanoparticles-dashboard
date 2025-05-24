import {
  Box,
  Container,
  Heading,
  Text,
  Image,
  VStack,
  HStack,
  Divider,
  Card,
  CardBody,
  SimpleGrid,
  Flex
} from "@chakra-ui/react";

const About = () => {
  const headingColor = 'teal.700';
  
  return (
    <Container maxW="container.lg" py={12}>
      <VStack spacing={10} align="stretch">
        {/* Header */}
        <Box textAlign="center">
          <Heading as="h1" size="xl" mb={5} color={headingColor}>
            À propos de ce projet
          </Heading>
          <Divider mb={8} />
          <Text fontSize="lg" textAlign="center" mb={8}>
            Résultats de la maîtrise de recherche de Charline Courbon
          </Text>
          
          {/* Logos */}
          <Flex justify="center" gap={16} mb={10}>
            <Image 
              src="/polymtl.png" 
              alt="Polytechnique Montréal" 
              height="100px"
              objectFit="contain"
            />
            <Image 
              src="/lp2l.png" 
              alt="Laboratoire LP2L" 
              height="100px"
              objectFit="contain"
            />
          </Flex>
        </Box>

        {/* Research Description */}
        <Card variant="outline" p={2} boxShadow="md">
          <CardBody>
            <VStack spacing={6} align="stretch">
              <Heading as="h2" size="md" color={headingColor}>
                Objectif de la Recherche
              </Heading>
              <Text>
                Cette application présente les résultats de recherche sur l'utilisation 
                de différentes méthodes pour caractériser des nanoparticules. L'objectif 
                principal de ce projet est d'étudier la stabilité des nanoparticules 
                dans différents environnements et conditions.
              </Text>

              <Heading as="h2" size="md" color={headingColor} mt={4}>
                Méthodologie
              </Heading>
              <Text>
                Notre approche consiste à utiliser plusieurs techniques de caractérisation 
                complémentaires pour analyser les propriétés physico-chimiques des nanoparticules, 
                notamment :
              </Text>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mt={2}>
                <Box>
                  <Heading as="h3" size="sm" mb={2} color="teal.600">
                    Techniques Spectroscopiques
                  </Heading>
                  <Text>
                    • Spectroscopie UV-Visible (UVVIS)<br />
                    • Spectroscopie infrarouge à transformée de Fourier (FTIR)<br />
                    • Diffusion dynamique de la lumière (DLS)
                  </Text>
                </Box>
                
                <Box>
                  <Heading as="h3" size="sm" mb={2} color="teal.600">
                    Tests Biologiques
                  </Heading>
                  <Text>
                    • Tests de viabilité cellulaire<br />
                    • Tests ELISA<br />
                    • Analyses microscopiques
                  </Text>
                </Box>
              </SimpleGrid>

              <Heading as="h2" size="md" color={headingColor} mt={4}>
                Impact et Applications
              </Heading>
              <Text>
                Les résultats de cette recherche contribuent à une meilleure compréhension 
                du comportement des nanoparticules dans différents milieux biologiques. 
                Les applications potentielles incluent le développement de nouveaux systèmes 
                de délivrance de médicaments, l'imagerie médicale et les thérapies ciblées.
              </Text>

              <Heading as="h2" size="md" color={headingColor} mt={4}>
                Laboratoire LP2L
              </Heading>
              <Text>
                Cette recherche a été réalisée au Laboratoire de Pharmaco-ingénierie et Pharmacologie 
                (LP2L) de Polytechnique Montréal, sous la direction de chercheurs spécialisés 
                dans le domaine des nanomatériaux et de leurs applications biomédicales.
              </Text>
            </VStack>
          </CardBody>
        </Card>
        
        {/* Footer */}
        <Box textAlign="center" mt={10}>
          <Text fontSize="sm" color="gray.600">
            © {new Date().getFullYear()} - Charline Courbon - Polytechnique Montréal - Laboratoire LP2L
          </Text>
        </Box>
      </VStack>
    </Container>
  );
};

export default About;
