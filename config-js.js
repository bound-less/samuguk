// config.js

module.exports = {
  defaultParams: {
    numSimulations: 10000,
    dailyAttendanceMin: 1500,
    dailyAttendanceMax: 2500,
    numDays: 9,
    ticketPrice: 20000,
    merchSpendPerVisitor: 15000,
    merchPurchaseRate: 0.25,
    silentDiscoTotalRevenue: 180000000
  },
  defaultUserInputs: {
    economicGrowthRate: 0.03,
    inflationRate: 0.02,
    competitorEvents: 2,
    marketingLevel: 'Medium'
  }
};
