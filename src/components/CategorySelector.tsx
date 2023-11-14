import { useEffect, useState } from "react"
import { requestAPI } from "../api/fetchData";

const CategorySelector = () => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const request = (async() => await requestAPI('/category', {
            method: 'GET'
        }))();

        request.then((r) => {
            console.log(r);
        })
    }, [])

  return (
    <select>

    </select>
  )
}

export default CategorySelector