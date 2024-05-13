import { useNavigate } from 'react-router-dom'
import Button from './Button'

const BackButton = () => {
  const navigate = useNavigate()

  const handleBackButtonClick = (e) => {
    e.preventDefault();
    navigate(-1);
  }

  return (
    <Button type='back' onClick={handleBackButtonClick} >
      &larr; Back
    </Button>
  )
}

export default BackButton
