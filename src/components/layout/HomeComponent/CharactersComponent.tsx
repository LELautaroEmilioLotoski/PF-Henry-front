import Image4 from "../../../../public/The Three Broomsticks 3.jpg"
import Image from "next/image"
import styles from "@/components/layout/HomeComponent/CharactersComponent.module.css"
import BotonsComponent from "./BotonsComponent"

const CharactersComponent = () => {
  return (
    <>
    <div className={styles.characters} id="Characters">
    <Image src={Image4} alt="Fondo" className={styles.Image4}></Image>
    <h2 className={styles.text}>Aca ira la galeria de personajes</h2>
    <BotonsComponent/>
    </div>
    </>
  )
}

export default CharactersComponent