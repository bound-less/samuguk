import React, { useState } from 'react';
import { ChakraProvider, Box, VStack, Grid, theme } from '@chakra-ui/react';
import { SimulationAPI } from './api/SimulationAPI';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import SimulationForm from './components/SimulationForm';
import ResultsDisplay from './components/ResultsDisplay';
import ScenarioManager from './components/ScenarioManager';
import SensitivityAnalysis from './components/SensitivityAnalysis';

function App() {
  const [api] = useState(() => new SimulationAPI());
  const [results, setResults] = useState(null);
  const [activeView, setActiveView] = useState('simulation');

  const runSimulation = async (params, userInputs) => {
    const simulationResults = await api.runSimulation(params, userInputs);
    setResults(simulationResults);
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'simulation':
        return <SimulationForm onSubmit={runSimulation} />;
      case 'results':
        return <ResultsDisplay results={results} />;
      case 'scenarios':
        return <ScenarioManager api={api} />;
      case 'sensitivity':
        return <SensitivityAnalysis api={api} />;
      default:
        return <SimulationForm onSubmit={runSimulation} />;
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <VStack spacing={8}>
            <Header />
            <Box display="flex" width="100%" flex={1}>
              <Sidebar setActiveView={setActiveView} />
              <Box flex={1} p={4}>
                {renderActiveView()}
              </Box>
            </Box>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
