import React from 'react';
import { VStack, Button } from '@chakra-ui/react';

function Sidebar({ setActiveView }) {
  return (
    <VStack spacing={4} align="stretch" width="200px" p={4}>
      <Button onClick={() => setActiveView('simulation')}>Simulation</Button>
      <Button onClick={() => setActiveView('results')}>Results</Button>
      <Button onClick={() => setActiveView('scenarios')}>Scenarios</Button>
      <Button onClick={() => setActiveView('sensitivity')}>Sensitivity Analysis</Button>
    </VStack>
  );
}

export default Sidebar;
