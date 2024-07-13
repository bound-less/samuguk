// src/index.js

const SimulationAPI = require('./api/SimulationAPI');

// This file can serve as the entry point for your application.
// You can add any initialization logic or example usage here.

const api = new SimulationAPI();

// Example usage
api.runSimulationWithDefaults()
  .then(results => console.log('Simulation Results:', JSON.stringify(results, null, 2)))
  .catch(error => console.error('Simulation Error:', error));
