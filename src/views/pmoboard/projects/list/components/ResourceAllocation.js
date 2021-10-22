import { useState } from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import classnames from 'classnames'
import Select from 'react-select'
import Flatpickr from 'react-flatpickr'
import RangeSlider from 'react-bootstrap-range-slider'
import DataTable from 'react-data-table-component'
import { columns } from '../../constant'
import { FaTrash, FaPlusCircle, FaCheck } from 'react-icons/fa'
import '../../../../../assets/scss/projects/styleResourceAllocation.scss'
import { Button, FormGroup, Label, FormText, Form, Input, TabContent, TabPane, Nav, NavItem, NavLink, Card, CardTitle, CardText, Row, Col } from 'reactstrap'
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
const data = [{ id: 1, title: 'Conan the Barbarian', year: '1982' }]
function ResourceAllocation(props) {
    const [milestone, setMilestone] = useState([new Date(), new Date()])

    const [startProject, setStartProject] = useState(new Date())
    const [projectType, setProjectType] = useState(null)
    const [customer, setCustomer] = useState(null)
    const [endProject, setEndProject] = useState(new Date())
    const [color, setColor] = useState('#ffff')
    const [pmLead, setPmLead] = useState(null)
    const [technologyStack, setTechnologyStack] = useState(null)
    const [value, setValue] = useState(0)
    return (
        <div>
            <Form >
                <div className='row mt-2'>
                    <div className='col-6'>
                        <FormGroup>
                            <Label for='projectName'>
                                Assign employee <span className='text-danger'>*</span>
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
                    <div className='col-6'>
                        <FormGroup>
                            <Label for='projectType'>
                                Role <span className='text-danger'>*</span>
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
                    <div className='col-6'>
                        <FormGroup>
                            <span className='title'>Form:</span>
                            <Flatpickr
                                value={startProject}
                                onChange={date => setStartProject(date)}
                                className='form-control invoice-edit-input date-picker'
                            />
                        </FormGroup>
                    </div>
                    <div className='col-6'>
                        <FormGroup>
                            <span className='title'>To:</span>
                            <Flatpickr
                                value={startProject}
                                onChange={date => setStartProject(date)}
                                className='form-control invoice-edit-input date-picker'
                            />
                        </FormGroup>
                    </div>
                    <div className='col-6'>
                        <FormGroup >
                            <label className='title mr-4 w-100'> Main Headcount:</label>
                            <Input className='ml-0' type="checkbox"   />
                        </FormGroup>
                    </div>
                    <div className='col-6'>
                        <FormGroup >
                            <span className='title mr-4'> Shadow for:</span>
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
                    <div className='col-6 d-flex w-100 mr-2'>
                        <FormGroup className="w-100">
                            <span className='title'>Effort:</span>
                            <RangeSlider
                                value={value}
                                onChange={changeEvent => setValue(changeEvent.target.value)}
                                className="w-100 mr-2"
                            />
                        </FormGroup>
                        <span>{value}%</span>
                        {/* </div> */}

                    </div>
                    <div className='col-12'>
                        <FormGroup>
                            <Label for="exampleText">Note</Label>
                            <Input type="textarea" name="text" id="exampleText" />
                        </FormGroup>

                    </div>
                    <div className='col-12'>
                        <div className="d-flex justify-content-end mb-3">
                            <Button color="info">Assign Employee <FaPlusCircle size="25px" /> </Button>
                        </div>
                        <DataTable
                            noHeader={true}
                            pagination
                            subHeader={false}
                            responsive
                            paginationServer={false}
                            header={false}
                            pagination={false}
                            columns={columns}
                            data={data}
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
            </Form>
        </div>
    )
}

export default ResourceAllocation