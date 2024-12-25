export interface IFormData {
  name: string
}

export interface ITests {
  id: number | string
  title: string
  description: string
  questions: IQuestion[]
}

export interface IQuestion {
  id: string
  question: string
  answers: IAnswer[]
  userAnswer: string
  correctAnswer: string
}

export interface IAnswer {
  id: string
  text: string
  isCorrect: boolean
}


export interface IUser {
  id: string
  name: string
}

export interface IAuthState {
  user: IUser | null 
}


export interface ITestsState {
  testsList: ITests[] 
}


export interface ICheckAndAddUserAsync {
  name: string
  successFn: (name: string) => void 
  errorFn: Function
}

