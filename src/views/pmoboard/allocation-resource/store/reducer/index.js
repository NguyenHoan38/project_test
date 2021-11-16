const initialState = {
    data: {
        resources: [],
        events: [],
        eventsForTaskView: [],
        eventsForCustomEventStyle: []
    }
}

const resources = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_DATA':
            return { ...state, data: action.data}
        default: 
            return { ...state }
    }
}

export default resources