import React, { useEffect, useState } from 'react';



function MyProfile() {
    const [donations, setDonations] = useState([]);

    useEffect(() => {
        fetch('/donations')
        .then(res => res.json())
        .then(data => setDonations(data));
    }, []);
    

    return (
        <div className='main-parent'>
            <div className='main-article-parent'>
                <div className='profile-parent'>
                    <div className = "profile-upper">
                        <div className='profile'>
                            <h4 className='profile-username'>JD.Salinger</h4>
                            <p className='profile-email'>test@email.com</p>
                        </div>
        
                    </div>
                    <div className='profile-lower'>
                        {donations.map(donation => (
                            <div className='history-parent' key={donation._id}>
                                <div className='history-pet'>{donation.pets[0].name}</div>
                                <div className='history-amount'>{donation.amount}</div>
                                <div className='history-date'>{new Date(donation.donationDate).toLocaleDateString()}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>  
    );
}





export default MyProfile;