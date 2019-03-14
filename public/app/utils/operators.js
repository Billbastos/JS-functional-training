export const partialize = (fn, ...args) => 
    fn.bind(null, ...args); // Partial application

export const compose = (...fns) => value => 
    fns.reduceRight((previousValue, fn) => fn(previousValue) ,value); // Point free functions

export const pipe = (...fns) => value => 
    fns.reduce((previousValue, fn) => fn(previousValue) ,value); // Point free functions

export const takeUntil = (times, fn) => 
    () => times-- > 0 && fn();

export const debounceTime = (milliseconds, fn) => { 
    let timer = 0;
    return () => {
      clearTimeout(timer)
      timer = setTimeout(fn, milliseconds);
    }
  }