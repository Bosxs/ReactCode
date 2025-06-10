import { useEffect, useState } from "react";
import Logo from "./Logo"
import Form from "./Form";
import PackingList from "./PackingList";
import Stat from "./Stat";


function App() {
  const [items,setItems] = useState([])

  // const [items,setItems] = useState(()=>{
  //   const storedItems = localStorage.getItem("items");
  //   return storedItems ? JSON.parse("items") : []
  // })

  // useEffect(()=>{
  //   localStorage.setItem("items", JSON.stringify(items))
  // }, [items])

  function handleAddItems(item){
    setItems((items)=>[...items,item])
  }

  function handleDeleteItems(id){
    setItems((items)=>items.filter((item)=>item.id !== id))
  }

  function handleToggleItems(id){
    setItems(items=>items.map(item=>item.id === id ? {...item,packed : !item.packed}:item))
  }

  function handleClearList(){
    const confirmed = window.confirm("Are you sure you want to delete all items?")

    if (confirmed) setItems([])
  }

  return (
    <div className='app'>
      <Logo/>
      <Form onAddItems={handleAddItems}/>
      <PackingList items={items} onDeleteItems={handleDeleteItems} onToggleItems={handleToggleItems} onClearList={handleClearList}/>
      <Stat items={items}/>
    </div>
  );
}





export default App;
