import { useState } from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import classnames from 'classnames'
import Select from 'react-select'
import Flatpickr from 'react-flatpickr'
import { Collapse, Button, CardBody, FormGroup, Label, FormText, Form, Input, TabContent, TabPane, Nav, NavItem, NavLink, Card, CardTitle, CardText, Row, Col } from 'reactstrap'
import { FaTrash, FaPlusCircle, FaCheck } from 'react-icons/fa'
import '../../../../../assets/scss/projects/styleProjectInformation.scss'
import { isObjEmpty } from '@utils'
import { projectColor } from '../../constant'
import ModalAddTechnologis from './ModalAddTechnologis'
// ** Store & Actions
import { addProject } from '../../store/action'
import { useDispatch } from 'react-redux'
// fake data
const typeData = [
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
//   const dispatch = useDispatch()
function ProjectInformation(props) {
    // ** Store Vars
    const dispatch = useDispatch()
    const [milestone, setMilestone] = useState([new Date(), new Date()])
    const [startProject, setStartProject] = useState('')
    const [type, settype] = useState(null)
    const [customerId, setCustomer] = useState(null)
    const [endProject, setEndProject] = useState(new Date())
    const [color, setColor] = useState('#ffff')
    const [pmLead, setPmLead] = useState(null)
    const [technologyStack, setTechnologyStack] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const [checkColor, setcheckColor] = useState(null)
    const [colorButton, setColorButton] = useState(null)
    const toggle = () => setIsOpen(!isOpen)
    // ** Vars
    const { register, errors, handleSubmit } = useForm()

    const [modal, setModal] = useState(false)

    const toggleAddFormTech = () => {
        console.log('4444444444444444444444')
        setModal(!modal)
    }

    // ** Function to handle form submit
    const onSubmit = values => {
        const technologys = []
        technologyStack.map(res => {
            technologys.push(res.value)
        })
        if (isObjEmpty(errors)) {
            // toggleSidebar()
            dispatch(
                addProject({
                    name: values['name'],
                    type:type.value,
                    color: checkColor,
                    signal: values['signal'],
                    startDate:startProject[0],
                    endDate:endProject[0],
                    status: 1,
                    pmId:pmLead.value,
                    mileStone:['2021-11-09'],
                    customerId:customerId.value,
                    technologys,
                    domains: [1, 2]
                })
            )
        }
    }
    // add mileStone
    function handleAddMilestone() {
        const a = new Date()
        setMilestone([...milestone, a])
    }
    function handleDeleteMilestone (i) {
        const newMilestone = milestone.filter((item, index) => index !== i)
        setMilestone(newMilestone)
    }
    const editMilestones = (date, i) => {
        milestone[i] = date
    }
    function handleClickColor(m) {
        setcheckColor(m.id)
        setColorButton(m)
    }
    return (
        <div>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <div className='row mt-2'>
                    <div className='col-4'>

                        <FormGroup>
                            <Label for='name'>
                                Project Name <span className='text-danger'>*</span>
                            </Label>
                            <Input
                                name='name'
                                id='name'
                                innerRef={register({ required: true })}
                                className={classnames({ 'is-invalid': errors['name'] })}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for='type'>
                                Project Type <span className='text-danger'>*</span>
                            </Label>
                            <Select
                                id="type"
                                className="basic-single"
                                classNamePrefix="select"
                                isSearchable={true}
                                isClearable={true}
                                maxMenuHeight={220}
                                name="type"
                                value={type}
                                onChange={settype}
                                options={typeData}
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
                            <div >
                                <div >
                                    {
                                        milestone.map((m, i) => {
                                            return (
                                                <div className='d-flex' key={i}>
                                                    <div style={{ width: '100%' }}>
                                                        <Flatpickr
                                                            key={i}
                                                            value={m}
                                                            onChange={date => editMilestones(date, i)}
                                                            className='form-control invoice-edit-input date-picker mr-4 mb-2'
                                                        />
                                                    </div>

                                                    <span className='ml-4'  onClick={() => handleDeleteMilestone(i)}  > <FaTrash /></span>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <Button color="success" size="lg" onClick={handleAddMilestone} active> <FaPlusCircle size="25px" /> </Button>
                        </FormGroup>
                    </div>
                    <div className='col-4'>
                        <FormGroup>
                            <Label for='signal'>
                                Project Code <span className='text-danger'>*</span>
                            </Label>
                            <Input
                                name='signal'
                                id='signal'
                                innerRef={register({ required: true })}
                                className={classnames({ 'is-invalid': errors['signal'] })}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for='customerId'>
                                Customer <span className='text-danger'>*</span>
                            </Label>
                            <Select
                                id="customerId"
                                className="basic-single"
                                classNamePrefix="select"
                                isSearchable={true}
                                isClearable={true}
                                maxMenuHeight={220}
                                name="customerId"
                                value={customerId}
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
                        <FormGroup>
                            <Label for='technologyStack'>Project lead</Label>
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
                    <div className='col-4'>
                        <FormGroup>
                            <Label for='projectCode' className="mr-2 w-100" >
                                Project Color <span className='text-danger'>*</span>
                            </Label>
                            <Button style={colorButton} color="color-Button" onClick={toggle} className="button-color">KA</Button>
                            <Collapse isOpen={isOpen} className="collapse-color">
                                <Card>
                                    <div className="d-flex flex-wrap">
                                        {
                                            projectColor.map((m, i) => {
                                                return (
                                                    <div style={projectColor[i]} key={i} className="blook-color text-center text-justify" onClick={() => handleClickColor(m)}>{m.id === checkColor ? <FaCheck color="white" /> : ""} </div>
                                                )
                                            })
                                        }
                                    </div>
                                </Card>
                            </Collapse>
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
                            <Label for='technologyStack'>Technologies</Label>
                            <div className="d-flex align-items-center">
                            <Select
                                isMulti
                                id="pmLead"
                                style={{with:'100%', marginRight:'20px'}}
                                className="basic-single"
                                classNamePrefix="select"
                                isSearchable={true}
                                maxMenuHeight={220}
                                name="technologyStack"
                                value={technologyStack}
                                onChange={setTechnologyStack}
                                options={technologyStackData}
                            />
                            <FaPlusCircle size="25px" onClick={() => toggleAddFormTech()} /> 
                            </div>

                        </FormGroup>
                    </div>
                </div>
                 <ModalAddTechnologis modal={modal} toggle={toggleAddFormTech}/>                           
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