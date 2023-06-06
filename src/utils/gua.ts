type Mapish = { [k: string]: boolean }

type M1 = keyof Mapish

type IsEqual<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false

type M2 = string | number

type Equals<T, S> = [T] extends [S] ? ([S] extends [T] ? true : false) : false

const res: IsEqual<M1, M2> = 'sasa'

const res1: Equals<any, null> = '212'

console.log(123, typeof res)

interface TT1 {
  [key: string]: number | null
}

interface TT2 {
  [Symbol.iterator]: string
}

type asc = TT2 extends TT1 ? string : boolean
