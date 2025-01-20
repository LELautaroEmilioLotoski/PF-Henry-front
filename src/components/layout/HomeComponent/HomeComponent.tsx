import styles from "@/components/layout/HomeComponent/HomeComponent.module.css"
import Image1 from "../../../../public/Imagen Fondo.png"
import Image from 'next/image'
import AboutComponent from './AboutComponent'
import UbicationComponent from "./UbicationComponent"
import BotonsComponent from "./BotonsComponent"
import CharactersComponent from "./CharactersComponent"


function HomeComponent() {

  return (
    <>
      <div className={styles.card} id="Home">
        <div className={styles.backgound}>
          <Image src={Image1} alt="Imagen de Fondo" className={styles.Image1}></Image>
        </div>
      </div>

      <BotonsComponent/>
      <AboutComponent/>
      <UbicationComponent/>
      <CharactersComponent/>
    </>

   
  )
}


export default HomeComponent;