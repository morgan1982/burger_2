// const animals = {
//   cat: 1,
//   dog: 2,
//   coroco: 4,
//   zebra: 3
// }

// const final = Object.keys(animals)
//   .map( animal => {
//     return [ ...Array(animals[animal])].map( _ => animal)
//   })

// console.log(final)

const animals = [ 'dog', 'cat', 'croco', 'zebra' ];

const final = animals.map( animal => 'nice' + animal );

console.log(final);