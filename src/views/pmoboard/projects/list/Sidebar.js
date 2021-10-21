// ** React Import
import { useState } from 'react'
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
import { addProject } from '../store/action'
import { useDispatch } from 'react-redux'
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
const SidebarNewProjects = ({ open, toggleSidebar }) => {
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
  // ** Store Vars
  const dispatch = useDispatch()

  // const columns = [
  //   {
  //     name: 'Title',
  //     selector: 'title',
  //     sortable: true,
  //     filterable: true
  //   },
  //   {
  //     name: 'Year',
  //     selector: 'year',
  //     sortable: true,
  //     right: true
  //   }
  // ]
  // ** Vars
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
  const [activeTab, setActiveTab] = useState('1')
  const [value, setValue] = useState(0)
  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab)
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
              Project Information xxxx
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '2' })}
              onClick={() => { toggle('2') }}
            >
              Resource Allocation
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <ProjectInformation/>
          
            {/* <Form onSubmit={handleSubmit(onSubmit)}>
              <div className='row mt-2'>
                <div className='col-4'>
                  <FormGroup>
                    <Label for='projectName'>
                      Project Name <span className='text-danger'>*</span>
                    </Label>
                    <Input
                      name='projectName'
                      id='projectName'
                      innerRef={register({ required: true })}
                      className={classnames({ 'is-invalid': errors['projectName'] })}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for='projectType'>
                      Project Type <span className='text-danger'>*</span>
                    </Label>
                    <Select
                      id="projectType"
                      className="basic-single"
                      classNamePrefix="select"
                      isSearchable={true}
                      isClearable={true}
                      maxMenuHeight={220}
                      name="projectType"
                      value={projectType}
                      onChange={setProjectType}
                      options={projectTypeData}
                    />
                  </FormGroup>

                  <FormGroup>
                    <span className='title'>Start:</span>
                    <Flatpickr
                      value={startProject}
                      onChange={date => setStartProject(date)}
                      className='form-control invoice-edit-input date-picker'
                    />
                  </FormGroup>

                  <FormGroup>
                    <span className='title'>Milestones:</span>
                    <div className='d-flex'>
                      <div style={{ width: '90%' }}>
                        {
                          milestone.map((m, i) => {
                            return (
                              <div className={i > 0 ? 'mt-2' : 'mt-0'}>
                                <Flatpickr
                                  key={i}
                                  value={m}
                                  onChange={date => editMilestones(date, i)}
                                  className='form-control invoice-edit-input date-picker'
                                />
                              </div>

                            )
                          })
                        }
                      </div>
                      <div className='d-flex justify-content-center'>
                        <span>+</span>
                      </div>

                    </div>

                  </FormGroup>
                </div>
                <div className='col-4'>
                  <FormGroup>
                    <Label for='projectCode'>
                      Project Code <span className='text-danger'>*</span>
                    </Label>
                    <Input
                      name='projectCode'
                      id='projectCode'
                      innerRef={register({ required: true })}
                      className={classnames({ 'is-invalid': errors['projectCode'] })}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for='customer'>
                      Customer <span className='text-danger'>*</span>
                    </Label>
                    <Select
                      id="projectType"
                      className="basic-single"
                      classNamePrefix="select"
                      isSearchable={true}
                      isClearable={true}
                      maxMenuHeight={220}
                      name="customer"
                      value={customer}
                      onChange={setCustomer}
                      options={customerData}
                    />
                  </FormGroup>

                  <FormGroup>
                    <span className='title'>End:</span>
                    <Flatpickr
                      value={endProject}
                      onChange={date => setEndProject(date)}
                      className='form-control invoice-edit-input date-picker'
                    />
                  </FormGroup>
                </div>
                <div className='col-4'>
                  <FormGroup>
                    <Label for='projectCode'>
                      Project Code <span className='text-danger'>*</span>
                    </Label>
                    <Input
                      type='color'
                      name='projectCode'
                      id='projectCode'
                      value={color}
                      onChange={e => setColor(e.target.value)}
                      innerRef={register({ required: true })}
                      className={classnames({ 'is-invalid': errors['projectCode'] })}
                      innerRef={register({ required: true })}
                      className={classnames({ 'is-invalid': errors['projectCode'] })}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for='pmLead'>PM/Lead</Label>
                    <Select
                      id="pmLead"
                      className="basic-single"
                      classNamePrefix="select"
                      isSearchable={true}
                      isClearable={true}
                      maxMenuHeight={220}
                      name="pmLead"
                      value={pmLead}
                      onChange={setPmLead}
                      options={pmData}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for='technologyStack'>Technology Stack</Label>
                    <Select
                      isMulti
                      id="pmLead"
                      className="basic-single"
                      classNamePrefix="select"
                      isSearchable={true}
                      maxMenuHeight={220}
                      name="technologyStack"
                      value={technologyStack}
                      onChange={setTechnologyStack}
                      options={technologyStackData}
                    />
                  </FormGroup>
                </div>
              </div>

              <div style={{ float: 'right' }}>
                <Button type='submit' className='mr-1' color='primary'>
                  Save
                </Button>
                <Button type='reset' color='secondary' outline onClick={toggleSidebar}>
                  Cancel
                </Button>
              </div>
            </Form> */}
          </TabPane>
          <TabPane tabId="2">
          <ResourceAllocation/>
          </TabPane>
        </TabContent>
      </div>

    </Sidebar>
  )
}


export default SidebarNewProjects
