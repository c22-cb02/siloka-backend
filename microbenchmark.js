import logger from "./logger.js"

const getNS = (res) => res[0] * 1e9 + res[1];

export default function test(name, wrapped) {
  return function decorator(...args) {
    const original = wrapped;
    if (typeof original === 'function') {
      try {
        const start = getNS(process.hrtime());
        const result = original.apply(this, args);
        const end = getNS(process.hrtime());
        const delta = end - start
        logger.info(`Function ${name} ran in ${delta * 1000} nanoseconds`);
        return result;
      } catch (e) {
        logger.error(`Error from function ${original.name} (${args}
}): ${e}}`);
        throw e;
      }
    }
    return descriptor;
  };
}
