import { gql } from "@apollo/client";

export const GET_MUSICS = gql`
  query GetMusics{
    musics{
      id
      name
      plan{
        id
        name
      }
    }
  }
`;

export const GET_MY_PLAYLIST = gql`
  query MyPlaylist{
    me{
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
`;

export const GET_MUSIC = gql`
query GetMusic($id: ID!){
  music(id: $id){
    id
    name
    plan{
      id
      name
    }
  }
}
`;


export const GET_PLANS = gql`
  query GetPlans{
    plans{
      id
      name
      playlistSize
    }
  }
`


export const GET_PLAN = gql`
  query GetPlan($id: ID!){
    plan(id: $id) {
      id
      name
      playlistSize
      musics{
        id
        name
      }
    }
  }
`