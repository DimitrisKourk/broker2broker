import UserCard from "../UserCard/UserCard"
import"./UserCardGrid.css"

function UserCardGrid({users,cardsPerRow}) {
    const usersNumber=users.length;
  return (
    <div className="user-grid-wrapper">
      {usersNumber===1?<h3> Found  {usersNumber}  User</h3> : <h3> Found {usersNumber} Users</h3> }
      
      <div className="user-card-grid">
        {usersNumber>0 ? users.map((userData,index)=>(<UserCard key={userData.user_id} user={userData} cardsPerRow={cardsPerRow}/>)):<div>No Users Found</div>}
      </div>
    </div>
  )
}

export default UserCardGrid