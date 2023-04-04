import React from 'react';

import { PetObject } from './PetsData';

function PetPage() {

    const object = PetObject();

    if (object === undefined) {
        // console.log("this object is undefined");
        return <h2>Loading...</h2>
    } else if (object === null) {
        return <h2>Loading...</h2>
    }

    // console.log(object.onePet);

    const petName = object.onePet.name;
    const petImage = `/pets/${object.onePet.name}.png`;
    const petAlt = object.onePet.alt;
    const headline = object.onePet.headline;
    const summary = object.onePet.summary;
    const breed = object.onePet.breed;
    const age = object.onePet.age;
    const gender = object.onePet.gender;


    return (
        <div className='main-parent'>
            <div className='main-article-parent'>
                <h2 className='article-title'>{petName}</h2>
                <div className='petpage-article-parent'>
                    <div className = "petpage-left">
                        <div className='petpage-img-container'>
                            <img className = "petpage-img" alt={petAlt} src={petImage}></img>
                        </div>
                        

                    </div>
                    <div className='petpage-right'>
                        <div className='petpage-section'>{petName} is {age} Years old! This {gender} {breed} is available for sponsorship or adoption!</div>
                        <div className='petpage-section'>{headline}</div>
                        <div className='petpage-section'>{summary}</div>


                       


                    </div>
                </div>
            </div>
        </div>
        
    );
}





export default PetPage;
