import axios from 'axios'
import { useEffect, useState } from 'react'

const AddFavorites = () => {
    const [query,setQuery]=useState<string>("")
    const [data,setData]=useState([])
    const [favorites, setFavorites] = useState<string[]>([]);
    const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
    useEffect(()=>{
       fetchData(query)
    },[query])

    const fetchData=async(query:string)=>{
      try{
          let response= await axios.get(`https://api.npms.io/v2/search?q=${query}`)
         console.log(response.data)
          setData(response.data.results)
      }
      catch(err){
        console.log(err)
      }
    }
    const handleRadioChange = (packageName: string) => {
        setSelectedPackage(packageName);
      }
    
      const handleAddToFavorites = () => {
        if (selectedPackage) {
          setFavorites(prevFavorites => {
            if (!prevFavorites.includes(selectedPackage)) {
              return [...prevFavorites, selectedPackage];
            }
            return prevFavorites;
          });
          setSelectedPackage(null);
        }
      }
  return (
    <div >
    <h1 className="text-3xl text-center m-5">Search for NPM Packages</h1>
    <div className="flex justify-center items-center">
    <input type="text" placeholder="Search any package" value={query} onChange={(e)=>setQuery(e.target.value)} className="border-1 border-black border-solid px-2"/>
    </div>
    {data.length>0 && data.map((pack:any)=>(
       <div key={pack.package.date} className="flex items-center">
       <input
         type="radio"
         id={pack.package.name}
         name="selectedPackage"
         onChange={() => handleRadioChange(pack.package.name)}
         checked={selectedPackage === pack.package.name}
       />
       <label htmlFor={pack.package.name} className="ml-2">{pack.package.name}</label>
     </div>
    ))}
    {
        selectedPackage &&(
            <div>
            <h1>Why is this your fav</h1>
            <textarea
            
            className="mt-4 p-2 width-full border-1 border-black border-solid "
            style={{width:"50%",minHeight:"100px",margin:"auto",border:"1px solid black",textAlign:"center"}}
          />
          </div> 
        )
    }
  </div>
  )
}

export default AddFavorites
