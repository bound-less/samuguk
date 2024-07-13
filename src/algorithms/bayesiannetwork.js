// src/algorithms/BayesianNetwork.js
import { BayesianNetwork, Node } from 'bayesjs';

export function runBayesianNetwork(params, userInputs) {
  const network = new BayesianNetwork();

  // Define nodes
  const weather = new Node('Weather', ['Sunny', 'Cloudy', 'Rainy']);
  const dayOfWeek = new Node('DayOfWeek', ['Weekday', 'Weekend']);
  const ticketPrice = new Node('TicketPrice', ['Low', 'Medium', 'High']);
  const marketing = new Node('Marketing', ['Low', 'Medium', 'High']);
  const competingEvents = new Node('CompetingEvents', ['None', 'Some', 'Many']);
  const attendance = new Node('Attendance', ['Low', 'Medium', 'High']);
  const merchandiseSales = new Node('MerchandiseSales', ['Low', 'Medium', 'High']);
  const foodSales = new Node('FoodSales', ['Low', 'Medium', 'High']);
  const attractionPopularity = new Node('AttractionPopularity', ['Low', 'Medium', 'High']);
  const overallSatisfaction = new Node('OverallSatisfaction', ['Low', 'Medium', 'High']);

  // Add nodes to network
  network.addNode(weather);
  network.addNode(dayOfWeek);
  network.addNode(ticketPrice);
  network.addNode(marketing);
  network.addNode(competingEvents);
  network.addNode(attendance);
  network.addNode(merchandiseSales);
  network.addNode(foodSales);
  network.addNode(attractionPopularity);
  network.addNode(overallSatisfaction);

  // Define relationships
  attendance.addParents([weather, dayOfWeek, ticketPrice, marketing, competingEvents]);
  merchandiseSales.addParents([attendance]);
  foodSales.addParents([attendance]);
  attractionPopularity.addParents([attendance]);
  overallSatisfaction.addParents([attractionPopularity, foodSales, weather]);

  // Set probabilities (these would normally be learned from data)
  setProbabilities(network);

  // Perform inference
  const evidence = {
    Weather: userInputs.weather || 'Sunny',
    DayOfWeek: userInputs.dayOfWeek || 'Weekend',
    TicketPrice: determineTicketPriceCategory(params.ticketPrice),
    Marketing: userInputs.marketingLevel || 'Medium',
    CompetingEvents: determineCompetingEventsCategory(userInputs.competitorEvents)
  };

  const attendanceProbability = network.infer('Attendance', evidence);
  const merchandiseProbability = network.infer('MerchandiseSales', { ...evidence, Attendance: 'High' });
  const satisfactionProbability = network.infer('OverallSatisfaction', { 
    ...evidence, 
    Attendance: 'High', 
    AttractionPopularity: 'High'
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
  network.getNode('Weather').setProbabilities({
    Sunny: 0.6,
    Cloudy: 0.3,
    Rainy: 0.1
  });

  network.getNode('DayOfWeek').setProbabilities({
    Weekday: 0.7,
    Weekend: 0.3
  });

  // Set other probabilities...

  network.getNode('Attendance').setProbabilities({
    'Sunny,Weekend,Medium,Medium,Some': {
      Low: 0.2,
      Medium: 0.5,
      High: 0.3
    },
    // ... other combinations ...
  });

  // Set probabilities for MerchandiseSales, FoodSales, AttractionPopularity, OverallSatisfaction
}

function determineTicketPriceCategory(price) {
  if (price < 15000) return 'Low';
  if (price < 25000) return 'Medium';
  return 'High';
}

function determineCompetingEventsCategory(events) {
  if (events === 0) return 'None';
  if (events <= 2) return 'Some';
  return 'Many';
}