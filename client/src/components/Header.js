import React, { useState } from 'react';
import LoginModal from './LoginModal';
import Auth from '../utils/auth';
import { Link } from 'react-router-dom';

function Header() {
    const [showModal, setShowModal] = useState(false);

      const handleModalOpen = () => {
      setShowModal(true);
    };

    return (
        <div className='main-header-parent'>
            <div className='upper-header'>
                {Auth.loggedIn() ? (
                    <button className='login-btn' onClick={Auth.logout}>Logout</button>
                ) : (
                    <button className='login-btn' onClick={handleModalOpen}>Login/Sign Up</button>
                )}

                <LoginModal showModal={showModal} setShowModal={setShowModal} />
            </div>
            <div className='central-header'>
                <h1 className='site-title'><span className='title-span'>Anim</span>-Aid</h1>
            </div>
            <div className='lower-header'>
                <button className='header-btn'><Link to="/pets" className='link-remove'>Pets</Link></button>
                <button className='header-btn'><Link to="/" className='link-remove'>About</Link></button>
                <button className='header-btn'><Link to="/donate" className='link-remove'>Donate</Link></button>
            </div>
        </div>
    );
}
    
export default Header;