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
          <h2>Calle 123 Falsa</h2>
          <h3>Numero Telefonico</h3>
          <h4>Correo Electronico</h4>
          <h5>Horario de Atencion:</h5>
        </div>
        <iframe className={styles.iframeContainer}
          src="https://maps.google.com/maps?width=520&height=400&hl=en&q=Direccion%20falsa%20123+(The%20Three%20Broomsticks)&t=&z=14&ie=UTF8&iwloc=B&output=embed"
        />
        
      <BotonsComponent />
      
      </div>
    </>
  )
}

export default UbicationComponent