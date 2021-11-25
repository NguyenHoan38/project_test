import { Fragment, useEffect, useMemo, useState } from 'react'
import Flatpickr from 'react-flatpickr'
import Select from 'react-select'
import { FormGroup, Input } from 'reactstrap'
import Label from 'reactstrap/lib/Label'
import styled from 'styled-components'
import useDerivedState from '../../../../utility/hooks/useDerivedState'
import { Controller, useForm } from 'react-hook-form'
import { FaPlusCircle, FaTrash } from 'react-icons/fa'

const ListMilestones = (props) => {
  const { milestones: initialMilestones, changeMilestones } = props
  const optionsStatus = [
    { value: 1, label: 'Unfinished' },
    { value: 2, label: 'Finished' }
  ]
  const [milestones, setMilestones] = useState(initialMilestones)

  useEffect(() => {
    setMilestones(initialMilestones)
  }, [initialMilestones])

  // useEffect(() => {
  //   changeMilestones(milestones)
  // }, [milestones])

  function handleAddMilestone() {
    const newMilestone = {
      expiration: new Date(),
      status: 1,
      description: ''
    }
    setMilestones([...milestones, newMilestone])
  }
  const editExpiration = (date, index) => {
    // console.log(date)
    console.log(initialMilestones)
    // console.log(milestones, 'trc')
    const cloneMileStone = milestones
    cloneMileStone[index].expiration = date.toISOString()
    // console.log(cloneMileStone[index].expiration)
    setMilestones(cloneMileStone)
    console.log(milestones, 'sau')
  }

  function handleEditDesc(value, index) {
    const cloneMileStone = milestones.slice()
    cloneMileStone[index].description = value
    setMilestones(cloneMileStone)
  }

  function handleEditStatus(value, index) {
    const cloneMileStone = milestones.slice()
    cloneMileStone[index].status = value
    setMilestones(cloneMileStone)
  }
  function handleDeleteMilestone(i) {
    const newMilestone = milestones.filter((item, index) => index !== i)
    setMilestones(newMilestone)
  }
  return (
    <Fragment>
      {milestones.map(({ status, expiration, description }, i) => {
        return (
          <Fragment key={i}>
            <FormGroup>
              <span htmlFor="expiration">Milestones:</span>
              <div className="d-flex align-items-center">
                <Flatpickr
                  id="expiration"
                  value={expiration}
                  onChange={(date) => editExpiration(date[0], i)}
                  className="form-control invoice-edit-input date-picker mr-4 mb-2"
                ></Flatpickr>
              </div>
            </FormGroup>
            <FormGroup>
              <span className="title">Description</span>
              <Input
                name="description"
                id="description"
                value={description}
                className="description"
                onChange={(e) => handleEditDesc(e.target.value, i)}
              />
            </FormGroup>
            <div>
              <FormGroup>
                <span className="title">Status milestones</span>

                <div className="d-flex align-items-center">
                  <Select
                    styles={{ width: '100%' }}
                    onChange={(e) => {
                      handleEditStatus(e.value, i)
                    }}
                    isSearchable={true}
                    options={optionsStatus}
                    name="milistones"
                    id="type"
                    className="basic-single w-100 mr-2"
                    classNamePrefix="select"
                    defaultValue={optionsStatus[status - 1]}
                    getOptionLabel={(option) => {
                      return option.label
                    }}
                    getOptionValue={(option) => {
                      return option.value
                    }}
                  ></Select>
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
                    <FaPlusCircle size="22px" color="success" />{' '}
                  </span>
                  <span
                    className="ml-4"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Remove milestones"
                    color="success"
                    size="lg"
                    onClick={() => handleDeleteMilestone(i)}
                    active
                  >
                    <FaTrash size="22px" />
                  </span>
                </div>
              </FormGroup>
            </div>
          </Fragment>
        )
      })}
      {milestones.length === 0 ? (
        <span
          data-toggle="tooltip"
          data-placement="top"
          title="Add milestones"
          color="success"
          size="lg"
          onClick={handleAddMilestone}
          active
        >
          <FaPlusCircle size="25px" color="success" />{' '}
        </span>
      ) : (
        <></>
      )}
    </Fragment>
  )
}

export default ListMilestones
