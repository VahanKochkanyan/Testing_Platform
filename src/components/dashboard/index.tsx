import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../../store"
import { getUserName } from "../../store/selectors"
import { TestList } from "../testList/testList"

export const Dashboard = () => {
  const userName = useAppSelector(getUserName)
  const navigate = useNavigate()

  const handleClickCreate = () => {
    navigate("/test/create")
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col items-center">
      <header className="w-full max-w-4xl text-center py-8">
        <h1 className="text-4xl font-bold text-blue-500 mb-4">
          Welcome, <span className="text-indigo-400">{userName}</span>
        </h1>
        <p className="text-gray-300">Create and manage your tests effortlessly</p>
      </header>

      <div className="my-8">
        <button
          onClick={handleClickCreate}
          className="px-8 py-4 bg-blue-500 text-white font-medium text-lg rounded-lg shadow-lg hover:bg-green-600 transition-transform transform hover:scale-105"
        >
          Create New Test
        </button>
      </div>

      <main className="w-full max-w-5xl">
        <TestList />
      </main>

      <footer className="mt-16 py-4 text-center text-gray-400 text-sm">
        Built with 💙 for users who love clean and elegant designs.
      </footer>
    </div>
  )
}
