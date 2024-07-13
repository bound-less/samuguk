// src/api/SimulationAPI.js

import SimulationEngine from '../SimulationEngine';

class SimulationAPI {
  constructor() {
    this.engine = new SimulationEngine();
    this.scenarios = new Map();
  }

  async runSimulation(params, userInputs) {
    try {
      return await this.engine.runFullSimulation(params, userInputs);
    } catch (error) {
      console.error('Error in runSimulation:', error);
      throw error;
    }
  }

  async runSimulationWithDefaults(partialParams = {}, partialUserInputs = {}) {
    const params = { ...this.setDefaultParams(), ...partialParams };
    const userInputs = { ...this.setDefaultUserInputs(), ...partialUserInputs };

    this.validateParams(params);
    this.validateUserInputs(userInputs);

    return this.runSimulation(params, userInputs);
  }

  async performSensitivityAnalysis(params, userInputs, paramToVary, variationRange, steps) {
    return this.engine.performSensitivityAnalysis(params, userInputs, paramToVary, variationRange, steps);
  }

  async optimizeParameter(params, userInputs, paramToOptimize, range) {
    return this.engine.optimizeParameter(params, userInputs, paramToOptimize, range);
  }

  createScenario(name, params, userInputs) {
    this.validateParams(params);
    this.validateUserInputs(userInputs);
    this.scenarios.set(name, { params, userInputs });
  }

  getScenario(name) {
    if (!this.scenarios.has(name)) {
      throw new Error(`Scenario "${name}" not found`);
    }
    return this.scenarios.get(name);
  }

  listScenarios() {
    return Array.from(this.scenarios.keys());
  }

  deleteScenario(name) {
    if (!this.scenarios.has(name)) {
      throw new Error(`Scenario "${name}" not found`);
    }
    this.scenarios.delete(name);
  }

  async runScenario(name) {
    const scenario = this.getScenario(name);
    return this.runSimulation(scenario.params, scenario.userInputs);
  }

  async compareScenarios(scenarioNames) {
    const results = await Promise.all(
      scenarioNames.map(name => this.runScenario(name))
    );
    return scenarioNames.reduce((acc, name, index) => {
      acc[name] = results[index];
      return acc;
    }, {});
  }

  generateReport(simulationResults) {
    // Implement report generation logic
    return {
      summary: {
        // Add summary metrics
      },
      detailedResults: simulationResults,
    };
  }

  validateParams(params) {
    const requiredParams = [
      'numSimulations',
      'dailyAttendanceMin',
      'dailyAttendanceMax',
      'numDays',
      'ticketPrice',
      'merchSpendPerVisitor',
      'merchPurchaseRate',
      'silentDiscoTotalRevenue'
    ];

    for (const param of requiredParams) {
      if (!(param in params)) {
        throw new Error(`Missing required parameter: ${param}`);
      }
    }
  }

  validateUserInputs(userInputs) {
    const requiredInputs = [
      'economicGrowthRate',
      'inflationRate',
      'competitorEvents',
      'marketingLevel'
    ];

    for (const input of requiredInputs) {
      if (!(input in userInputs)) {
        throw new Error(`Missing required user input: ${input}`);
      }
    }
  }

  setDefaultParams() {
    return {
      numSimulations: 10000,
      dailyAttendanceMin: 1500,
      dailyAttendanceMax: 2500,
      numDays: 9,
      ticketPrice: 20000,
      merchSpendPerVisitor: 15000,
      merchPurchaseRate: 0.25,
      silentDiscoTotalRevenue: 180000000
    };
  }

  setDefaultUserInputs() {
    return {
      economicGrowthRate: 0.03,
      inflationRate: 0.02,
      competitorEvents: 2,
      marketingLevel: 'Medium'
    };
  }
}

export default SimulationAPI;
