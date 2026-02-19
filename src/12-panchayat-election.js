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
  // Your code here
  const votes = {}
  const registeredVoter = new Set()

  return {
    registerVoter(voter) {
      const validator = createVoteValidator({ minAge: 18, requiredFields: ["id", "age", "name"] })
      if (!validator(voter).valid || registeredVoter.has(voter.id)) return false
      registeredVoter.add(voter.id)
      return true;
    },
    castVote(voterId, candidateId, onSuccess, onError) {
      if (registeredVoter.has(voterId) && candidates.find((candidate) => candidate.id === candidateId) && !Object.hasOwn(votes, voterId)) {
        votes[voterId] = candidateId
        return onSuccess({ voterId, candidateId })
      } else {
        let message = ""
        if(Object.hasOwn(votes, voterId)) message = `voted for ${votes[voterId]}`
        // else if()
        return onError(message)
      }
    },
    getResults(sortFn) {
      const candidateVoteCount = Object.values(votes).reduce((acc, candidateId) => {
        acc[candidateId] = (acc[candidateId] ?? 0) + 1
        return acc
      }, {})

      const result = []
      for (const candidate of candidates) {
        result.push({ ...candidate, votes: candidateVoteCount[candidate.id] })
      }

      if (!sortFn) {
        return result.sort((a, b) => b.votes - a.votes)
      } else {
        return result.sort(sortFn)
      }
    },
    getWinner() {
      if(Object.values(votes).length === 0) return null
      const winner = this.getResults()[0];
      return winner
    }
  }
}

export function createVoteValidator(rules) {
  // Your code here
  return (voter) => {
    if (rules.requiredFields.some(field => !Object.hasOwn(voter ?? {}, field) || !voter?.[field]) || voter?.age < rules.minAge) {
      return { valid: false, reason: "meri marzi" }
    } else {
      return { valid: true, reason: "accha baccha" }
    }
  }
}

export function countVotesInRegions(regionTree) {

  if(!regionTree) return 0

  let result = regionTree.votes

  function helper(count, regionList) {
    if(count >= regionList.length || regionList.length === 0 || !regionList) return;
    result += countVotesInRegions(regionList[count])
    helper(count + 1, regionList)
  }

  helper(0, regionTree?.subRegions)

  return result
}

export function tallyPure(currentTally, candidateId) {
  // Your code here
  const newTally = {...currentTally}
  newTally[candidateId] = (currentTally[candidateId] ?? 0) + 1
  return { ...newTally}
}
