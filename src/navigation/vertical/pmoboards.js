import { Mail, MessageSquare, CheckSquare, Calendar, FileText, Circle, ShoppingCart, User, Sunset } from 'react-feather'

export default [
  {
    header: 'PMO App'
  },
  {
    id: 'projects',
    title: 'Projects',
    icon: <Sunset size={20} />,
    children: [
      {
        id: 'list',
        title: 'List',
        icon: <Circle size={12} />,
        navLink: '/pmoboard/projects/list'
      },
      {
        id: 'view',
        title: 'View',
        icon: <Circle size={12} />,
        navLink: '/pmoboard/projects/view'
      },
      {
        id: 'edit',
        title: 'Edit',
        icon: <Circle size={12} />,
        navLink: '/pmoboard/projects/edit'
      },
      {
        id: 'test',
        title: 'test',
        icon: <Circle size={12} />,
        navLink: '/pmoboard/projects/test'
      }
    ]
  },
  {
    id: 'users',
    title: 'User',
    icon: <User size={20} />,
    children: [
      {
        id: 'list',
        title: 'List',
        icon: <Circle size={12} />,
        navLink: '/apps/user/list'
      },
      {
        id: 'view',
        title: 'View',
        icon: <Circle size={12} />,
        navLink: '/apps/user/view'
      },
      {
        id: 'edit',
        title: 'Edit',
        icon: <Circle size={12} />,
        navLink: '/apps/user/edit'
      }
    ]
  }
]
