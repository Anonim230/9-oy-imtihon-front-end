import React from 'react';
import { useQuery} from "@apollo/client";
import { GET_ALL_BRANCHES, GET_ALL_FOODS, GET_ALL_RESTAURANTS } from '../query'
import { useEffect, useRef, useState } from 'react';
import Foods  from '../components/foods';
import { getData } from '../hooks/data';
import { Redirect } from 'react-router-dom';
import Create from './create';
import data from '../variables'
const { host } = data 
const Main = () => {
    
const [foods_array, setFoods_array] = useState([[]])
const [restaurants_array, set_restaurants_array] = useState([])
const res_sel = useRef()
const br_sel = useRef()
const [br_state,set_br_state] = useState(null)
const [res_state,set_res_state] = useState(null)
const {loading,data} = useQuery(GET_ALL_FOODS)
const {data:res_data} = useQuery(GET_ALL_RESTAURANTS)
const {data:branch_data} = useQuery(GET_ALL_BRANCHES)
const [branches_array, set_branches_array] = useState([])
const modal  = useRef()
const add  = useRef()
const [foods, setFoods] = useState([]);
useEffect(()=>{
  setFoods(data?.getAllFoods || foods)
}
  ,[data])
  useEffect(()=>{set_restaurants_array(res_data?.getAllRestaurants || res_data)},[res_data])
  useEffect(()=>{
    let arr = []
    let local_foods_array = [[]]
    let lfoods = [...foods,[]]
    for(let i of lfoods){
      if(local_foods_array[local_foods_array.length - 1].length === 3)local_foods_array = [...local_foods_array,[]]
      arr = [[...local_foods_array[local_foods_array.length - 1],i]]
      local_foods_array.pop()
      local_foods_array = local_foods_array.concat(arr)
      arr = []
    }
    local_foods_array[local_foods_array.length - 1].pop()
    setFoods_array(local_foods_array)
  },[foods])
  function on_res_sel(e){
    set_branches_array(branch_data.getAllBranches.filter(v=>v.id === e.target.selectedOptions[0].id) || []);
     set_res_state(e.target.selectedOptions[0])
     br_sel.current.selectedIndex = 0
     set_br_state(null)
  }
  function on_br_sel(e){
    setFoods(branches_array[0].Foods); 
    set_br_state(e.target.selectedOptions[0])
  }
  function on_select_add(e){
    switch(e.target.selectedOptions[0].value){
      case 'add_res':{
          set_required({
            name:'restaurant',
            forms:[ { placeholder: 'Nomini kiriting',name: "name" } ],
            onsubmit: e => {fetch(host+'restaurants',{ method:'POST', headers: { 'Content-Type': 'application/json' },body: JSON.stringify( { name: e.target.name.value } )}).then(data=>data.json()).then(value=>console.log(value))}
        });break}
        case 'add_br':{
          set_required({
            name:'branch',
            forms:[ { placeholder: 'Nomini kiriting',name: "name"},{ placeholder: 'Restarant IDsini kiriting',list: res_data.getAllRestaurants, name: 'id'} ],
            onsubmit: e => {fetch(host+'branches',{ method:'POST', headers: { 'Content-Type': 'application/json' },body: JSON.stringify( { name: e.target.name.value, restaurant: e.target.id.value } )}).then(data=>data.json()).then(value=>console.log(value))}
        });break
        }
        case 'add_food':{
          set_required({
            name:'food',
            forms:[ { placeholder: 'Nomini kiriting', name: "name"}, { placeholder: 'Branch IDsini kiriting', list: branch_data.getAllBranches, name: 'id'}, { placeholder: 'Narxini kiriting', name: "price", required: false},{ placeholder: "Ta'rif yozing", name: "description", required: false},{ placeholder: 'Rasm URLini kiriting', name: "img", type:'url' }],
            onsubmit: e => {fetch(host+'foods',{ method:'POST', headers: { 'Content-Type': 'application/json' },body: JSON.stringify( { name: e.target.name.value, branch: e.target.id.value } )}).then(data=>data.json()).then(value=>console.log(value))}
          });break
        }
        case 'redact_food':{
          set_required({
            name:'food',
            type:"Redact",
            forms:[ { placeholder: 'Nomini kiriting', name: "name"}, { placeholder: 'IDsini kiriting', list: data.getAllFoods, name: 'id'}, { placeholder: 'Narxini kiriting', required: false, name: "price", },{ placeholder: "Ta'rif yozing", name: "description", required: false},{ placeholder: 'Rasm URLini kiriting', name: "img", required: false, type:'url' }],
            onsubmit: e => {fetch(host+'foods',{ method:'POST', headers: { 'Content-Type': 'application/json' },body: JSON.stringify( {query: `mutation redactFood{ redactFood(id: ${e.target.id.value} name: ${e.target.name.value} ${e.target.description.value && ('description:' + e.target.description.value)} ${e.target.img.value && ('img:'+ e.target.img.value)}) }`})}).then(data=>data.json()).then(value=>console.log(value))}
          });break
        }
        /*case 'redact_br':{
          set_required({
            name:'food',
            type:"Redact",
            forms:[ { placeholder: 'Nomini kiriting', name: "name"}, { placeholder: 'IDsini kiriting', list: data.getAllFoods, name: 'id'}, { placeholder: 'Narxini kiriting', required: false, name: "price", },{ placeholder: "Ta'rif yozing", name: "description", required: false},{ placeholder: 'Rasm URLini kiriting', name: "img", required: false, type:'url' }],
            onsubmit: ({ target }) => {
              set_mutation_state(gql`
              mutation redactFood($id: ID! $name: String ${target.price.value && '$price: Int'} ${target.description.value &&  '$description: String'} ${target.img.value && '$img: String'}){
                redactFood
              }
            `)
            },
            mutation: mutation_state
          });break
        }*/
        case 'delete_res':{
          set_required({
            type:"Delete",
            name:'restaurant',
            forms:[ { placeholder: 'IDsini tanlang',name: "id", list: res_data.getAllRestaurants } ],
            onsubmit: e => {fetch(host+'restaurants',{ method:'DELETE', headers: { 'Content-Type': 'application/json' },body: JSON.stringify( { id: e.target.id.value } )}).then(data => data.json()).then(value=>console.log(value))}
        });break}
        case 'delete_br':{
          set_required({
            type:"Delete",
            name:'branch',
            forms:[ { placeholder: 'IDsini tanlang',name: "id", list: branch_data.getAllBranches } ],
            onsubmit: e => {fetch(host+'branches',{ method:'DELETE', headers: { 'Content-Type': 'application/json' },body: JSON.stringify( { id: e.target.id.value } )}).then(data => data.json()).then(value=>console.log(value))}
        });break}
        case 'delete_food':{
          set_required({
            type:"Delete",
            name:'food',
            forms:[ { placeholder: 'IDsini tanlang',name: "id", list: data.getAllFoods } ],
            onsubmit: e => {fetch(host+'foods',{ method:'DELETE', headers: { 'Content-Type': 'application/json' },body: JSON.stringify( { id: e.target.id.value } )}).then(data => data.json()).then(value=>console.log(value))}
        });break}
        
      default:
        console.log('Hello')
  }
  }
  const userData = getData()
  const [required, set_required] = useState({name: ''})
  if(!userData.token)return <Redirect to="/login"/>
    return (
        <div>
            <div className="d-flex justify-content-around sticky-top py-3 bg-secondary mx-5 rounded">
    <select name="restaurants" ref={res_sel} id="restaurants" className='btn btn-dark font-weight-bold'>
      <option value="default" hidden>Restarant tanlang</option>
      {
        restaurants_array?.map((v,i)=><option key={i} id={v.id} value={v.name}>{v.name}</option>)
      }
      { userData.privilegue === 'admin' ? <option value="add">Add</option> : '' }
    </select>
    <select ref={br_sel} onChange={on_res_sel} className='btn btn-dark font-weight-bold' name="branches" id="branches" onChange={on_br_sel}>
      <option value="default" hidden>Fillial tanlang</option>
      {
        branches_array?.map((v,i)=><option key={i} id={v.id} value={v.name}>{v.name}</option>)
      }
    </select>
    <select name="add" ref={add} id="" onChange={on_select_add} className={`${!userData.privilegue || (userData.privilegue !== 'admin') ? 'd-none' : 'd-block'}`}>
      <option value="default" hidden>Create, redact or delete</option>
      <option value="add_res">Create restaurant</option>
      <option value="add_br">Create branch</option>
      <option value="add_food">Create food</option>
      {/*<option value="redact_res">Redact restaurant</option>
      <option value="redact_br">Redact branch</option>
    <option value="redact_food">Redact food</option>*/}
      <option value="delete_res">Delete restaurant</option>
      <option value="delete_br">Delete branch</option>
      <option value="delete_food">Delete food</option>
    </select>
  </div>
  <div className={`modal ${!required || !required.name ? '' : 'd-flex'} justify-content-around`} ref={modal} style={{width:'100vw',height:'100vh'}}>
    <Create required={required} add={add} set_required={set_required} />
  </div>
      <div className={`${!res_state || !res_state.value ? 'd-block' : 'd-none'}`}>
        <h1 className='text-center'>Restarant tanlang</h1>
      </div>
      <div className={`${!br_state || !br_state.value ? 'd-block' : 'd-none'}`}>
        <h1 className='text-center'>Fillial tanlang</h1>
      </div>
      <div className={`${data ? 'd-block' : 'd-none'}`}>
        <div className={`${(!res_state || !res_state.value) || (!br_state || !br_state.value ) ? 'd-none': 'd-block'} container pt-5`}>
        <div className={`${foods_array.length > 0 && foods_array[0].length > 0? 'd-none':'d-block'}`}>
          <div className='font-weight-bold text-center h1'>Taomlar tugadi. Ertaga keling!</div>
        </div>
        <div className={`${foods_array.length > 0 ? 'd-block':'d-none'}`}>
            {foods_array.map((v,i)=>(
              <div className={`${loading ? 'd-none' : 'd-flex'} row justify-content-around`} key={i}>
                {v.map((v,i)=><Foods key={i} food={v}/>)}
            </div>
            ))}
          </div>
        </div>
        </div>
        </div>
    );
}

export default Main;
