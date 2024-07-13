import { runBayesianNetwork } from '../src/algorithms/BayesianNetwork';
import config from '../src/config';

describe('BayesianNetwork', () => {
  test('runBayesianNetwork returns expected structure', () => {
    const result = runBayesianNetwork(config.defaultParams, config.defaultUserInputs);

    expect(result).toHaveProperty('probabilisticInsights');
    expect(result.probabilisticInsights).toHaveProperty('attendanceProbability');
    expect(result.probabilisticInsights).toHaveProperty('merchandiseProbability');
    expect(result.probabilisticInsights).toHaveProperty('satisfactionProbability');
  });
});
