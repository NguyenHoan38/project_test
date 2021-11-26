import React, { Component, Fragment } from 'react'
import * as moment from 'moment'
//import 'moment/locale/zh-cn'
import Scheduler, { SchedulerData, ViewTypes } from 'react-big-scheduler'
import withDragDropContext from './withDnDContext'
import 'react-big-scheduler/lib/css/style.css'
import axios from 'axios'
import {
  DOMAIN,
  DATE_FORMAT,
  DATE_FORMAT_NOT_TIMESTAMP
} from './../../../constant'
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Input,
  Label,
  FormGroup,
  Row,
  Col
} from 'reactstrap'
import keyBy from 'lodash.keyby'
import Flatpickr from 'react-flatpickr'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/libs/react-select/_react-select.scss'
import styled from 'styled-components'
import SearchField from './store/SearchField'
import { selectThemeColors } from '@utils'
import Select from 'react-select'
import { prev } from 'dom7'
import ListEditEmployee from '../employees/list/ListEditEmployee'
import { getListEmployee } from '../projects/store/action'
import { connect, useDispatch, useSelector } from 'react-redux'
import { compose } from 'redux'
import { createSelector } from '@reduxjs/toolkit'
import Sidebar from '../employees/list/ListSidebar'

class ResourceAllocation extends Component {
  state = {
    employeeInfo: {},
    isOpenInfo: false,
    viewModel: null,
    startProject: '',
    endProject: '',
    searchName: '',
    skillOptions: [],
    searchSkills: [],
    schedulerData: new SchedulerData(
      moment().format(DATE_FORMAT),
      ViewTypes.Week,
      false,
      false,
      {}
    )
  }
  async getDataResource() {
    const { searchName, startProject, endProject, searchSkills } = this.state
    console.log(searchSkills.map((skill) => skill.id))
    const searchSkillIds = searchSkills.map((skill) => skill.id)
    const data = await axios.post(
      `${DOMAIN}/resource/getResourceAllocationCalendar`,
      {
        searchObj: {
          name: searchName,
          startDate: startProject,
          endDate: endProject,
          skills: searchSkillIds.length > 0 ? searchSkillIds : ''
        }
      }
    )
    return data.data.data
  }

  async componentDidUpdate(prevProps, prevState) {
    // console.log(sS)
    if (
      prevState.searchName !== this.state.searchName ||
      prevState.startProject !== this.state.startProject ||
      prevState.endProject !== this.state.endProject ||
      prevState.searchSkills !== this.state.searchSkills
    ) {
      const data = await this.getDataResource()
      const { schedulerData } = this.state
      schedulerData.setResources(data.resources)
      schedulerData.setEvents(data.events)
      schedulerData.config.schedulerWidth = '85%'
      this.setState({ viewModel: schedulerData })
    }
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    // fetch resource data
    this.fetchResourceData()
    // get skills
    this.fetchSkills()
  }

  render() {
    const { viewModel } = this.state
    const employee = this.state.employeeInfo

    if (viewModel) {
      return (
        <div>
          <Card>
            <CardHeader className="border-bottom">
              <CardTitle tag="h4">Search</CardTitle>
            </CardHeader>
            <CardBody>
              <Row form className="mt-1 mb-50">
                <Col lg="6" md="6">
                  <SearchField onSearch={this.handleSearch} />
                </Col>
                <Col lg="3" md="4">
                  <FormGroup>
                    <Label for="name">Date from:</Label>
                    <Flatpickr
                      value={this.startProject}
                      onChange={this.handleStartProjectChange}
                      className="form-control invoice-edit-input date-picker"
                    />
                  </FormGroup>
                </Col>
                <Col lg="3" md="4">
                  <FormGroup>
                    <Label for="name">Date to:</Label>
                    <Flatpickr
                      value={this.endProject}
                      onChange={this.handleEndProjectChange}
                      className="form-control invoice-edit-input date-picker"
                    />
                  </FormGroup>
                </Col>
                <Col lg="6" md="4">
                  <div style={{ zIndex: 100, position: 'relative' }}>
                    <div>
                      <Label for="skills">Skills:</Label>
                    </div>
                    <Select
                      theme={selectThemeColors}
                      onChange={this.handleOnChangeSelect}
                      value={this.state.searchSkills}
                      isMulti
                      name="skills"
                      id="select-skills"
                      options={this.state.skillOptions}
                      className="react-select  w-100"
                      classNamePrefix="select"
                      getOptionLabel={(option) => {
                        return option.name
                      }}
                      getOptionValue={(option) => {
                        return option.id
                      }}
                    />
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
          <Sidebar
            open={this.state.isOpenInfo && Object.keys(employee).length > 0}
            title="Employee Infomation"
            onClose={this.handleCloseEditEmployee}
          >
            <GridFormWrapper>{this.renderDataInfo(employee)}</GridFormWrapper>
          </Sidebar>
          <div>
            <Scheduler
              slotClickedFunc={this.slotClickedFunc}
              schedulerData={viewModel}
              prevClick={this.prevClick}
              nextClick={this.nextClick}
              onSelectDate={this.onSelectDate}
              onViewChange={this.onViewChange}
              eventItemClick={this.eventClicked}
              viewEventClick={this.ops1}
              viewEventText="Detail 1"
              viewEvent2Text=""
              // viewEvent2Click={this.ops2}
              updateEventStart={this.updateEventStart}
              updateEventEnd={this.updateEventEnd}
              moveEvent={this.moveEvent}
              newEvent={this.newEvent}
              eventItemPopoverTemplateResolver={
                this.eventItemPopoverTemplateResolver
              }
            />
          </div>
        </div>
      )
    }

    return <div></div>
  }
  handleCloseEditEmployee = () => {
    this.setState({ isOpenInfo: false })
    // this.setState({ employeeInfo: {} })
  }
  renderDataInfo = (employee) => {
    const skills = employee.skills
    return (
      <Fragment>
        <p>{`Name: ${employee.name}`}</p>
        <p>{`Email: ${employee.email}`}</p>
        <p>{`Phone Number: ${employee.phone}`}</p>
        <p>{`Status: ${keyBy(employee.statusDetail, 'name').undefined}`}</p>
        <p>{`Location: ${keyBy(employee.locationDetail, 'name').undefined}`}</p>
      </Fragment>
    )
  }
  slotClickedFunc = (schedulerData, slot) => {
    this.setState({ isOpenInfo: true })
    const { ListEmployee } = this.props
    const employeeInfo = ListEmployee.filter(
      (employee) => employee.name === slot.slotName
    )
    this.setState({ employeeInfo: employeeInfo[0] })
  }

  handleOnChangeSelect = (skills) => {
    // const skillIds = skills.map((skill) => skill.id)
    this.setState({ searchSkills: skills })
    // console.log(this.state.skills)
  }

  fetchResourceData = () => {
    ;(async () => {
      const data = await this.getDataResource()
      this.data = data
      const { schedulerData } = this.state
      schedulerData.setResources(data.resources)
      schedulerData.setEvents(data.events)
      schedulerData.config.schedulerWidth = '85%'
      this.setState({ viewModel: schedulerData })
    })()
  }

  fetchSkills = () => {
    ;(async () => {
      const res = await axios.get(`${DOMAIN}/resource/getListEmployeeSkill`)
      this.setState({ skillOptions: [...res?.data?.data] })
    })()
  }

  // search endDate
  handleEndProjectChange = (date) => {
    console.log(date)
    if (date[0]) {
      // this.setState({ endProject: date[0].toISOString() })
      this.setState({
        endProject: moment(date[0]).format(DATE_FORMAT)
      })
    } else {
      this.setState({ endProject: '' })
    }
  }

  // search startDate
  handleStartProjectChange = (date) => {
    if (date[0]) {
      this.setState({
        startProject: moment(date[0]).format(DATE_FORMAT)
      })
    } else {
      this.setState({ startProject: '' })
    }
  }

  // search Resource name
  handleSearch = (text) => {
    this.setState({ searchName: text })
    const { endProject, startProject, searchName } = this.state
  }

  handleSearchNameChange = (e) => {
    this.setState({
      searchName: e.target.value
    })
  }

  prevClick = (schedulerData) => {
    schedulerData.prev()
    schedulerData.setEvents(this.data.events)
    this.setState({
      viewModel: schedulerData
    })
  }

  nextClick = (schedulerData) => {
    schedulerData.next()
    schedulerData.setEvents(this.data.events)
    this.setState({
      viewModel: schedulerData
    })
  }

  onViewChange = (schedulerData, view) => {
    schedulerData.setViewType(
      view.viewType,
      view.showAgenda,
      view.isEventPerspective
    )
    schedulerData.setEvents(this.data.events)
    this.setState({
      viewModel: schedulerData
    })
  }

  onSelectDate = (schedulerData, date) => {
    schedulerData.setDate(date)
    schedulerData.setEvents(this.data.events)
    this.setState({
      viewModel: schedulerData
    })
  }

  eventClicked = (schedulerData, event) => {
    alert(`You just clicked an event: {id: ${event.id}, title: ${event.title}}`)
  }

  ops1 = (schedulerData, event) => {
    alert(
      `You just executed ops1 to event: {id: ${event.id}, title: ${event.title}}`
    )
  }

  ops2 = (schedulerData, event) => {
    alert(
      `You just executed ops2 to event: {id: ${event.id}, title: ${event.title}}`
    )
  }

  newEvent = (schedulerData, slotId, slotName, start, end, type, item) => {
    let newFreshId = 0
    schedulerData.events.forEach((item) => {
      if (item.id >= newFreshId) newFreshId = item.id + 1
    })

    const newEvent = {
      id: newFreshId,
      title: 'New event you just created',
      start,
      end,
      resourceId: slotId,
      bgColor: 'purple'
    }
    schedulerData.addEvent(newEvent)
    this.setState({
      viewModel: schedulerData
    })
  }

  updateEventStart = (schedulerData, event, newStart) => {
    schedulerData.updateEventStart(event, newStart)
    this.setState({
      viewModel: schedulerData
    })
  }

  updateEventEnd = (schedulerData, event, newEnd) => {
    schedulerData.updateEventEnd(event, newEnd)
    this.setState({
      viewModel: schedulerData
    })
  }

  moveEvent = (schedulerData, event, slotId, slotName, start, end) => {
    schedulerData.moveEvent(event, slotId, slotName, start, end)
    this.setState({
      viewModel: schedulerData
    })
  }

  eventItemPopoverTemplateResolver = (
    schedulerData,
    eventItem,
    title,
    start,
    end,
    statusColor
  ) => {
    const [newTitle, effort] = title.split(',')
    console.log(title)
    return (
      <CustomPopoverTemplateResolver>
        <div className="popoverTop">
          <div className="color" style={{ backgroundColor: statusColor }}></div>
          <div>{newTitle}</div>
        </div>
        <div className="popoverTimeTitle">
          {moment(start).format(DATE_FORMAT_NOT_TIMESTAMP)} -{' '}
          {moment(end).format(DATE_FORMAT_NOT_TIMESTAMP)}
        </div>
        <div className="popoverEffort">{effort}%</div>
      </CustomPopoverTemplateResolver>
    )
  }
}

const CustomPopoverTemplateResolver = styled.div`
  & .popoverTop {
    display: flex;
    font-size: 16px;
    align-items: center;
  }

  & .color {
    border-radius: 50%;
    width: 15px;
    height: 15px;
    margin-right: 8px;
  }

  & .popoverTimeTitle {
    color: #6e6b7b;
    font-size: 18px;
    margin-top: 15px;
    font-weight: bold;
  }

  & .popoverEffort {
    text-transform: capitalize;
    font-size: 16px;
  }
`
const GridFormWrapper = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '1rem'
})
// const SkillsWrapper = styled('div')(({ grow }) => ({
//   transition: 'flex-grow 0.3s',
//   ...(grow && {
//     flexGrow: 3
//   })
// }))

const StyledRow = styled(Row)({
  flexWrap: 'wrap',
  '& > *': {
    flex: 1
  }
})

const mapStateToProps = (state) => {
  const { projects } = state
  return { ListEmployee: projects.dataListEmployee }
}

const mapDispatchToProps = (dispatch) => ({
  getListEmployee: dispatch(getListEmployee())
})

const SearchWrapper = styled('div')(({ shink }) => ({
  transition: 'flex-grow 0.3s',
  ...(shink && {
    flexGrow: 1,
    marginRight: '1rem'
  })
}))

export default withDragDropContext(
  connect(mapStateToProps, mapDispatchToProps)(ResourceAllocation)
)
