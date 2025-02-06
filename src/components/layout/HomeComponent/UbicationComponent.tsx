import styles from "@/components/layout/HomeComponent/UbicationComponent.module.css"
import Image3 from "../../../../public/The Three Broomsticks 2.jpg"
import Image from "next/image"
import BotonsComponent from "./BotonsComponent"


const UbicationComponent = () => {
  return (
    <>
      <div className={styles.container} id="Ubication">
        <Image src={Image3} alt="Fondo de Componente" className={styles.image} />
        <div className={styles.content}>
          <div className={styles.subtitle}>
            <h1 className={styles.title}>We are waiting for you!!!</h1>
            <h2 className={styles.title}>Ubication</h2>
            <p className={styles.details}>Titan Plaza Avenida Boyacá 80 - 94</p>
            <p className={styles.details}>Tel: 3203810987</p>
            <p className={styles.details}>Email: threebroomsticks@mail.com</p>
            <p className={styles.details}>Horario de Atención: Lunes a Viernes 8:00 AM - 00:00 AM</p>
          </div>
          <iframe
            className={styles.iframe}
            src="https://maps.google.com/maps?width=600&height=500&hl=en&q=%20Titan%20Plaza%20Avenida%20Boyac%C3%A1%2080%20-%2094+(Ubication)&t=&z=16&ie=UTF8&iwloc=B&output=embed"
          ></iframe>
        </div>
        <BotonsComponent />
      </div>


    </>
  )
}

export default UbicationComponent