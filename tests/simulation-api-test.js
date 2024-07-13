import SimulationAPI from '../src/api/SimulationAPI';
import config from '../src/config';

jest.mock('../src/SimulationEngine', () => {
  return jest.fn().mockImplementation(() => ({
    runFullSimulation: jest.fn().mockResolvedValue({
      totalEstimatedProfit: 1500000,
      queueMetrics: {},
      probabilisticInsights: {},
      monteCarloResults: {},
      optimizationResults: {},
      queueingResults: {},
      bayesianResults: {}
    })
  }));
});

describe('SimulationAPI', () => {
  let api;

  beforeEach(() => {
    api = new SimulationAPI();
  });

  test('runSimulation returns expected structure', async () => {
    const result = await api.runSimulation(config.defaultParams, config.defaultUserInputs);

    expect(result).toHaveProperty('totalEstimatedProfit');
    expect(result).toHaveProperty('queueMetrics');
    expect(result).toHaveProperty('probabilisticInsights');
    expect(result).toHaveProperty('monteCarloResults');
    expect(result).toHaveProperty('optimizationResults');
    expect(result).toHaveProperty('queueingResults');
    expect(result).toHaveProperty('bayesianResults');
  });

  test('createScenario and runScenario work correctly', async () => {
    api.createScenario('TestScenario', config.defaultParams, config.defaultUserInputs);
    const result = await api.runScenario('TestScenario');

    expect(result).toHaveProperty('totalEstimatedProfit');
  });

  test('compareScenarios returns results for multiple scenarios', async () => {
    api.createScenario('Scenario1', config.defaultParams, config.defaultUserInputs);
    api.createScenario('Scenario2', { ...config.defaultParams, ticketPrice: 25000 }, config.defaultUserInputs);

    const results = await api.compareScenarios(['Scenario1', 'Scenario2']);

    expect(results).toHaveProperty('Scenario1');
    expect(results).toHaveProperty('Scenario2');
  });
});
