import { Link } from "react-router-dom"
import {FaGithub,FaLinkedinIn} from "react-icons/fa"
const Footer=()=>{
  return (
    <div  className="container">
    <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
    <div className="col-md-4 d-flex align-items-center">
      <Link to ="/" className="text-decoration-none mb-3 me-2 mb-md-0 text-body-primary text-decoration-none lh-1">
      Lazona
      
      </Link>
      <span className="mb-3 mb-md-0 text-body-secondary">&copy; 2024 Companay,Inc</span>
    </div>

    <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
      <li className="ms-3"><a className="text-body-secondary" href="https://github.com/adarsha988"><FaGithub /></a></li>
      <li className="ms-3"><a className="text-body-secondary" href="https://www.linkedin.com/in/adarash-kd-8a28232b7"><FaLinkedinIn /></a></li>
    </ul>
  </footer>
</div>
  )
}

export default Footer