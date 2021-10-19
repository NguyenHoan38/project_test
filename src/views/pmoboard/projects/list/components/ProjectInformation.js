import { useState } from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import classnames from 'classnames'
import Select from 'react-select'
import Flatpickr from 'react-flatpickr'
import { Button, FormGroup, Label, FormText, Form, Input, TabContent, TabPane, Nav, NavItem, NavLink, Card, CardTitle, CardText, Row, Col } from 'reactstrap'
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

function ProjectInformation(props) {
    const [milestone, setMilestone] = useState([new Date(), new Date()])

    const [startProject, setStartProject] = useState(new Date())
    const [projectType, setProjectType] = useState(null)
    const [customer, setCustomer] = useState(null)
    const [endProject, setEndProject] = useState(new Date())
    const [color, setColor] = useState('#ffff')
    const [pmLead, setPmLead] = useState(null)
    const [technologyStack, setTechnologyStack] = useState(null)
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
    // add mileStone
const handleAddMilestone = (newMilestone) => {
    console.log('222222222222')
    milestone.push(newMilestone)
    setMilestone(milestone)
}

const editMilestones = (date, i) => {
    milestone[i] = date
}
    // function handleAddMilestone() {
    //     console.log('22222222222222222')
    // }
    return (
        <div>
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
                                <div className='d-flex justify-content-center' >
                                    <span onClick={handleAddMilestone}>+</span>
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
                    <Button type='reset' color='secondary' outline >
                        Cancel
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default ProjectInformation