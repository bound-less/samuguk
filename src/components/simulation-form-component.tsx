import React, { useState } from 'react';
import { VStack, HStack, Input, Button, FormControl, FormLabel, NumberInput, NumberInputField } from '@chakra-ui/react';

function SimulationForm({ onSubmit }) {
  const [params, setParams] = useState({
    numSimulations: 10000,
    dailyAttendanceMin: 1500,
    dailyAttendanceMax: 2500,
    numDays: 9,
    ticketPrice: 20000,
    merchSpendPerVisitor: 15000,
    merchPurchaseRate: 0.25,
    silentDiscoTotalRevenue: 180000000
  });

  const [userInputs, setUserInputs] = useState({
    economicGrowthRate: 0.03,
    inflationRate: 0.02,
    competitorEvents: 2,
    marketingLevel: 'Medium'
  });

  const handleParamChange = (param, value) => {
    setParams(prev => ({ ...prev, [param]: value }));
  };

  const handleUserInputChange = (input, value) => {
    setUserInputs(prev => ({ ...prev, [input]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(params, userInputs);
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4} align="stretch">
        <HStack>
          <FormControl>
            <FormLabel>Number of Simulations</FormLabel>
            <NumberInput value={params.numSimulations} onChange={(value) => handleParamChange('numSimulations', value)}>
              <NumberInputField />
            </NumberInput>
          </FormControl>
          <FormControl>
            <FormLabel>Number of Days</FormLabel>
            <NumberInput value={params.numDays} onChange={(value) => handleParamChange('numDays', value)}>
              <NumberInputField />
            </NumberInput>
          </FormControl>
        </HStack>
        {/* Add more form fields for other parameters and user inputs */}
        <Button type="submit" colorScheme="blue">Run Simulation</Button>
      </VStack>
    </form>
  );
}

export default SimulationForm;
