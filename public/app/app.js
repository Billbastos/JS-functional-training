import { log, timeoutPromise, retry } from './utils/promise-helper.js';
import { notasService as service } from './nota/service.js';
import './utils/array-helpers.js';
import { takeUntil, debounceTime, pipe, partialize } from './utils/operators.js'  
import { EventEmitter } from './utils/event-emitter.js';
import { Maybe } from './utils/maybe.js';

// Nesse caso a ordem do pipe devera ser invertida devido a ordem de chamada dos callbacks
const operations = pipe(
  partialize(takeUntil, 3),
  partialize(debounceTime, 500)
)

const actionWithPipe = operations(() =>
      retry(3, 2000, () => timeoutPromise(200, service.sumItems('2143')))
      .then( total => EventEmitter.emit('itensTotalizados', total ))
      .catch( console.log )
    );

const action = debounceTime( 500, 
  takeUntil( 3, () =>
    service
      .sumItems('2143')
      .then( console.log )
      .catch( console.log )
    )
  );

// Roda a funcao definida acima
document
  .querySelector('#myButton')
  .onclick = actionWithPipe;


// Testando MONADAS classe Maybe
const value = Maybe.of(null)
  .map(valor => valor + 10)
  .map(valor => valor + 5)
  .getOrElse(0);

console.log(value);

const textToArray = textM => textM.map(text => Array.from(text));
const arrayToText = arrayM => arrayM.map(array=>array.join(''));

const transform = pipe(textToArray, arrayToText)
const result = transform(Maybe.of(null))

console.log(result.getOrElse(''));