module.exports.add = function(x, y){
console.log(`adding ${x} and ${y}`)
  return (x + y);
};

module.exports.multiply = function(x,y) {
  let product = 0;
  for (let i =0; i<y; i++) {
    product= module.exports.add(product, x);
  }
  return(product);
};


function divide(x,y) {
  return (x/y);
}

function divideAsync(x,y, cb){
  setTimeout(function(){
    if (!y) {
      cb("y is 0", null);
    }
    else{

      cb (null,divide(x,y));
    }
  }, 500);

}

module.exports.divideA= divideAsync;

function subtract(x,y){
  return(x-y);
}
function subtractAsync(x,y){
  return new Promise(function(resolve,reject){
    setTimeout(function(){
      if (x == 3) {
        reject('3 is Eville');
      }
      else{
        resolve(subtract(x,y));
      }

    }, 500);
  });
}

module.exports.subtractA=subtractAsync;