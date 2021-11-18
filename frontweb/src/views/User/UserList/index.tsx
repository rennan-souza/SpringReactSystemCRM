import { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import Pagination from "../../../components/Pagination";
import { SpringPage, User } from "../../../types";
import { formatRole } from "../../../utils/formatter";
import { getTokenData, requestBackend } from "../../../utils/requests";


const UserList = () => {

  const [page, setPage] = useState<SpringPage<User>>();
  const [userIdSelected, setUserIdSelected] = useState<number>();
  const [load, setLoad] = useState<boolean>(false);

  const getAllUsers = (pageNumber: number) => {
    setLoad(true);
    const params: AxiosRequestConfig = {
      method: "GET",
      url: "/users",
      params: {
        page: pageNumber,
        size: 5,
        sort: 'id,desc',
      },
      withCredentials: true
    };

    requestBackend(params).then((response) => {
      setPage(response.data);
    }).finally(() => {
      setLoad(false);
    });
  }

  useEffect(() => {
    getAllUsers(0)
  }, []);

  const handlePrepareDeleteUser = (userId: number) => {
    setUserIdSelected(userId);
  }

  const handleDeleteUser = () => {
    requestBackend({
      method: "DELETE",
      url: `/users/${userIdSelected}`,
      withCredentials: true
    }).then(() => {
      getAllUsers(page?.number ? page.number : 0);
      toast.success("Usuário excluído com sucesso", {
        position: "bottom-right",
        theme: "colored"
      });
    }).catch((errorResponse) => {
      toast.error(errorResponse.response.data.message, {
        position: "bottom-right",
        theme: "colored"
      });
    });
  };


  return (
    <>
      <div className="mb-4 text-secondary">
        <h4>Usuários</h4>
      </div>
      <div className="mb-2">
        <NavLink to="/usuarios/cadastrar" className="btn btn-sm btn-primary shadow-none">
          <i className="fas fa-plus-circle mr-2"></i>
          NOVO
        </NavLink>
      </div>
      <div className="search-container mb-2">
        <form>
          <input type="text" className="form-control form-control-sm input-search" placeholder="Pesquisar" />
        </form>
      </div>

      {load ? (
        <div className="text-center text-secondary">
          <div className="d-flex justify-content-center my-4">
            <div className="spinner-border" role="status"></div>
          </div>
          <h4>Carregando...</h4>
        </div>
      ) : page?.empty ? (
        <div className="text-center text-secondary my-5">
          <h4>Nenhum resultado encontrado</h4>
        </div>
      ) : (

        <div className="card">
          <div className="table-responsive">
            <table className="table table-borderless table-hover mb-0">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Sobrenome</th>
                  <th>Email</th>
                  <th>Perfis</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {page?.content.map((user) => (
                  <tr key={user.id} className="border-bottom">
                    <td>{user.id}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>
                      {user.roles.map((role) => (
                        <span className="badge border border-primary mr-1" key={role.id}>{formatRole(role.authority)}</span>
                      ))}
                    </td>
                    <td>
                      {user.email !== getTokenData()?.user_name ? (
                        <>
                          <NavLink to={`/usuarios/editar/${user.id}`} className="btn btn-sm p-0 mr-3 shadow-none text-info">
                            <i className="fas fa-pen"></i>
                          </NavLink>
                          <button className="btn btn-sm p-0 shadow-none text-danger"
                            data-toggle="modal" data-target="#exampleModal"
                            onClick={() => { handlePrepareDeleteUser(user.id) }}>
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </>
                      ) : ''}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      )}

      <div className="pagination-container">
        <Pagination
          pageCount={page ? page.totalPages : 0}
          range={3}
          onChange={getAllUsers}
        />
      </div>

      <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="exampleModalLabel">Excluir</h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              Tem certeza que deseja excluir?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary shadow-none" data-dismiss="modal">
                Cancelar
              </button>
              <button type="button" className="btn btn-danger shadow-none" onClick={handleDeleteUser} data-dismiss="modal">
                Excluir
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserList;