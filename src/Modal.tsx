import React from 'react';
import style from './scss/Modal.module.scss'

type PropsType = {
    isValid: boolean
    text: string
    displayModal:(isValid:boolean) => void
}

const ValidModal: React.FC<PropsType> = (props)=> {
    const onClose = () => {
        props.displayModal(false)
    }

return (
    <div className={props.isValid ? style.isTrue : style.isFalse}>
         <div className={style.modal_container}>
             <div className={style.close} onClick={onClose}>X</div>
             <div className={style.text}>
                {props.text}
             </div>
        </div>
    </div>
);
}


export default ValidModal;