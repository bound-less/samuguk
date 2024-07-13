import SimulationEngine from '../src/SimulationEngine';
import config from '../src/config';

jest.mock('../src/algorithms/MonteCarloSimulation', () => ({
  runMonteCarloSimulation: jest.fn().mockResolvedValue({ meanRevenue: 1000000 })
}));
jest.mock('../src/algorithms/LinearProgramming', () => ({
  runLinearProgramming: jest.fn().mockResolvedValue({ estimatedProfit: 500000 })
}));
jest.mock('../src/algorithms/QueueingModel', () => ({
  runQueueingModel: jest.fn().mockResolvedValue({ queueingMetrics: {} })
}));
jest.mock('../src/algorithms/BayesianNetwork', () => ({
  runBayesianNetwork: jest.fn().mockResolvedValue({ probabilisticInsights: {} })
}));

describe('SimulationEngine', () => {
  let engine;

  beforeEach(() => {
    engine = new SimulationEngine();
  });

  test('runFullSimulation returns combined results', async () => {
    const params = config.defaultParams;
    const userInputs = config.defaultUserInputs;

    const results = await engine.runFullSimulation(params, userInputs);

    expect(results).toHaveProperty('totalEstimatedProfit');
    expect(results).toHaveProperty('queueMetrics');
    expect(results).toHaveProperty('probabilisticInsights');
    expect(results).toHaveProperty('monteCarloResults');
    expect(results).toHaveProperty('optimizationResults');
    expect(results).toHaveProperty('queueingResults');
    expect(results).toHaveProperty('bayesianResults');
  });

  test('event emitter emits start and complete events', async () => {
    const startCallback = jest.fn();
    const completeCallback = jest.fn();

    engine.on('simulationStart', startCallback);
    engine.on('simulationComplete', completeCallback);

    await engine.runFullSimulation(config.defaultParams, config.defaultUserInputs);

    expect(startCallback).toHaveBeenCalled();
    expect(completeCallback).toHaveBeenCalled();
  });
});
