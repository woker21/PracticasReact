import axios from "axios"


export const getData = async  ()=>{
    const d = await axios.get("https://rickandmortyapi.com/api/character ")
    return d;
}
