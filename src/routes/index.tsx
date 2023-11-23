
import { Route, Routes } from 'react-router-dom'
import Packages from '../pages'
import AddFavorites from '../pages/AddFavorites'

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Packages/>}/>
        <Route path="/addFav" element={<AddFavorites/>}/>
      </Routes>
    </div>
  )
}

export default AllRoutes
