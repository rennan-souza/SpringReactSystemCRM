import { AxiosRequestConfig } from "axios";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import Pagination from "../../../components/Pagination";
import { Customer, SpringPage } from "../../../types";
import { requestBackend } from "../../../utils/requests";


type SearchForm = {
  value: string;
}

type ControlComponentsData = {
  activePage: number;
  filterData: string;
};

const CustomerList = () => {

  const [page, setPage] = useState<SpringPage<Customer>>();
  const [customerIdSelected, setCustomerIdSelected] = useState<number>();
  const [load, setLoad] = useState<boolean>(false);

  const [controlComponentsData, setControlComponentsData] = useState<ControlComponentsData>({
    activePage: 0,
    filterData: ''
  });

  const handlePageChange = (pageNumber: number) => {
    setControlComponentsData({ activePage: pageNumber, filterData: controlComponentsData.filterData });
  };

  const onSubmit = (searchForm: SearchForm) => {
    setControlComponentsData({ activePage: 0, filterData: searchForm.value })
  }

  const {
    register,
    handleSubmit,
  } = useForm<SearchForm>();


  const getAllCustomers = useCallback(() => {
    setLoad(true);
    const params: AxiosRequestConfig = {
      method: "GET",
      url: "/customers",
      params: {
        page: controlComponentsData.activePage,
        size: 5,
        sort: "id,desc",
        search: controlComponentsData.filterData
      },
      withCredentials: true
    };

    requestBackend(params).then((response) => {
      setPage(response.data);
    }).finally(() => {
      setLoad(false);
    });
  }, [controlComponentsData])

  useEffect(() => {
    getAllCustomers()
  }, [getAllCustomers]);

  const handlePrepareDeleteCustomer = (customerId: number) => {
    setCustomerIdSelected(customerId);
  }

  const handleDeleteCustomer = () => {
    requestBackend({
      method: "DELETE",
      url: `/customers/${customerIdSelected}`,
      withCredentials: true
    }).then(() => {
      getAllCustomers();
      toast.success("Cliente excluído com sucesso", {
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
        <NavLink to="/clientes/cadastrar" className="btn btn-sm btn-primary shadow-none">
          <i className="fas fa-plus-circle mr-2"></i>
          NOVO
        </NavLink>
      </div>
      <div className="search-container mb-2">
        <form onChange={handleSubmit(onSubmit)}>
          <input
            {...register("value")}
            type="text"
            name="value"
            className="form-control form-control-sm input-search"
            placeholder="Pesqusiar"
          />
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
        <div className="text-center text-secondary">
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
                  <th>CPF</th>
                  <th>Data de nascimento</th>
                  <th>Email</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {page?.content.map((customer) => (
                  <tr key={customer.id} className="border-bottom">
                    <td>{customer.id}</td>
                    <td>{customer.firstName}</td>
                    <td>{customer.lastName}</td>
                    <td>{customer.cpf}</td>
                    <td>{customer.birthDate}</td>
                    <td>{customer.email}</td>
                    <td>
                      <NavLink to={`/customers/edit/${customer.id}`} className="btn btn-sm p-0 shadow-none text-info mr-4">
                        <i className="fas fa-pen"></i>
                      </NavLink>
                      <button className="btn btn-sm p-0 shadow-none text-danger" data-toggle="modal" data-target="#exampleModal"
                        onClick={() => { handlePrepareDeleteCustomer(customer.id) }}>
                        <i className="fas fa-trash-alt"></i>
                      </button>
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
          onChange={handlePageChange}
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
              <button type="button" className="btn btn-danger shadow-none" onClick={handleDeleteCustomer} data-dismiss="modal">
                Excluir
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CustomerList;