import styles from './CityList.module.css'
import Spinner from './Spinner'
import CityItem from './CityItem'
import Message from './Message'
import useCitiesContext from '../hooks/useCitiesContext'

const CityList = () => {
  const { cities, isLoading } = useCitiesContext()

  if (isLoading) return <Spinner />

  if (!cities.length) return <Message message="Add your first city by clicking on a city on the map" />

  return (
    <ul className={styles.cityList} >
      {cities && cities.map(city => <CityItem key={city.id} city={city} />)}
    </ul>
  )
}

export default CityList
