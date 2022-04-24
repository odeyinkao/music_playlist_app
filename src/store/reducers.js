import { 
    SET_MODAL, 
    SET_AUTHENTICATION, 
    SET_CURRENT_USER,
    SET_PLAYLIST,
    SET_USER_PLAN, 
} from "./actions"

const initialState = {
    isAuthenticated: false,
    currentUser: null,
    isLoading: false,
    isUpdating: false,
    modal: {
        show: false,
        message: "",
        buttonText: "",
        modalAction: null
    },
    plans: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MODAL:
            return {
                ...state, 
                modal: {
                    show: action.data.show,
                    message: action.data.message,
                    buttonText: action.data.buttonText,
                    modalAction: action.data.modalAction
                }
            }
        case SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.currentUser
            }
        case SET_USER_PLAN:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    plan: action.planData
                }
            }
        case SET_AUTHENTICATION:
            return {
                ...state, 
                isAuthenticated: action.isAuthenticated
            }
        case SET_PLAYLIST:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser, 
                    playlist: action.playlist
                }
            }
        default:
            return state
    }
}

export default reducer