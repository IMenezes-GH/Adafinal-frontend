import { ReactElement, useEffect, useRef } from "react"
import './Modal.css'

interface props {
  title: string,
  isOpen: boolean,
  setIsOpen: CallableFunction,
  children?: ReactElement | ReactElement[]
}


const Dialog = ({title, isOpen, setIsOpen, children}: props) => {
  const modal = useRef<HTMLDialogElement>(null);
  
  useEffect(() => {
    if (isOpen) {
      modal.current?.showModal();
    }
    else {
      modal.current?.close();
    }
  }, [isOpen])

  return (
    <dialog ref={modal} onClose={() => setIsOpen(false)} onCancel={() => setIsOpen(false)}>
      <h1>{title}</h1>
      {children}
    </dialog>
  )
}

export default Dialog