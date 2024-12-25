import { useForm } from "react-hook-form"
import { IFormData } from "../../types"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../store"
import { checkAndAddUserAsync } from "../../store/features/authSlice"
import { toast } from "react-toastify"
import { constants } from "../../utils/constants"
import { useEffect } from "react"

const { paths } = constants

export const HomePage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<IFormData>()

  useEffect(() => {
    const storedName = sessionStorage.getItem("userName")
    if (storedName) {
      setValue("name", storedName)
    }
  }, [setValue])

  const onSubmit = ({ name }: IFormData) => {
    const successFn = (name: string) => {
      sessionStorage.setItem("userName", name)
      navigate(paths.dashboard)
    }
    const errorFn = () => {
      reset()
      toast.error("User is already")
    }
    dispatch(checkAndAddUserAsync({ name, successFn, errorFn }))
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-700 text-white">
      <h1 className="text-center text-4xl font-bold mb-16 tracking-wide">
        Welcome to the Testing Platform
      </h1>
      <div className="bg-gradient-to-b from-indigo-800 to-blue-900 p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-6"
        >
          <input
            type="text"
            placeholder="Enter your username"
            {...register("name", { required: "Name is required" })}
            className="px-4 py-3 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-indigo-700 text-white placeholder-gray-300 shadow-inner"
          />
          {errors.name && (
            <p className="text-red-400 text-sm">{errors.name.message}</p>
          )}
          <button
            type="submit"
            className="py-3 mt-4 bg-blue-600 rounded-lg text-lg font-medium tracking-wide hover:bg-blue-700 hover:shadow-lg transition-all duration-300"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  )
}
