- To initialize the server run `node server`
- To load the modules, we need a loader. Let's use the default Chome module loader.

1 - Loading modules through Chrome Loader
---------------------------------------------
- Create app.js inside /app folder
- add the following code to the file 
  `document
    .querySelector('#myButton')
    .onclick = () => alert('hi!');`
- import the script inside `index.html` using the argument type="module" (e.g: <script type="module" src="app/app.js"></script>) 
- Fetching data from the server
import { handleStatus } from './utils/promise-helper.js'
document
  .querySelector('#myButton')
  .onclick = () => 
    fetch('http://localhost:3000/notas')
      .then( handleStatus ) 
      .then( console.log )
      .catch( console.log );
- We need to create a `handleStatus` file under `./utils/` and export it.
export const handleStatus = res =>
  res.ok ? res.json() : Promise.reject(res.statusText)
- Functor (Every object that can be mapped) and Array is a Functor because it contains .map()

2 - Creating a flatmap function
---------------------------------------------
- Create a file called array-helpers.js inside the utils folder
- Test if the Array already has this method `if(!Array.prototype.$flatmap)`
- Array.prototype.$flatMap = function(cb) { this.map(cb).reduce((destArray, array) => destarray.concat(array), [])}

3 - Creating a service
---------------------------------------------
- Partial application 
  `fn = (a, b) { return a + b}`
  `fn2 = fn.bind(null, 2)` // a is always going to be 2
  `fn2(5)` // return a sum of 2 and 5 = 10
- Function composition:
return this.listAll()
  .then(notas => 
    sumItemsValue(
      filterItems(
        getItemsFromNotas(notas)
      )
    )
  );
- Point free functions:
- Instead of using the format above it should be somenthing like this:
  `const sumItems = compose(sumItemsValue, filterItems, getItemsFromNotas)`
- Using compose through .reduceRight();
- Using pipe through .reduce()

4 - Function takeUntil
---------------------------------------------
- Receive a number of attempts and a function as a parameter;
- The function will run the max of the number sent as a parameter;
export const takeUntil = (times, fn) => 
    () => times-- > 0 && fn();

5 - Promise race
---------------------------------------------
- Promise.race([p1,p2]).then(console.log).catch(console.log);
- Just the faster promise executed will be return as a then or catch;
- let p1 = new Promise((resolve, reject) => setTimeout(()=>resolve('ok'), 1000))
- let p2 = new Promise((resolve, reject) => setTimeout(()=>reject('not ok'), 500))
- In the example above, the catch will be send to Promise race and the message 'not ok' will be displayied.

6 - Retry
---------------------------------------------
- It needs to run just when it gets an error in a Promise
- It should have a delay before try again

7 - PUB / SUB pattern
---------------------------------------------
- Publish receive a topic and Data
- Subscriber receive a topic
- EventEmmiter NodeJS, follows the PUB/SUB pattern, So, we are going to build our own EventEmmiter for the browser following the same principles;

8 - Monads
---------------------------------------------
- It is a functor (map) to a type (Maybe.js)
- Type wrapper