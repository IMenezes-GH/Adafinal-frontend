import { ChangeEvent,  useEffect, useState } from "react"
import { requestAPI } from "../../api/fetchData";
import styles from './CategorySelector.module.css';

interface IProps{
    forceOption?: boolean
}

const CategorySelector = (props: IProps) => {

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState((sessionStorage.getItem("category") || 'all'));

    // Loads categories on load
    useEffect(() => {
        requestAPI('/category').then((r) => {
            setCategories(r.message)
        })
    }, [])

    const handleChange = (ev: ChangeEvent) => {
        setSelectedCategory((ev.target as HTMLSelectElement).value);
        sessionStorage.setItem("category", (ev.target as HTMLSelectElement).value)
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