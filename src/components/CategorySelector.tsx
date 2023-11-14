import { useEffect, useState } from "react"
import { requestAPI } from "../api/fetchData";
import styles from './CategorySelector.module.css';

interface IProps{
    forceOption?: boolean
}

const CategorySelector = (props: IProps) => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const request = (async() => await requestAPI('/category', {
            method: 'GET'
        }))();

        request.then((r) => {
            setCategories(r.message)
        })
    }, [])

  return (
    <select id="category" className={styles.CategorySelector}>
        {!props.forceOption && <option defaultChecked value={'all'}>Categoria</option>}
        {categories.length > 0 &&
        categories.map((category: Category) => {
            return (<option key={category._id} value={category._id}>{category.name}</option>)
        })}
    </select>
  )
}

export default CategorySelector