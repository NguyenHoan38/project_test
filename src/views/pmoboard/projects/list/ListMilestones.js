import { Fragment, useState } from 'react'
import Flatpickr from 'react-flatpickr'
import Select from 'react-select'
import { FormGroup, Input } from 'reactstrap'
import Label from 'reactstrap/lib/Label'
import styled from 'styled-components'
import useDerivedState from '../../../../utility/hooks/useDerivedState'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

const ListMilestones = (props) => {
  const { milestones: initialMilestones, addMilestone, removeMilestone } = props
  // console.log(initialMilestones)
  // const { milestones: initialMilestones, addMilestone, removeMilestone } = props
  // const [status, setStatus] = useState(null)
  // const [optionsStatus, setOptionStatus] = useState({})
  const [lableStatus, setLableStatus] = useState(null)
  const [milestones, setMilestones] = useDerivedState(() => {
    return initialMilestones.reduce((acc, val) => {
      const { expiration } = val
      acc.set(expiration, true)
      return acc
    }, new Map())
  })

  const [desc, setDesc] = useDerivedState(() => {
    return initialMilestones.reduce((acc, val) => {
      const { expiration } = val
      acc[expiration] = val
      return acc
    }, {})
  })
  console.log(desc)
  const [status, setStatus] = useDerivedState(() => {
    return initialMilestones.reduce((acc, val) => {
      const { expiration } = val
      acc[expiration] = val
      return acc
    }, {})
  })
  const editMilestones = (date, i) => {
    milestones[i] = date
    setMilestones(milestones[i])
  }
  const optionsStatus = [
    { value: 1, label: 'Unfinished' },
    { value: 2, label: 'Finished' }
  ]
  return (
    <Fragment>
      {initialMilestones.map(({ expiration, status, description }, i) => {
        return (
          <Fragment>
            <FormGroup>
              <span className="title">Milestones:</span>
              <div key={i} style={{ width: '100%' }}>
                <Flatpickr
                  key={i}
                  value={expiration}
                  onChange={(date) => editMilestones(date[0], i)}
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
                onChange={(e) => {
                  setDesc(e.target.value)
                }}
              />
            </FormGroup>
            <FormGroup>
              <span className="title">Status milestones</span>
              <Select
                onChange={(e) => {
                  if (e.value) {
                    setStatus(e.value)
                    setLableStatus(e.label)
                  }
                }}
                isSearchable={true}
                isClearable={true}
                options={optionsStatus}
                name="milistones"
                id="type"
                className="react-select"
                classNamePrefix="select"
                value={{ value: status, label: lableStatus }}
              ></Select>
            </FormGroup>
          </Fragment>
        )
      })}
    </Fragment>
  )
}
const MilestonesFormGroup = styled(FormGroup)({
  position: 'relative',
  zIndex: 2
})
const MilestonesWrapper = styled('div')({
  display: 'grid',
  gridTemplateColumns: '1fr',
  marginTop: '0.5rem'
})
export default ListMilestones
