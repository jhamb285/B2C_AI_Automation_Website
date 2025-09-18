# ROI Calculator - Complete Backend Logic Documentation

This document contains all the calculation formulas, logic, and data flow for the ROI Calculator backend.

## Input Variables

### User Inputs (from sliders)
```javascript
const monthlyLeads = inputs.monthlyLeads[0]                    // Range: 50-2,000 (default: 500)
const aov = inputs.avgOrderValue[0]                           // Range: $150-$600 (default: $225)
const currentConversion = inputs.currentConversionRate[0] / 100  // Range: 5%-50% (default: 15%)
const marketingBudget = inputs.monthlyMarketingBudget[0]      // Range: $5K-$100K (default: $25K)
const callTime = inputs.avgCallHandlingTime[0]               // Range: 5-20 minutes (default: 8)
const followUps = inputs.followUpAttempts[0]                 // Range: 1-8 attempts (default: 3)
const hourlyRate = inputs.staffHourlyRate[0]                 // Range: $15-$100/hour (default: $35)
```

### Industry Benchmarks
```javascript
const industryBenchmarks = {
  'pest-control': {
    name: 'Pest Control',
    speedBoost: 0.95,           // 95% efficiency
    conversionBoost: 0.20,      // 20% boost
    contactRateBoost: 0.30,     // 30% boost
    avgDealSize: 171,           // US avg for general pest initial
    seasonalMultiplier: 1.2     // 20% seasonal variance
  },
  // ... other industries (HVAC, Plumbing, Roofing, Electrical)
}
```

## Current State Calculations

### Basic Revenue & Costs
```javascript
// Current performance
const currentCustomers = monthlyLeads × currentConversion
const currentRevenue = currentCustomers × aov
const currentCostPerLead = marketingBudget ÷ monthlyLeads

// Current staff costs
const currentStaffHours = (monthlyLeads × callTime ÷ 60) + (monthlyLeads × followUps × 0.5)
const currentStaffCosts = currentStaffHours × hourlyRate
```

## AI Enhancement Calculations

### Core AI Multipliers (Pest Control Specific)

#### 1. AI Receptionist
```javascript
// Formula: Monthly Leads × 1.30 (captures missed/after-hours calls)
const aiReceptionistLeadBoost = monthlyLeads × 1.30
```
**Impact:** 30% more leads captured from missed calls and after-hours inquiries

#### 2. Smart Follow-up
```javascript
// Formula: Conversion Rate × 1.20 (multi-touch sequences) - capped at 60%
const smartFollowupConversionBoost = Math.min(0.60, currentConversion × 1.20)
```
**Impact:** 20% improvement in conversion rate through automated follow-up sequences

#### 3. Lead Qualification
```javascript
// Formula: Revenue × 1.10 (better targeting + cross-sell)
const leadQualificationMultiplier = 1.10
```
**Impact:** 10% revenue increase from better lead targeting and cross-selling

#### 4. Smart Scheduling
```javascript
// Formula: Staff Admin Hours × 0.70 (≈30% efficiency gain)
const schedulingEfficiency = 0.70
```
**Impact:** 30% reduction in administrative time through automated scheduling

## Enhanced Performance Calculations

### New Revenue & Efficiency
```javascript
// Enhanced customers and revenue
const newCustomers = aiReceptionistLeadBoost × smartFollowupConversionBoost
const newRevenue = newCustomers × aov × leadQualificationMultiplier

// Enhanced staff efficiency
const newStaffHours = (aiReceptionistLeadBoost × callTime ÷ 60 + aiReceptionistLeadBoost × followUps × 0.5) × schedulingEfficiency
const newStaffCosts = newStaffHours × hourlyRate

// Marketing efficiency
const improvedCostPerLead = currentCostPerLead × 0.85  // 15% improvement
const marketingSavings = (currentCostPerLead - improvedCostPerLead) × aiReceptionistLeadBoost
```

## Individual Automation Savings

### Calculation Components
```javascript
const baseRevenue = monthlyLeads × aov × currentConversion
const aiReceptionistLeadIncrease = aiReceptionistLeadBoost - monthlyLeads
const followupConversionIncrease = Math.max(0, smartFollowupConversionBoost - currentConversion)
const staffSavingsFromEfficiency = Math.max(0, currentStaffCosts - newStaffCosts)
```

### Automation Breakdown

#### AI Receptionist
```javascript
monthlySaving = Math.max(100, aiReceptionistLeadIncrease × aov × currentConversion)
```
**Logic:** Revenue from additional leads captured × conversion rate  
**Minimum:** $100/month

#### Smart Follow-up
```javascript
monthlySaving = Math.max(50, monthlyLeads × aov × followupConversionIncrease)
```
**Logic:** Revenue from improved conversion on existing leads  
**Minimum:** $50/month

#### Lead Qualification
```javascript
monthlySaving = Math.max(25, newRevenue × 0.05)
```
**Logic:** 5% of enhanced revenue from better targeting  
**Minimum:** $25/month

#### Smart Scheduling
```javascript
monthlySaving = Math.max(50, staffSavingsFromEfficiency)
```
**Logic:** Direct staff cost savings from efficiency gains  
**Minimum:** $50/month

## Final Calculations

### Summary Metrics
```javascript
const totalMonthlySavings = sum of all automation savings
const revenueIncrease = newRevenue - currentRevenue
const totalMonthlyImpact = totalMonthlySavings + revenueIncrease
const annualImpact = totalMonthlyImpact × 12
const paybackPeriod = 8500 ÷ totalMonthlyImpact  // Assuming $8500 setup cost
const roi = (annualImpact ÷ 8500) × 100
```

### Return Object Structure
```javascript
return {
  current: {
    customers: Math.round(currentCustomers),
    revenue: currentRevenue,
    costPerLead: currentCostPerLead,
    staffHours: Math.round(currentStaffHours),
    staffCosts: currentStaffCosts
  },
  improved: {
    customers: Math.round(newCustomers),
    revenue: newRevenue,
    costPerLead: improvedCostPerLead,
    staffHours: Math.round(newStaffHours),
    staffCosts: newStaffCosts
  },
  savings: {
    monthly: totalMonthlySavings,
    annual: totalMonthlySavings × 12,
    revenueIncrease: revenueIncrease,
    totalImpact: totalMonthlyImpact,
    annualImpact: annualImpact,
    paybackPeriod: paybackPeriod,
    roi: (annualImpact ÷ 8500) × 100
  },
  automations: automationSavings,
  benchmark
}
```

## Chart Data Generation

### Pie Chart Data
```javascript
const savingsBreakdownData = Object.entries(calculations.automations).map(([key, automation]) => ({
  name: automation.name,
  value: Math.round(automation.monthlySaving),
  color: COLORS[index]
}))
```

### Comparison Data
```javascript
const comparisonData = [
  {
    category: 'Monthly Revenue',
    current: Math.round(calculations.current.revenue),
    improved: Math.round(calculations.improved.revenue),
    improvement: Math.round(calculations.savings.revenueIncrease)
  },
  {
    category: 'Staff Costs',
    current: Math.round(calculations.current.staffCosts),
    improved: Math.round(calculations.improved.staffCosts),
    improvement: Math.round(calculations.current.staffCosts - calculations.improved.staffCosts)
  },
  {
    category: 'Lead Conversion',
    current: calculations.current.customers,
    improved: calculations.improved.customers,
    improvement: calculations.improved.customers - calculations.current.customers
  }
]
```

## Key Assumptions & Constants

### Setup & Operational
- **Setup Cost:** $8,500 (used for ROI and payback calculations)
- **Minimum Thresholds:** Each automation has minimum monthly savings to prevent unrealistic low values
- **Maximum Conversion:** Capped at 60% to maintain realism
- **Seasonal Factor:** 20% multiplier for pest control seasonality

### Time Calculations
- **Follow-up Time:** 0.5 hours per follow-up attempt
- **Admin Efficiency:** 30% reduction through smart scheduling
- **Marketing Efficiency:** 15% improvement in cost-per-lead

### Revenue Enhancement
- **Lead Capture:** 30% improvement from AI receptionist
- **Conversion:** 20% improvement from smart follow-up
- **Revenue per Customer:** 10% improvement from qualification
- **Operational Efficiency:** 30% staff time savings

## Data Flow Summary

```
User Input Changes → 
updateInput() → 
inputs state update → 
calculations useMemo triggers → 
New performance calculations → 
Individual automation savings → 
Chart data useMemos trigger → 
UI components re-render
```

This backend logic ensures all slider changes flow through the complete calculation chain to update charts and metrics in real-time while maintaining realistic bounds and pest control industry-specific multipliers.