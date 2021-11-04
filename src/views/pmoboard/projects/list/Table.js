import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { Fragment, useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { ChevronDown } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, Col, CustomInput, Input, Label, Row } from 'reactstrap'
import { getAllData, getData, setDataProject } from '../store/action'
import { columns } from './columns'
import Sidebar from './Sidebar'

const CustomHeader = ({
  toggleSidebar,
  handlePerPage,
  rowsPerPage,
  handleFilter,
  searchTerm
}) => {
  return (
    <div className="invoice-list-table-header w-100 mr-1 ml-50 mt-2 mb-75">
      <Row>
        <Col xl="6" className="d-flex align-items-center p-0">
          <div className="d-flex align-items-center w-100">
            <Label for="rows-per-page">Show</Label>
            <CustomInput
              className="form-control mx-50"
              type="select"
              id="rows-per-page"
              value={rowsPerPage}
              onChange={handlePerPage}
              style={{
                width: '5rem',
                padding: '0 0.8rem',
                backgroundPosition:
                  'calc(100% - 3px) 11px, calc(100% - 20px) 13px, 100% 0'
              }}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </CustomInput>
            <Label for="rows-per-page">Entries</Label>
          </div>
        </Col>
        <Col
          xl="6"
          className="d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1"
        >
          <div className="d-flex align-items-center mb-sm-0 mb-1 mr-1">
            <Label className="mb-0" for="search-invoice">
              Search:
            </Label>
            <Input
              id="search-invoice"
              className="ml-50 w-100"
              type="text"
              value={searchTerm}
              onChange={(e) => handleFilter(e.target.value)}
            />
          </div>
          <Button.Ripple color="primary" onClick={() => toggleSidebar(0)}>
            Add New Project
          </Button.Ripple>
        </Col>
      </Row>
    </div>
  )
}

const ProjectsList = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector((state) => state.projects)
  // ** States
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentStatus, setCurrentStatus] = useState({
    value: '',
    label: 'Select Status',
    number: 0
  })
  const [isNewProject, setIsNewProject] = useState(0)

  const projectsTest = useSelector((state) => state.projects)

  const toggleSidebar = (id) => {
    setSidebarOpen(!sidebarOpen)
    setIsNewProject(id)
    dispatch(setDataProject())
  }
  // ** Function to toggle sidebar
  // const toggleSidebar = () => {
  //   setSidebarOpen(!sidebarOpen)

  // }

  // ** Get data on mount
  useEffect(() => {
    dispatch(getAllData())
    // dispatch(
    //   getData({
    //     page: currentPage,
    //     perPage: rowsPerPage,
    //     status: currentStatus.value,
    //     q: searchTerm
    //   })
    // )
  }, [dispatch, store.data.length])

  // ** Projects filter options

  const statusOptions = [
    { value: '', label: 'Select Status', number: 0 },
    { value: 'active', label: 'Active', number: 1 },
    { value: 'closed', label: 'Closed', number: 2 }
  ]

  // ** Function in get data on rows per page
  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value)
    dispatch(
      getData({
        page: currentPage,
        perPage: value,
        status: currentStatus.value,
        q: searchTerm
      })
    )
    setRowsPerPage(value)
  }

  const handleFilter = (val) => {
    setSearchTerm(val)
    dispatch(
      getData({
        page: currentPage,
        perPage: rowsPerPage,
        status: currentStatus.value,
        q: val
      })
    )
  }

  // ** Table data to render
  const dataToRender = () => {
    const filters = {
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

  return (
    <Fragment>
      <Card>
        <DataTable
          noHeader
          subHeader
          responsive
          pagination
          paginationServer
          paginationTotalRows={store.total}
          columns={columns((showFormEdit) => toggleSidebar(showFormEdit))}
          sortIcon={<ChevronDown />}
          className="react-dataTable"
          data={dataToRender()}
          subHeaderComponent={
            <CustomHeader
              toggleSidebar={toggleSidebar}
              handlePerPage={handlePerPage}
              rowsPerPage={rowsPerPage}
              searchTerm={searchTerm}
              handleFilter={handleFilter}
            />
          }
        />
      </Card>
      <Sidebar
        open={sidebarOpen}
        toggleSidebar={toggleSidebar}
        isNewProject={isNewProject}
      />
    </Fragment>
  )
}

export default ProjectsList
