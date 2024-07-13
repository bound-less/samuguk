// src/algorithms/BayesianNetwork.js
import { BayesianNetwork } from 'bayesian-network';

export function runBayesianNetwork(params, userInputs) {
  const network = new BayesianNetwork();

  // Define nodes
  network.addNode('Weather', ['Sunny', 'Cloudy', 'Rainy']);
  network.addNode('DayOfWeek', ['Weekday', 'Weekend']);
  network.addNode('TicketPrice', ['Low', 'Medium', 'High']);
  network.addNode('Marketing', ['Low', 'Medium', 'High']);
  network.addNode('CompetingEvents', ['None', 'Some', 'Many']);
  network.addNode('Attendance', ['Low', 'Medium', 'High']);
  network.addNode('MerchandiseSales', ['Low', 'Medium', 'High']);
  network.addNode('FoodSales', ['Low', 'Medium', 'High']);
  network.addNode('AttractionPopularity', ['Low', 'Medium', 'High']);
  network.addNode('OverallSatisfaction', ['Low', 'Medium', 'High']);

  // Define edges
  network.addEdge('Weather', 'Attendance');
  network.addEdge('DayOfWeek', 'Attendance');
  network.addEdge('TicketPrice', 'Attendance');
  network.addEdge('Marketing', 'Attendance');
  network.addEdge('CompetingEvents', 'Attendance');
  network.addEdge('Attendance', 'MerchandiseSales');
  network.addEdge('Attendance', 'FoodSales');
  network.addEdge('Attendance', 'AttractionPopularity');
  network.addEdge('AttractionPopularity', 'OverallSatisfaction');
  network.addEdge('FoodSales', 'OverallSatisfaction');
  network.addEdge('Weather', 'OverallSatisfaction');

  // Set probabilities (these would normally be learned from data)
  setProbabilities(network);

  // Perform inference
  const evidence = {
    Weather: 'Sunny',
    DayOfWeek: 'Weekend',
    TicketPrice: determineTicketPriceCategory(params.ticketPrice),
    Marketing: userInputs.marketingLevel || 'Medium',
    CompetingEvents: userInputs.competingEvents || 'Some'
  };

  const attendanceProbability = network.infer('Attendance', evidence);
  const merchandiseProbability = network.infer('MerchandiseSales', { Attendance: 'High' });
  const satisfactionProbability = network.infer('OverallSatisfaction', { 
    Attendance: 'High', 
    AttractionPopularity: 'High', 
    Weather: 'Sunny' 
  });

  return {
    probabilisticInsights: {
      attendanceProbability,
      merchandiseProbability,
      satisfactionProbability
    }
  };
}

function setProbabilities(network) {
  // These probabilities would ideally be learned from historical data
  // For now, we're setting them based on reasonable assumptions
  network.setNodeProbability('Weather', { Sunny: 0.6, Cloudy: 0.3, Rainy: 0.1 });
  network.setNodeProbability('DayOfWeek', { Weekday: 0.7, Weekend: 0.3 });
  network.setNodeProbability('TicketPrice', { Low: 0.3, Medium: 0.5, High: 0.2 });
  network.setNodeProbability('Marketing', { Low: 0.2, Medium: 0.5, High: 0.3 });
  network.setNodeProbability('CompetingEvents', { None: 0.4, Some: 0.4, Many: 0.2 });
  
  // Complex conditional probabilities would be set here
  // This is a simplified example
  network.setNodeProbability('Attendance', {
    'Sunny,Weekend,Medium,Medium,Some': { Low: 0.2, Medium: 0.5, High: 0.3 },
    // ... other combinations ...
  });

  network.setNodeProbability('MerchandiseSales', {
    'Low': { Low: 0.7, Medium: 0.2, High: 0.1 },
    'Medium': { Low: 0.3, Medium: 0.5, High: 0.2 },
    'High': { Low: 0.1, Medium: 0.3, High: 0.6 }
  });

  // ... set probabilities for FoodSales, AttractionPopularity, OverallSatisfaction
}

function determineTicketPriceCategory(price) {
  if (price < 15000) return 'Low';
  if (price < 25000) return 'Medium';
  return 'High';
}
