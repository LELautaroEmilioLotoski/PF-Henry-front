import React from 'react';
import Image from 'next/image';
import styles from './CharactersComponent.module.css';
import fondo from "../../../../public/The Three Broomsticks 3.jpg";
import IMAGEN1 from "../../../../public/Galeria Harry Potter/Imagen Harry Potter.jpg";
import IMAGEN2 from "../../../../public/Galeria Harry Potter/Imagen Hermione Granger 1.jpg";
import IMAGEN3 from "../../../../public/Galeria Harry Potter/Imagen Ron Wasley.jpg";
import IMAGEN4 from "../../../../public/Galeria Harry Potter/Imagen Draco Malfoy.jpg";
import IMAGEN5 from "../../../../public/Galeria Harry Potter/Imagen Hagrid.jpg";
import IMAGEN6 from "../../../../public/Galeria Harry Potter/Imagen Minnerva.jpg";
import IMAGEN7 from "../../../../public/Galeria Harry Potter/Imagen Severus Snape.jpg";
import IMAGEN8 from "../../../../public/Galeria Harry Potter/Imagen Neville Longbottom.jpg";
import IMAGEN9 from "../../../../public/Galeria Harry Potter/Imagen Dumbledore.jpg";
import IMAGEN10 from "../../../../public/Galeria Harry Potter/Imagen Lord Voldemort.jpg";
import BotonsComponent from './BotonsComponent';

const CharactersComponent: React.FC = () => {
  return (
    <div className={styles.fondo}>
      <Image className={styles.imagenFondo} src={fondo} alt="Fondo" />
      <div className={styles.banner} id="Characters">
        <div className={styles.slider} style={{ '--quantity': 10 } as React.CSSProperties}>
          <div className={styles.item} style={{ '--position': 1 } as React.CSSProperties}>
            <a href="https://es.wikipedia.org/wiki/Harry_Potter_(personaje)" target="_blank" rel="noopener noreferrer">
              <Image src={IMAGEN1} alt="Imagen 1" />
            </a>
          </div>
          <div className={styles.item} style={{ '--position': 2 } as React.CSSProperties}>
            <a href="https://es.wikipedia.org/wiki/Hermione_Granger" target="_blank" rel="noopener noreferrer">
              <Image src={IMAGEN2} alt="Imagen 2" />
            </a>
          </div>
          <div className={styles.item} style={{ '--position': 3 } as React.CSSProperties}>
            <a href="https://es.wikipedia.org/wiki/Ron_Weasley" target="_blank" rel="noopener noreferrer">
              <Image src={IMAGEN3} alt="Imagen 3" />
            </a>
          </div>
          <div className={styles.item} style={{ '--position': 4 } as React.CSSProperties}>
            <a href="https://es.wikipedia.org/wiki/Draco_Malfoy" target="_blank" rel="noopener noreferrer">
              <Image src={IMAGEN4} alt="Imagen 4" />
            </a>
          </div>
          <div className={styles.item} style={{ '--position': 5 } as React.CSSProperties}>
            <a href="https://es.wikipedia.org/wiki/Rubeus_Hagrid" target="_blank" rel="noopener noreferrer">
              <Image src={IMAGEN5} alt="Imagen 5" />
            </a>
          </div>
          <div className={styles.item} style={{ '--position': 6 } as React.CSSProperties}>
            <a href="https://en.wikipedia.org/wiki/Minerva_McGonagall" target="_blank" rel="noopener noreferrer">
              <Image src={IMAGEN6} alt="Imagen 6" />
            </a>
          </div>
          <div className={styles.item} style={{ '--position': 7 } as React.CSSProperties}>
            <a href="https://es.wikipedia.org/wiki/Severus_Snape" target="_blank" rel="noopener noreferrer">
              <Image src={IMAGEN7} alt="Imagen 7" />
            </a>
          </div>
          <div className={styles.item} style={{ '--position': 8 } as React.CSSProperties}>
            <a href="https://en.wikipedia.org/wiki/Neville_Longbottom" target="_blank" rel="noopener noreferrer">
              <Image src={IMAGEN8} alt="Imagen 8" />
            </a>
          </div>
          <div className={styles.item} style={{ '--position': 9 } as React.CSSProperties}>
            <a href="https://es.wikipedia.org/wiki/Albus_Dumbledore" target="_blank" rel="noopener noreferrer">
              <Image src={IMAGEN9} alt="Imagen 9" />
            </a>
          </div>
          <div className={styles.item} style={{ '--position': 10 } as React.CSSProperties}>
            <a href="https://es.wikipedia.org/wiki/Lord_Voldemort" target="_blank" rel="noopener noreferrer">
              <Image src={IMAGEN10} alt="Imagen 10" />
            </a>
          </div>
        </div>
      </div>
      <BotonsComponent />
    </div>
  );
}

export default CharactersComponent;
