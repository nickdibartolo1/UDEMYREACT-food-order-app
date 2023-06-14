import React, { Fragment } from 'react';
import classes from './Modal.module.css';
//imported for the create portal method for the modal
import ReactDOM from 'react-dom';


// Backdrop component
const Backdrop = (props) => {
    return (
        <div className={classes.backdrop}>

        </div>
    )
}



// Overlay component
const Overlay = (props) => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>
                {props.children}
            </div>

        </div>
    )

}


//helper constant connecting to the DOM (index.html)
const portalElement = document.getElementById('overlays');


// Modal component (MAIN)
const Modal = (props) => {


    
    return (
        <Fragment>
          {ReactDOM.createPortal(<Backdrop/>, portalElement)}
          {ReactDOM.createPortal(<Overlay>{props.children}</Overlay>, portalElement)}
        </Fragment>
    )
}

export default Modal