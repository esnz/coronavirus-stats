import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { ReactComponent as Virus } from '../assets/virus.svg';
import './Header.styles.scss';

const Header = () => {
  return (
    <header>
      <div className='container'>
        <div className='title'>
          <h1>
          <Virus /><span>Coronavirus Stats</span>
          </h1>
        </div>
        <div className='icons'>
          <a href='https://github.com/esanazizi/coronavirus-stats'>
            <FontAwesomeIcon size="lg" icon={faGithub} />
          </a>
        </div>
      </div>
    </header>
  );
};
export default Header;
