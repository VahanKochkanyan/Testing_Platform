import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../store"
import { getTests } from "../../store/selectors"
import { deleteTestAsync, getTestsAsync } from "../../store/features/testsSlice"
import { TestItem } from "./testItem"

export const TestList = () => {
  const testsList = useAppSelector(getTests)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getTestsAsync())
  }, [dispatch])

  const handleDelete = (id: number) => {
    dispatch(deleteTestAsync(id))
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 bg-gray-900">
      {testsList.map((test) => (
        <TestItem key={test.id} test={test} onDelete={handleDelete} />
      ))}
    </div>
  )
}
