import { lazy } from 'react'

const EmployeesRoutes = [
  {
    appLayout: true,
    path: "/pmoboard/employees/list",
    component: lazy(() => import("../../views/pmoboard/employees/list"))
  }
]

export default EmployeesRoutes
