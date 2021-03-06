import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Select from 'react-select'
import Flatpickr from 'react-flatpickr'
import RangeSlider from 'react-bootstrap-range-slider'
import DataTable from 'react-data-table-component'
import { columns } from '../../constant/columns'
import { FaPlusCircle } from 'react-icons/fa'
import '../../../../../assets/scss/projects/styleResourceAllocation.scss'
import { Button, FormGroup, Label, Form, Input, CustomInput } from 'reactstrap'
import { useSelector, useDispatch } from 'react-redux'
import { addResourceAllocation, editResourceAllocation, setDataResourceAllocation, getResourceAllocation } from '../../store/action'
import ToastContent from '@components/common/ToastContent'
import { toast, Slide } from 'react-toastify'
import { isObjEmpty } from '@utils'

function ResourceAllocation(props) {
    const dispatch = useDispatch()
    const [checkFomAdd, setCheckFomAdd] = useState(false)
    const [employeeId, setEmployeeId] = useState(0)
    const [labelEmployee, setEmployeeLabel] = useState('')
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
        setMainHeadcount(0)
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
        if (projects.dataResourceAllocationByID[0]?.id) {
            const { assign, effort, endDate, id, mainHeadcount, note, role, shadow, startDate } = projects.dataResourceAllocationByID[0]
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
    }, [projects.dataResourceAllocationByID])
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
                        dispatch(getAllData())
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
                        dispatch(getAllData())
                        dispatch(getResourceAllocation(projects.dataProject?.id))
                        toast.success(
                            <ToastContent title={'Successful new creation!'} />,
                            { transition: Slide, hideProgressBar: true, autoClose: 2000 }
                        )
                    }
                })
            }

        }
        setRole(null)
        setLabelRole(null)
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
                                <CustomInput
                                    className="zIndex0"
                                    type='checkbox' id='user-1' label='' checked={mainHeadcount === 1} value={mainHeadcount} onChange={date => {
                                    setMainHeadcount(date.target.checked ? 1 : 0)
                                    setShadowId(null)
                                    
                                    } } />
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
                                    onChange={(e) => {
                                        setShadowId(e)
                                        setMainHeadcount(0)
                                    } }
                                    isDisabled={ mainHeadcount === 1}
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
                                <Input type="textarea"  rows="4" name="text" id="exampleText" value={note} onChange={(e) => setNote(e.target.value)} />
                            </FormGroup>
                        </div>
                    </div>
                )}
                <div className="d-flex justify-content-end mb-2 mt-2">
                    {checkFomAdd ? (
                        <>
                            <Button type='submit' className='mr-1' color='primary'>
                                Save
                            </Button>
                            <Button type='reset' color='secondary' outline onClick={() => handleAddFormClick()} >
                                Cancel
                            </Button>
                        </>
                    ) : (<span className="rounded bg-primary text-white p-assign" color="info" type='button' onClick={() => handleAddFormClick()} >Assign Employee <FaPlusCircle size="25px" /> </span>)}

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
                        className='react-dataTable'
                        paginationComponent={false}
                    />
                </div>
            </div>
        </div>
    )
}

export default ResourceAllocation