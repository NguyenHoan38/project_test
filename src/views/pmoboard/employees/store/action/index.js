import axios from '@src/utility/axios';
import keyBy from 'lodash.keyby';

// Get employee details
export const getEmployeeDetails = (params) => async (dispatch) => {
  try {
    const [employees, skills, roles] = await Promise.all([
      axios.get('/resource/getListEmployee', params),
      axios.get('/resource/getListEmployeeSkill'),
      axios.get('/resource/getListEmployeeRole'),
    ]);

    dispatch({
      type: 'GET_EMPLOYEE_DETAILS',
      payload: {
        byId: keyBy(employees.data, 'id'),
        allIds: Object.keys(employees.data),
        total: employees.data.length,
        skills: keyBy(skills, 'id'),
        roles,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

// ** Get employees with filter
export const getFilteredEmployees = (params) => {
  const { searchTerm = '', perPage = 10, page = 1, skills = [] } = params;
  return async (dispatch, getState) => {
    const employees = Object.values(getState().employees.byId);

    const filteredEmployees = employees.filter((user) => {
      const { name, skills: userSkills, email } = user;
      const searchTermFormatted = searchTerm.toLowerCase();

      // Search for name
      const nameMatched = name.toLowerCase().includes(searchTermFormatted);

      // Search for email
      const emailMatched = email.toLowerCase().includes(searchTermFormatted);

      // Search for skills
      const skillsMatched = skills.length
        ? userSkills.some((skill) => {
            const { skillId } = skill;
            return skills.includes(String(skillId)); // Tạm thời
          })
        : true;

      return (nameMatched || emailMatched) && skillsMatched;
    });

    dispatch({
      type: 'GET_FILTERED_EMPLOYEES',
      data: filteredEmployees,
      total: filteredEmployees.length,
    });
  };
};
