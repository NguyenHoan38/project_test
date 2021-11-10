import Scheduler, { SchedulerData, ViewTypes } from 'react-big-scheduler'
import withDragDropContext from './withDnDContext'
import 'react-big-scheduler/lib/css/style.css'
import { Fragment, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getData } from './store/action'

const ResourceAllocation = () => {
  const dispatch = useDispatch()
  const { data } = useSelector((state) => state.resources)
  //let schedulerData = new SchedulerData(new moment("2017-12-18").format(DATE_FORMAT), ViewTypes.Week)
  const schedulerInit = new SchedulerData(
    '2017-12-18',
    ViewTypes.Week,
    false,
    false,
    {
      minuteStep: 15
    }
  )
  // schedulerData.localeMoment.locale('en')
  schedulerInit.config.schedulerWidth = '85%'
  const [viewModel, setViewModel] = useState(schedulerInit)
  
  useEffect(() => {
    dispatch(getData())
    schedulerInit.setResources(data.resources)
    schedulerInit.setEvents(data.events)
    setViewModel(schedulerInit)
    // console.log(viewModel)
  }, [data.resources.length])

  useEffect(() => {
    console.log(viewModel)
  }, [viewModel])

  const prevClick = (schedulerData) => {
    schedulerData.prev()
    schedulerData.setEvents(schedulerData.events)
  }

  const nextClick = (schedulerData) => {
    schedulerData.next()
    schedulerData.setEvents(schedulerData.events)
    setViewModel(schedulerData)
  }

  const onViewChange = (schedulerData, view) => {
    schedulerData.setViewType(
      view.viewType,
      view.showAgenda,
      view.isEventPerspective
    )
    schedulerData.setEvents(schedulerData.events)
    setViewModel(schedulerData)
  }

  const onSelectDate = (schedulerData, date) => {
    schedulerData.setDate(date)
    schedulerData.setEvents(schedulerData.events)
    setViewModel(schedulerData)
  }

  const eventClicked = (schedulerData, event) => {
    alert(`You just clicked an event: {id: ${event.id}, title: ${event.title}}`)
  }

  const ops1 = (schedulerData, event) => {
    alert(
      `You just executed ops1 to event: {id: ${event.id}, title: ${event.title}}`
    )
  }

  const ops2 = (schedulerData, event) => {
    alert(
      `You just executed ops2 to event: {id: ${event.id}, title: ${event.title}}`
    )
  }

  const newEvent = (
    schedulerData,
    slotId,
    slotName,
    start,
    end,
    type,
    item
  ) => {
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
    setViewModel(schedulerData)
  }

  const updateEventStart = (schedulerData, event, newStart) => {
    schedulerData.updateEventStart(event, newStart)
    setViewModel(schedulerData)
  }

  const updateEventEnd = (schedulerData, event, newEnd) => {
    schedulerData.updateEventEnd(event, newEnd)
    setViewModel(schedulerData)
  }

  const moveEvent = (schedulerData, event, slotId, slotName, start, end) => {
    schedulerData.moveEvent(event, slotId, slotName, start, end)
    setViewModel(schedulerData)
  }

  return (
    <Fragment>
      <div>
        <Scheduler
          schedulerData={viewModel}
          prevClick={prevClick}
          nextClick={nextClick}
          onSelectDate={onSelectDate}
          onViewChange={onViewChange}
          eventItemClick={eventClicked}
          viewEventClick={ops1}
          viewEventText="Ops 1"
          viewEvent2Text="Ops 2"
          viewEvent2Click={ops2}
          updateEventStart={updateEventStart}
          updateEventEnd={updateEventEnd}
          moveEvent={moveEvent}
          newEvent={newEvent}
        />
      </div>
    </Fragment>
  )
}

export default ResourceAllocation
