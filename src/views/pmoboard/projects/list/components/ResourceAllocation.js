import { useState } from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import classnames from 'classnames'
import Select from 'react-select'
import Flatpickr from 'react-flatpickr'
import RangeSlider from 'react-bootstrap-range-slider'
import DataTable from 'react-data-table-component'
import { columns } from '../../constant/columns'
import { FaTrash, FaPlusCircle, FaCheck } from 'react-icons/fa'
import '../../../../../assets/scss/projects/styleResourceAllocation.scss'
import { Button, FormGroup, Label, FormText, Form, Input, TabContent, TabPane, Nav, NavItem, NavLink, Card, CardTitle, CardText, Row, Col } from 'reactstrap'
import { useSelector, useDispatch } from 'react-redux'
import { addResourceAllocation } from '../../store/action'
import { isObjEmpty } from '@utils'
const employeeIdData = [
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
const data = [{ id: 1, title: 'Conan the Barbarian', year: '1982' }]

function ResourceAllocation(props) {
    const dispatch = useDispatch()
    const [milestone, setMilestone] = useState([new Date(), new Date()])
    const [startProject, setStartProject] = useState(new Date())
    const [checkFomAdd, setCheckFomAdd] = useState(false)
    const [employeeId, setEmployeeId] = useState(0)
    const [labelEmployee, setEmployeeLabel] = useState('')
    const [customer, setCustomer] = useState(null)
    const [endProject, setEndProject] = useState(new Date())
    const [color, setColor] = useState('#ffff')
    const [pmLead, setPmLead] = useState(null)
    const [technologyStack, setTechnologyStack] = useState(null)
    const [effortValue, setEffortValue] = useState(0)
    const [role, setRole] = useState(null)
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [mainHeadcount, setMainHeadcount] = useState(0)
    const [shadowId, setShadowId] = useState(null)
    const [note, setNote] = useState('')
    // get store
    const projects = useSelector(state => state.projects)
    const { register, errors, handleSubmit } = useForm()
    const handleAddFormClick = () => {
        setCheckFomAdd(!checkFomAdd)
    }

    const onSubmit = values => {
        if (isObjEmpty(errors)) {
            dispatch(
                addResourceAllocation({
                    projectId: 3,
                    employeeId:employeeId.id,
                    role,
                    shadowId:shadowId.id,
                    mainHeadcount,
                    effort:effortValue,
                    startDate,
                    endDate,
                    note
                })
            )
        }
    }
    return (
        <div>
            <Form onSubmit={handleSubmit(onSubmit)}>
                {checkFomAdd && (
                    <div className='row mt-2'>
                        <div className='col-6'>
                            <FormGroup>
                                <Label for='employeeId'>
                                    Assign employee
                                </Label>
                                <Select
                                    id="employeeId"
                                    className="basic-single"
                                    classNamePrefix="select"
                                    isSearchable={true}
                                    isClearable={true}
                                    maxMenuHeight={220}
                                    name="employeeId"
                                    value={{value: employeeId, label: labelEmployee}}
                                    onChange={(e) => {
                                        setEmployeeId(e.id)
                                        setEmployeeLabel(e.label)
                                    }}
                                    // className={classnames({ 'is-invalid': errors['employeeId'] })}
                                    // innerRef={register({ required: true })}
                                    options={projects.dataProject.map((project, index) => ({
                                        ...project,
                                        label: project.assign.name
                                    }))}
                                />
                            </FormGroup>


                        </div>
                        <div className='col-6'>
                            <FormGroup>
                                <Label for='role'>
                                    Role
                                </Label>
                                <Select
                                    id="role"
                                    className="basic-single"
                                    classNamePrefix="select"
                                    isSearchable={true}
                                    isClearable={true}
                                    maxMenuHeight={220}
                                    name="role"
                                    value={role}
                                    onChange={setRole}
                                    options={employeeIdData}
                                />
                            </FormGroup>
                        </div>
                        <div className='col-6'>
                            <FormGroup>
                                <span className='title'>Form:</span>
                                <Flatpickr
                                    value={startDate}
                                    onChange={date => setStartDate(date)}
                                    className='form-control invoice-edit-input date-picker'
                                />
                            </FormGroup>
                        </div>
                        <div className='col-6'>
                            <FormGroup>
                                <span className='title'>To:</span>
                                <Flatpickr
                                    value={endDate}
                                    onChange={date => setEndDate(date)}
                                    className='form-control invoice-edit-input date-picker'
                                />
                            </FormGroup>
                        </div>
                        <div className='col-6'>
                            <FormGroup >
                                <label className='title mr-4 w-100'> Main Headcount:</label>
                                <Input className='ml-0' type="checkbox" value={mainHeadcount} onChange={date => setMainHeadcount(date)} />
                            </FormGroup>
                        </div>
                        <div className='col-6'>
                            <FormGroup >
                                <span className='title mr-4'> Shadow for:</span>
                                <Select
                                    id="shadowId"
                                    className="basic-single"
                                    classNamePrefix="select"
                                    isSearchable={true}
                                    isClearable={true}
                                    maxMenuHeight={220}
                                    name="shadowId"
                                    value={shadowId}
                                    onChange={(e) => setShadowId(e)}
                                    options={projects.dataProject.map((project, index) => ({
                                        ...project,
                                        id: project.id,
                                        label: project.assign.name
                                    }))}
                                />
                            </FormGroup>
                        </div>
                        <div className='col-6 d-flex w-100 mr-2'>
                            <FormGroup className="w-100">
                                <span className='title'>Effort:</span>
                                <RangeSlider
                                    value={effortValue}
                                    onChange={changeEvent => setEffortValue(changeEvent.target.value)}
                                    className="w-100 mr-2"
                                />
                            </FormGroup>
                            <span>{effortValue}%</span>
                            {/* </div> */}

                        </div>
                        <div className='col-12'>
                            <FormGroup>
                                <Label for="exampleText">Note</Label>
                                <Input type="textarea" name="text" id="exampleText" value={note} onChange={(e) => setNote(e.target.value)} />
                            </FormGroup>
                        </div>
                    </div>
                )}
                <div className="d-flex justify-content-end mb-3 mt-3">
                    {checkFomAdd ? (
                        <>
                            <Button type='submit' className='mr-1' color='primary'>
                                Save
                            </Button>
                            <Button type='reset' color='secondary' outline >
                                Cancel
                            </Button>
                        </>
                    ) : (<span className="rounded bg-primary text-white p-2" color="info" type='button' onClick={() => handleAddFormClick()} >Assign Employee <FaPlusCircle size="25px" /> </span>)}

                </div>
            </Form>
            <div className='row mt-2'>
                <div className='col-12'>


                    <DataTable
                        noHeader={true}
                        pagination
                        subHeader={false}
                        responsive
                        paginationServer={false}
                        header={false}
                        pagination={false}
                        columns={columns(() => console.log('222222222222222'))}
                        data={projects.dataProject}
                        // sortIcon={<ChevronDown />}
                        className='react-dataTable'
                        paginationComponent={false}
                    // data={dataToRender()}
                    // subHeaderComponent={
                    //   <CustomHeader
                    //     toggleSidebar={toggleSidebar}
                    //     handlePerPage={handlePerPage}
                    //     rowsPerPage={rowsPerPage}
                    //     searchTerm={searchTerm}
                    //     handleFilter={handleFilter}
                    //   />
                    // }
                    />
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

        </div>
    )
}

export default ResourceAllocation