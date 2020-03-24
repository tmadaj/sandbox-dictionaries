interface Report {
  consistent: boolean;
  severity: 'error' | 'warn' | 'consistent';
}

function checkForForks(dictArray, dictMap): boolean {
  return dictArray.length !== dictMap.size;
}

function checkForChains(dictArray, dictMap): boolean {
  const dictReversedMap = new Map(dictArray.map(([key, val]) => [val, key]));
  const merged = new Map([...dictMap, ...dictReversedMap]);

  return merged.size !== dictMap.size + dictReversedMap.size;
}

function findForks(dictObj): string[] {
  let report = [];
  const log = new Map();

  Object.entries(dictObj).forEach(([id, [domain, range]]) => {
    // Ignore duplicates
    if (log.has(domain) && log.get(domain).range !== range) {
      report = [...report, id, log.get(domain).id];
    } else {
      log.set(domain, { id, range });
    }
  });

  return [...new Set(report)];
}

function findDuplicates(dictObj): string[] {
  let report = [];
  const log = new Map();

  Object.entries(dictObj).forEach(([id, [domain, range]]) => {
    const domainrange = `${domain}${range}`;

    if (log.has(domainrange)) report = [...report, id, log.get(domainrange)];
    else log.set(domainrange, id);
  });

  return [...new Set(report)];
}

function findChains(domainIdMap, dictMap): string[] {
  let report = [];

  dictMap.forEach((range, domain) => {
    let chainIds = [];
    let nextDomain = range;

    // TODO: optimisation: skip visited
    while (domainIdMap.has(nextDomain) && nextDomain !== domain) {
      chainIds = [...chainIds, domainIdMap.get(nextDomain)];
      nextDomain = dictMap.get(nextDomain);
    }
    if (nextDomain !== domain) report = [...report, ...chainIds];
    // TODO:counter of chains
  });

  return [...new Set(report)];
}

function findCycles(domainIdMap, dictMap): string[] {
  let report = [];

  dictMap.forEach((range, domain) => {
    let chainIds = [];
    let nextDomain = range;

    // TODO: optimisation: skip visited
    while (domainIdMap.has(nextDomain) && nextDomain !== domain) {
      chainIds = [...chainIds, domainIdMap.get(nextDomain)];
      nextDomain = dictMap.get(nextDomain);
    }
    if (nextDomain === domain) report = [...report, ...chainIds];
    // TODO:counter of cycles
  });

  return [...new Set(report)];
}

function evaluateSeverity(containsFork, containsChain): string {
  if (containsChain) return 'error';
  if (containsFork) return 'warn';
  return 'consistent';
}

//* Case and whitespace sensitive
//* Allow for entries where domain = range
//* Duplicate is Fork and Cycle is Chain
// TODO parallelise
export default function validateConsistency(dictObj, verbose = false): Report {
  const dictArray = Object.values(dictObj).filter(([key, val]) => key !== val);
  const dictMap = new Map(dictArray);
  const containsFork = checkForForks(dictArray, dictMap);
  const containsChain = checkForChains(dictArray, dictMap);
  const consistent = !containsFork && !containsChain;
  const severity = evaluateSeverity(containsFork, containsChain);
  let details = {};

  if (verbose) {
    const domainIdMap = new Map(Object.entries(dictObj).map(([id, [value]]) => [value, id]));

    details = {
      forks: verbose && containsFork ? findForks(dictObj) : [],
      duplicates: verbose && containsFork ? findDuplicates(dictObj) : [],
      chains: verbose && containsChain ? findChains(domainIdMap, dictMap) : [],
      cycles: verbose && containsChain ? findCycles(domainIdMap, dictMap) : [],
    };
  }

  return { consistent, severity, details };
}
