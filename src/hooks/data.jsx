import { createContext, useState } from "react";

const Context = createContext()
var data,
setData
// setLocalData
function Provider({children}){
    [data,setData] = useState(JSON.parse(localStorage.getItem('data')));
    return <Context.Provider value={data}>
        {children}
    </Context.Provider>
}
// setData = value => {
//     console.log(value);
//     setLocalData(value)
// }
function getData(bool){
    return bool ? {data , setData} : data
}
export default Provider
export {getData}