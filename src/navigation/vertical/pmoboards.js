import {
  Mail,
  MessageSquare,
  CheckSquare,
  Calendar,
  FileText,
  Circle,
  ShoppingCart,
  User,
  Sunset,
  Users
} from "react-feather"

export default [
  {
    header: "PMO App"
  },
  {
    id: "projects",
    title: "Projects",
    icon: <Sunset size={20} />,
    navLink: "/pmoboard/projects/list"

  },
  {
    id: "employees",
    title: "Employees",
    icon: <Users size={20} />,
    children: [
      {
        id: "list",
        title: "List",
        icon: <Circle size={12} />,
        navLink: "/pmoboard/employees/list"
      }
    ]
  }
]
