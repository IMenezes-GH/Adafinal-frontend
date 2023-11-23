import { useParams } from "react-router-dom"
import { FormEvent } from "react"
import Dialog from "./Dialog"
import { requestAPI } from "../../api/fetchData"

interface IReviewDialog {
    title: string,
    isOpen: boolean,
    setIsOpen: CallableFunction,
    user: User | null,
    token: string | null,
    method: 'POST' | 'PATCH',
    rating?: Rating
}

const ReviewDialog = (props: IReviewDialog) => {

    const param = useParams()

    const handleSubmit = async(ev: FormEvent) => {
        ev.preventDefault();
        const target = ev.target as HTMLFormElement
        
        const data = {
            _id: props.rating?._id,
            game: param.gameid,
            description: target.description.value,
            score: Number(target.score.value),
            user: props.user?._id
        }

        const {response, message} = await requestAPI('/ratings', {
            method: props.method,
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + ' ' + props.token
            },
            body: JSON.stringify(data)
        })
        if (response.ok) {
            props.setIsOpen(false)
            location.reload();
        }
        else target.output.innerText = message;
    }


  return (
    <Dialog title={props.title} isOpen={props.isOpen} setIsOpen={props.setIsOpen}>
        <form onSubmit={(ev) => handleSubmit(ev)}>
        <div>
            <textarea id="description" rows={3} placeholder='Descrição'></textarea>
        </div>
        <div>
            <input type="number" id='score' placeholder='Nota (1-5)' min={1} max={5} />
        </div>
        <div className='row'>
            <button type='button' onClick={() => props.setIsOpen(false)}>Cancelar</button>
            <button type='submit'>Enviar</button>
        </div>
        <output id='output'></output>
        </form>
    </Dialog>
  )
}

export default ReviewDialog