import { useEffect, useState } from 'react'
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
import { Button, FormGroup, Label, FormText, Form, Input, TabContent, TabPane, Nav, NavItem, NavLink, Card, CardTitle, CardText, Row, Col, CustomInput } from 'reactstrap'
import { useSelector, useDispatch } from 'react-redux'
import { addResourceAllocation, editResourceAllocation, setDataResourceAllocation, getResourceAllocation  } from '../../store/action'
import ToastContent from '@components/common/ToastContent'
import { toast, Slide } from 'react-toastify'
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
    const [labelRole, setLabelRole] = useState(null)
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [mainHeadcount, setMainHeadcount] = useState(0)
    const [shadowId, setShadowId] = useState(null)
    const [note, setNote] = useState('')
    const [resourceAllocationID, setResourceAllocationID] = useState(0)
    // get store
    const projects = useSelector(state => state.projects)
    const { register, errors, handleSubmit } = useForm()
    const setForm = () => {
        setEmployeeId(null)
        setEmployeeLabel(null)
        setResourceAllocationID(0)
        setRole(null)
        setStartDate(null)
        setEndDate(null)
        setMainHeadcount(null)
        setShadowId(null)
        setEffortValue(0)
        setNote(null)
    }
    const handleAddFormClick = () => {
        setCheckFomAdd(!checkFomAdd)
        setResourceAllocationID(0)
        dispatch(setDataResourceAllocation)
        setForm()
    }
    useEffect(() => {
        if (projects.dataResourceAllocation[0]?.id) {
            const { assign, effort, endDate, id, mainHeadcount, note, role, shadow, startDate } = projects.dataResourceAllocation[0]
            // const technologyNew = technology.map(res => { return { ...res, value: res.id, label: res.name } })
            // const domainsNew = domain.map(res => { return { ...res, value: res.id, label: res.name } })
            setEmployeeId(assign?.id)
            setEmployeeLabel(assign?.name)
            setResourceAllocationID(id)
            setRole(role)
            setStartDate(startDate)
            setEndDate(endDate)
            setMainHeadcount(mainHeadcount)
            setShadowId(shadow)
            setEffortValue(effort)
            setNote(note)
        }
    }, [projects.dataResourceAllocation])
    const showFormEdit = (id) => {
        setCheckFomAdd(true)
    }

    const onSubmit = values => {
        if (isObjEmpty(errors)) {
            if (resourceAllocationID === 0) {
                dispatch(
                    addResourceAllocation({
                        projectId: projects.dataProject?.id,
                        employeeId,
                        role,
                        shadowId: shadowId?.id,
                        mainHeadcount,
                        effort: effortValue,
                        startDate,
                        endDate,
                        note
                    })
                ).then(res => {
                    if (res && res.data && res.data && res.data.success) {
                        setCheckFomAdd(!checkFomAdd)
                        dispatch(getResourceAllocation(projects.dataProject?.id))
                        toast.success(
                            <ToastContent title={'Successful new creation!'} />,
                            { transition: Slide, hideProgressBar: true, autoClose: 2000 }
                        )
                    }
                })
            } else {
                dispatch(
                    editResourceAllocation({
                        id: resourceAllocationID,
                        projectId: projects.dataProject?.id,
                        employeeId,
                        role,
                        shadowId: shadowId?.id,
                        mainHeadcount,
                        effort: effortValue,
                        startDate,
                        endDate,
                        note
                    })
                ).then(res => {
                    if (res && res.data && res.data && res.data.success) {
                        setCheckFomAdd(!checkFomAdd)
                        dispatch(getResourceAllocation(projects.dataProject?.id))
                        toast.success(
                            <ToastContent title={'Successful new creation!'} />,
                            { transition: Slide, hideProgressBar: true, autoClose: 2000 }
                        )
                    }
                })
            }

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
                                    value={{ value: employeeId, label: labelEmployee }}
                                    onChange={(e) => {
                                        setEmployeeId(e.id)
                                        setEmployeeLabel(e.label)
                                    }}
                                    // className={classnames({ 'is-invalid': errors['employeeId'] })}
                                    // innerRef={register({ required: true })}
                                    options={projects.dataListEmployee.map((project, index) => ({
                                        ...project,
                                        label: project.name
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
                                    value={{ value: role, label: labelRole }}
                                    onChange={(e) => {
                                        setRole(e.id)
                                        setLabelRole(e.label)
                                    }}
                                    options={projects.dataListRoleEmployee}
                                />
                            </FormGroup>
                        </div>
                        <div className='col-6'>
                            <FormGroup>
                                <span className='title'>Form:</span>
                                <Flatpickr
                                    value={startDate}
                                    onChange={date => setStartDate(date[0])}
                                    className='form-control invoice-edit-input date-picker'
                                />
                            </FormGroup>
                        </div>
                        <div className='col-6'>
                            <FormGroup>
                                <span className='title'>To:</span>
                                <Flatpickr
                                    value={endDate}
                                    onChange={date => setEndDate(date[0])}
                                    className='form-control invoice-edit-input date-picker'
                                />
                            </FormGroup>
                        </div>
                        <div className='col-6'>
                            <FormGroup >
                                <label className='title mr-4 w-100'> Main Headcount:</label>
                                <Input className='ml-0' type="checkbox" di />
                                <CustomInput type='checkbox' id='user-1' label='' value={mainHeadcount} onChange={date => setMainHeadcount(date.target.checked ? 1 : 0)} />
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
                                    disabled={true}
                                    options={projects.dataListEmployee.map((project, index) => ({
                                        ...project,
                                        id: project.id,
                                        label: project.name
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
                            <Button type='reset' color='secondary' outline onClick={() => handleAddFormClick()} >
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
                        columns={columns((id) => showFormEdit(id))}
                        data={projects.dataResourceAllocation}
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
            {/* <div style={{ float: 'right' }}>
                <Button type='submit' className='mr-1' color='primary'>
                    Save
                </Button>
                <Button type='reset' color='secondary' outline >
                    Cancel
                </Button>
            </div> */}

        </div>
    )
}

export default ResourceAllocation