import {useEffect, useState} from "react"
import axios from "axios";
import {addTodo} from "../redux/action"
import { useSelector,useDispatch } from "react-redux"
export const Todo = ()=>{
    useEffect(()=>{
        getdata()
    },[])
    const dispatch = useDispatch();
    const todos = useSelector((store)=>store.todo)
    const [text,setText] = useState("")
    const adddata = ()=>{
        axios.post("http://localhost:3000/todos",{
            title:text,
            status:false
        }).then((e)=>getdata())
    }
    const getdata = ()=>{
        axios.get("http://localhost:3000/todos").then(({data})=>{
            dispatch(addTodo(data))
        })
}
    const handledelete = (id)=>{
        axios.delete(`http://localhost:3000/todos/${id}`).then(()=>getdata())
        
    }
    return (
    <div>
        <input type="text"  onChange={((e)=>{
            setText(e.target.value)
        })}/>
        <button onClick = {()=>{
            adddata()
        }}>Add Todo</button>
        <div>
        {todos.map((e)=>{
            return (
                <div>
                    <div>{e.title}
                <button onClick = {()=>{
                    handledelete(e.id)
                }}>Delete</button></div>
                </div>
            )
        })}
        </div>
        
    </div>
    )
}