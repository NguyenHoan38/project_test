import Sidebar from '@components/sidebar'
import '@styles/base/pages/app-invoice.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'

import classnames from 'classnames'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'

import {
  getCustomer,
  getListEmployee,
  getListEmployeeRole,
  getListProjectDomain,
  getListProjectTechnology,
  getListProjectType,
  getResourceAllocation
} from '../store/action'
import ProjectInformation from './components/ProjectInformation'
import ResourceAllocation from './components/ResourceAllocation'
import ListSidebar from './ListSidebar'

const SidebarNewProjects = ({ open, toggleSidebar, isNewProject }) => {
  // ** States
  const [milestone, setMilestone] = useState([new Date(), new Date()])

  const projects = useSelector((state) => state.projects)
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

  const hideSidebar = () => {
    toggleSidebar()
  }
  const [activeTab, setActiveTab] = useState('1')
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab)
    dispatch(getResourceAllocation(isNewProject))
  }

  return (
    <ListSidebar
      open={open}
      title={
        isNewProject > 0 ? `Edit ${projects.dataProject.name}` : 'New Project'
      }
      onClose={toggleSidebar}
    >
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '1' })}
              onClick={() => {
                toggle('1')
              }}
            >
              Project Information
            </NavLink>
          </NavItem>
          {isNewProject > 0 && (
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '2' })}
                onClick={() => {
                  toggle('2')
                }}
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
          <TabPane tabId="2">
            <ResourceAllocation />
          </TabPane>
        </TabContent>
      </div>
    </ListSidebar>
  )
}

export default SidebarNewProjects
