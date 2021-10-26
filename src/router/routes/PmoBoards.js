import { lazy } from 'react'

const PmoBoardRoutes = [
  {
    path: '/pmoboard/projects/list',
    component: lazy(() => import('../../views/pmoboard/projects/list')),
    exact: true
  },
  {
    path: '/pmoboard/projects/test',
    component: lazy(() => import('../../views/pmoboard/projects/test')),
    exact: true
  },
  {
    path: '/pmoboard/employees',
    component: lazy(() => import('../../views/pmoboard/employees')),
    exact: true
  }
]

export default PmoBoardRoutes
