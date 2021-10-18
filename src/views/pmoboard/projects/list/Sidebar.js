// ** React Import
import { useState } from 'react'
import Select from 'react-select'
import Flatpickr from 'react-flatpickr'

// ** Custom Components
import Sidebar from '@components/sidebar'

// ** Utils
import { isObjEmpty } from '@utils'

// ** Third Party Components
import classnames from 'classnames'
import { useForm } from 'react-hook-form'
import { Button, FormGroup, Label, FormText, Form, Input } from 'reactstrap'

// ** Store & Actions
import { addProject } from '../store/action'
import { useDispatch } from 'react-redux'

const SidebarNewProjects = ({ open, toggleSidebar }) => {
  // ** States
  const [projectType, setProjectType] = useState(null)
  const [customer, setCustomer] = useState(null)
  const [pmLead, setPmLead] = useState(null)
  const [technologyStack, setTechnologyStack] = useState(null)
  const [picker, setPicker] = useState(new Date())


  // fake data
  const projectTypeData = [
    {value: 1, label: 'T&M'},
    {value: 2, label: 'Project Based'},
    {value: 3, label: 'Body shoping'}
  ]

  const customerData = [
    {value: 1, label: 'Kern AG'},
    {value: 2, label: 'Baby Philson'},
    {value: 3, label: 'David Beckham'}
   
  ]

  const pmData = [
    {value: 1, label: 'Nguyen Hoang Tung'},
    {value: 2, label: 'Tran Van An'},
    {value: 3, label: 'Nguyen Hoang Tung'},
    {value: 4, label: 'Tran Van An'},
    {value: 5, label: 'Nguyen Hoang Tung'},
    {value: 6, label: 'Tran Van An'},
    {value: 7, label: 'Nguyen Hoang Tung'},
    {value: 8, label: 'Tran Van An'}
  ]

  const technologyStackData = [
    {value: 1, label: 'Azure'},
    {value: 2, label: 'Devops'},
    {value: 3, label: 'Intune'}

  ]
  // ** Store Vars
  const dispatch = useDispatch()

  // ** Vars
  const { register, errors, handleSubmit } = useForm()

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
      <div>
        <Button className='btn btn-primary btn-lg'>Project Information</Button>
        <Button className='btn btn-info btn-lg ml-5'>Resource Allocation</Button>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
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
          </div>
          <div className='col-4'></div>
        </div>
        {/* <FormGroup>
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
          <Label for='customer'>
              Project Type <span className='text-danger'>*</span>
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
          <Label for='country'>
            Country <span className='text-danger'>*</span>
          </Label>
          <Input
            name='country'
            id='country'
            placeholder='Australia'
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['country'] })}
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
        <FormGroup>
        <span className='title'>Date:</span>
          <Flatpickr
            value={picker}
            onChange={date => setPicker(date)}
            className='form-control invoice-edit-input date-picker'
            />
        </FormGroup> */}
        <div style={{float: 'right'}}>
        <Button type='submit' className='mr-1' color='primary'>
          Save
        </Button>
        <Button type='reset' color='secondary' outline onClick={toggleSidebar}>
          Cancel
        </Button>
        </div>
      </Form>
    </Sidebar>
  )
}

export default SidebarNewProjects
