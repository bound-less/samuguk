const config = {
  queueingModel: {
    entrance: { serviceRate: 200, numServers: 5 },
    foodStalls: { serviceRate: 60, numServers: 10 },
    attractions: { serviceRate: 120, numServers: 8 },
    merchandise: { serviceRate: 40, numServers: 6 }
  },
  defaultParams: {
    numSimulations: 10000,
    dailyAttendanceMin: 1500,
    dailyAttendanceMax: 2500,
    numDays: 9,
    ticketPrice: 20000,
    merchSpendPerVisitor: 15000,
    merchPurchaseRate: 0.25,
    totalRevenue: 180000000
  },
  defaultUserInputs: {
    economicGrowthRate: 0.03,
    inflationRate: 0.02,
    competitorEvents: 2,
    marketingLevel: 'Medium'
  }
};

export default config;