import React, { useState } from 'react';
import { VStack, HStack, Select, Button, NumberInput, NumberInputField } from '@chakra-ui/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function SensitivityAnalysis({ api }) {
  const [paramToVary, setParamToVary] = useState('ticketPrice');
  const [variationRange, setVariationRange] = useState(0.2);
  const [steps, setSteps] = useState(10);
  const [results, setResults] = useState(null);

  const runAnalysis = async () => {
    const sensitivityResults = await api.performSensitivityAnalysis(
      api.setDefaultParams(),
      api.setDefaultUserInputs(),
      paramToVary,
      variationRange,
      steps
    );
    setResults(sensitivityResults);
  };

  return (
    <VStack spacing={4} align="stretch">
      <HStack>
        <Select value={paramToVary} onChange={(e) => setParamToVary(e.target.value)}>
          <option value="ticketPrice">Ticket Price</option>
          <option value="merchSpendPerVisitor">Merchandise Spend</option>
          {/* Add more parameters as options */}
        </Select>
        <NumberInput value={variationRange} onChange={(value) => setVariationRange(parseFloat(value))}>
          <NumberInputField />
        </NumberInput>
        <NumberInput value={steps} onChange={(value) => setSteps(parseInt(value))}>
          <NumberInputField />
        </NumberInput>
        <Button onClick={runAnalysis}>Run Analysis</Button>
      </HStack>
      {results && (
        <LineChart width={600} height={300} data={results}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="paramValue" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="result" stroke="#8884d8" />
        </LineChart>
      )}
    </VStack>
  );
}

export default SensitivityAnalysis;
