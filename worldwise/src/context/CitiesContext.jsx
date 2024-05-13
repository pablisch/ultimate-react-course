import { createContext, useState, useEffect } from "react";
import { BASE_URL } from "../utils/baseUrl";

export const CitiesContext = createContext();

export const CitiesProvider = ({ children }) => {
  const [cities, setCities] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentCity, setCurrentCity] = useState({})

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setIsLoading(true)
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        console.log(data)
        setCities(data)
      } catch (error) {
        console.log(`Therer was an error fetching data:`, error.message)
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCities()
  }, [])

  const getCity = async (id) => {
    try {
      setIsLoading(true)
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      console.log(data)
      setCurrentCity(data)
    } catch (error) {
      console.log(`Therer was an error fetching data:`, error.message)
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity }}>
      {children}
    </CitiesContext.Provider>
  );
}
