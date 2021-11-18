let initialState = [];

if(typeof window !== 'undefined') {
    if(localStorage.getItem("tasks")) {
        initialState = JSON.parse(localStorage.getItem("tasks"));
    } else {
        initialState = []
    }
}

export const todoReducer = (state=initialState, action) => {
    switch(action.type) {
        case "ADD_TO_TASKS":
            return action.payload;
        default:
            return state;
    }
}