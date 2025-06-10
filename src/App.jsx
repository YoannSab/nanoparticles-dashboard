import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ChakraProvider, Box, Flex, Spinner, Center} from '@chakra-ui/react';
import { DataProvider } from './context/DataContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Home from './pages/Home';
import About from './pages/About';
import Auth from './components/Auth';
import './App.css';



// Composant pour gérer l'affichage conditionnel basé sur l'authentification
const AppContent = () => {
  const { isAuthenticated, isLoading, login } = useAuth();

  if (isLoading) {
    return (
      <Center minH="100vh">
        <Spinner size="xl" color="teal.500" />
      </Center>
    );
  }

  if (!isAuthenticated) {
    return <Auth onAuthenticated={login} />;
  }

  return (
    <DataProvider>
      <Router>
        <Box minH="100vh" bg={'gray.50'} p={4}>
          <Header />
          
          <Box>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </Box>
          
          {/* Menu de navigation */}
          <Flex
            position="fixed"
            bottom={0}
            left={0}
            right={0}
            bg={'teal.600'}
            color="white"
            p={3}
            justifyContent="space-around"
            zIndex={10}
          >
            <Box>© <a href="https://yoannsab.github.io/paroldle" target='_blank'>2025</a> - <a href='https://www.linkedin.com/in/charline-courbon/' target='_blank'>Charline Courbon</a> - <a href='https://polymtl.ca/' target='_blank'>Polytechnique Montréal</a> - <a href='https://lp2l.polymtl.ca/' target='_blank'>Laboratoire LP2L</a></Box>
          </Flex>
        </Box>
      </Router>
    </DataProvider>
  );
};

function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App
