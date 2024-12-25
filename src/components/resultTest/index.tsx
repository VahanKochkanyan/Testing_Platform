import { useParams } from "react-router-dom"
import { useGetAllTestsQuery } from "../../store/api/tests.api"

export const TestResults = () => {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading, error } = useGetAllTestsQuery(id)

  const testResults = JSON.parse(localStorage.getItem("testResults") || "[]")
  const testDetails = JSON.parse(localStorage.getItem("testDetails") || "[]")

  if (isLoading) {
    return <div className="h-screen flex justify-center items-center">Loading...</div>
  }

  if (error || !data) {
    return <div className="h-screen flex justify-center items-center">Error loading test results</div>
  }


  const correctCount = data.questions.reduce((count, question) => {
    const userAnswer = testResults.find((q: any) => q.id === question.id)?.userAnswer
    const correctAnswer = question.answers.find((answer) => answer.isCorrect)?.text
    return userAnswer === correctAnswer ? count + 1 : count
  }, 0)

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-6">
      <h2 className="text-4xl font-bold text-center text-blue-500 mb-8">{data.title} - Results</h2> 

      <div className="mb-6 p-6 bg-gray-800 rounded-lg shadow-md">
        <p className="text-3xl font-semibold text-center text-green-600"> 
          Correct Answers: {correctCount} / {data.questions.length}
        </p>
      </div>

      <div className="mb-6 p-6 bg-gray-800 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold text-center text-blue-500 mb-3"> 
          Details
        </h3>
        <ul>
          {testDetails.map((detail: any, index: number) => (
            <li key={index} className="p-3 border-b border-gray-600 text-gray-400">
              <strong className="text-gray-200">{detail.name}</strong> - Correct Answers: {detail.correctCount} /{" "}
              {data.questions.length}
            </li>
          ))}
        </ul>
      </div>

      {data.questions.map(question => {
        const userAnswer = testResults.find((q: any) => q.id === question.id)?.userAnswer

        return (
          <div key={question.id} className="mb-6 p-6 bg-gray-800 rounded-lg shadow-md">
            <p className="text-2xl font-semibold text-center text-gray-200 mb-4"> 
              {question.question}
            </p>
            <ul className="space-y-3 text-center">
              {question.answers.map(answer => {
                const isUserAnswer = userAnswer === answer.text
                const isCorrectAnswer = answer.isCorrect

                let className = "p-3 rounded-lg cursor-pointer mx-auto"
                if (isUserAnswer) {
                  className += isCorrectAnswer
                    ? " bg-green-600 text-white"
                    : " bg-red-500 text-white"
                } else if (isCorrectAnswer) {
                  className += " bg-green-600 text-white-800"
                }

                return (
                  <li key={answer.text} className={className}>
                    {answer.text}
                  </li>
                )
              })}
            </ul>
          </div>
        )
      })}
    </div>
  )
}
