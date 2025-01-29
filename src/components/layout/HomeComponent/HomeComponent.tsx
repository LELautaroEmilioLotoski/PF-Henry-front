import styles from "@/components/layout/HomeComponent/HomeComponent.module.css"
import Image1 from "../../../../public/Logos/Pedro/LOGO 2/JPEG BLANCO.jpg"
import Image from 'next/image'
import AboutComponent from './AboutComponent'
import UbicationComponent from "./UbicationComponent"
import BotonsComponent from "./BotonsComponent"
import CharactersComponent from "./CharactersComponent"
import BestProducts from "./BestProducts"


function HomeComponent() {

  return (
    <>
      <div className={styles.card} id="Home">
        <div className={styles.backgound}>
          <Image src={Image1} alt="Imagen de Fondo" className={styles.Image1}></Image>
          <h2 className={styles.title}>WINGARDIUM LEVIOSA!!</h2>
        </div>
      </div>

      <BotonsComponent/>
      <AboutComponent/>
      <UbicationComponent/>
      <CharactersComponent/>
      <BestProducts/>
    </>

   
  )
}


export default HomeComponent;