import { gql } from "@apollo/client";

export const SIGN_UP = gql`
  mutation SignUp($email: String!, $password: String!){
    signup(email: $email, password: $password){
      token
      user {
        email
        role
        plan{
          id
          name
          playlistSize
        }
        playlist{
          musics{
            id
            name
            plan{
              name
            }
          }
        }
      }
    }
  }
`

export const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!){
    signin(email: $email, password: $password){
      token
      user {
        email
        role
        plan{
          id
          name
          playlistSize
        }
        playlist{
          musics{
            id
            name
            plan{
              name
            }
          }
        }
      }
    }
  }
`

export const SIGN_OUT = gql`
  mutation SignOut($token: String!){
    signout(token: $token){
      id
      email
    }
  }
`

export const CREATE_PLAN = gql`
  mutation CreatePlan($name: String!, $playlistSize: Int!){
    createPlan(name: $name, playlistSize: $playlistSize){
      id
      name
      playlistSize
    }
  }
`

export const UPDATE_PLAN = gql`
  mutation UpdatePlan($planId: ID!, $name: String!, $playlistSize: Int!){
    updatePlan(planId: $planId, name: $name, playlistSize: $playlistSize){
      id
      name
    }
  }
`

export const DELETE_PLAN = gql`
mutation DeletePlan($planId: ID!){
  deletePlan(planId: $planId){
    id
    name
  }
}
`

export const CREATE_MUSIC = gql`
  mutation CreateMusic($name: String!, $planId: Int!){
    createMusic(name: $name, planId: $planId){
      id
      name
    }
  }
`

export const UPDATE_MUSIC = gql`
  mutation UpdateMusic($musicId: ID!, $name: String!, $planId: Int!){
    updateMusic(musicId: $musicId, name: $name, planId: $planId){
      id
      name
    }
  }
`

export const DELETE_MUSIC = gql`
  mutation DeleteMusic($musicId: ID!){
    deleteMusic(musicId: $musicId){
      id
      name
    }
  }
`

export const UPDATE_USER_PLAYLIST = gql`
  mutation UpdateUserPlaylist($musicIds: [ID!]){
    updateUserPlaylist(musicIds: $musicIds){
      playlist{
        musics{
          id
          name
          plan{
            name
          }
        }
      }
      
    }
  }
`

export const UPDATE_USER_PLAN = gql`
  mutation UpdateUserPlan($planId: Int!){
    me(planId: $planId){
      plan{
        id
        name
        playlistSize
      }
    }
  }
`