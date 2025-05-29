import {
  Box,
  Container,
  Heading,
  Text,
  Image,
  VStack,
  Divider,
  Card,
  CardBody,
  SimpleGrid,
  Flex,
  List,
  ListItem,
  ListIcon
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

const About = () => {
  const headingColor = 'teal.700';
  const subHeadingColor = 'teal.600';
  
  return (
    <Container maxW="container.lg" py={12}>
      <VStack spacing={10} align="stretch">
        {/* Header */}
        <Box textAlign="center">
          <Heading as="h1" size="xl" mb={5} color={headingColor}>
            Nanoparticules d'Or Fonctionnalisées <br/> pour le Diagnostic du Cancer du Sein
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

        {/* Research Objective */}
        <Card variant="outline" p={2} boxShadow="md">
          <CardBody>
            <VStack spacing={6} align="stretch">
              <Heading as="h2" size="md" color={headingColor}>
                Objectif de la Recherche
              </Heading>
              <Text>
                Cette recherche porte sur l'optimisation et la caractérisation des nanoparticules d'or (AuNPs) 
                fonctionnalisées pour la détection spécifique des cellules cancéreuses HER2 positives. L'objectif 
                principal est de développer une alternative fiable aux méthodes diagnostiques conventionnelles 
                comme l'immunohistochimie, en exploitant les propriétés plasmoniques uniques des nanoparticules d'or.
              </Text>
            </VStack>
          </CardBody>
        </Card>

        {/* Problématique */}
        <Card variant="outline" p={2} boxShadow="md">
          <CardBody>
            <VStack spacing={6} align="stretch">
              <Heading as="h2" size="md" color={headingColor}>
                Problématique
              </Heading>
              <Text>
                Le cancer du sein représente un enjeu majeur de santé publique. Bien que l'immunohistochimie 
                reste l'étalon-or pour le diagnostic, cette technique présente des limitations importantes :
              </Text>
              <List spacing={2} pl={4}>
                <ListItem>• Dégradation des antigènes due aux agents de fixation</ListItem>
                <ListItem>• Difficulté d'analyser plusieurs biomarqueurs simultanément</ListItem>
                <ListItem>• Manque de précision dans certains cas</ListItem>
              </List>
            </VStack>
          </CardBody>
        </Card>

        {/* Innovation Technologique */}
        <Card variant="outline" p={2} boxShadow="md">
          <CardBody>
            <VStack spacing={6} align="stretch">
              <Heading as="h2" size="md" color={headingColor}>
                Innovation Technologique
              </Heading>
              <Text>
                Les nanoparticules d'or offrent des avantages exceptionnels :
              </Text>
                <Box>
                  <Text><strong>Propriétés plasmoniques uniques</strong> : forte absorption et diffusion de la lumière</Text>
                </Box>
                
                <Box>
                  <Text><strong>Détection hautement sensible</strong> des biomolécules cibles</Text>
                </Box>
                <Box>
                  <Text><strong>Capacités de multiplexage</strong> supérieures aux techniques traditionnelles</Text>
                </Box>
            </VStack>
          </CardBody>
        </Card>

        {/* Méthodologie */}
        <Card variant="outline" p={2} boxShadow="md">
          <CardBody>
            <VStack spacing={6} align="stretch">
              <Heading as="h2" size="md" color={headingColor}>
                Méthodologie
              </Heading>

              <Box>
                <Heading as="h3" size="sm" mb={3} color={subHeadingColor}>
                  Fonctionnalisation Optimisée
                </Heading>
                <Text>
                  Développement de protocoles robustes utilisant le <strong>calixarène</strong> comme agent de greffage, 
                  montrant une supériorité par rapport aux méthodes basées sur le polyéthylène glycol (PEG) en termes 
                  de stabilité et reproductibilité.
                </Text>
              </Box>

              <Box>
                <Heading as="h3" size="sm" mb={3} color={subHeadingColor}>
                  Techniques de Caractérisation
                </Heading>
               
                    <Text>• <strong>Spectroscopie UV-Visible</strong> : évaluation des propriétés plasmoniques</Text>
                    <Text>• <strong>Diffusion dynamique de la lumière (DLS)</strong> : analyse de la stabilité colloïdale</Text>
                    <Text>• <strong>Spectroscopie infrarouge (FTIR)</strong> : vérification de l'intégrité chimique</Text>
                    <Text>• <strong>Tests sur cellules</strong> : validation sur lignées cellulaires HER2+ et HER2-</Text>
                    <Text>• <strong>Tests ELISA</strong> : confirmation de la spécificité fonctionnelle</Text>
                    <Text>• <strong>Tests LFA</strong> : confirmation de la présence d'anticorps à la surface des NPs</Text>
                  
              </Box>

              <Box>
                <Heading as="h3" size="sm" mb={3} color={subHeadingColor}>
                  Étude de Stabilité
                </Heading>
                <Text>
                  Évaluation systématique de <strong>5 formulations de buffers </strong> de conservation sur une période de 
                  <strong> 6 semaines</strong>, permettant d'identifier les conditions optimales de stockage des 
                  nanoparticules fonctionnalisées.
                </Text>
              </Box>
            </VStack>
          </CardBody>
        </Card>

        {/* Résultats Clés */}
        <Card variant="outline" p={2} boxShadow="md">
          <CardBody>
            <VStack spacing={6} align="stretch">
              <Heading as="h2" size="md" color={headingColor}>
                Résultats Clés
              </Heading>
              <List spacing={3}>
                <ListItem display="flex" alignItems="flex-start">
                  <ListIcon as={CheckIcon} color="green.500" marginTop="6px" />
                  <Text><strong>Spécificité confirmée</strong> : fixation sélective sur cellules HER2+ vs HER2-</Text>
                </ListItem>
                <ListItem display="flex" alignItems="flex-start">
                  <ListIcon as={CheckIcon} color="green.500" marginTop="6px" />
                  <Text><strong>Stabilité à long terme</strong> : conservation des propriétés pendant 6 semaines</Text>
                </ListItem>
                <ListItem display="flex" alignItems="flex-start">
                  <ListIcon as={CheckIcon} color="green.500" marginTop="6px" />
                  <Text><strong>Aucun Buffer optimal</strong> : aucune différence significative entre les formulations</Text>
                </ListItem>
              </List>
            </VStack>
          </CardBody>
        </Card>

        {/* Impact et Applications */}
        <Card variant="outline" p={2} boxShadow="md">
          <CardBody>
            <VStack spacing={6} align="stretch">
              <Heading as="h2" size="md" color={headingColor}>
                Impact et Applications
              </Heading>
              <Text>
                Cette recherche contribue à l'évolution des innovations technologiques en oncologie en proposant :
              </Text>
              <SimpleGrid columns={{ base: 1, md: 1 }} spacing={3} mt={2}>
                <Text>• Une <strong>alternative fiable</strong> aux méthodes diagnostiques conventionnelles</Text>
                <Text>• Une <strong>sensibilité accrue</strong> pour la détection précoce</Text>
                <Text>• Des possibilités d'extension vers la <strong>surveillance thérapeutique</strong> et la <strong>livraison ciblée de médicaments</strong></Text>
              </SimpleGrid>
            </VStack>
          </CardBody>
        </Card>

        {/* Laboratoire et Direction */}
        <Card variant="outline" p={2} boxShadow="md">
          <CardBody>
            <VStack spacing={6} align="stretch">
              <Heading as="h2" size="md" color={headingColor}>
                Laboratoire LP2L
              </Heading>
              <Text>
                Cette recherche a été réalisée au <strong><a href="https://lp2l.polymtl.ca/" target="_blank">Laboratoire de Plasmonique et de Procédés Laser (LP2L)</a> </strong> 
                de Polytechnique Montréal, spécialisé dans l'application des technologies laser et des nanostructures 
                plasmoniques aux domaines biomédicaux et d'ingénierie avancée des matériaux.
              </Text>
              
              <Heading as="h2" size="md" color={headingColor} mt={4}>
                Direction de Recherche
              </Heading>
              <Text>
                Projet réalisé sous la direction du <strong> <a href="https://scholar.google.fr/citations?user=wyM4dDMAAAAJ&hl=fr" target="_blank">Professeur Michel Meunier</a></strong>, directeur du LP2L et 
                expert reconnu internationalement en traitement laser et applications biologiques, avec plus de 400 
                publications scientifiques. Ses recherches se concentrent sur l'application des lasers femtosecondes 
                et des nanostructures plasmoniques pour le diagnostic et la thérapie médicale.
              </Text>
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    </Container>
  );
};

export default About;