import React, {useState, useEffect} from 'react';
import DonationModal from './DonationModal';

function clickEvent(setPet) {
  const modal = document.querySelector('.main-parent');
  modal.addEventListener("click", (event) => {
    const selectedPet = localStorage.getItem("selectedPet");

    setPet(selectedPet);
  })
}

function Donate() {
    const [showModal, setShowModal] = useState(false);
    
    const [petPicture, setPet] = useState("");



    useEffect(() => {
      console.log("Pet Changed")
    },[setPet, petPicture]);

    useEffect(() => {
      clickEvent(setPet);
    },[setPet])


    

    console.log(typeof DonationModal);
    console.log("test");
  
    const handleDonateClick = () => {
      setShowModal(true);
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
    };
  
    return (
      <div className="main-parent">
        <div className="main-article-parent">
            {!showModal && <h2 className="article-title">Donate</h2>}
            <div className="donate-parent">
            {/* {selectedPet && ( */}
              <div className="donate-pic-parent">
              <img src={`/pets/${petPicture}.png`} alt={`${petPicture}`} className="donate-pic-container" />
              </div>
            {/* )} */}


            {!showModal && (
              <button type={"button"} className="donate-btn" onClick={handleDonateClick}>
                Donate Now!
              </button>
            )}
            
            {showModal && <DonationModal onClose={handleCloseModal} />}
          </div>
        </div>
      </div>
    );
  }


export default Donate