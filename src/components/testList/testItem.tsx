import { useNavigate } from "react-router-dom"
import { ITests } from "../../types"

interface IProps {
  test: ITests
  onDelete: (id: number) => void
}

export const TestItem: React.FC<IProps> = ({ test, onDelete }) => {
  const navigate = useNavigate()

  const handleClickPass = () => {
    navigate(`/test/pass/${test.id}`)
  }

  const handleClickEdit = () => {
    navigate(`/test/edit/${test.id}`)
  }

  const handleDeleteTest = () => {
    onDelete(test.id as number)
  }

  return (
    <div className="bg-gray-800 text-gray-200 rounded-lg shadow-lg p-6 mb-6 transform transition-transform hover:scale-105 flex flex-col h-full">
      <h3 className="text-xl font-semibold text-blue-500 mb-4 text-center">
        {test.title}
      </h3>

      <p className="text-gray-400 text-center mb-6">{test.description}</p>

      <div className="flex justify-center gap-4 mt-auto">
        <button
          onClick={handleClickEdit}
          className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-300"
        >
          Edit
        </button>
        <button
          onClick={handleClickPass}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Pass
        </button>
        <button
          onClick={handleDeleteTest}
          className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-red-600 transition duration-300"
        >
          Delete
        </button>
      </div>
    </div>
  )
}
