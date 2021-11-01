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
import { addProject, getCustomer, getResourceAllocation, getListProjectType,  getListEmployee, getListProjectTechnology, getListProjectDomain, getListEmployeeRole } from '../store/action'
import { useDispatch, useSelector } from 'react-redux'
import ColorPicker from '@components/pick-color'

import { columns } from '../constant'

import ResourceAllocation from './components/ResourceAllocation'
import ProjectInformation from './components/ProjectInformation'

const SidebarNewProjects = ({ open, toggleSidebar, isNewProject }) => {
  // ** States
  const [milestone, setMilestone] = useState([new Date(), new Date()])

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

  useEffect(() => {
    dispatch(getListEmployeeRole())
  }, [dispatch, projects.dataListRoleEmployee.length])

  const  hideSidebar = () => {
    toggleSidebar()
  }
  const [activeTab, setActiveTab] = useState('1')
  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab)
    dispatch(
      getResourceAllocation(isNewProject)
    )
  }

  return (

    <Sidebar
      width='70'
      size='lg'
      open={open}
      title={isNewProject > 0 ? `Edit ${projects.dataProject.name}` : 'New Project'}
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={toggleSidebar}
    >
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
