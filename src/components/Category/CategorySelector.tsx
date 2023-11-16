import { ChangeEvent, useEffect, useState } from "react"
import { requestAPI } from "../../api/fetchData";
import styles from './CategorySelector.module.css';

interface IProps{
    forceOption?: boolean,
    selectedCategory: string,
    setSelectedCategory: CallableFunction
}

const CategorySelector = (props: IProps) => {

    const [categories, setCategories] = useState(JSON.parse(sessionStorage.getItem('categories') || '[]'));
    const {selectedCategory, setSelectedCategory} = props;

    // Loads categories on load
    useEffect(() => {
        if (categories.length === 0){

            requestAPI('/category').then((r) => {
                setCategories(r.message)
                sessionStorage.setItem('categories', JSON.stringify(r.message))
            })
        }
    }, [])

    const handleChange = (ev: ChangeEvent) => {
        if (selectedCategory && setSelectedCategory){
            const target = ev.target as HTMLInputElement
            sessionStorage.setItem('category', target.value)
            setSelectedCategory(target.value)
        }
    }

  return (
    <select id="category" defaultValue={selectedCategory} value={selectedCategory} onChange={(ev)=> {handleChange(ev)}} className={styles.CategorySelector}>
        {!props.forceOption && <option value={'all'}>Categoria</option>}
        {categories.length > 0 &&
        categories.map((category: Category) => {
            return (<option key={category._id} value={category._id}>{category.name}</option>)
        })}
    </select>
  )
}

export default CategorySelector