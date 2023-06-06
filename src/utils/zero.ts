interface Person {
  readonly name: string
  age: number
  idCard?: boolean // when age > 18
}

const student: Person = { name: 'tom', age: 16 }

// after 2 years
setTimeout(() => {
  student.age = 18
  student.idCard = Math.random() * Number.MAX_SAFE_INTEGER
}, 2000)

interface Air {
  [key: string | symbol]: string | number
}

interface Union extends Person, Air {}

type Union2 = Person & Air

const tt: Union2 = { name: 'aa', age: 18, idCard: false }

interface contentBox<T> {
  content: T
}

const stst: contentBox<string> = { content: 'hello' }

const std: contentBox<Person> = { content: { name: 'tom', age: 16 } }

const arr: ReadonlyArray<number> = [1, 2, 3]

const str: readonly string[] = ['asas', 'dasd']

const pair: [string, number, boolean] = [1, 'dsddds', true, undefined, null]

const pair1: Array<string | number> = [1, 'sasa']

const Either2dOr3d: [number, string, boolean?] = [1, 'sas', true]

type pkey = 'x' | 'y' | 'z'

type pkey1 = keyof { x: 1; y: 2; z: 3 }
