import Dialog from "./Dialog"
import { ReactElement, FormEvent, useState, useContext } from "react"
import { UserContext } from "../../context/UserProvider"
import { requestAPI } from "../../api/fetchData"
import CategorySelector from "../Category/CategorySelector"

interface IGameDialog {
    title: string,
    isOpen: boolean,
    children?: ReactElement | ReactElement[]
    setIsOpen: CallableFunction,
}


const CreateGameDialog = (props: IGameDialog) => {

    const {token} = useContext(UserContext);
    const {setIsOpen} = {...props};
    const [category, setSelectedCategory] = useState('');
    
    const handleSubmit = async(ev: FormEvent) => {
        ev.preventDefault();
        const target = ev.target as HTMLFormElement;
        const data = {
            name: target.gameName.value,
            description: target.description.value,
            url: target.url.value,
            imageURL: target.imageURL.value,
            category: target.category.value
        }
        const {response, message} = await requestAPI('/games', {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Authorization' : 'Bearer' + ' ' + token,
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(data)
        })
        if (response.ok) {
            setIsOpen(false)
            location.reload();
        }
        else target.output.innerText = message.message
    }


    return (
    <Dialog title={'Cadastrar Jogo'} isOpen={props.isOpen} setIsOpen={props.setIsOpen}>
        <form onSubmit={(ev) => handleSubmit(ev)}>
            <input required id='gameName' type='text' placeholder='Nome do jogo' />
            <textarea required id="description" rows={4} placeholder='Descrição do jogo'></textarea>
            <input required type="text" id='url' placeholder='Url do jogo' />
            <input required type="text" id='imageURL' placeholder='Url da imagem do jogo' />
            <CategorySelector selectedCategory={category} setSelectedCategory={setSelectedCategory} forceOption={true}/>
            <div>
                <button type='button' onClick={() => props.setIsOpen(false)}>Cancelar</button>
                <button>Cadastrar Jogo</button>
            </div>
            <output id='output'></output>
        </form>
    </Dialog>)
}

export default CreateGameDialog