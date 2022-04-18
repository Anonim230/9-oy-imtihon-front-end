import './style/App.css'
import { Switch, Route } from 'react-router-dom'
import Main from './components/main';
import Login from './components/login';
import SignUp from './components/signup';


function App() {
  return (
    <Switch>
      <Route path='/login' component={Login} />
      <Route path='/signup' component={SignUp} />
      <Route path='*' component={Main}/>
    </Switch>
  );
}

export default App;
// async function query(query,variables = ''){
  //     return await fetch(vars.graph,{
    //       method:'POST',
    //       headers:{"Content-Type":"application/json"},
//       body:(JSON.stringify({
  //         query,
  //         variables
  //       }))
  //     })
  // }
  // function getFoods(){
    //   try{
      //   return query(`
      //     query{
  //         getAllFoods(){
    //         name
//         id
//         price
//       }
//     }
//   `)
//   .catch(e=>console.log(e.msg,e.msg.body))
//   .then(data=>console.log(data))}
//   catch(e){
  //     console.log(e);
  //   }
  // }
  // getFoods()
  // async function getFood(){
  //   return await client.query({query:gql`
  //     query{
    //         getAllFoods(id:1){
  //         name
  //         id
  //         price
  //       }
  //     }
  //   `})
  // }
    /* {
      foods.forEach((v,i)=>{
        console.log(v,foods_array,foods_array[foods_array.length - 1]?.length);
        if(foods_array[foods_array.length - 1])console.log('a');
        if(foods_array[foods_array.length - 1]?.length < 3)foods_array[foods_array.length].push(v)
      }) || console.log(foods_array)
    } */