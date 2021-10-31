import { selectThemeColors } from '@utils';
import classnames from 'classnames';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import { CustomInput, FormFeedback, FormGroup, Label } from 'reactstrap';
import styled from 'styled-components';

const levelOptions = [
  { value: 1, label: 'Level 1' },
  { value: 2, label: 'Level 2' },
  { value: 3, label: 'Level 3' },
];

const ListSkills = (props) => {
  const { skills: ititialSkills } = props;
  const employeeSkills = useSelector((state) => state.employees.skills);

  const [errors, setErrors] = useState(() => {
    return Object.values(employeeSkills).reduce((acc, val) => {
      const { id } = val;
      acc[id] = null;
      return acc;
    }, {});
  });

  const [skills, setSkills] = useState(() => {
    return Object.values(employeeSkills).reduce((acc, val) => {
      const { id } = val;
      const checked =
        ititialSkills.findIndex(({ skillId }) => id === skillId) !== -1;
      if (checked) {
        acc[id] = true;
      } else {
        acc[id] = false;
      }
      return acc;
    }, {});
  });

  const [levels, setLevels] = useState(() => {
    return Object.values(employeeSkills).reduce((acc, val) => {
      const { id } = val;
      acc[id] = null;
      return acc;
    }, {});
  });

  const handleSelectSkill = (skillId) => (event) => {
    const checked = event.target.checked;

    if (!checked) {
      setLevels((state) => ({
        ...state,
        [skillId]: null,
      }));
      setErrors((state) => ({
        ...state,
        [skillId]: null,
      }));
    }

    setSkills((state) => ({
      ...state,
      [skillId]: checked,
    }));
  };

  const handleSelectLevel = (skillId) => (result) => {
    if (!result) {
      setErrors((state) => ({
        ...state,
        [skillId]: 'Level is a required field',
      }));
    } else {
      setErrors((state) => ({
        ...state,
        [skillId]: null,
      }));
    }
    setLevels((state) => ({
      ...state,
      [skillId]: result,
    }));
  };

  /*
  useEffect(() => {
    const result = Object.keys(skills).reduce((acc, skillId) => {
      const entry = {};
      if (skills[skillId] && levels[skillId]) {
        const { value } = levels[skillId];
        entry.skillId = skillId;
        entry.levelId = value;
        acc.push(entry);
      }
      return acc;
    }, []);

    const errorsFiltered = Object.keys(errors).reduce((acc, skillId) => {
      if (errors[skillId]) {
        acc[skillId] = errors[skillId];
      }
      return acc;
    }, {});

    // console.log(result);
    // console.log(errorsFiltered);
  }, [skills, levels, errors]);
  */

  return (
    <FormGroup>
      <Label for="skills">Skills</Label>
      <SkillWrapper>
        <SkillContainer className="p-75 border-primary rounded">
          {Object.entries(skills).map(([skillId, checked]) => {
            return (
              <SkillItem key={skillId}>
                <CustomInput
                  inline
                  type="checkbox"
                  id={skillId}
                  checked={checked}
                  label={employeeSkills[skillId].name}
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
                    options={levelOptions}
                    onChange={handleSelectLevel(skillId)}
                    value={levels[skillId]}
                    className={classnames({
                      'is-invalid': Boolean(errors[skillId]),
                    })}
                  />
                  {errors[skillId] && (
                    <FormFeedback>{errors[skillId]}</FormFeedback>
                  )}
                </FormGroup>
              </SkillItem>
            );
          })}
        </SkillContainer>
      </SkillWrapper>
    </FormGroup>
  );
};

const SkillWrapper = styled('div')({
  display: 'grid',
  gridTemplateColumns: '1fr',
  marginTop: '0.5rem',
});

const SkillContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  '& > * + *': {
    marginTop: '0.75rem',
  },
  maxHeight: 'calc(38px * 5 + 0.75rem * 6)',
  overflowY: 'auto',
  isolation: 'isolate',
});

const SkillItem = styled('div')({
  display: 'flex',
  alignItems: 'center',
  '& > *': {
    flex: 1,
  },
});

export default ListSkills;
