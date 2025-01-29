import styles from "@/components/layout/HomeComponent/UbicationComponent.module.css"
import Image3 from "../../../../public/The Three Broomsticks 2.jpg"
import Image from "next/image"
import BotonsComponent from "./BotonsComponent"


const UbicationComponent = () => {
  return (
    <>
      <div className={styles.container} id="Ubication">
        <Image src={Image3} alt="Fondo de Componente" className={styles.Image3}></Image>
        <div className={styles.subtitle}>
          <h1 className={styles.title1}>We are waiting for you!!!</h1>
          <h1>Ubication</h1>
          <h2>Titan Plaza Avenida Boyacá 80 - 94</h2>
          <h3>Tel: 3203810987</h3>
          <h4>threebroomsticks@mail.com</h4>
          <h5>Horario de Atencion:</h5>
        </div>
        <iframe className={styles.iframeContainer}
          src="https://maps.google.com/maps?width=600&height=500&hl=en&q=%20Titan%20Plaza%20Avenida%20Boyac%C3%A1%2080%20-%2094+(Ubication)&t=&z=16&ie=UTF8&iwloc=B&output=embed"
        />
        
      <BotonsComponent />
      
      </div>
    </>
  )
}

export default UbicationComponent