import Image from 'next/image'; 
import styles from "@/components/layout/HomeComponent/CardComponent.module.css";

interface ComboCardProps {
    nombre: string;
    precio: number;
    descripcion: string;
    imagen: string; 
}

function ComboCard({ nombre, precio, descripcion, imagen }: ComboCardProps) {
    return (
        <div className={styles.container}>
            <div className={styles.card__container}>
                <article className={styles.card__article}>
                    <Image 
                        src={imagen} 
                        alt={nombre} 
                        className={styles.card__image} 
                        width={300} 
                        height={200} 
                    />

                    <div className={styles.card__data}>
                        <span className={styles.card__description}>
                            <h3 className={styles.card__subtitle}>$ {precio}</h3>
                            <h4 className={styles.card__title}>{nombre}</h4>
                            <p>{descripcion}</p>
                            <a href="/menu">
                                <button className={styles.card__button1}>Buy Product</button>
                            </a>
                        </span>
                    </div>
                </article>
            </div>
        </div>
    );
}

export default ComboCard;
