import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import styles from './Dropdown.module.css';

interface IDropDown {
    isOpen: boolean
}
  
  const HeaderDropdown = ({isOpen}: IDropDown) => {
    const dropdown = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      if (isOpen){
        dropdown.current?.classList.add('open');
      }
      else {
        dropdown.current?.classList.remove('open');
      }
    }, [isOpen])
  
    return (
    <div ref={dropdown} className={styles.NavDropdown}>
      <ul>
        <li>
        <Link to={'profile'}>Perfil</Link>
        </li>
        <li>
        <Link to={'logout'}>Logout</Link>
        </li>
      </ul>
    </div>
    )
  }

  export default HeaderDropdown