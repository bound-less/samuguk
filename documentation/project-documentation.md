# SHIWOL Village Event Simulation System Documentation

## Project Structure

```
src/
├── api/
│   └── SimulationAPI.js
├── algorithms/
│   ├── MonteCarloSimulation.js
│   ├── LinearProgramming.js
│   ├── QueueingModel.js
│   └── BayesianNetwork.js
├── utils/
│   ├── EventEmitter.js
│   └── ConfigManager.js
└── index.js
```

## File Documentation

### src/api/SimulationAPI.js

This file contains the main `SimulationAPI` class, which serves as the primary interface for the simulation system. It orchestrates the execution of various algorithms, manages scenarios, and provides utility functions for running simulations and analyzing results.

### src/algorithms/MonteCarloSimulation.js

Implements the Monte Carlo simulation algorithm for estimating event outcomes based on random sampling of input parameters.

### src/algorithms/LinearProgramming.js

Contains the linear programming optimization algorithm for finding optimal resource allocation and maximizing profit.

### src/algorithms/QueueingModel.js

Implements queueing theory algorithms to model and analyze waiting times and queue lengths at various event locations.

### src/algorithms/BayesianNetwork.js

Implements a Bayesian network for probabilistic modeling of event factors and their interdependencies.

### src/utils/EventEmitter.js

A utility class for implementing the publish-subscribe pattern, allowing for event-driven programming within the simulation system.

### src/utils/ConfigManager.js

Manages the configuration settings for the simulation system, allowing for easy updates and retrieval of configuration parameters.

## API Documentation

### SimulationAPI

The main class for interacting with the SHIWOL Village Event Simulation System.

#### Constructor

```javascript
constructor(initialConfig = {})
```

Creates a new instance of the SimulationAPI with optional initial configuration.

#### Methods

##### Event Handling

```javascript
on(event, callback)
```
Registers a callback function for a specific event.

```javascript
off(event, callback)
```
Removes a previously registered callback function for a specific event.

##### Simulation Execution

```javascript
async runSimulation(params, userInputs)
```
Runs a full simulation with the provided parameters and user inputs.

```javascript
async runSimulationWithDefaults(partialParams = {}, partialUserInputs = {})
```
Runs a simulation using default values for any missing parameters or user inputs.

##### Algorithm-Specific Methods

```javascript
async runMonteCarloSimulation(params, userInputs)
```
Runs only the Monte Carlo simulation algorithm.

```javascript
async runLinearProgramming(params, userInputs)
```
Runs only the Linear Programming optimization algorithm.

```javascript
async runQueueingModel(params, userInputs)
```
Runs only the Queueing Model algorithm.

```javascript
async runBayesianNetwork(params, userInputs)
```
Runs only the Bayesian Network algorithm.

##### Optimization and Analysis

```javascript
async optimizeTicketPrice(params, userInputs, priceRange)
```
Finds the optimal ticket price within a given range.

```javascript
async performSensitivityAnalysis(params, userInputs, paramToVary, variationRange, steps)
```
Performs sensitivity analysis on a specific parameter.

##### Scenario Management

```javascript
createScenario(name, params, userInputs)
```
Creates a new scenario with the given name, parameters, and user inputs.

```javascript
getScenario(name)
```
Retrieves a previously created scenario.

```javascript
listScenarios()
```
Lists all available scenarios.

```javascript
deleteScenario(name)
```
Deletes a scenario.

```javascript
async runScenario(name)
```
Runs a simulation using a previously created scenario.

```javascript
async compareScenarios(scenarioNames)
```
Compares multiple scenarios by running simulations for each.

##### Reporting

```javascript
generateReport(simulationResults)
```
Generates a structured report from simulation results.

##### Configuration Management

```javascript
updateConfig(newConfig)
```
Updates the global configuration settings.

```javascript
getConfig()
```
Retrieves the current configuration settings.

##### Utility Methods

```javascript
validateParams(params)
```
Validates the simulation parameters.

```javascript
validateUserInputs(userInputs)
```
Validates the user inputs.

```javascript
setDefaultParams()
```
Returns an object with default simulation parameters.

```javascript
setDefaultUserInputs()
```
Returns an object with default user inputs.

#### Events

- `'simulationStart'`: Emitted when a simulation starts.
- `'simulationComplete'`: Emitted when a simulation completes successfully.
- `'simulationError'`: Emitted when an error occurs during simulation.

## Usage Example

```javascript
const api = new SimulationAPI();

// Run a simulation with default parameters
const results = await api.runSimulationWithDefaults();

// Create and run a custom scenario
api.createScenario('High Attendance', 
  { ...api.setDefaultParams(), dailyAttendanceMax: 3000 }, 
  api.setDefaultUserInputs()
);
const scenarioResults = await api.runScenario('High Attendance');

// Perform sensitivity analysis
const sensitivityResults = await api.performSensitivityAnalysis(
  api.setDefaultParams(),
  api.setDefaultUserInputs(),
  'ticketPrice',
  0.2,
  10
);

// Generate a report
const report = api.generateReport(results);
```

This documentation provides an overview of the SHIWOL Village Event Simulation System, its file structure, and detailed API documentation. It should serve as a comprehensive guide for using and extending the simulation system.
