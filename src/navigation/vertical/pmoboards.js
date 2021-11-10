import { Circle, Sunset, User, Users } from "react-feather"

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
    navLink: "/pmoboard/employees/list"
  },
  {
    id: "allocation-resource",
    title: "Allocation-resource",
    icon: <Circle size={20} />,
    navLink: "/pmoboard/allocation-resource"
  }
]
