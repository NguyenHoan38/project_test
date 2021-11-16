import axios from "axios"
import { DOMAIN } from './../../../../../constant'

export const getData = () => {
    return async (dispatch) => {
        await axios
      .get(`${DOMAIN}/resource/getResourceAllocationCalendar`)
      .then((response) => {
        const data = response?.data?.data ? response.data.data : null
        dispatch({
          type: 'GET_DATA',
          data
        })
      })
      .catch((err) => console.log(err))
    }
}