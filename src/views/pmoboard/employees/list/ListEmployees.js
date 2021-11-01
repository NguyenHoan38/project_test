// ** React Imports
import Avatar from '@components/avatar'
import FormatFns from '@src/utility/FormatFns'
// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import join from 'lodash.join'
import { useCallback, useEffect, useMemo, useState } from 'react'
import DataTable from 'react-data-table-component'
import { ChevronDown, Edit } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Badge, Button, Card } from 'reactstrap'
// ** Store & Actions
import { getEmployeeDetails, getFilteredEmployees } from '../store/action'
import ListEditEmployee from './ListEditEmployee'
import ListHeader from './ListHeader'

const EmployeesList = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector((state) => state.employees)

  // ** States
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [skills, setSkills] = useState([])
  const [employeeId, setEmployeeId] = useState(null)

  const handleOnChangeRowsPerPage = async (perPage, page) => {
    // dispatch(
    //   getData({
    //     page: currentPage,
    //     perPage,
    //     role: currentRole.value,
    //     currentPlan: currentPlan.value,
    //     status: currentStatus.value,
    //     q: searchTerm
    //   })
    // )
    // setRowsPerPage(perPage)
  }

  const handleOnChangePage = (page) => {
    // dispatch(
    //   getData({
    //     page: page + 1,
    //     perPage: rowsPerPage,
    //     role: currentRole.value,
    //     currentPlan: currentPlan.value,
    //     status: currentStatus.value,
    //     q: searchTerm
    //   })
    // )
    // setCurrentPage(page + 1)
  }

  const handleOnSearch = (searchTerm) => {
    setSearchTerm(searchTerm)
  }

  const handleSelectSkills = (skills) => {
    setSkills(skills)
  }

  // ** Get data on mount
  useEffect(() => {
    dispatch(
      getEmployeeDetails({
        page: currentPage,
        perPage: rowsPerPage,
        skills,
        searchTerm
      })
    )
  }, [dispatch])

  // ** Function in get data on rows per page
  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value)
    // dispatch(
    //   getData({
    //     page: currentPage,
    //     perPage: value,
    //     role: currentRole.value,
    //     currentPlan: currentPlan.value,
    //     status: currentStatus.value,
    //     q: searchTerm
    //   })
    // )
    setRowsPerPage(value)
  }

  useEffect(() => {
    dispatch(
      getFilteredEmployees({
        page: currentPage,
        perPage: rowsPerPage,
        searchTerm,
        skills: skills.map((skill) => skill.value)
      })
    )
  }, [searchTerm, skills])

  const handleOpenEditEmployee = (employeeId) => () => {
    setEmployeeId(employeeId)
  }

  const handleCloseEditEmployee = useCallback(() => {
    setEmployeeId(null)
  }, [])

  const columns = useMemo(
    () => [
      {
        name: 'Actions',
        minWidth: '70px',
        center: true,
        cell: (row) => {
          const { id } = row
          return (
            <Button.Ripple
              className="btn-icon rounded-circle"
              color="light-primary"
              onClick={handleOpenEditEmployee(id)}
            >
              <Edit size={14} />
            </Button.Ripple>
          )
        }
      },
      {
        name: 'Employee Name',
        minWidth: '297px',
        selector: (row) => row.name,
        sortable: true,
        cell: (row) => {
          const { name } = row
          return (
            <div className="d-flex justify-content-left align-items-center">
              <Avatar color="primary" className="mr-1" content="N/A" />
              <div className="d-flex flex-column">
                <Link to="#" className="user-name text-truncate mb-0">
                  <span className="font-weight-bold">{name}</span>
                </Link>
              </div>
            </div>
          )
        }
      },
      {
        name: 'Email',
        minWidth: '320px',
        selector: (row) => row.email,
        sortable: true,
        cell: (row) => row.email
      },
      {
        name: 'Skills',
        minWidth: '320px',
        selector: (row) => 'skills',
        sortable: true,
        cell: (row) => {
          const { skills } = row
          if (skills.length) {
            return join(
              skills.map(({ skillName }) => skillName),
              ', '
            )
          }
          return 'N/A'
        }
      },
      {
        name: 'Project',
        minWidth: '320px',
        selector: (row) => 'projects',
        sortable: true,
        cell: (row) => {
          const { projects } = row
          if (projects.length) {
            return join(
              projects.map(({ projectName }) => projectName),
              ', '
            )
          }
          return 'N/A'
        }
      },
      {
        name: 'Role',
        minWidth: '138px',
        selector: (row) => 'role',
        sortable: true,
        cell: (row) => {
          const { roles } = row
          if (roles.length) {
            return roles[0].empRoleName
          }
          return 'N/A'
        }
      },
      {
        name: 'Phone',
        minWidth: '172px',
        selector: (row) => row.phone,
        sortable: true,
        cell: (row) => row.phone
      },
      {
        name: 'Date',
        minWidth: '172px',
        selector: (row) => row.dob,
        sortable: true,
        cell: (row) => {
          const { dob } = row
          return FormatFns.formatDateTime(new Date(dob), 'P')
        }
      },
      {
        name: 'Status',
        minWidth: '138px',
        selector: (row) => 'status',
        sortable: true,
        cell: (row) => {
          const {
            statusDetail: { name }
          } = row
          return (
            <Badge className="text-capitalize" color="light-success" pill>
              {name ?? 'N/A'}
            </Badge>
          )
        }
      }
    ],
    []
  )

  const dataToRender = () => {
    const { byId, data } = store
    const filters = {
      page: currentPage,
      perPage: rowsPerPage,
      searchTerm,
      skills: skills.map((skill) => skill.value)
    }

    const isFiltered = Object.keys(filters).some((filter) => {
      return filters[filter].length
    })

    if (data.length > 0) {
      return data
    } else if (data.length === 0 && isFiltered) {
      return []
    } else {
      return Object.values(byId).slice(0, rowsPerPage)
    }
  }

  return (
    <Card>
      <DataTable
        noHeader
        pagination
        subHeader
        responsive
        pagination
        paginationServer
        paginationTotalRows={store.total}
        onChangeRowsPerPage={handleOnChangeRowsPerPage}
        onChangePage={handleOnChangePage}
        columns={columns}
        sortIcon={<ChevronDown />}
        className="react-dataTable"
        data={dataToRender()}
        subHeaderComponent={
          <ListHeader
            handlePerPage={handlePerPage}
            rowsPerPage={rowsPerPage}
            searchTerm={searchTerm}
            onSelectSkills={handleSelectSkills}
            onSearch={handleOnSearch}
            skills={skills}
          />
        }
      />
      <ListEditEmployee
        key={employeeId}
        employeeId={employeeId}
        onClose={handleCloseEditEmployee}
      />
    </Card>
  )
}

export default EmployeesList
