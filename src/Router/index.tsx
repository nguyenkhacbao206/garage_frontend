import { useRoutes } from "react-router-dom"
import { elementRoute } from "./routes"

function AllRoutes() {
  const allRoutes = useRoutes(elementRoute)
  return allRoutes
}

export default AllRoutes