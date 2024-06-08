//import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
//import { data } from './assets/data.js';
import './Principal.css';
import { data } from '../../assets/data';
import { AuthContext } from '../../AuthContext';
import React, { useContext, useRef, useState, useEffect } from 'react';

const Principal = () => {
  const listRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isAuthenticated, logout } = useContext(AuthContext);

  useEffect(() => {
    const listNode = listRef.current;
    const imgNode = listNode.querySelectorAll("li > img")[currentIndex];

    if (imgNode) {
      imgNode.scrollIntoView({
        behavior: "smooth"
      });
    }

  }, [currentIndex]);

  const scrollToImage = (direction) => {
    if (direction === 'prev') {
      setCurrentIndex(curr => {
        const isFirstSlide = currentIndex === 0;
        return isFirstSlide ? 0 : curr - 1;
      })
    } else {
      const isLastSlide = currentIndex === data.length - 1;
      if (!isLastSlide) {
        setCurrentIndex(curr => curr + 1);
      }
    }
  }

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  }

  return (
    <div>
      <header>
        <div className="logo">
          <Link to="/principal"><img src="src/assets/images/logo/logo.png" alt="Logo" /></Link>
        </div>
        <nav className="nav-links">
          <ul>
            <li>
              <Link to="/lengua">Lengua</Link>
            </li>
            <li>
              <Link to="/tradicion">Tradición</Link>
            </li>
            <li>
              <Link to="/trajes">Traje Típico</Link>
            </li>
            {isAuthenticated && (
              <li>
                <Link to="/anuncios">Noticias</Link>
              </li>
            )}
          </ul>
        </nav>
        <nav>
          <ul className="login-register">
            {!isAuthenticated ? (
              <li>
                <Link to="/login">Iniciar Sesión</Link>
              </li>
              
            ) : (
              <li>
                <button onClick={logout}>Cerrar Sesión</button>
              </li>
            )}
          </ul>
        </nav>
      </header>
      <main className="main">
        <div className="left">
          <div className="main-container">
            <div className="slider-container">
              <div className='leftArrow' onClick={() => scrollToImage('prev')}>&#10092;</div>
              <div className='rightArrow' onClick={() => scrollToImage('next')}>&#10093;</div>
              <div className="container-images">
                <ul ref={listRef}>
                  {
                    data.map((item) => {
                      return <li key={item.id}>
                        <img src={item.imgUrl} width={500} height={280} alt={`slide-${item.id}`} />
                      </li>
                    })
                  }
                </ul>
              </div>
              <div className="dots-container">
                {
                  data.map((_, idx) => (
                    <div key={idx}
                      className={`dot-container-item ${idx === currentIndex ? "active" : ""}`}
                      onClick={() => goToSlide(idx)}>
                      &#9865;
                    </div>))
                }
              </div>
            </div>
          </div>
        </div>
        <div className="right">
          <p>Los Chatinos son un grupo étnico originario de México y los primeros habitantes del estado de Oaxaca, específicamente en el distrito de Juquila, al suroeste del estado.</p>
          <p>El nombre chatino, empleado históricamente por la población mexicana, designa a un grupo indígena y a un conjunto de lenguas indígenas estrechamente relacionadas entre sí. Dicho nombre es la forma castellanizada de cha´tñan, que en la propia lengua significa palabras en voz baja. Las lenguas chatinas cuentan con distintos nombres para autodenominarse, diferencia que obedece a distintos factores, tales como las lenguas mismas, las subáreas territoriales o incluso las comunidades; por ejemplo en Santos Reyes Nopala y Yaitepec el nombre es cha´tnio palabra trabajosa; en Yaitepec es chat´tña palabra difícil y en Tataltepec y Zezontepec es tasa´jnya trabajo de las palabras.</p>
        </div>
      </main>
    </div>
  );
};

export default Principal;

