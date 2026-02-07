import API from "../api/axios"

export const saveToken = (token)=>{
 localStorage.setItem("token", token)
}

export const logout = async ()=>{
 try{
  await API.post("/api/users/logout")
 }catch(e){
  console.log("Logout API failed but continuing")
 }

 localStorage.removeItem("token")
}
