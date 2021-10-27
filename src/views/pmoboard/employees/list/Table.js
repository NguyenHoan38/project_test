// ** React Imports
import Avatar from '@components/avatar'
// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { useEffect, useMemo, useState } from 'react'
import DataTable from 'react-data-table-component'
import { Archive, ChevronDown, FileText, MoreVertical, Trash2 } from 'react-feather'
// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Badge, Card, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap'
// ** Store & Actions
import { getAllData, getData, getEmployee, resetEmployee } from '../store/action'
import ListHeader from './ListHeader'
import ListEditEmployee from './ListEditEmployee'


const UsersList = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.users)

  // ** States
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentRole, setCurrentRole] = useState({ value: '', label: 'Select Role' })
  const [currentPlan, setCurrentPlan] = useState({ value: '', label: 'Select Plan' })
  const [currentStatus, setCurrentStatus] = useState({ value: '', label: 'Select Status', number: 0 })
  const [openEditEmployee, setOpenEditEmployee] = useState(false)
  const [skills, setSkills] = useState([])


  const handleSelectSkill = (skill) => {
    setSkills(skill)
  }

  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  // ** Get data on mount
  useEffect(() => {
    dispatch(getAllData())
    dispatch(
      getData({
        page: currentPage,
        perPage: rowsPerPage,
        role: currentRole.value,
        currentPlan: currentPlan.value,
        status: currentStatus.value,
        q: searchTerm
      })
    )
  }, [dispatch, store.data.length])

  // ** Function in get data on page change
  const handlePagination = page => {
    dispatch(
      getData({
        page: page.selected + 1,
        perPage: rowsPerPage,
        role: currentRole.value,
        currentPlan: currentPlan.value,
        status: currentStatus.value,
        q: searchTerm
      })
    )
    setCurrentPage(page.selected + 1)
  }

  // ** Function in get data on rows per page
  const handlePerPage = e => {
    const value = parseInt(e.currentTarget.value)
    dispatch(
      getData({
        page: currentPage,
        perPage: value,
        role: currentRole.value,
        currentPlan: currentPlan.value,
        status: currentStatus.value,
        q: searchTerm
      })
    )
    setRowsPerPage(value)
  }

  // ** Function in get data on search query change
  const handleFilter = val => {
    setSearchTerm(val)
    dispatch(
      getData({
        page: currentPage,
        perPage: rowsPerPage,
        role: currentRole.value,
        currentPlan: currentPlan.value,
        status: currentStatus.value,
        q: val
      })
    )
  }

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(Math.ceil(store.total / rowsPerPage))

    return (
      <ReactPaginate
        previousLabel={''}
        nextLabel={''}
        pageCount={count || 1}
        activeClassName='active'
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={page => handlePagination(page)}
        pageClassName={'page-item'}
        nextLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousClassName={'page-item prev'}
        previousLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        containerClassName={'pagination react-paginate justify-content-end my-2 pr-1'}
      />
    )
  }

  // ** Table data to render
  const dataToRender = () => {
    const filters = {
      role: currentRole.value,
      currentPlan: currentPlan.value,
      status: currentStatus.value,
      q: searchTerm
    }

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0
    })

    if (store.data.length > 0) {
      return store.data
    } else if (store.data.length === 0 && isFiltered) {
      return []
    } else {
      return store.allData.slice(0, rowsPerPage)
    }
  }

  const handleOpenEditEmployee = (employeeId) => () => {
    dispatch(getEmployee(employeeId))
    setOpenEditEmployee(true)
  }

  const handleCloseEditEmployee = () => {
    dispatch(resetEmployee())
    setOpenEditEmployee(false)
  }

  const columns = useMemo(() => [
    {
      name: 'Actions',
      minWidth: '100px',
      cell: row => (
        <UncontrolledDropdown>
          <DropdownToggle tag='div' className='btn btn-sm'>
            <MoreVertical size={14} className='cursor-pointer' />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem
              tag={Link}
              to={`/apps/user/view/${row.id}`}
              className='w-100'
              disabled
            >
              <FileText size={14} className='mr-50' />
              <span className='align-middle'>Details</span>
            </DropdownItem>
            <DropdownItem
              className='w-100'
              onClick={handleOpenEditEmployee(row.id)}
            >
              <Archive size={14} className='mr-50' />
              <span className='align-middle'>Edit</span>
            </DropdownItem>
            <DropdownItem className='w-100' disabled>
              <Trash2 size={14} className='mr-50' />
              <span className='align-middle'>Delete</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      )
    },
    {
      name: 'User',
      minWidth: '297px',
      selector: row => row.fullName,
      sortable: true,
      cell: row => {
        return (
          <div className='d-flex justify-content-left align-items-center'>
            {row.avatar.length ? (<Avatar className='mr-1' img={row.avatar} width='32' height='32' />) : (<Avatar color='primary' className='mr-1' content={row.fullName || 'John Doe'} initials />)}
            <div className='d-flex flex-column'>
              <Link
                to={`/apps/user/view/${row.id}`}
                className='user-name text-truncate mb-0'
                onClick={() => store.dispatch(getUser(row.id))}
              >
                <span className='font-weight-bold'>{row.fullName}</span>
              </Link>
            </div>
          </div>
        )
      }
    },
    {
      name: 'Email',
      minWidth: '320px',
      selector: row => row.email,
      sortable: true,
      cell: row => row.email
    },
    {
      name: 'Role',
      minWidth: '172px',
      selector: row => row.role,
      sortable: true,
      cell: row => row.role
    },
    {
      name: 'Plan',
      minWidth: '138px',
      selector: row => row.currentPlan,
      sortable: true,
      cell: row => <span className='text-capitalize'>{row.currentPlan}</span>
    },
    {
      name: 'Status',
      minWidth: '138px',
      selector: row => row.status,
      sortable: true,
      cell: row => (
        <Badge className='text-capitalize' color='light-success' pill>
          {row.status}
        </Badge>
      )
    }
  ], [])

  return (
    <Card>
      <DataTable
        noHeader
        pagination
        subHeader
        responsive
        paginationServer
        columns={columns}
        sortIcon={<ChevronDown />}
        className='react-dataTable'
        paginationComponent={CustomPagination}
        data={dataToRender()}
        subHeaderComponent={
          <ListHeader
            toggleSidebar={toggleSidebar}
            handlePerPage={handlePerPage}
            rowsPerPage={rowsPerPage}
            searchTerm={searchTerm}
            handleFilter={handleFilter}
            onSelectSkill={handleSelectSkill}
            skills={skills}
          />
        }
      />
      <ListEditEmployee open={openEditEmployee} onClose={handleCloseEditEmployee} />
    </Card>
  )
}

export default UsersList
