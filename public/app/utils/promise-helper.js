export const handleStatus = res =>
  res.ok ? res.json() : Promise.reject(res.statusText)

export const log = dado => {
  console.log(dado);
  return dado;
}

export const timeoutPromise = (milliseconds, promise) => {

  const timeout = new Promise((resolve, reject) => 
      setInterval(() =>
        reject(`Limite da Promise excedido: ${milliseconds} ms.`), 
        milliseconds));
  
  return Promise.race([timeout, promise]);
}

export const delay = milliseconds => data => 
  new Promise((resolve, reject) =>
    setTimeout(()=>
      resolve(data)
    , milliseconds));

export const retry = (retries, milliseconds, fn) =>
  fn().catch(err => {
    console.log(retries);
    return delay(milliseconds)().then(() => 
      retries > 1 
        ? retry(--retries, milliseconds, fn)
        : Promise.reject(err)
    )
  })