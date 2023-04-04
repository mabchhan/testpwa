import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function MenuProp(props) {


  return (
    <div id={props.id}>
      <div className='pet-names-header'>
        <h2 className='pet-names'>{props.petName}</h2>
      </div>
      {/* <a href={props.link}> */}
      <div className='project-parent'>
        <div className='project-overlay'>
          <img src={props.picture} alt={props.alt} className='project-img' />
          <div className='project-description'>
            <div className='project-links-parent'>
              {props.icon && (
                <a className="icon" href={props.link}>
                  <FontAwesomeIcon icon={props.icon} className='iconcolor' beatFade />
                </a>
              )}

             

            <div className='description-format'>
              <p>{props.pMenuDescription}</p>

              <h4 className='overlay-title'>{props.pMenuSubHeader}</h4>
              {props.pMenuSubHeader}
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* </a> */}
    </div>
    
  );
}

export default MenuProp;

















