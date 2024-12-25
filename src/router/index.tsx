import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { HomePage } from "../components/home"
import { Dashboard } from "../components/dashboard"
import { constants } from "../utils/constants"
import { TestPass } from "../components/passTest"
import { EditTest } from "../components/editTest"
import { CreateTestPage } from "../components/newTest"
import { TestResults } from "../components/resultTest"



const { paths } = constants

const router = createBrowserRouter([
  {
    path: paths.home,
    element: <HomePage />,
  },
  {
    path: paths.dashboard,
    element: <Dashboard />,
  },
  {
    path: paths.testPass,
    element: <TestPass />,
  },
  {
    path: paths.editTest,
    element: <EditTest/>
  },
  {
    path: paths.createTest,
    element: <CreateTestPage/>
  },
  {
    path: paths.testResults,
    element: <TestResults/>
  },
  {
    path: paths.other,
    element: <HomePage />,
  },
])

const RootRouter = () => {
  return <RouterProvider router={router} />
}

export default RootRouter
