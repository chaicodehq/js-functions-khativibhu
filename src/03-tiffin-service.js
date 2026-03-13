/**
 * 🍱 Mumbai Tiffin Service - Plan Builder
 *
 * Mumbai ki famous tiffin delivery service hai. Customer ka plan banana hai
 * using destructuring parameters aur rest/spread operators.
 *
 * Functions:
 *
 *   1. createTiffinPlan({ name, mealType = "veg", days = 30 })
 *      - Destructured parameter with defaults!
 *      - Meal prices per day: veg=80, nonveg=120, jain=90
 *      - Agar mealType unknown hai, return null
 *      - Agar name missing/empty, return null
 *      - Return: { name, mealType, days, dailyRate, totalCost }
 *
 *   2. combinePlans(...plans)
 *      - Rest parameter! Takes any number of plan objects
 *      - Each plan: { name, mealType, days, dailyRate, totalCost }
 *      - Return: { totalCustomers, totalRevenue, mealBreakdown }
 *      - mealBreakdown: { veg: count, nonveg: count, ... }
 *      - Agar koi plans nahi diye, return null
 *
 *   3. applyAddons(plan, ...addons)
 *      - plan: { name, mealType, days, dailyRate, totalCost }
 *      - Each addon: { name: "raita", price: 15 }
 *      - Add each addon price to dailyRate
 *      - Recalculate totalCost = new dailyRate * days
 *      - Return NEW plan object (don't modify original)
 *      - addonNames: array of addon names added
 *      - Agar plan null hai, return null
 *
 * Hint: Use { destructuring } in params, ...rest for variable args,
 *   spread operator for creating new objects
 *
 * @example
 *   createTiffinPlan({ name: "Rahul" })
 *   // => { name: "Rahul", mealType: "veg", days: 30, dailyRate: 80, totalCost: 2400 }
 *
 *   combinePlans(plan1, plan2, plan3)
 *   // => { totalCustomers: 3, totalRevenue: 7200, mealBreakdown: { veg: 2, nonveg: 1 } }
 */
export function createTiffinPlan({ name, mealType = "veg", days = 30 } = {}) {
  if(name === undefined || name === "")
  {
    return null;
  }

  let pricePerDay;
  switch(mealType)
  {
    case 'veg':
      pricePerDay = 80;
      break;
    case 'nonveg':
      pricePerDay = 120;
      break;
    case 'jain':
      pricePerDay=90;
      break;
    default:
      return null;  
  }
  
   const totalCost = pricePerDay * days;

  return { name, mealType, days, dailyRate: pricePerDay, totalCost }
}

export function combinePlans(...plans) {
   if(plans.length == 0){
    return null;
   }

   const totalCustomers = plans.length;
   
   let totalRevenue = 0;
   const mealBreakdown = {veg: 0, nonveg: 0, jain:0}; //object accumulator
   
   for(const obj of plans){
    totalRevenue += obj.totalCost;

    if(obj.mealType == 'veg'){
      mealBreakdown.veg++;
    }
    else if(obj.mealType == 'nonveg')
    {
      mealBreakdown.nonveg++;
    }
    else if(obj.mealType == 'jain'){
       mealBreakdown.jain++;
    }  
   }
   
   return { totalCustomers, totalRevenue, mealBreakdown };
}

export function applyAddons(plan, ...addons) {
  if(plan === null){
    return null;
  }

  let newPlan = {...plan};

  addons.forEach((addon)=> newPlan.dailyRate += addon.price);

  const newTotalCost = newPlan.dailyRate * newPlan.days; 
  newPlan.totalCost = newTotalCost;

  const addonNames = addons.map((addon)=> addon.name);
  newPlan = {...newPlan,addonNames};  // newPlan = {...newPlan,addonNames: addonNames};

  return newPlan;
}
