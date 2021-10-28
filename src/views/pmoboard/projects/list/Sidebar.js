// ** React Import
import { useState, useEffect } from 'react'
import Select from 'react-select'
import Flatpickr from 'react-flatpickr'

import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/base/pages/app-invoice.scss'
import DataTable from 'react-data-table-component'

// ** Custom Components
import Sidebar from '@components/sidebar'

// ** Utils
import { isObjEmpty } from '@utils'
// ** Third Party Components
import classnames from 'classnames'
import { useForm } from 'react-hook-form'
import { Button, FormGroup, Label, FormText, Form, Input, TabContent, TabPane, Nav, NavItem, NavLink, Card, CardTitle, CardText, Row, Col } from 'reactstrap'

// ** Store & Actions
import { addProject, getCustomer, getProject, getListProjectType,  getListEmployee, getListProjectTechnology, getListProjectDomain } from '../store/action'
import { useDispatch, useSelector } from 'react-redux'
import ColorPicker from '@components/pick-color'

import { columns } from '../constant'

import ResourceAllocation from './components/ResourceAllocation'
import ProjectInformation from './components/ProjectInformation'
const projectTypeData = [
  { value: 1, label: 'T&M' },
  { value: 2, label: 'Project Based' },
  { value: 3, label: 'Body shoping' }
]

const customerData = [
  { value: 1, label: 'Kern AG' },
  { value: 2, label: 'Baby Philson' },
  { value: 3, label: 'David Beckham' }

]

const pmData = [
  { value: 1, label: 'Nguyen Hoang Tung' },
  { value: 2, label: 'Tran Van An' },
  { value: 3, label: 'Nguyen Hoang Tung' },
  { value: 4, label: 'Tran Van An' },
  { value: 5, label: 'Nguyen Hoang Tung' },
  { value: 6, label: 'Tran Van An' },
  { value: 7, label: 'Nguyen Hoang Tung' },
  { value: 8, label: 'Tran Van An' }
]

const technologyStackData = [
  { value: 1, label: 'Azure' },
  { value: 2, label: 'Devops' },
  { value: 3, label: 'Intune' }

]

const industryData = [
  { value: 1, label: 'Azure' },
  { value: 2, label: 'Devops' },
  { value: 3, label: 'Intune' }
]
const SidebarNewProjects = ({ open, toggleSidebar, isNewProject }) => {
  // ** States
  const [projectType, setProjectType] = useState(null)
  const [customer, setCustomer] = useState(null)
  const [pmLead, setPmLead] = useState(null)
  const [industry, setIndustry] = useState(null)
  const [technologyStack, setTechnologyStack] = useState(null)
  const [startProject, setStartProject] = useState(new Date())
  // const [startProject, setStartProject] = useState(new Date())
  const [milestone, setMilestone] = useState([new Date(), new Date()])
  const [endProject, setEndProject] = useState(new Date())
  const [color, setColor] = useState('#ffff')


  // fake data
  const projectTypeData = [
    { value: 1, label: 'T&M' },
    { value: 2, label: 'Project Based' },
    { value: 3, label: 'Body shoping' }
  ]

  const customerData = [
    { value: 1, label: 'Kern AG' },
    { value: 2, label: 'Baby Philson' },
    { value: 3, label: 'David Beckham' }

  ]

  const pmData = [
    { value: 1, label: 'Nguyen Hoang Tung' },
    { value: 2, label: 'Tran Van An' },
    { value: 3, label: 'Nguyen Hoang Tung' },
    { value: 4, label: 'Tran Van An' },
    { value: 5, label: 'Nguyen Hoang Tung' },
    { value: 6, label: 'Tran Van An' },
    { value: 7, label: 'Nguyen Hoang Tung' },
    { value: 8, label: 'Tran Van An' }
  ]

  const technologyStackData = [
    { value: 1, label: 'Azure' },
    { value: 2, label: 'Devops' },
    { value: 3, label: 'Intune' }

  ]

  const industryData = [
    { value: 1, label: 'Azure' },
    { value: 2, label: 'Devops' },
    { value: 3, label: 'Intune' }
  ]
  const projects = useSelector(state => state.projects)
  // ** Store Vars
  const dispatch = useDispatch()

  // GOI API
  // get Customer
  useEffect(() => {
    dispatch(getCustomer())

  }, [dispatch, projects.dataCustomer.length])
  // get Project Type
  useEffect(() => {
    dispatch(getListProjectType())
  }, [dispatch, projects.dataListProjectType.length])
  // get getListEmployee
  useEffect(() => {
    dispatch(getListEmployee())
  }, [dispatch, projects.dataListEmployee.length])
  useEffect(() => {
    dispatch(getListProjectTechnology())
  }, [dispatch, projects.dataListProjectTechnology.length])
  useEffect(() => {
    dispatch(getListProjectDomain())
  }, [dispatch, projects.dataListProjectDomain.length])
  //GOI API

  const { register, errors, handleSubmit } = useForm()

  // add mileStone
  const addMilestone = (newMilestone) => {
    milestone.push(newMilestone)
    setMilestone(milestone)
  }

  const editMilestones = (date, i) => {
    milestone[i] = date
  }

  // ** Function to handle form submit
  const onSubmit = values => {
    if (isObjEmpty(errors)) {
      toggleSidebar()
      dispatch(
        addProject({
          projectName: values['projectName'],
          projectType

        })
      )
    }
  }
  const  hideSidebar = () => {
    toggleSidebar()
  }
  const [activeTab, setActiveTab] = useState('1')
  const [value, setValue] = useState(0)
  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab)
    dispatch(
      getProject(isNewProject)
    )
  }
  // ** Table data to render
  const dataToRender = () => {
    const filters = {
      // status: currentStatus.value,
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

  const myStyle = {
    color: "red"
  }
  console.log(isNewProject)
  return (

    <Sidebar
      width='70'
      size='lg'
      open={open}
      title='New Project'
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={toggleSidebar}
    >
      {/* <div>
        <Button className='btn btn-primary btn-lg'></Button>
        <Button className='btn btn-info btn-lg ml-5'>Resource Allocation</Button>
      </div> */}
      <div>

        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '1' })}
              onClick={() => { toggle('1') }}
            >
              Project Information
            </NavLink>
          </NavItem>
          {isNewProject > 0 && (
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '2' })}
                onClick={() => { toggle('2') }}
              >
                Resource Allocation
              </NavLink>
            </NavItem>
          )}
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <ProjectInformation hideSidebar={hideSidebar} />
          </TabPane>
          <TabPane tabId="2" >
            <ResourceAllocation />
          </TabPane>
        </TabContent>
      </div>

    </Sidebar>
  )
}


export default SidebarNewProjects
