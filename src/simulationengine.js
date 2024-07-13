import { runMonteCarloSimulation } from '/algorithms/MonteCarloSimulation';
import { runLinearProgramming } from '/algorithms/LinearProgramming';
import { runQueueingModel } from '/algorithms/QueueingModel';
import { runBayesianNetwork } from '/algorithms/BayesianNetwork';
import EventEmitter from '/utils/EventEmitter';
import ConfigManager from '/utils/ConfigManager';
import config from '../config';

class SimulationEngine {
  constructor() {
    this.eventEmitter = new EventEmitter();
    this.configManager = new ConfigManager(config);
  }

  async runFullSimulation(params, userInputs) {
    try {
      this.eventEmitter.emit('simulationStart', { params, userInputs });

      const monteCarloResults = await runMonteCarloSimulation(params, userInputs);
      const optimizationResults = await runLinearProgramming(params, userInputs);
      const queueingResults = await runQueueingModel(params, userInputs, this.configManager.getConfigValue('queueingModel'));
      const bayesianResults = await runBayesianNetwork(params, userInputs);

      const combinedResults = this.combineResults(monteCarloResults, optimizationResults, queueingResults, bayesianResults);
      
      this.eventEmitter.emit('simulationComplete', combinedResults);
      return combinedResults;
    } catch (error) {
      this.eventEmitter.emit('simulationError', error);
      console.error('Error in runFullSimulation:', error);
      throw error;
    }
  }

  combineResults(monteCarloResults, optimizationResults, queueingResults, bayesianResults) {
    return {
      totalEstimatedProfit: monteCarloResults.meanRevenue + optimizationResults.estimatedProfit,
      queueMetrics: queueingResults.queueingMetrics,
      probabilisticInsights: bayesianResults.probabilisticInsights,
      monteCarloResults,
      optimizationResults,
      queueingResults,
      bayesianResults
    };
  }

  on(eventName, callback) {
    this.eventEmitter.on(eventName, callback);
  }

  off(eventName, callback) {
    this.eventEmitter.off(eventName, callback);
  }

  updateConfig(newConfig) {
    this.configManager.updateConfig(newConfig);
  }

  getConfig() {
    return this.configManager.getConfig();
  }
}

export default SimulationEngine;