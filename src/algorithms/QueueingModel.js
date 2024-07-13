// src/algorithms/QueueingModel.js
export function runQueueingModel(params, userInputs) {
  const { dailyAttendanceMax, dailyAttendanceMin, numDays } = params;
  const averageAttendance = (dailyAttendanceMax + dailyAttendanceMin) / 2;
  const operatingHours = 12; // Assuming 12-hour operating day

  const queues = {
    entrance: { serviceRate: 200, numServers: 5 },
    foodStalls: { serviceRate: 60, numServers: 10 },
    attractions: { serviceRate: 120, numServers: 8 },
    merchandise: { serviceRate: 40, numServers: 6 }
  };

  const results = {};

  for (const [queueName, queueParams] of Object.entries(queues)) {
    const arrivalRate = calculateArrivalRate(averageAttendance, numDays, operatingHours, queueName);
    const { serviceRate, numServers } = queueParams;

    const utilization = arrivalRate / (numServers * serviceRate);
    const avgQueueLength = calculateAverageQueueLength(utilization, numServers, arrivalRate, serviceRate);
    const avgWaitTime = avgQueueLength / arrivalRate;

    results[queueName] = {
      utilizationRate: utilization,
      averageQueueLength: avgQueueLength,
      averageWaitTimeMinutes: avgWaitTime * 60,
      recommendedNumServers: numServers
    };
  }

  return { queueingMetrics: results };
}

function calculateArrivalRate(averageAttendance, numDays, operatingHours, queueType) {
  const baseRate = averageAttendance / (numDays * operatingHours);
  switch (queueType) {
    case 'entrance': return baseRate;
    case 'foodStalls': return baseRate * 0.7; // Assume 70% visit food stalls each hour
    case 'attractions': return baseRate * 0.5; // Assume 50% visit attractions each hour
    case 'merchandise': return baseRate * 0.3; // Assume 30% visit merchandise stalls each hour
    default: return baseRate;
  }
}

function calculateAverageQueueLength(utilization, numServers, arrivalRate, serviceRate) {
  const p0 = calculateP0(utilization, numServers);
  return (Math.pow(utilization, numServers + 1) * p0) / (Math.factorial(numServers) * Math.pow(1 - utilization, 2));
}

function calculateP0(utilization, numServers) {
  let sum = 0;
  for (let n = 0; n < numServers; n++) {
    sum += Math.pow(numServers * utilization, n) / Math.factorial(n);
  }
  sum += Math.pow(numServers * utilization, numServers) / (Math.factorial(numServers) * (1 - utilization));
  return 1 / sum;
}
