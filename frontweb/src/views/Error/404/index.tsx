import { Link } from "react-router-dom";


const NotFound = () => {
    return (
        <div className="d-flex justify-content-center align-items-center flex-column mt-5">
            <h1>404</h1>
            <h3 className="my-4">Página não encontrada</h3>
            <Link to="/" className="btn btn-lg btn-primary">Voltar</Link>
        </div>
    )
}

export default NotFound;