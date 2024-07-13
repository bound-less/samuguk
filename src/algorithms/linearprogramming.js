// src/algorithms/LinearProgramming.js
import { solve } from 'javascript-lp-solver';

export function runLinearProgramming(params, userInputs) {
  const model = {
    optimize: 'profit',
    opType: 'max',
    constraints: {
      maxDailyAttendance: { max: params.dailyAttendanceMax * params.numDays },
      minDailyAttendance: { min: params.dailyAttendanceMin * params.numDays },
      maxMerchStock: { max: 15000 },
      maxFoodVendors: { max: 20 },
      maxStaffing: { max: 100 },
      minStaffing: { min: 30 },
      maxBudget: { max: 500000000 }, // 500 million won budget constraint
    },
    variables: {
      regularTickets: {
        profit: params.ticketPrice,
        maxDailyAttendance: 1,
        minDailyAttendance: 1,
      },
      vipTickets: {
        profit: params.ticketPrice * 1.5,
        maxDailyAttendance: 1,
        minDailyAttendance: 1,
        maxBudget: params.ticketPrice * 0.5, // additional cost for VIP services
      },
      merchandiseSold: {
        profit: params.merchSpendPerVisitor * params.merchPurchaseRate,
        maxMerchStock: 1,
      },
      foodVendors: {
        profit: 500000, // estimated profit per vendor
        maxFoodVendors: 1,
        maxBudget: 2000000, // cost to set up a food vendor
      },
      staffMembers: {
        maxStaffing: 1,
        minStaffing: 1,
        maxBudget: 200000, // cost per staff member
      }
    }
  };

  const results = solve(model);

  return {
    optimizedParameters: {
      recommendedRegularTickets: Math.round(results.regularTickets),
      recommendedVipTickets: Math.round(results.vipTickets),
      recommendedMerchStock: Math.round(results.merchandiseSold),
      recommendedFoodVendors: Math.round(results.foodVendors),
      recommendedStaffMembers: Math.round(results.staffMembers),
      estimatedProfit: results.result
    }
  };
}
