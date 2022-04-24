// import User from "../models/user";
import { client } from "../graphql"
import { CREATE_MUSIC, CREATE_PLAN, UPDATE_MUSIC, UPDATE_PLAN } from "../graphql/mutations"

export const SET_MODAL = "SET_MODAL"
export const SET_PLAYLIST = "SET_PLAYLIST"
export const SET_AUTHENTICATION = "SET_AUTHENTICATION"
export const SET_CURRENT_USER = "SET_CURRENT_USER"
export const SET_USERS = "SET_USERS"
export const SET_USER_PLAN = "SET_USER_PLAN"

export const setModal = (show, message=null, buttonText=null, modalAction=null) => {
    return {
        type: SET_MODAL,
        data: {
            show,
            message,
            buttonText,
            modalAction
        }
    }
}


// Auth actions
export const authenticate = (isAuthenticated=false) => {
    return {
        type: SET_AUTHENTICATION,
        isAuthenticated
    }
}


// Users actions
export const setCurrentUser = currentUser => {
    return {
        type: SET_CURRENT_USER,
        currentUser
    }
}

export const updateUserPlanAction = (planData) => {
    return {
        type: SET_USER_PLAN,
        planData
    }
}


// Plans
export const createPlan = (data, navigate) => {
    return async dispatch => {
        client.mutate({
            variables: {
                name: data.name,
                playlistSize: data.playlistSize
            },
            mutation: CREATE_PLAN
        })
        .then(result => {
            result = result.data.createPlan
            delete result.__typename
            dispatch(setModal(true, "Plan added successfully!", "Close", null))

            navigate(`/plans/${result.id}/details`)
        })
        .catch(err => {
            dispatch(setModal(true, err.message, "Close", null))
        })
    }
}

export const updatePlan = (planId, data, navigate) => {
    return async dispatch => {
        client.mutate({
            variables: {
                planId: planId,
                name: data.name,
                playlistSize: data.playlistSize
            },
            mutation: UPDATE_PLAN
        })
        .then(result => {
            result = result.data.updatePlan
            delete result.__typename
            dispatch(setModal(true, "Plan updated successfully!", "Close", null))

            navigate(`/plans/${result.id}/details`)
        })
        .catch(err => {
            dispatch(setModal(true, err.message, "Close", null))
        })
    }
}


// Musics
export const createMusic = (data, navigate) => {
    return async dispatch => {
        client.mutate({
            variables: {
                name: data.name,
                planId: data.planId
            },
            mutation: CREATE_MUSIC
        })
        .then(result => {
            result = result.data.createMusic
            delete result.__typename
            dispatch(setModal(true, "Music added successfully!", "Close", null))

            navigate(`/musics/${result.id}/details`)
        })
        .catch(err => {
            dispatch(setModal(true, err.message, "Close", null))
        })
    }
}

export const updateMusic = (musicId, data, navigate) => {
    return async dispatch => {
        client.mutate({
            variables: {
                musicId: musicId,
                name: data.name,
                planId: data.planId
            },
            mutation: UPDATE_MUSIC
        })
        .then(result => {
            result = result.data.updateMusic
            delete result.__typename
            dispatch(setModal(true, "Music updated successfully!", "Close", null))

            navigate(`/musics/${result.id}/details`)
        })
        .catch(err => {
            dispatch(setModal(true, err.message, "Close", null))
        })
    }
}
