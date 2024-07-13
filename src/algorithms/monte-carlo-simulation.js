// src/algorithms/MonteCarloSimulation.js
export function runMonteCarloSimulation(params, userInputs) {
  const {
    numSimulations,
    dailyAttendanceMin,
    dailyAttendanceMax,
    numDays,
    ticketPrice,
    merchSpendPerVisitor,
    merchPurchaseRate,
    silentDiscoTotalRevenue
  } = params;

  const { economicGrowthRate, inflationRate } = userInputs;

  const revenueProjections = [];

  for (let i = 0; i < numSimulations; i++) {
    let totalRevenue = silentDiscoTotalRevenue;
    
    for (let day = 0; day < numDays; day++) {
      const dailyAttendance = Math.random() * (dailyAttendanceMax - dailyAttendanceMin) + dailyAttendanceMin;
      
      const ticketRevenue = dailyAttendance * ticketPrice;
      const merchRevenue = dailyAttendance * merchSpendPerVisitor * merchPurchaseRate;
      
      totalRevenue += ticketRevenue + merchRevenue;
    }

    // Apply economic factors
    totalRevenue *= (1 + economicGrowthRate);
    totalRevenue *= (1 + inflationRate);

    revenueProjections.push(totalRevenue);
  }

  return {
    revenueProjections,
    meanRevenue: revenueProjections.reduce((sum, rev) => sum + rev, 0) / numSimulations,
    minRevenue: Math.min(...revenueProjections),
    maxRevenue: Math.max(...revenueProjections)
  };
}
