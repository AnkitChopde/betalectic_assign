import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AddFavorites = () => {
  const [query, setQuery] = useState<string>("");
  const [data, setData] = useState([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [description, setDescription] = useState<string>("");
 
  useEffect(() => {
    fetchData(query);
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavorites);
  }, [query]);

  useEffect(() => {
    // Update localStorage whenever favorites change
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const fetchData = async (query: string) => {
    try {
      let response = await axios.get(
        `https://api.npms.io/v2/search?q=${query}`
      );
      setData(response.data.results);
    } catch (err) {
      console.log(err);
    }
  };
  const handleRadioChange = (packageName: string) => {
    setSelectedPackage(packageName);
  };

  const handleAddToFavorites = () => {
    if (selectedPackage) {
      if (favorites.includes(selectedPackage)) {
        alert(`${selectedPackage} is already in your favorites.`);
        return;
      }

      setFavorites((prevFavorites) => [...prevFavorites, selectedPackage]);
      setSelectedPackage(null);
      setDescription("");
    }


  };
  return (
    <div>
       <Link to={`/`}>
              <h1 className="blue underline">Go back</h1>
              </Link>
      <h1 className="text-2xl m-5">Search for NPM Packages</h1>
      <div className="flex justify-center items-center">
        <input
          type="text"
          placeholder="Search any package"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full mx-6 border-2 border-grey border-solid px-2 mb-4"
        />
      </div>
      {data.length > 0 &&
        (
          <div className="max-h-80 overflow-y-auto max-w-md">
            <h1 className="font-bold ml-6">Results</h1>
            {
              data.map((pack: any) => (
                <div key={pack.package.date} className="flex items-center pl-6">
                  <input
                    type="radio"
                    id={pack.package.name}
                    name="selectedPackage"
                    onChange={() => handleRadioChange(pack.package.name)}
                    checked={selectedPackage === pack.package.name}
                  />
                  <label htmlFor={pack.package.name} className="ml-2">
                    {pack.package.name}
                  </label>
                </div>
              ))
            }
          </div>
        )}
      {selectedPackage && (
        <div>
          <div className="mt-4 pl-6">
          <h1 className=" font-bold">Why is this your fav</h1>
          <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
            className="mt-4 p-2  border-2 mx-auto w-1/2 border-1 border-black border-solid text-center min-h-10"
          />
          
        </div>
        <div className="flex flex-row-reverse w-1/2">
        <button onClick={handleAddToFavorites} className="bg-purple-900 text-white rounded-md p-1 px-3 mt-1 border-1 border-black border-solid">Submit</button>
        </div>
        </div>
      )}
    </div>
  ); 
};

export default AddFavorites;
