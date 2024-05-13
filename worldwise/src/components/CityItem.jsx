import { Link } from 'react-router-dom';
import styles from './CityItem.module.css'
import useCitiesContext from '../hooks/useCitiesContext'

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

const CityItem = ({ city }) => {
  const { currentCity } = useCitiesContext()
  return (
    <li  >
      <Link to={`${city.id}?lat=${city.position.lat}&lng=${city.position.lng}`} className={`${styles.cityItem} ${city.id === currentCity.id ? styles['cityItem--active'] : ''}`} >

      <span className={styles.emoji} >{city.emoji}</span>
      <h3 className={styles.cityName} >{city.cityName}</h3>
      <time className={styles.date}>({formatDate(city.date)})</time> 
      <button className={styles.deleteBtn} >&times;</button>
      </Link>
    </li>
  )
}

export default CityItem
