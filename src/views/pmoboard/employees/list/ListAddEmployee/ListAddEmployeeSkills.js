import axios from '@src/utility/axios'
import { selectThemeColors } from '@utils'
import classnames from 'classnames'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Select from 'react-select'
import { CustomInput, FormFeedback, FormGroup, Label } from 'reactstrap'
import styled from 'styled-components'

const ListSkills = (props) => {
  const { onSetSkills } = props
  const allSkills = useSelector((state) => state.employees.skills)
  const [levelOptions, setLevelOptions] = useState({})

  const [skills, setSkills] = useState(() => {
    return Object.keys(allSkills).reduce((acc, skillId) => {
      acc[skillId] = false
      return acc
    }, {})
  })

  const [levels, setLevels] = useState(() => {
    return Object.keys(allSkills).reduce((acc, skillId) => {
      acc[skillId] = null
      return acc
    }, {})
  })

  const [errors, setErrors] = useState(() => {
    return Object.keys(allSkills).reduce((acc, skillId) => {
      acc[skillId] = null
      return acc
    }, {})
  })

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
    const promises = Object.keys(allSkills).map((id) => {
      allIds.push(id)
      return axios.get('/resource/getLevelSkillById', {
        params: { id }
      })
    })
    Promise.all(promises)
      .then((response) => {
        const levelOptions = {}
        response.forEach(({ data }, i) => {
          const skillId = allIds[i]
          levelOptions[skillId] = data
        })
        setLevelOptions(levelOptions)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [allSkills])

  useEffect(() => {
    const skillFiltered = Object.keys(skills).reduce((acc, skillId) => {
      if (skills[skillId] && levels[skillId]) {
        const skill = levels[skillId]
        acc.push(skill)
      }
      return acc
    }, [])

    onSetSkills(skillFiltered)
  }, [skills, levels])

  return (
    <SkillFormGroup>
      <Label for="skills">Skills</Label>
      <SkillWrapper>
        <SkillContainer className="p-75 border-primary rounded">
          {Object.entries(levelOptions).map(([skillId, options]) => {
            const checked = skills[skillId]
            {
              console.log(options)
            }
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
        </SkillContainer>
      </SkillWrapper>
    </SkillFormGroup>
  )
}

const SkillFormGroup = styled(FormGroup)({
  position: 'relative',
  zIndex: 2
})

const SkillWrapper = styled('div')({
  display: 'grid',
  gridTemplateColumns: '1fr',
  marginTop: '0.5rem'
})

const SkillContainer = styled('div')({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  '& > * + *': {
    marginTop: '0.75rem'
  },
  maxHeight: 'calc(38px * 7 + 0.75rem * 8)',
  overflowY: 'auto'
})

export const SkillItem = styled('div')({
  display: 'flex',
  alignItems: 'center',
  '& > *': {
    flex: 1
  }
})

export default ListSkills
