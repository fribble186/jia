function test(){
  return new Promise(function (resolve, reject){
    var timeout = false
    if(timeout){resolve(timeout)}
    else{reject(timeout)}
  })
}
module.exports = {a(){return test().then(timeout=>timeout).catch(timeout=>timeout)}}