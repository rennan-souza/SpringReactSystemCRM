import { AxiosRequestConfig } from "axios";
import { useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Pagination from "../../../components/Pagination";
import { ProductResponse, SpringPage } from "../../../types";
import { requestBackend } from "../../../utils/requests";
import { toast } from "react-toastify";

type ControlComponentsData = {
  activePage: number;
};

const ProductList = () => {


  const [page, setPage] = useState<SpringPage<ProductResponse>>();
  const [load, setLoad] = useState<boolean>(false);
  const [productIdSelected, setProductIdSelected] = useState<number>();

  const handlePageChange = (pageNumber: number) => {
    setControlComponentsData({ activePage: pageNumber });
  };

  const [controlComponentsData, setControlComponentsData] = useState<ControlComponentsData>({
    activePage: 0,
  });

  const getAllProducts = useCallback(() => {
    setLoad(true);
    const params: AxiosRequestConfig = {
      method: "GET",
      url: "/products",
      params: {
        page: controlComponentsData.activePage,
        size: 5,
        sort: "id,desc",
      },
      withCredentials: true
    };

    requestBackend(params).then((response) => {
      setPage(response.data);
    }).finally(() => {
      setLoad(false);
    });
  }, [controlComponentsData])


  const handlePrepareDeleteProduct = (productId: number) => {
    setProductIdSelected(productId);
  }

  const handleDeleteProduct = () => {
    requestBackend({
      method: "DELETE",
      url: `/products/${productIdSelected}`,
      withCredentials: true
    }).then(() => {
      getAllProducts()
      toast.success("Produto excluído com sucesso", {
        position: "bottom-right",
        theme: "colored"
      });
    });
  };

  useEffect(() => {
    getAllProducts()
  }, [getAllProducts]);

  return (
    <>
      <div className="mb-4 text-secondary">
        <h4>Produtos</h4>
      </div>
      <div className="mb-2">
        <NavLink to="/produtos/cadastrar" className="btn btn-sm btn-primary shadow-none">
          <i className="fas fa-plus-circle mr-2"></i>
          NOVO
        </NavLink>
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
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-borderless table-hover mb-0">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Foto</th>
                    <th>Nome</th>
                    <th>Preço</th>
                    <th>Categoria</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {page?.content.map((product) => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>
                        <img src={product.imgBase64} alt={product.name} width={50} />
                      </td>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td><span className="badge border border-primary"> {product.category.name}</span></td>

                      <td>

                        <>
                          <NavLink to={`/produtos/editar/${product.id}`} className="btn btn-sm p-0 mr-3 shadow-none text-info">
                            <i className="fas fa-pen"></i>
                          </NavLink>
                          <button className="btn btn-sm p-0 shadow-none text-danger"
                            data-toggle="modal" data-target="#exampleModal"
                            onClick={() => { handlePrepareDeleteProduct(product.id) }}
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </>

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      <div className="pagination-container">
        <Pagination
          forcePage={page?.number}
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
              <button type="button" className="btn btn-danger shadow-none" onClick={handleDeleteProduct} data-dismiss="modal">
                Excluir
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductList;