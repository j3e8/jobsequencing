const input = [
  { arrival: -3, processTime: 9, due: 31 },
  { arrival: -10, processTime: 5, due: 43 },
  { arrival: 0, processTime: 15, due: 50 },
  { arrival: -12, processTime: 1, due: 16 },
  { arrival: -2, processTime: 8, due: 54 },
  { arrival: -3, processTime: 14, due: 42 },
  { arrival: -14, processTime: 3, due: 1 },
  { arrival: -8, processTime: 10, due: 22 },
  { arrival: -3, processTime: 9, due: 39 },
  { arrival: -2, processTime: 4, due: 34 },
];

function calculateTimes(jobs) {
  let result = new Array(jobs.length);
  let current = 0;
  for (var i=0; i < jobs.length; i++) {
    result[i] = {};
    result[i].start = current;
    current += jobs[i].processTime;
    result[i].finish = current;
    result[i].flow = result[i].finish + Math.abs(jobs[i].arrival);
    if (result[i].finish <= jobs[i].due) {
      result[i].delay = 0;
    }
    else {
      result[i].delay = result[i].finish - jobs[i].due;
    }
  }
  return result;
}

function runPermutation(arr, jobs, result) {
  for (var i=0; i < jobs.length; i++) {
    if (arr.indexOf(i) == -1) {
      arr.push(i);
      if (arr.length == jobs.length) {
        // console.log(arr);
        let orderedJobs = arr.map((a) => jobs[a]);
        let times = calculateTimes(orderedJobs);
        let totalDelay = times.reduce((total, current) => {
          return total + current.delay;
        }, 0);
        let averageDelay = totalDelay / times.length;
        let totalFlow = times.reduce((total, current) => {
          return total + current.flow;
        }, 0);
        let averageFlow = totalFlow / times.length;

        if (result.minDelay === undefined || averageDelay < result.minDelay || (averageDelay == result.minDelay && averageFlow < result.minFlow)) {
          result.minDelay = averageDelay;
          result.minFlow = averageFlow;
          result.winningSequence = arr.slice(0);
        }
      }
      else {
        runPermutation(arr, jobs, result);
      }
      arr.pop();
    }
  }
}

function getPDT(jobs) {
  let orderedJobs = jobs.sort((a, b) => {
    let pdta = a.processTime + Math.abs(a.due);
    let pdtb = b.processTime + Math.abs(b.due);
    return pdta - pdtb;
  });
  console.log('pdt', orderedJobs);
  let times = calculateTimes(orderedJobs);
  let totalDelay = times.reduce((total, current) => {
    return total + current.delay;
  }, 0);
  let averageDelay = totalDelay / times.length;
  return averageDelay;
}

let startTime = new Date().getTime();
let result = {};
runPermutation([], input, result);
let endTime = new Date().getTime();
let elapsedTime = endTime - startTime;
console.log(result);
console.log(`elapsed time: ${elapsedTime}ms`);

let pdt = getPDT(input);
console.log(`pdt: ${pdt}`);
