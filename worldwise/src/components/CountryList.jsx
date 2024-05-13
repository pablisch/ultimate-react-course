import styles from './CountryList.module.css'
import Spinner from './Spinner'
import CountryItem from './CountryItem'
import Message from './Message'
import useCitiesContext from '../hooks/useCitiesContext'

const CountryList = () => {
  const { cities, isLoading } = useCitiesContext()

  if (isLoading) return <Spinner />

  if (!cities.length) return <Message message="Add your first Country by clicking on a Country on the map" />

  const countries = cities.reduce((array, city) => {
    if (!array.map(el => el.country).includes(city.country))
      return [...array, { country: city.country, emoji: city.emoji }]
    else return array
  }, [])

  console.log('countries', countries)

  return (
    <ul className={styles.countryList} >
      {countries && countries.map(country => <CountryItem key={country.country} country={country} />)}
    </ul>
  )
}

export default CountryList
