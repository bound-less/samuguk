import React from 'react';
import { Box, VStack, Heading, Text } from '@chakra-ui/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function ResultsDisplay({ results }) {
  if (!results) {
    return <Box>No results to display. Run a simulation first.</Box>;
  }

  const { monteCarloResults, optimizationResults, queueingResults, bayesianResults } = results;

  return (
    <VStack spacing={6} align="stretch">
      <Box>
        <Heading size="md">Monte Carlo Simulation Results</Heading>
        <Text>Mean Revenue: ${monteCarloResults.meanRevenue.toFixed(2)}</Text>
        <Text>Min Revenue: ${monteCarloResults.minRevenue.toFixed(2)}</Text>
        <Text>Max Revenue: ${monteCarloResults.maxRevenue.toFixed(2)}</Text>
        <LineChart width={600} height={300} data={monteCarloResults.revenueDistribution}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="revenue" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="frequency" stroke="#8884d8" />
        </LineChart>
      </Box>
      
      <Box>
        <Heading size="md">Optimization Results</Heading>
        <Text>Recommended Tickets: {optimizationResults.recommendedTickets}</Text>
        <Text>Estimated Profit: ${optimizationResults.estimatedProfit.toFixed(2)}</Text>
      </Box>
      
      <Box>
        <Heading size="md">Queueing Results</Heading>
        <Text>Average Wait Time: {queueingResults.averageWaitTime.toFixed(2)} minutes</Text>
      </Box>
      
      <Box>
        <Heading size="md">Bayesian Network Results</Heading>
        <Text>Probability of High Attendance: {(bayesianResults.highAttendanceProbability * 100).toFixed(2)}%</Text>
      </Box>
    </VStack>
  );
}

export default ResultsDisplay;
