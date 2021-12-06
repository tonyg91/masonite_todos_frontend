import {useState} from "react"
import { useNavigate } from "react-router";

const Form = ({initialTodo, handleSubmit, buttonLabel}) => {
  // grab navigate function 
  const navigate = useNavigate()

  // Create form state
  const [formData, setFormData] = useState(initialTodo)

  //////////////////////////
  // Functions
  //////////////////////////
  // handle change to update state when input changes
  const handleChange = (event) => {
    setFormData({...formData, [event.target.name]: event.target.value})
  }

  // Handle submit for when the form is submited 
  const handleSubmission = (event) => {
    // prevent the page from refresh 
    event.preventDefault()
    // pass the formData to the handle submit functino passes as props
    handleSubmit(formData)
    // push user back to main page
    navigate("/")
  }
  return <form onSubmit={handleSubmission}>
    <input type="text" onChange={handleChange} value={formData.subject} name="subject"/>
    <input type="text" onChange={handleChange} value={formData.details} name="details"/>
    <input type="submit" value={buttonLabel} />
  </form>
};

export default Form;