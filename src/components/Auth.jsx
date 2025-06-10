import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  VStack,
  Heading,
  Input,
  Button,
  Alert,
  AlertIcon,
  FormControl,
  FormLabel,
  Card,
  CardBody,
  Text,
  InputGroup,
  InputRightElement,
  IconButton
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const Auth = ({ onAuthenticated }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Hash SHA-256 attendu
  const expectedHash = 'c956bdd0bc06cb6bcf0ea845b90498f2c2adbbeef9cab3d16ec66f3798bf70d3';
  // Vérifier si l'utilisateur est déjà authentifié au chargement
  useEffect(() => {
    const checkStoredPassword = async () => {
      const storedPassword = localStorage.getItem('app_password');
      if (storedPassword) {
        const storedHash = await calculateSHA256(storedPassword);
        if (storedHash === expectedHash) {
          onAuthenticated();
        } else {
          // Mot de passe stocké invalide, le supprimer
          localStorage.removeItem('app_password');
        }
      }
    };
    
    checkStoredPassword();
  }, [onAuthenticated]);

  // Fonction pour calculer le hash SHA-256
  const calculateSHA256 = async (text) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const passwordHash = await calculateSHA256(password);
        if (passwordHash === expectedHash) {
        // Authentification réussie - stocker le mot de passe
        localStorage.setItem('app_password', password);
        onAuthenticated();
      } else {
        setError('Mot de passe incorrect');
      }
    } catch (err) {
      setError('Erreur lors de la vérification du mot de passe');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (error) {
      setError('');
    }
  };

  return (
    <Container maxW="sm" centerContent minH="100vh" display="flex" alignItems="center">
      <Card w="100%" boxShadow="xl">
        <CardBody>
          <VStack spacing={6}>
            
            <Box textAlign="center">
              <Heading as="h1" size="lg" color="teal.700" mb={2}>
                Accès Sécurisé
              </Heading>
              <Text color="gray.600">
                Nanoparticules Dashboard
              </Text>
            </Box>

            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <VStack spacing={4} w="100%">
                <FormControl isRequired>
                  <FormLabel>Mot de passe</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={handlePasswordChange}
                      placeholder="Saisissez votre mot de passe"
                      autoFocus
                    />
                    <InputRightElement>
                      <IconButton
                        variant="ghost"
                        size="sm"
                        icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                {error && (
                  <Alert status="error" borderRadius="md">
                    <AlertIcon />
                    {error}
                  </Alert>
                )}

                <Button
                  type="submit"
                  colorScheme="teal"
                  size="lg"
                  w="100%"
                  isLoading={isLoading}
                  loadingText="Vérification..."
                >
                  Se connecter
                </Button>
              </VStack>
            </form>
          </VStack>
        </CardBody>
      </Card>
    </Container>
  );
};

export default Auth;
