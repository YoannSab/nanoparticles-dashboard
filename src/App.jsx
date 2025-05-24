import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ChakraProvider, Box, Flex} from '@chakra-ui/react';
import { DataProvider } from './context/DataContext';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Home from './pages/Home';
import About from './pages/About';
import './App.css';



function App() {
  
  return (
    <ChakraProvider>
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
              justifyContent="center"
              gap={10}
              zIndex={10}
            >
              <Link to="/">Accueil</Link>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/about">À propos</Link>
            </Flex>
          </Box>
        </Router>
      </DataProvider>
    </ChakraProvider>
  )
}

export default App
