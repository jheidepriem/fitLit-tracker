class UserRepository {
  constructor(data){
    this.userData = data
  }

  retrieveUserData(id){
    let singleUserData = this.userData.find((user) => user.id === id)
    return singleUse
  }
}
export default UserRepository;