import styles from "@/components/layout/HomeComponent/BotonsComponent.module.css"

const BotonsComponent = () => {
    return (
        <>
        <div>
          <div className={styles.buttonContainer}>
            <a href="#Home">
              <button className={styles.button}>Home</button>
            </a>
            <a href="#About">
              <button className={styles.button}>¿Who we are?</button>
            </a>
            <a href="#Ubication">
              <button className={styles.button}>¿Where are we?</button>
            </a>
            <a href="#Characters">
              <button className={styles.button}>Gallery</button>
            </a>
            <a href="#Products">
              <button className={styles.button}>Products</button>
            </a>
          </div>
        </div>
      </>
    )
}

export default BotonsComponent