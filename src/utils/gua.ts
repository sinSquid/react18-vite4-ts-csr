type TT = { readonly name: string }

type TS = {
  -readonly [prop in keyof TT]: number
}

const tdc: TS = { name: 1 }

tdc.name = 998

console.log('name' in tdc)

class Person1 {
  name: string

  age: number

  constructor(opt: { name: string }) {
    this.name = opt.name
    this.age = 18
  }
}
