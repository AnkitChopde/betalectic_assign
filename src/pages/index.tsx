import React from 'react'
import { Link } from 'react-router-dom'

const Packages = () => {
  return (
    <div className="mx-auto ">
      <h1 className="text-3xl m-5 text-center">Welcome to favorite NPM Packages</h1>
      <div className="p-20" style={{width:"50%",margin:"auto",border:"1px solid black",textAlign:"center"}}>
        <h1>You don't have any favorites yet, please add.</h1>
        <Link to="/addFav">
        <button className="bg-purple-900 text-white rounded-md p-1 px-3 mt-1 border-1 border-black border-solid">Add Fav</button>
        </Link>
      </div>
    </div>
  )
}

export default Packages
