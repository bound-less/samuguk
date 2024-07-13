import React, { useState, useEffect } from 'react';
import { VStack, HStack, Button, Input, List, ListItem, Text } from '@chakra-ui/react';

function ScenarioManager({ api }) {
  const [scenarios, setScenarios] = useState([]);
  const [newScenarioName, setNewScenarioName] = useState('');

  useEffect(() => {
    loadScenarios();
  }, []);

  const loadScenarios = () => {
    const scenarioList = api.listScenarios();
    setScenarios(scenarioList);
  };

  const createScenario = () => {
    if (newScenarioName) {
      api.createScenario(newScenarioName, api.setDefaultParams(), api.setDefaultUserInputs());
      setNewScenarioName('');
      loadScenarios();
    }
  };

  const deleteScenario = (name) => {
    api.deleteScenario(name);
    loadScenarios();
  };

  const runScenario = async (name) => {
    const results = await api.runScenario(name);
    console.log(Results for ${name}:, results);
    // Here you would typically update state to display these results
  };

  return (
    <VStack spacing={4} align="stretch">
      <HStack>
        <Input 
          placeholder="New scenario name" 
          value={newScenarioName}
          onChange={(e) => setNewScenarioName(e.target.value)}
        />
        <Button onClick={createScenario}>Create Scenario</Button>
      </HStack>
      <List spacing={3}>
        {scenarios.map((scenario) => (
          <ListItem key={scenario}>
            <HStack>
              <Text>{scenario}</Text>
              <Button onClick={() => runScenario(scenario)}>Run</Button>
              <Button onClick={() => deleteScenario(scenario)}>Delete</Button>
            </HStack>
          </ListItem>
        ))}
      </List>
    </VStack>
  );
}

export default ScenarioManager;
