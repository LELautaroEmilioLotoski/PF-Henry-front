import styles from "./AboutComponent.module.css"
import Image2 from "../../../../public/Three Broomsticks 1.jpg"
import Image from "next/image"
import BotonsComponent from "./BotonsComponent"
import Image6 from "../../../../public/Logos/Pedro/LOGO 1/PNG-BLANCO.png"

const AboutComponent = () => {
  return (
    <>
      <div id="About" className={styles.about}>
        <Image src={Image2} alt="Fondo" className={styles.Image2} />
        <div className={styles.textContainer}>
          <h3 className={styles.text}>
            Welcome to The Three Broomsticks! A place where magic and flavor meet to offer you a unique experience,
            inspired by the enchanted world of Harry Potter. In our restaurant,
            we invite you to immerse yourself in the atmosphere of the famous J.K. saga. Rowling, while you enjoy delicious dishes and drinks that could have been prepared in the Hogwarts kitchen itself.
          </h3>
          <Image src={Image6} alt="logo" className={styles.Image6} />
        </div>
        <BotonsComponent />
      </div>

    </>
  )
}

export default AboutComponent