import axios from '@src/utility/axios'
import useDerivedState from '@src/utility/hooks/useDerivedState'
import { selectThemeColors } from '@utils'
import classnames from 'classnames'
import { useEffect, useState, useRef, useCallback } from 'react'
import Select from 'react-select'
import { Button, CustomInput, FormFeedback, FormGroup, Label } from 'reactstrap'
import styled from 'styled-components'
import AddSkills from './AddSkills'

const ListSkills = (props) => {
  const { skills: initialSkills, onSetSkills } = props
  const [levelOptions, setLevelOptions] = useState({})
  const [openAddSkills, setOpenAddSkills] = useState(false)
  const ref = useRef(null)

  const handleToggleAddSkills = () => {
    setOpenAddSkills(!openAddSkills)
  }

  const [skills, setSkills] = useDerivedState(() => {
    return initialSkills.reduce((acc, val) => {
      const { skillId } = val
      acc.set(skillId, true)
      return acc
    }, new Map())
  })

  const [levels, setLevels] = useDerivedState(() => {
    return initialSkills.reduce((acc, val) => {
      const { skillId } = val
      acc[skillId] = val
      return acc
    }, {})
  })

  const [errors, setErrors] = useDerivedState(() => {
    return initialSkills.reduce((acc, val) => {
      const { skillId } = val
      acc[skillId] = null
      return acc
    }, {})
  })

  const [addedSkills, setAddedSkills] = useState([])

  const handleSetAddedSkills = useCallback((skills) => {
    setAddedSkills(skills)
  }, [])

  useEffect(() => {
    const skillFiltered = []
    for (const [skillId, value] of skills) {
      if (value && levels[skillId]) {
        const skill = levels[skillId]
        skillFiltered.push(skill)
      }
    }
    onSetSkills([...skillFiltered, ...addedSkills])
  }, [skills, levels, addedSkills])

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
    setSkills((state) => {
      const map = new Map(state)
      map.set(skillId, checked)
      return map
    })
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
    const promises = initialSkills.map(({ skillId }) => {
      allIds.push(skillId)
      return axios.get('/resource/getLevelSkillById', {
        params: { id: skillId }
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
  }, [initialSkills])

  useEffect(() => {
    if (ref.current && openAddSkills) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })
    }
  }, [openAddSkills])

  return (
    <SkillFormGroup>
      <Label for="skills">Skills</Label>
      <SkillWrapper ref={ref}>
        <SkillContainer
          className="p-75 border-primary rounded"
          overFlow={openAddSkills}
        >
          {initialSkills.map(({ skillId, skillName }) => {
            const checked = skills.get(skillId)
            return (
              <SkillItem key={skillId}>
                <CustomInput
                  inline
                  type="checkbox"
                  id={skillId}
                  checked={checked}
                  label={skillName}
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
                    options={levelOptions[skillId]}
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
          <AddSkills
            open={openAddSkills}
            initialSkills={skills}
            onAddSkills={handleSetAddedSkills}
          />
        </SkillContainer>
      </SkillWrapper>
      <AddSkillWrapper>
        <Button.Ripple
          color="primary"
          outline
          size="sm"
          onClick={handleToggleAddSkills}
        >
          {openAddSkills ? 'Close' : 'Add Skills'}
        </Button.Ripple>
      </AddSkillWrapper>
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

const SkillContainer = styled('div')(({ overFlow }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  '& > * + *': {
    marginTop: '0.75rem'
  },
  ...(overFlow && {
    maxHeight: 'calc(38px * 7 + 0.75rem * 8)',
    overflowY: 'auto'
  })
}))

export const SkillItem = styled('div')({
  display: 'flex',
  alignItems: 'center',
  '& > *': {
    flex: 1
  }
})

const AddSkillWrapper = styled('div')({
  marginTop: '0.75rem',
  display: 'flex',
  justifyContent: 'flex-end'
})

export default ListSkills
