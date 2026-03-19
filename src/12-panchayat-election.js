/**
 * 🗳️ Panchayat Election System - Capstone
 *
 * Village ki panchayat election ka system bana! Yeh CAPSTONE challenge hai
 * jisme saare function concepts ek saath use honge:
 * closures, callbacks, HOF, factory, recursion, pure functions.
 *
 * Functions:
 *
 *   1. createElection(candidates)
 *      - CLOSURE: private state (votes object, registered voters set)
 *      - candidates: array of { id, name, party }
 *      - Returns object with methods:
 *
 *      registerVoter(voter)
 *        - voter: { id, name, age }
 *        - Add to private registered set. Return true.
 *        - Agar already registered or voter invalid, return false.
 *        - Agar age < 18, return false.
 *
 *      castVote(voterId, candidateId, onSuccess, onError)
 *        - CALLBACKS: call onSuccess or onError based on result
 *        - Validate: voter registered? candidate exists? already voted?
 *        - If valid: record vote, call onSuccess({ voterId, candidateId })
 *        - If invalid: call onError("reason string")
 *        - Return the callback's return value
 *
 *      getResults(sortFn)
 *        - HOF: takes optional sort comparator function
 *        - Returns array of { id, name, party, votes: count }
 *        - If sortFn provided, sort results using it
 *        - Default (no sortFn): sort by votes descending
 *
 *      getWinner()
 *        - Returns candidate object with most votes
 *        - If tie, return first candidate among tied ones
 *        - If no votes cast, return null
 *
 *   2. createVoteValidator(rules)
 *      - FACTORY: returns a validation function
 *      - rules: { minAge: 18, requiredFields: ["id", "name", "age"] }
 *      - Returned function takes a voter object and returns { valid, reason }
 *
 *   3. countVotesInRegions(regionTree)
 *      - RECURSION: count total votes in nested region structure
 *      - regionTree: { name, votes: number, subRegions: [...] }
 *      - Sum votes from this region + all subRegions (recursively)
 *      - Agar regionTree null/invalid, return 0
 *
 *   4. tallyPure(currentTally, candidateId)
 *      - PURE FUNCTION: returns NEW tally object with incremented count
 *      - currentTally: { "cand1": 5, "cand2": 3, ... }
 *      - Return new object where candidateId count is incremented by 1
 *      - MUST NOT modify currentTally
 *      - If candidateId not in tally, add it with count 1
 *
 * @example
 *   const election = createElection([
 *     { id: "C1", name: "Sarpanch Ram", party: "Janata" },
 *     { id: "C2", name: "Pradhan Sita", party: "Lok" }
 *   ]);
 *   election.registerVoter({ id: "V1", name: "Mohan", age: 25 });
 *   election.castVote("V1", "C1", r => "voted!", e => "error: " + e);
 *   // => "voted!"
 */
export function createElection(candidates) {
  let votes = {};    //private state
  let registeredVoters = new Set();  //created an empty set named registeredVoters  //private state

  for(let i=0; i<candidates.length; i++)
  {
    votes[candidates[i].id] = 0; 
  }

  return {
      registerVoter(voter){
        if(typeof voter !== 'object' || voter === null || voter === undefined || Object.keys(voter).length == 0 || registeredVoters.has(voter.id))
        {
          return false;
        }
        if(voter.age < 18)
        {
          return false;
        }
        registeredVoters.add(voter.id); //added in the set
        return true;
      },

      castVote(voterId,candidateId,onSuccess,onError){
        if( !registeredVoters.has(voterId)) //voter not registered ? 
        {
          return onError("reason string"); //we return the callback's return value
        }

        if(!votes.hasOwnProperty(candidateId) )  //candidate does not exist
        {
          return onError("reason string");
        }

        if(votes[voterId] == 1) //already voted ?
        {
          return onError("reason string");
        }

        votes[candidateId] += 1; //record a vote
        votes[voterId] = 1;   //voter can vote only one candidate

        return onSuccess({voterId,candidateId});
      },

      getResults(sortFn){
        
        const res = [];

        for(let i=0; i<candidates.length; i++)
        {
          res.push( {...candidates[i], votes: votes[(candidates[i]).id] } );
        }

        
        if(sortFn === undefined)
        {
          res.sort((a,b)=> b.votes- a.votes); //sort by decreasing votes 
        }

        else 
        {
         res.sort(sortFn); //sortFn is sort comparator function      
        }

        return res;
      },

      getWinner(){
         //no votes cast
        if(Object.values(votes).every((e)=> e === 0) )
        {
          return null; 
        }
       
        const maximumVotes = candidates.reduce((acc,candidate) => {
          if(votes[candidate.id] > acc)
            {
              return votes[candidate.id];
            }  
          return acc;  
         },-Infinity);

       for(let i=0; i<candidates.length; i++)
        {
          if(votes[(candidates[i]).id] == maximumVotes)
          {
          return candidates[i];  //return candidate object
          }
        }  
      },
  };
}

export function createVoteValidator(rules) {

  return function fun(voter){
     if(!voter.hasOwnProperty("id")) //validation
     {
      return {valid:false, reason: "id missing"};
     }
    if( !voter.hasOwnProperty("name") ){
      return {valid: false, reason: "name missing"};
    }
     if(!voter.hasOwnProperty("age"))
     {
      return {valid:false, reason: "age missing"};
     }
     if(voter.age < rules.minAge)
     {
      return {valid: false, reason: "age < 18"};
     }

     return {valid: true,reason: "all rules valid"};
  };
}

export function countVotesInRegions(regionTree) {
  if(regionTree === null || typeof regionTree !== 'object')
  {
    return 0;
  }
  
  const [head,tail] = regionTree.subRegions;
  
  const currVotes = regionTree.votes;

  return currVotes + countVotesInRegions(head) + countVotesInRegions(tail); 
}

export function tallyPure(currentTally, candidateId) {
  const newTally = {...currentTally};
  
  if(!newTally.hasOwnProperty(candidateId))
  {
    newTally[candidateId] = 1;
    return newTally;
  }

  newTally[candidateId] += 1;
  return newTally; 
}
