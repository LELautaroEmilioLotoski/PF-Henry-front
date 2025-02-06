import React from 'react'
import { combos } from "@/app/api/mocksProducts"
import ComboCard from './CardComponent'
import styles from "@/components/layout/HomeComponent/BestProducts.module.css"
import BotonsComponent from './BotonsComponent'
import Image1 from "../../../../public/Three Broomsticks 1.jpg"
import Image from 'next/image'

const BestProducts = () => {
  return (
<div className={styles.container} id='Products'>
  <h1 className={styles.title}>ENJOY THEM</h1>
  <Image src={Image1} alt='fondo de pantalla' className={styles.backgroundImage}></Image>
  <div className={styles.cardsContainer}>
    {combos.map(combo => (
      <ComboCard key={combo.nombre} {...combo} />
    ))}
  </div>
  <BotonsComponent/>
</div>

  )
}

export default BestProducts