import { formatRole } from "../../utils/formatter";
import { getAuthData, getTokenData } from "../../utils/requests";


const Dashboard = () => {
  return (
    <div className="jumbotron">
      <h1 className="display-4">System CRM</h1>
      <p className="lead mt-1">Sistema para gestão de usuários, clientes e produtos.</p>
      <hr className="my-4" />
      <p>
        <strong>Informações do usuário logado.</strong>
      </p>
      <small> <strong>Id: </strong> {getAuthData().userId}</small> <br />
      <small> <strong>Username: </strong> {getTokenData()?.user_name}</small> <br />
      <small> <strong>Perfis: </strong> {getTokenData()?.authorities.map((role) => (
        <span className="mr-1 badge border border-primary" key={role}>{formatRole(role)}</span>
      ))} 
      </small> <br />

      <small> <strong>Nome: </strong> {getAuthData().userFirstName}</small> <br />
      <small> <strong>Sobrenome: </strong> {getAuthData().userLastName}</small> <br />
    </div>
  )
}

export default Dashboard;