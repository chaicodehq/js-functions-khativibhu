/**
 * 🎉 Festival Countdown Planner - Module Pattern
 *
 * Indian festivals ka planner bana! Module pattern use karna hai —
 * matlab ek function jo ek object return kare jisme public methods hain,
 * lekin andar ka data PRIVATE rahe (bahar se directly access na ho sake).
 *
 * Function: createFestivalManager()
 *
 * Returns an object with these PUBLIC methods:
 *
 *   - addFestival(name, date, type)
 *     date is "YYYY-MM-DD" string, type is "religious"/"national"/"cultural"
 *     Returns new total count of festivals
 *     Agar name empty or date not string or invalid type, return -1
 *     No duplicate names allowed (return -1 if exists)
 *
 *   - removeFestival(name)
 *     Returns true if removed, false if not found
 *
 *   - getAll()
 *     Returns COPY of all festivals array (not the actual private array!)
 *     Each festival: { name, date, type }
 *
 *   - getByType(type)
 *     Returns filtered array of festivals matching type
 *
 *   - getUpcoming(currentDate, n = 3)
 *     currentDate is "YYYY-MM-DD" string
 *     Returns next n festivals that have date >= currentDate
 *     Sorted by date ascending
 *
 *   - getCount()
 *     Returns total number of festivals
 *
 * PRIVATE STATE: festivals array should NOT be accessible from outside.
 *   manager.festivals should be undefined.
 *   getAll() must return a COPY so modifying it doesn't affect internal state.
 *   Two managers should be completely independent.
 *
 * Hint: This is the Module Pattern — a function that returns an object
 *   of methods, all closing over shared private variables.
 *
 * @example
 *   const mgr = createFestivalManager();
 *   mgr.addFestival("Diwali", "2025-10-20", "religious");   // => 1
 *   mgr.addFestival("Republic Day", "2025-01-26", "national"); // => 2
 *   mgr.getAll(); // => [{ name: "Diwali", ... }, { name: "Republic Day", ... }]
 *   mgr.getUpcoming("2025-01-01", 1); // => [{ name: "Republic Day", ... }]
 */
export function createFestivalManager() {
  let festivals=[];  //private state

  return {
    addFestival(name,date,type){
       if(name.trim().length === 0 || typeof date != 'string' || (type !== "religious" && type !== "national" && type !== "cultural"))
       {
        return -1;
       }

       for(let i=0;i<festivals.length;i++)
       {
         if(festivals[i].name === name)
         {
          return -1;  //addFestival() returns -1 if duplicate name is given as argument.
         }
       }
       
      return festivals.push({name,date,type});
    },

    removeFestival: function (name){
      const indexToRemove = festivals.findIndex((o)=> o.name === name);

      if(indexToRemove > -1)
      {
      festivals.splice(indexToRemove,1); //remove 1 item at indexToRemove index
      return true;
      }

      return false;
    },

    getAll: function(){
      const deepCopy = [...festivals];
      return deepCopy; 
    },

    getByType: function(type){
      return festivals.filter((festival)=> festival.type === type);
    },

    getUpcoming: function(currentDate,n=3) {
       const filteredFestivals = festivals.filter( (festival)=>{
         const d = new Date(festival.date);
         const currentD = new Date(currentDate);

         if(d >= currentD)
         {
          return true;
         }
         else{
          return false;
         }
    });
       
      const sortedFestivals = filteredFestivals.sort((a,b)=> {
       const aDate = new Date(a.date);
       const bDate = new Date(b.date);

       return aDate - bDate;   //-1 or 0 or +1 value is returned by this callback to sort() function. sort() calls this callback many times and recieves returned value. Then, sort() decides order, based on that value.
      }); //sorted by date ascending 

      return sortedFestivals.slice(0,n); //next n festivals
    },

    getCount: function(){
      return festivals.length;
    },
  };
}
