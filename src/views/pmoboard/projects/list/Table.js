import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { Fragment, useEffect, useRef, useState } from 'react'
import DataTable from 'react-data-table-component'
import { ChevronDown } from 'react-feather'
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Col,
  CardTitle,
  FormGroup,
  Row,
  Label,
  Input
} from 'reactstrap'
import { getData, setDataProject } from '../store/action'
import { columns } from './columns'
import Sidebar from './Sidebar'

const CustomHeader = ({ toggleSidebar, handlePerPage, rowsPerPage }) => {
  return (
    <div className="invoice-list-table-header w-100 mr-1 ml-50 mt-2 mb-75">
      <Row>
        <Col xl="6" className="d-flex align-items-center p-0"></Col>
        <Col
          xl="6"
          className="d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1"
        >
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
  const dataTechnology = store.dataListProjectTechnology.map(technology => {
    return {
      value: technology.id,
      label: technology.name
    }
  })

  const dataDomain = store.dataListProjectDomain.map(domain => {
    return {
      value: domain.id,
      label: domain.name
    }
  })

  const dataType = store.dataListProjectType.map(type => {
    return {
      value: type.id,
      label: type.name
    }
  })
  // ** States
  const [searchObj, setSearcObj] = useState({
    name: '',
    type: null,
    customer: '',
    technology: null,
    domain: null
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isNewProject, setIsNewProject] = useState(0)
  // debound api
  const typingTimeOut = useRef(null)

  const projectDto = {
    currentPage,
    rowsPerPage,
    searchObj
  }

  const toggleSidebar = (id) => {
    setSidebarOpen(!sidebarOpen)
    setIsNewProject(id)
    dispatch(setDataProject())
  }

  // ** Get data on mount
  useEffect(() => {
    dispatch(getData(projectDto))
  }, [dispatch, store.data.length])

  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value)
    setRowsPerPage(value)
  }
  // ** Table data to render
  const dataToRender = () => {
    const data = store?.data?.projectData ? store?.data?.projectData : []
    return data
  }

  const handleFilter = (value, field) => {
    console.log(store)
    if (typingTimeOut.current) {
      clearTimeout(typingTimeOut.current)
    }

    typingTimeOut.current = setTimeout(() => {
      searchObj[field] = value
      setSearcObj(searchObj)
      dispatch(getData(projectDto))
    }, 500)
  }

  const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: 'white' }),
    multiValue: (styles, { data }) => {
      return {
        ...styles,
        backgroundColor: 'blue',
        color: 'white'
      }
    }
  }

  return (
    <Fragment>
      <Card>
        <CardHeader className="border-bottom">
          <CardTitle tag="h4">Advance Search</CardTitle>
        </CardHeader>
        <CardBody>
          <Row form className="mt-1 mb-50">
            <Col lg="4" md="6">
              <FormGroup>
                <Label for="name">Name:</Label>
                <Input
                  id="name"
                  onChange={(e) => handleFilter(e.currentTarget.value, 'name')}
                />
              </FormGroup>
            </Col>

            <Col lg="4" md="6">
              <FormGroup>
                <Label for="customer">Customer:</Label>
                <Input
                  id="name"
                  onChange={(e) => handleFilter(e.currentTarget.value, 'customer')}
                />
              </FormGroup>
            </Col>

            <Col lg="4" md="6">
              <FormGroup>
                <Label for="technology">Technology:</Label>
                <Select
                  styles={colourStyles}
                  id="technology"
                  isMulti={true}
                  className="basic-single"
                  classNamePrefix="select"
                  isSearchable={true}
                  isClearable={true}
                  maxMenuHeight={220}                 
                  onChange={(techs) => {
                    const techArr = techs && techs.length > 0 ? techs.map(tech => tech.value) : null
                    handleFilter(techArr, 'technology')
                  }}
                  options={dataTechnology}
                  styles={colourStyles}
                />
              </FormGroup>
            </Col>

            <Col lg="4" md="6">
              <FormGroup>
                <Label for="domain">Domain:</Label>
                <Select
                  styles={colourStyles}
                  id="domain"
                  isMulti={true}
                  className="basic-single"
                  classNamePrefix="select"
                  isSearchable={true}
                  isClearable={true}
                  maxMenuHeight={220}                 
                  onChange={(domains) => {
                    const domainArr = domains && domains.length > 0 ? domains.map(domain => domain.value) : null
                    handleFilter(domainArr, 'domain')
                  }}
                  options={dataDomain}
                />
              </FormGroup>
            </Col>

            <Col lg="4" md="6">
              <FormGroup>
                <Label for="type">Type:</Label>
                <Select
                  styles={colourStyles}
                  id="type"
                  isMulti={true}
                  className="basic-single"
                  classNamePrefix="select"
                  isSearchable={true}
                  isClearable={true}
                  maxMenuHeight={220}                 
                  onChange={(types) => {
                    const typeArr = types && types.length > 0 ? types.map(type => type.value) : null
                    handleFilter(typeArr, 'type')
                  }}
                  options={dataType}
                />
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
        <DataTable
          noHeader
          subHeader
          responsive
          pagination
          paginationServer
          paginationPerPage={currentPage}
          paginationTotalRows={store.data.totalPage}
          columns={columns((showFormEdit) => toggleSidebar(showFormEdit), currentPage, searchObj, rowsPerPage)}
          sortIcon={<ChevronDown />}
          className="react-dataTable"
          data={dataToRender()}
          subHeaderComponent={
            <CustomHeader
              toggleSidebar={toggleSidebar}
              handlePerPage={handlePerPage}
              rowsPerPage={rowsPerPage}
            />
          }
        />
      </Card>
      <Sidebar
        open={sidebarOpen}
        toggleSidebar={toggleSidebar}
        isNewProject={isNewProject}
        rowsPerPage={rowsPerPage}
        searchObj={searchObj}
        currentPage={currentPage}
      />
    </Fragment>
  )
}

export default ProjectsList
