import {useState} from 'react'

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function Button({children,onClick}){
  return(
    <button className="button" onClick={onClick}>{children}</button>
  )
}

function App(){
  const [friends,setFriends] = useState(initialFriends)
  const [showAddFriend,setShowAddFriend] = useState(false)
  const [selectedFriend,setSelectedFriend] = useState(null)

  function handleSelection(friend){
    setSelectedFriend((cur)=>cur?.id === friend.id ? null : friend)
    setShowAddFriend(false)
  }

  function handleShowAddFriend(){
    setShowAddFriend((show)=>!show)
  }

  function handleAddFriend(friend){
    setFriends(friends => [...friends,friend])
    setShowAddFriend(false)
  }

  function handleSplitBill(value){
    setFriends((friends)=>
      friends.map((friend) => 
        friend.id === selectedFriend.id 
          ? {...friend, balance: friend.balance + value}
          : friend
        ))

      setSelectedFriend(null)
  }

  return(
    <div className="app">
      <div className="sidebar">
        <FriendsList 
          friends={friends} 
          selectedFriend={selectedFriend} 
          onSelection={handleSelection}/>

        {showAddFriend &&<FormAddFriend onAddFriend={handleAddFriend}/>}

        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "close":"Add friend"}
        </Button>
      </div>

      {selectedFriend && 
        <FormSplitBill 
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
          key={selectedFriend.id}
        />}
    </div>
  )
}
export default App

function FriendsList({friends,onSelection,selectedFriend}){
  return(
      <ul>
       {friends.map((friend)=><Friend 
       name={friend.name} 
       image={friend.image} 
       balance={friend.balance} 
       key={friend.id}
       friend={friend}
       selectedFriend={selectedFriend}
       onSelection={onSelection}
       />
       )}
      </ul>
  )
}

function Friend({name,balance,image,friend,selectedFriend,onSelection}){
  const isSelected = selectedFriend?.id === friend.id

  return(
      <li className={isSelected ? "selected":""}>
        <img src={image} alt={name}/>
        <h3>{name}</h3>

        {balance < 0 && 
          <p className="red">
            You owe {name} {Math.abs(balance)}€
          </p>}

        {balance > 0 && 
          <p className="green">
            {name} owes you {Math.abs(balance)}€
          </p>}

        {balance === 0 && 
          <p>
            You and {name} are even
          </p>}
          
          <Button onClick={()=>onSelection(friend)}>{isSelected ? "close":"Select"}</Button>
      </li>
  )
}


function FormAddFriend({onAddFriend}){
  const [friendName,setFriendName] = useState("")
  const [friendImage,setFriendImage] = useState("https://i.pravatar.cc/48")

  function handleSubmit(e){
    e.preventDefault()

    if (!friendName || !friendImage) return

    const id = crypto.randomUUID()
    const newFriend={
      id,
      name:friendName,
      image:`${friendImage}?=${id}`,
      balance:0,
    }

    onAddFriend(newFriend)

    setFriendName("")
    setFriendImage("https://i.pravatar.cc/48")
    
  }

  return(
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>🧑‍🤝‍🧑 Friend name</label>
      <input type="text" value={friendName} onChange={(e)=>setFriendName(e.target.value)}/>

      <label>🌋 Image URL</label>
      <input type="text" value={friendImage} onChange={(e)=>setFriendImage(e.target.value)}/>

      <Button>Add</Button>
    </form>
  )
}

function FormSplitBill({selectedFriend,onSplitBill}){
  const [bill,setBill] = useState("")
  const [paidByUser,setPaidByUser] = useState("")
  const paidByFriend = bill ? bill - paidByUser : ""
  const [whoIsPaying,setWhoIsPaying] = useState("user")

  function handleSubmit(e){
    e.preventDefault()

    if (!bill || !paidByUser) return
    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser)
  }

  return(
    <form className='form-split-bill' onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend.name}</h2>
      <label>💰 Bill value</label>
      <input type='text' value={bill} onChange={(e)=>setBill(Number(e.target.value))}/>

      <label>🧍Your expense</label>
      <input 
        type='text' 
        value={paidByUser}
        onChange={(e)=>
          setPaidByUser(
            Number(e.target.value) > bill ? paidByUser :
            Number(e.target.value)
        )}/>

      <label>🧑‍🤝‍🧑 {selectedFriend.name}'s expense:</label>
      <input type='text' disabled value={paidByFriend}/>

      <label>🤑 Who is paying the bill?</label>
      <select value={whoIsPaying} onChange={(e)=>setWhoIsPaying(e.target.value)}>
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      
      <Button>Split bill</Button>
    </form>
  )
}