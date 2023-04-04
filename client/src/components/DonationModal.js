import React, { useState, useEffect, useCallback } from 'react';
import { ADD_DONATION } from '../utils/mutations';
import { PetsOptions } from './PetsData';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';

function DonationModal(props) {
  const [selectedPet, setSelectedPet] = useState('');
  const [donationAmount, setDonationAmount] = useState(0);
  const [donationMessage, setMessage] = useState('');
  const [petId, setPetId] = useState({});

  const [userData, setUserData] = useState({});
  const [addDonation] = useMutation(ADD_DONATION);


  const handlePetSelect = async (event) => {
    setSelectedPet(event.target.value);
    // console.log(event.target);
    const index = event.target.selectedIndex;
    const optionElement = event.target.childNodes[index];
    const thisPetId = optionElement.getAttribute('name');
    setPetId(thisPetId);
    // console.log(petId);
    localStorage.setItem("selectedPet", event.target.value);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(`Donating ${donationAmount} to ${selectedPet}`);

    try {
      await addDonation({
        variables: {
          amount: parseInt(donationAmount),
          message: donationMessage,
          pet: petId,
          user: userData._id,
        },
      });
      console.log(`amount: ${donationAmount} message: ${donationMessage} pet: ${petId} user: ${userData._id}`);
      // console.log(data);
      setSelectedPet('');
      setDonationAmount(0);
      setMessage('');
      localStorage.removeItem("selectedPet");
    } catch (err) {
      console.error(err);
    }
  };

  const getUserData = useCallback(async () => {
    try {
      const token = Auth.loggedIn() ? Auth.getToken() : null;

      if (!token) {
        return false;
      }

       const { data } = Auth.getProfile(token);
       const user = data;

       if (!user) {
         return false;
       }

       console.log(user);
       console.log("user");

      setUserData(user);
    } catch (err) {
      console.error(err);
    }
  }, [setUserData]);


  useEffect(() => {
    getUserData();
    // console.log('effect');
    // console.log(selectedPet);
    // console.log(petId);
    // console.log(donationAmount);
    // console.log(userData._id);
  }, [donationAmount, getUserData]);

  const handleIntChange = (event) => {
    const { value } = event.target;
    const number = parseInt(value);
    setDonationAmount(number);
  }

  const handleInputChange = (event) => {
    const { value } = event.target;
    setMessage(value);
  }

  

  return (
    <div className="donation-modal">
      <div className="modal-content">
        <span className="donation-close-btn" onClick={props.onClose}>
          &times;
        </span>
        <form className = "donate-modal-form" onSubmit={handleSubmit}>
          <h2 className='modal-header'>Make a Donation!</h2>
          <div className='central-donate-modal'>
          <div className='dModal-selector-parent'>
              <div className='modal-text' htmlFor="pets-select">Select a </div>
              <select id="dModal-selector" value={selectedPet} name={selectedPet} onChange={handlePetSelect}>
                  <option value="">Pet</option>
                  {PetsOptions()}
                </select>
            </div>
            <div className='dModal-selector-parent'>
                <div className='modal-text' htmlFor="amount"> Amount</div>
                <input  className='dModal-selector' type="number" name="donationAmount" value={donationAmount} onChange={handleIntChange}></input>
            </div>
            </div>
 
            <div className='lower-donate-modal'>


              <div className='dModal-selector-parent'>
              <div className='modal-text' htmlFor="msg">Leave a message</div>
              <input type="text" className="message" value={donationMessage} onChange={handleInputChange}></input>
              </div>
            </div>
          
          <button className='donate-submit-btn' type="submit">Submit!</button>
        </form>
      </div>
    </div>
  );
}

export default DonationModal;