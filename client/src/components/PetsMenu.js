import React from 'react';
import MenuProp from './PetsProps';
import { PetsArray } from './PetsData';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';




function PetsMain() {

  const navigate = useNavigate();

  const handlePetClick = (petName) => {
    navigate(`/pet/${petName}`);
  };
  const PetsData = PetsArray();
  const midIndex = Math.ceil(PetsData.length / 2);
  const leftPets = PetsData.slice(0, midIndex);
  const rightPets = PetsData.slice(midIndex);


  return (
    <div className='main-parent'>
      <div className='main-article-parent'>
        <h2 className='article-title'>Pets</h2>
        <div className='pets-menu-parent'>
          <div className='pets-menu-col'>
            {leftPets.map((pet, index) => (
              <MenuProp
                key={pet.key}
                id={pet.id}
                petName={pet.petName}
                picture={pet.picture}
                alt={pet.alt}
                pMenuDescription={pet.pMenuDescription}
                pMenuSubHeader={pet.pMenuSubHeader}
                pMenuSubTxt={pet.pMenuSubTxt}
                icon={faPaw}
                link={pet.link}
              />
            ))}
          </div>
          <div className='pets-menu-col'>
            {rightPets.map((pet, index) => (
              <MenuProp
                key={pet.key}
                id={pet.id}
                petName={pet.petName}
                picture={pet.picture}
                alt={pet.alt}
                pMenuDescription={pet.pMenuDescription}
                pMenuSubHeader={pet.pMenuSubHeader}
                pMenuSubTxt={pet.pMenuSubTxt}
                icon={faPaw}
                link={pet.link}
              />
            ))}
          </div>
        </div>
        <div className='invisa-footer'></div>
      </div>
      
    </div>
  );
}

export default PetsMain;