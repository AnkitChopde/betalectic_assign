import { useEffect, useState } from 'react'
import { Eye,Trash2 } from 'react-feather';
import { Link } from 'react-router-dom'

const Packages = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavorites);
  }, []);

  const handleDeleteFavorite = (packageName:string) => {
    // Remove the selected package from favorites
    const updatedFavorites = favorites.filter((favorite) => favorite !== packageName);
    setFavorites(updatedFavorites);
    // Update localStorage
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };


  return (
    <div className="mx-auto ">
      <h1 className="text-3xl m-5 text-center">Welcome to favorite NPM Packages</h1>
      {favorites.length === 0 ? (
        <div className="p-20" style={{ width: "50%", margin: "auto", border: "1px solid black", textAlign: "center" }}>
          <h1>You don't have any favorites yet, please add.</h1>
          <Link to="/addFav">
            <button className="bg-purple-900 text-white rounded-md p-1 px-3 mt-1 border-1 border-black border-solid">
              Add Fav
            </button>
          </Link>
        </div>
      ) : (
       <div>
         <div className="p-3" style={{ width: "50%", margin: "auto", textAlign: "center" }}>
          <Link to="/addFav">
            <button className="bg-purple-900 text-white rounded-md p-1 px-3 mt-1 border-1 border-black border-solid">
              Add Fav
            </button>
          </Link>
        </div>
        <ul className="p-5 mx-auto max-w-lg">
        {favorites.map((favorite, index) => (
          <li key={index} className="flex items-center justify-between border-b-2 border-gray-300 py-2">
            <span>{favorite}</span>
            <div className="flex items-center">
              <Link to={`/view/${favorite}`}>
                <button className="bg-blue-500 text-white rounded-md p-1 px-3 mx-1">
                  <Eye />
                </button>
              </Link>
              <button
                onClick={() => handleDeleteFavorite(favorite)}
                className="bg-red-500 text-white rounded-md p-1 px-3 mx-1"
              >
                <Trash2 />
              </button>
            </div>
          </li>
        ))}
      </ul>
       </div>
      )}
    </div>
  )
}

export default Packages
