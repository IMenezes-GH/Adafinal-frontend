import { ChangeEvent, useEffect, useState } from "react"
import { requestAPI } from "../../api/fetchData";
import styles from './CategorySelector.module.css';

interface IProps{
    forceOption?: boolean
}

const CategorySelector = (props: IProps) => {

    const [categories, setCategories] = useState([]);
    const defaultCategory = (sessionStorage.getItem("category") || 'all')
    const [selectedCategory, setSelectedCategory] = useState(defaultCategory);

    useEffect(() => {
        const request = (async() => await requestAPI('/category', {
            method: 'GET'
        }))();

        request.then((r) => {
            setCategories(r.message)
        })
    }, [])

    const handleChange = (ev: ChangeEvent) => {
        setSelectedCategory(ev.target.value);
    }

  return (
    <select id="category" value={selectedCategory} onChange={(ev)=> {handleChange(ev)}} className={styles.CategorySelector}>
        {!props.forceOption && <option defaultChecked value={'all'}>Categoria</option>}
        {categories.length > 0 &&
        categories.map((category: Category) => {
            return (<option key={category._id} value={category._id}>{category.name}</option>)
        })}
    </select>
  )
}

export default CategorySelector