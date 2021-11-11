import React, { Component } from 'react'
import * as moment from 'moment'
//import 'moment/locale/zh-cn'
import Scheduler, {
  SchedulerData,
  ViewTypes
} from 'react-big-scheduler'
import withDragDropContext from './withDnDContext'
import 'react-big-scheduler/lib/css/style.css'
import axios from 'axios'
import { DOMAIN, DATE_FORMAT } from './../../../constant'
class ResourceAllocation extends Component {

  state = {
    viewModel: null
  }

  async getDataResource() {
    const data = await axios.get(`${DOMAIN}/resource/getResourceAllocationCalendar`)
   return data.data.data
  }

  data

  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    const dateNow = moment().format(DATE_FORMAT)
    const data = await this.getDataResource()
    this.data = data
    const schedulerData = new SchedulerData(
      dateNow,
      ViewTypes.Week,
      false,
      false,
      {
        // minuteStep: 15
      }
    )
    // schedulerData.localeMoment.locale('en')
    schedulerData.setResources(data.resources)
    schedulerData.setEvents(data.events)
    schedulerData.config.schedulerWidth = '85%'
    this.setState({viewModel: schedulerData})
  }


  render() {
    const { viewModel } = this.state
    if (viewModel) {
      return (
        <div>
          <div>
            <Scheduler
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
            />
          </div>
        </div>
      )
    }

    return (
      <div></div>
    )
    
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
    console.log(111)
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
}

export default withDragDropContext(ResourceAllocation)
