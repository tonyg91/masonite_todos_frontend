import {Link, useParams} from "react-router-dom"

const SinglePost = ({posts, edit, deleteTodo}) => {
  // get the params from the url
  const params = useParams()
  const id = parseInt(params.id)
  // find the particular post the user wants to see base on the params 
  const post = posts.find((p) => p.id === id)
  console.log(post)
  ///////////////////////////
  // Styling
  ///////////////////////////
  const div = {
    textAlign: "center",
    border: "3px solid green",
    width: "80%",
    margin: "30px auto"
  }
    return <div style={div}>
      <h1>{post?.subject}</h1>
      <h2>{post?.details}</h2>
      <button onClick={() =>  edit(post)}>Edit</button>
      <button onClick={(event) => deleteTodo(post)}>Delete</button>
      <Link to="/">
            <button>Home</button>
      </Link>
    </div>
  };
  
  export default SinglePost;