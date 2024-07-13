import { runMonteCarloSimulation } from '../src/algorithms/MonteCarloSimulation';
import config from '../src/config';

describe('MonteCarloSimulation', () => {
  test('runMonteCarloSimulation returns expected structure', () => {
    const result = runMonteCarloSimulation(config.defaultParams, config.defaultUserInputs);

    expect(result).toHaveProperty('revenueProjections');
    expect(result).toHaveProperty('meanRevenue');
    expect(result).toHaveProperty('minRevenue');
    expect(result).toHaveProperty('maxRevenue');
  });

  test('revenue projections length matches numSimulations', () => {
    const params = { ...config.defaultParams, numSimulations: 1000 };
    const result = runMonteCarloSimulation(params, config.defaultUserInputs);

    expect(result.revenueProjections).toHaveLength(1000);
  });
});
