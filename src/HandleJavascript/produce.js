import { produce } from 'immer'

const originalObject = { x: 1, y: 2 }

const modifiedObject = produce(originalObject, (draftObject) => {
  draftObject.x = 10
})

console.log(originalObject) // { x: 1, y: 2 }
console.log(modifiedObject) // { x: 10, y: 2 }

const a = {
  name: 'B',
  age: 10
}

const b = a
b.name = 'Hoan'

// const b = produce(a, (draft) => {
//   draft.age = 100
// })
console.log(a) //{ name: 'Hoan', age: 10 }
console.log(b) //{ name: 'Hoan', age: 10 }
