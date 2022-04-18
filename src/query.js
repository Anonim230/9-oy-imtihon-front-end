import { gql } from "@apollo/client"

const GET_ALL_FOODS = gql `
query getAllFoods($id: ID){
  getAllFoods(id:$id){
      name
      id
      price
  }
}
`
const GET_ALL_RESTAURANTS = gql `
query {
  getAllRestaurants(id:1){
    id
    name
    branches{
      name
      id
    }
  }
}
`
const GET_ALL_BRANCHES = gql `
query getAllBranches($id: ID){
  getAllBranches(id:$id){
    id
    name
    Foods{
      name
      price
      id
    }
  }
}`
export { GET_ALL_BRANCHES, GET_ALL_FOODS, GET_ALL_RESTAURANTS }