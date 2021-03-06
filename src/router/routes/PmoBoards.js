import { lazy } from "react"

const PmoBoardRoutes = [
  {
    path: "/pmoboard/projects/list",
    component: lazy(() => import("../../views/pmoboard/projects/list")),
    exact: true
  },
  {
    path: '/pmoboard/employees/list',
    component: lazy(() => import('../../views/pmoboard/employees/list')),
    exact: true
  },
  {
    path: "/pmoboard/allocation-resource",
    component: lazy(() => import("../../views/pmoboard/allocation-resource")),
    exact: true
  }
]

export default PmoBoardRoutes
