import { selectThemeColors } from '@utils'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import Select from 'react-select'
import { useDebounce } from 'react-use'
import { Button, Input, Label, Row } from 'reactstrap'
import styled from 'styled-components'

const ListHeader = (props) => {
  const allSkills = useSelector((state) => state.employees.skills)
  const { onSelectSkills, skills, onSearch, onAddEmployee } = props
  const [searchTerm, setSearchTerm] = useState('')

  const handleOnSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  useDebounce(
    () => {
      onSearch(searchTerm)
    },
    300,
    [searchTerm]
  )

  const handleOnChangeSelect = (skills) => {
    onSelectSkills(skills)
  }

  const overflowSkills = skills.length >= 3

  // map skills to options
  const skillOptions = Object.keys(allSkills).map((skillId) => {
    return allSkills[skillId]
  })

  return (
    <div className="invoice-list-table-header w-100 mr-1 ml-50 mt-2 mb-75">
      <StyledRow>
        <SearchWrapper shink={overflowSkills} className="d-flex p-0">
          <div className="d-flex align-items-center">
            <Label className="mb-0" for="search-invoice">
              Search:
            </Label>
            <Input
              id="search-invoice"
              className="ml-50"
              type="text"
              value={searchTerm}
              onChange={handleOnSearchChange}
              placeholder="Name or email"
            />
          </div>
        </SearchWrapper>
        <SkillsWrapper
          grow={overflowSkills}
          className="d-flex justify-content-end p-0"
        >
          <div className="d-flex align-items-center mr-1 flex-grow-1">
            <Label className="mb-0" for="select-skills">
              Skills:
            </Label>
            <Select
              theme={selectThemeColors}
              onChange={handleOnChangeSelect}
              value={skills}
              isMulti
              name="colors"
              id="select-skills"
              options={skillOptions}
              className="react-select ml-50 w-100"
              classNamePrefix="select"
              getOptionLabel={(option) => {
                return option.name
              }}
              getOptionValue={(option) => {
                return option.id
              }}
            />
          </div>
          <Button.Ripple color="primary" onClick={onAddEmployee}>
            Add Employee
          </Button.Ripple>
        </SkillsWrapper>
      </StyledRow>
    </div>
  )
}

const StyledRow = styled(Row)({
  flexWrap: 'wrap',
  '& > *': {
    flex: 1
  }
})

const SearchWrapper = styled('div')(({ shink }) => ({
  transition: 'flex-grow 0.3s',
  ...(shink && {
    flexGrow: 1,
    marginRight: '1rem'
  })
}))

const SkillsWrapper = styled('div')(({ grow }) => ({
  transition: 'flex-grow 0.3s',
  ...(grow && {
    flexGrow: 3
  })
}))

export default ListHeader
