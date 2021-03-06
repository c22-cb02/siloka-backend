import logger from "./logger.js"

const getNS = (res) => res[0] * 1e9 + res[1];

export default function microbenchmark(wrapped) {
  return function decorator(...args) {
    if (typeof wrapped === 'function') {
      try {
        const start = getNS(process.hrtime());
        const result = wrapped.apply(this, args);
        const end = getNS(process.hrtime());
        const delta = end - start
        logger.info(`Function ${wrapped.name} ran in ${delta * 1000} nanoseconds`);
        return result;
      } catch (e) {
        logger.error(`Error from function ${wrapped.name} with \n\n${args} \n\nas arguments. Errors: ${e}`);
        throw e;
      }
    }
    return descriptor;
  };
}
