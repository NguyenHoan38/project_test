import {
  Fragment,
  useEffect,
  useMemo,
  useState,
  Component,
  useCallback,
  memo
} from 'react'
import Flatpickr from 'react-flatpickr'
import Select from 'react-select'
import { FormGroup, Input } from 'reactstrap'
import { FaPlusCircle, FaTrash } from 'react-icons/fa'

function ListMilestones(props) {
  const { milestones, changeMilestones } = props
  const optionsStatus = [
    { value: 1, label: 'Unfinished' },
    { value: 2, label: 'Finished' }
  ]
  const [newMilestones, setNewMileStones] = useState(milestones)

  useEffect(() => {
    changeMilestones(newMilestones)
  }, [newMilestones])

  // useEffect(() => {
  //   setNewMileStones(milestones)
  // }, [milestones])
  const handleAddMilestone = () => {
    const newMilestone = {
      id: 1,
      projectId: 9,
      expiration: new Date(),
      status: 1,
      description: ''
    }
    setNewMileStones([...newMilestones, newMilestone])
  }
  const editExpiration = (date, index) => {
    const tempMileStones = [...newMilestones]
    tempMileStones[index].expiration = date
    setNewMileStones(tempMileStones)
  }
  function handleEditDesc(value, index) {
    const tempMileStones = [...newMilestones]
    tempMileStones[index].description = value
    setNewMileStones(tempMileStones)
  }

  function handleEditStatus(value, index) {
    const tempMileStones = [...newMilestones]
    tempMileStones[index].status = value
    setNewMileStones(tempMileStones)
  }
  function handleDeleteMilestone(i) {
    const tempMileStones = newMilestones.filter((item, index) => index !== i)
    setNewMileStones(tempMileStones)
  }
  return (
    <Fragment>
      {newMilestones.length > 0 ? (
        newMilestones.map(({ status, expiration, description }, i) => {
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
                  defaultValue={description}
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
        })
      ) : (
        <></>
      )}
      {newMilestones.length === 0 ? (
        <span
          className="d-flex align-items-center justify-content-center"
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
export default memo(ListMilestones)
