import { runQueueingModel } from '../src/algorithms/QueueingModel';
import config from '../src/config';

describe('QueueingModel', () => {
  test('runQueueingModel returns expected structure', () => {
    const result = runQueueingModel(config.defaultParams, config.defaultUserInputs, config.queueingModel);

    expect(result).toHaveProperty('queueingMetrics');
    expect(result.queueingMetrics).toHaveProperty('entrance');
    expect(result.queueingMetrics).toHaveProperty('foodStalls');
    expect(result.queueingMetrics).toHaveProperty('attractions');
    expect(result.queueingMetrics).toHaveProperty('merchandise');

    Object.values(result.queueingMetrics).forEach(metric => {
      expect(metric).toHaveProperty('utilizationRate');
      expect(metric).toHaveProperty('averageQueueLength');
      expect(metric).toHaveProperty('averageWaitTimeMinutes');
      expect(metric).toHaveProperty('recommendedNumServers');
    });
  });
});
