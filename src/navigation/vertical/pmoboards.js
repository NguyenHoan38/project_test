import { Sunset, Users, Calendar } from 'react-feather'

export default [
  {
    header: 'PMO App'
  },
  {
    id: 'projects',
    title: 'Projects',
    icon: <Sunset size={20} />,
    navLink: '/pmoboard/projects/list'
  },
  {
    id: 'employees',
    title: 'Employees',
    icon: <Users size={20} />,
    navLink: '/pmoboard/employees/list'
  },
  {
    id: 'scheduler',
    title: 'Scheduler',
    icon: <Calendar size={20} />,
    navLink: '/pmoboard/scheduler'
  }
]
