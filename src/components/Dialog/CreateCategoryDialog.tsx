import Dialog from "./Dialog"
import { ReactElement, FormEvent } from "react"
import { requestAPI } from "../../api/fetchData"

interface ICategoryDialog {
    title: string,
    isOpen: boolean,
    token: string,
    gameList?: Game[],
    children?: ReactElement | ReactElement[]
    setIsOpen: CallableFunction,
    setGameList?: CallableFunction
}
  

const CreateCategoryDialog = (props: ICategoryDialog) => {

    const {token, setIsOpen} = {...props};

    const handleSubmit = async(ev: FormEvent) => {
        ev.preventDefault();
        const target = ev.target as HTMLFormElement;
        const data = {
            name: target.categoryName.value
        }
        const {response} = await requestAPI('/category', {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Authorization' : 'Bearer' + ' ' + token,
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(data)
        })
        
        if (response.ok){
            setIsOpen(false)
            location.reload();
        }
        
    }

    return (
    <Dialog title={'Criar Categoria'} isOpen={props.isOpen} setIsOpen={props.setIsOpen}>
        <form onSubmit={(ev) => handleSubmit(ev)}>
            <input id='categoryName' type='text' placeholder='Nome da categoria' />
            <div>
                <button type='button' onClick={() => props.setIsOpen(false)}>Cancelar</button>
                <button type='submit'>Cadastrar Categoria</button>
            </div>
            <output id='output'></output>
        </form>
    </Dialog>)
}

export default CreateCategoryDialog