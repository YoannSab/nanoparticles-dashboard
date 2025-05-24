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
              src="./polymtl.png" 
              alt="Polytechnique Montréal" 
              height="100px"
              objectFit="contain"
            />
            <Image 
              src="./lp2l.png" 
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
                            </Text>
                        </Box>
                    </SimpleGrid>

                    <Heading as="h2" size="md" color={headingColor} mt={4}>
                        Impact et Applications
                    </Heading>
                    <Text>
                        Les résultats de cette recherche contribuent à une meilleure compréhension 
                        du comportement des nanoparticules dans différents milieux biologiques. 
                        En particulier, ce travail s'inscrit dans un projet d'amélioration de diagnostic du cancer du sein
                        en tirant parti des propriétés plasmoniques des nanoparticules. 
                    </Text>

                    <Heading as="h2" size="md" color={headingColor} mt={4}>
                        Laboratoire LP2L
                    </Heading>
                    <Text>
                        Cette recherche a été réalisée au Laboratoire de Plasmonique et de Procédés Laser 
                        (LP2L) de Polytechnique Montréal. Le LP2L est spécialisé dans l'application des 
                        technologies laser et des nanostructures plasmoniques aux domaines biomédicaux et 
                        d'ingénierie avancée des matériaux.
                    </Text>
                    
                    <Heading as="h2" size="md" color={headingColor} mt={4}>
                        Direction de Recherche
                    </Heading>
                    <Text>
                        Ce projet a été réalisé sous la direction du Professeur Michel Meunier, directeur 
                        du LP2L. Professeur de génie physique à Polytechnique Montréal depuis 1986, 
                        Dr. Meunier est reconnu internationalement pour ses travaux sur le traitement laser 
                        et applications biologiques, avec plus de 400 publications scientifiques 
                        à son actif. Ses recherches actuelles se concentrent sur l'application des lasers 
                        femtosecondes et des nanostructures plasmoniques pour le diagnostic et la thérapie 
                        en médecine.
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
