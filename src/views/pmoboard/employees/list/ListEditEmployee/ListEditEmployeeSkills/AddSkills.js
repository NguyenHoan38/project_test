import axios from '@src/utility/axios'
import { selectThemeColors } from '@utils'
import classnames from 'classnames'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Select from 'react-select'
import { CustomInput, FormFeedback, FormGroup } from 'reactstrap'
import { SkillItem } from '.'

const ListAddSkills = (props) => {
  const { open, initialSkills, onAddSkills } = props
  const allSkills = useSelector((state) => state.employees.skills)
  const [levelOptions, setLevelOptions] = useState({})

  const [skills, setSkills] = useState({})
  const [levels, setLevels] = useState({})
  const [errors, setErrors] = useState({})

  const handleSelectSkill = (skillId) => (event) => {
    const checked = event.target.checked
    if (!checked) {
      setLevels((state) => ({
        ...state,
        [skillId]: null
      }))
      setErrors((state) => ({
        ...state,
        [skillId]: null
      }))
    }
    setSkills((state) => ({
      ...state,
      [skillId]: checked
    }))
  }

  const handleSelectLevel = (skillId) => (result) => {
    if (!result) {
      setErrors((state) => ({
        ...state,
        [skillId]: 'Level is a required field'
      }))
    } else {
      setErrors((state) => ({
        ...state,
        [skillId]: null
      }))
    }
    setLevels((state) => ({
      ...state,
      [skillId]: result
    }))
  }

  useEffect(() => {
    const allIds = []
    const promises = Object.keys(allSkills)
      .filter((skillId) => !initialSkills.has(allSkills[skillId].id))
      .map((id) => {
        allIds.push(id)
        return axios.get('/resource/getLevelSkillById', {
          params: { id }
        })
      })
    Promise.all(promises)
      .then((response) => {
        const levelOptions = {}
        const skills = {}
        const levels = {}
        const errors = {}
        response.forEach(({ data }, i) => {
          const skillId = allIds[i]
          levelOptions[skillId] = data
          skills[skillId] = false
          levels[skillId] = null
          errors[skillId] = null
        })
        setLevelOptions(levelOptions)
        setSkills(skills)
        setLevels(levels)
        setErrors(errors)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [allSkills, initialSkills])

  useEffect(() => {
    const skillFiltered = Object.keys(skills).reduce((acc, skillId) => {
      if (skills[skillId] && levels[skillId]) {
        const skill = levels[skillId]
        acc.push(skill)
      }
      return acc
    }, [])

    onAddSkills(skillFiltered)
  }, [skills, levels])

  useEffect(() => {
    if (!open) {
      onAddSkills([])
    }
  }, [open])

  if (!open) {
    return null
  }

  return (
    <>
      {Object.entries(levelOptions).map(([skillId, options]) => {
        const checked = skills[skillId]
        return (
          <SkillItem key={skillId}>
            <CustomInput
              inline
              type="checkbox"
              id={skillId}
              checked={checked}
              label={allSkills[skillId].name}
              onChange={handleSelectSkill(skillId)}
              className="m-0"
            />
            <FormGroup className="d-flex flex-column m-0">
              <Select
                isClearable
                isDisabled={!checked}
                theme={selectThemeColors}
                className="react-select"
                classNamePrefix="select"
                options={options}
                onChange={handleSelectLevel(skillId)}
                value={levels[skillId]}
                className={classnames({
                  'is-invalid': Boolean(errors[skillId])
                })}
                getOptionLabel={(option) => {
                  return option.levelSkillName
                }}
                getOptionValue={(option) => {
                  return option.levelSkillId
                }}
              />
              {errors[skillId] && (
                <FormFeedback>{errors[skillId]}</FormFeedback>
              )}
            </FormGroup>
          </SkillItem>
        )
      })}
    </>
  )
}

export default ListAddSkills
