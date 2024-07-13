import { runLinearProgramming } from '../src/algorithms/LinearProgramming';
import config from '../src/config';

describe('LinearProgramming', () => {
  test('runLinearProgramming returns expected structure', () => {
    const result = runLinearProgramming(config.defaultParams, config.defaultUserInputs);

    expect(result).toHaveProperty('optimizedParameters');
    expect(result.optimizedParameters).toHaveProperty('recommendedRegularTickets');
    expect(result.optimizedParameters).toHaveProperty('recommendedVipTickets');
    expect(result.optimizedParameters).toHaveProperty('recommendedMerchStock');
    expect(result.optimizedParameters).toHaveProperty('recommendedFoodVendors');
    expect(result.optimizedParameters).toHaveProperty('recommendedStaffMembers');
    expect(result).toHaveProperty('estimatedProfit');
  });
});
