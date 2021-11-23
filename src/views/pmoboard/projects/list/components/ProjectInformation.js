import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Select from 'react-select'
import Flatpickr from 'react-flatpickr'
import {
  Collapse,
  Button,
  FormGroup,
  Label,
  Form,
  Input,
  Card
} from 'reactstrap'
import { FaTrash, FaPlusCircle, FaCheck } from 'react-icons/fa'
import '../../../../../assets/scss/projects/styleProjectInformation.scss'
import ToastContent from '@components/common/ToastContent'
import { toast, Slide } from 'react-toastify'
import { isObjEmpty } from '@utils'
import { projectColor } from '../../constant'
import ModalAddTechnologis from './ModalAddTechnologis'
// ** Store & Actions
import { addProject, updateProject, getData } from '../../store/action'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

// fake data
const typeData = [
  { value: 1, label: 'Active' },
  { value: 2, label: 'Onhold' },
  { value: 3, label: 'Closed' }
]

// ** Store Vars
//   const dispatch = useDispatch()
function ProjectInformation(props) {
  const { currentPage, rowsPerPage, searchObj } = props
  // ** Store Vars
  const dispatch = useDispatch()
  const [milestone, setMilestone] = useState([new Date()])
  const [typeLable, setTypeLable] = useState(null)
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [startProject, setStartProject] = useState('')
  const [type, settype] = useState(null)
  const [customerId, setCustomerId] = useState(null)
  const [lableCustomer, setLableCustomer] = useState(null)
  const [endProject, setEndProject] = useState(new Date())
  const [signal, setSignal] = useState('')
  const [status, setStatus] = useState(null)
  const [lableStatus, setLableStatus] = useState(null)
  const [pmLead, setPmLead] = useState(null)
  const [lablePmLead, setLablePmLead] = useState(null)
  const [technologyStack, setTechnologyStack] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [checkColor, setcheckColor] = useState(1)
  const [colorButton, setColorButton] = useState(projectColor[0])
  const [titleForm, setDataForm] = useState(null)
  const [industry, setIndustry] = useState(null)
  const toggle = () => setIsOpen(!isOpen)
  const [projectID, setprojectID] = useState(0)
  const [descIndustry, setdescIndustry] = useState(null)

  // ** Vars
  const { register, errors, handleSubmit } = useForm()
  // get state store
  const projects = useSelector((state) => state.projects)
  const [modal, setModal] = useState(false)

  const toggleAddFormTech = (title) => {
    setModal(!modal)
    setDataForm(title)
  }

  useEffect(() => {
    if (projects.dataProject?.id) {
      const {
        id,
        name,
        signal,
        color,
        projectType,
        customer,
        projectManager,
        startDate,
        endDate,
        technology,
        statusDetail,
        domain
      } = projects.dataProject
      const technologyNew = technology.map((res) => {
        return { ...res, value: res.id, label: res.name }
      })
      const domainsNew = domain.map((res) => {
        return { ...res, value: res.id, label: res.name }
      })
      setName(name)
      setprojectID(id)
      settype(projectType.id)
      setTypeLable(projectType.name)
      setSignal(signal)
      setcheckColor(color)
      setCustomerId(customer.id)
      setLableCustomer(customer.name)
      setPmLead(projectManager.id)
      setLablePmLead(projectManager.name)
      setStartProject(startDate)
      setEndProject(endDate)
      setTechnologyStack([...technologyNew])
      setStatus(typeData.find((item) => item.value === statusDetail.id).value)
      setLableStatus(
        typeData.find((item) => item.value === statusDetail.id).label
      )
      setIndustry(domainsNew)
    }
  }, [projects.dataProject])
  // ** Function to handle form submit
  const onSubmit = (values) => {
    const technologys = []
    if (technologyStack && technologyStack.length > 0) {
      technologyStack.map((res) => {
        technologys.push(res.value)
      })
    }
    const dataIndustry = []
    if (industry && industry.length > 0) {
      industry.map((res) => {
        dataIndustry.push(res.value)
      })
    }
    if (isObjEmpty(errors)) {
      if (projectID === 0) {
        dispatch(
          addProject({
            name,
            color: checkColor,
            signal,
            type,
            startDate: startProject,
            endDate: endProject,
            status,
            pmId: pmLead,
            mileStone: milestone,
            customerId,
            technologys,
            domains: dataIndustry
          })
        ).then((res) => {
          if (res && res.data && res.data && res.data.success) {
            props.hideSidebar()
            dispatch(getData({ currentPage, rowsPerPage, searchObj }))
            toast.success(<ToastContent title={'Successful new creation!'} />, {
              transition: Slide,
              hideProgressBar: true,
              autoClose: 2000
            })
          }
        })
      } else {
        console.log(customerId)
        dispatch(
          updateProject({
            id: projectID,
            name,
            type,
            color: checkColor,
            signal,
            startDate: startProject,
            endDate: endProject,
            status,
            pmId: pmLead,
            mileStone: milestone,
            customerId,
            technologys,
            domains: dataIndustry
          })
        ).then((res) => {
          if (res && res.data && res.data && res.data.success) {
            props.hideSidebar()
            dispatch(getData({ currentPage, rowsPerPage, searchObj }))
            toast.success(<ToastContent title={'Update Successful!'} />, {
              transition: Slide,
              hideProgressBar: true,
              autoClose: 2000
            })
          }
        })
      }
    }
  }
  // add mileStone
  function handleAddMilestone() {
    const a = new Date()
    setMilestone([...milestone, a])
  }
  function handleDeleteMilestone(i) {
    const newMilestone = milestone.filter((item, index) => index !== i)
    setMilestone(newMilestone)
  }
  const editMilestones = (date, i) => {
    milestone[i] = date
  }
  function handleClickColor(m) {
    setIsOpen(false)
    setcheckColor(m.id)
    setColorButton(m)
  }

  const handleChangeSignal = (e) => {
    setSignal(e.target.value)
  }
  const hideSidebar = () => {
    props.hideSidebar()
  }
  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <GridFormWrapper>
          <FormGroup>
            <Label for="name">Project Name</Label>
            <Input
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              // innerRef={register({ required: true })}
              // className={classnames({ 'is-invalid': errors['name'] })}
            />
          </FormGroup>
          <FormGroup>
            <Label for="signal">Project Code</Label>
            <Input
              name="signal"
              id="signal"
              // innerRef={register({ required: true })}
              value={signal}
              // onChange={setSignal}
              onChange={handleChangeSignal}
              // className={classnames({ 'is-invalid': errors['signal'] })}
            />
          </FormGroup>
          <FormGroup>
            <Label className="mr-2 w-100">Project Color</Label>
            <Button
              style={colorButton}
              color="color-Button"
              onClick={toggle}
              className="button-color"
            >
              {signal}
            </Button>
            <Collapse isOpen={isOpen} className="collapse-color">
              <Card>
                <div className="d-flex flex-wrap">
                  {projectColor.map((m, i) => {
                    return (
                      <div
                        style={projectColor[i]}
                        key={i}
                        className="blook-color text-center text-justify"
                        onClick={() => handleClickColor(m)}
                      >
                        {m.id === checkColor ? <FaCheck color="white" /> : ''}{' '}
                      </div>
                    )
                  })}
                </div>
              </Card>
            </Collapse>
          </FormGroup>
          <FormGroup>
            <Label for="type">Project Type</Label>
            <Select
              id="type"
              className="basic-single"
              classNamePrefix="select"
              isSearchable={true}
              isClearable={true}
              maxMenuHeight={220}
              name="type"
              onChange={settype}
              value={{ value: type, label: typeLable }}
              onChange={(e) => {
                settype(e.id)
                setTypeLable(e.label)
              }}
              options={projects.dataListProjectType}
            />
          </FormGroup>
          <FormGroup>
            <Label for="customerId">Customer</Label>
            <div className="d-flex align-items-center">
              <Select
                id="customerId"
                className="basic-single w-100 mr-2"
                classNamePrefix="select"
                isSearchable={true}
                isClearable={true}
                maxMenuHeight={220}
                name="name"
                value={{ value: customerId, label: lableCustomer }}
                onChange={(e) => {
                  setCustomerId(e.id)
                  setLableCustomer(e.label)
                }}
                options={projects.dataCustomer}
              />
              <FaPlusCircle
                size="25px"
                onClick={() => toggleAddFormTech('Customer')}
              />
            </div>
          </FormGroup>
          <FormGroup>
            <Label for="pmLead">PM/Lead</Label>
            <Select
              className="basic-single w-100 mr-2"
              classNamePrefix="select"
              isSearchable={true}
              isClearable={true}
              maxMenuHeight={220}
              value={{ value: pmLead, label: lablePmLead }}
              onChange={(e) => {
                setPmLead(e.id)
                console.log(pmLead)
                setLablePmLead(e.label)
              }}
              options={projects.dataListEmployee}
            />
          </FormGroup>
          <FormGroup>
            <span className="title">Start:</span>
            <Flatpickr
              value={startProject}
              onChange={(date) => setStartProject(date[0])}
              className="form-control invoice-edit-input date-picker"
            />
          </FormGroup>
          <FormGroup>
            <span className="title">End:</span>
            <Flatpickr
              value={endProject}
              onChange={(date) => setEndProject(date[0])}
              className="form-control invoice-edit-input date-picker"
            />
          </FormGroup>
          <FormGroup>
            <span className="title">Status:</span>
            <Select
              id="type"
              className="basic-single"
              classNamePrefix="select"
              isSearchable={true}
              isClearable={true}
              maxMenuHeight={220}
              name="type"
              value={status}
              onChange={setStatus}
              value={{ value: status, label: lableStatus }}
              onChange={(e) => {
                if (e.value) {
                  setStatus(e.value)
                  setLableStatus(e.label)
                }
              }}
              options={typeData}
            />
          </FormGroup>
          
          <FormGroup>
            <span className="title">Milestones:</span>
            <div>
              <div>
                {milestone &&
                  milestone.length > 0 &&
                  milestone.map((m, i) => {
                    return (
                      <div className="d-flex" key={i}>
                        <div style={{ width: '100%' }}>
                          <Flatpickr
                            key={i}
                            value={m}
                            onChange={(date) => editMilestones(date[0], i)}
                            className="form-control invoice-edit-input date-picker mr-4 mb-2"
                          />
                        </div>
                        {milestone.length === i + 1 && (
                          <span
                            className="ml-4"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Add milestones"
                            color="success"
                            size="lg"
                            onClick={handleAddMilestone}
                            active
                          >
                            {' '}
                            <FaPlusCircle size="25px" color="success" />{' '}
                          </span>
                        )}
                        <span
                          className="ml-4"
                          onClick={() => handleDeleteMilestone(i)}
                        >
                          {' '}
                          <FaTrash />
                        </span>
                      </div>
                    )
                  })}
                {milestone.length === 0 && (
                  <span
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Add milestones"
                    color="success"
                    size="lg"
                    onClick={handleAddMilestone}
                    active
                  >
                    {' '}
                    <FaPlusCircle size="25px" color="success" />{' '}
                  </span>
                )}
              </div>
            </div>
          </FormGroup>
          <FormGroup>
            <Label for="desc">Description</Label>
            <Input
              name="desc"
              id="desc"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              // innerRef={register({ required: true })}
              // className={classnames({ 'is-invalid': errors['name'] })}
            />
          </FormGroup>
          <div></div>
          <FormGroup>
            <Label for="technologyStack">Technologies </Label>
            <div className="d-flex align-items-center">
              <Select
                isMulti
                style={{ with: '100%', marginRight: '20px' }}
                className="basic-single w-100 mr-2"
                classNamePrefix="select"
                isSearchable={true}
                value={technologyStack}
                onChange={(e) => {
                  setTechnologyStack(e)
                }}
                options={projects.dataListProjectTechnology}
              />
              <FaPlusCircle
                size="25px"
                onClick={() => toggleAddFormTech('Technologies')}
              />
            </div>
          </FormGroup>
          <FormGroup>
            <Label for="technologyStack">Industry</Label>
            <div className="d-flex align-items-center">
              <Select
                isMulti
                style={{ with: '100%', marginRight: '20px' }}
                className="basic-single w-100 mr-2"
                classNamePrefix="select"
                isSearchable={true}
                value={industry}
                onChange={setIndustry}
                options={projects.dataListProjectDomain}
              />
              <FaPlusCircle
                size="25px"
                onClick={() => toggleAddFormTech('Industry')}
              />
            </div>
          </FormGroup>
        </GridFormWrapper>
        <div style={{ float: 'right' }}>
          <Button type="submit" className="mr-1" color="primary">
            Save
          </Button>
          <Button
            type="reset"
            color="secondary"
            outline
            onClick={() => hideSidebar()}
          >
            Cancel
          </Button>
        </div>
      </Form>
      <ModalAddTechnologis
        modal={modal}
        toggle={toggleAddFormTech}
        titleForm={titleForm}
      />
    </div>
  )
}

const GridFormWrapper = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '1rem'
})

export default ProjectInformation
