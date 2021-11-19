import { AxiosRequestConfig } from "axios";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Customer } from "../../../types";
import { requestBackend } from "../../../utils/requests";

type UrlParams = {
  customerId: string;
};

const CustomerEdit = () => {

  const history = useHistory();
  const { customerId } = useParams<UrlParams>();
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Customer>();

  const getCustomer = useCallback(() => {
    const params: AxiosRequestConfig = {
      method: "GET",
      url: `/customers/${customerId}`,
      withCredentials: true,
    };
    requestBackend(params).then((response) => {
      const customer = response.data as Customer;
      setValue('firstName', customer.firstName)
      setValue('lastName', customer.lastName)
      setValue('cpf', customer.cpf)
      setValue('birthDate', customer.birthDate)
      setValue('email', customer.email)
    });
  }, [setValue, customerId]);


  useEffect(() => {
    getCustomer();
  }, [getCustomer, loading])

  const onSubmit = (customer: Customer) => {
    setLoading(true)
    requestBackend({
      method: 'PUT',
      url: `/customers/${customerId}`,
      data: customer,
      withCredentials: true,
    }).then(() => {
      toast.success('Cliente salvo com sucesso', {
        position: "bottom-right",
        theme: "colored",
      });
      history.push('/clientes');
    }).catch((errorResponse) => {
      setLoading(false)
      toast.error(errorResponse.response.data.message, {
        position: "bottom-right",
        theme: "colored",
      });
    });
  }

  return (
    <>
      <div className="mb-4 text-secondary">
        <h4>Editar cliente</h4>
      </div>
      <div className="mb-2">
        <Link to="/clientes" className="btn btn-sm btn-primary shadow-none">
          <i className="fas fa-arrow-alt-circle-left mr-2"></i>
          VOLTAR
        </Link>
      </div>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
           
            <div className="form-group">
              <label>Nome:</label>
              <input
                {...register("firstName", {
                  required: "Campo obrigatório",
                })}
                type="text"
                className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                name="firstName"
              />
              <small className="text-danger">{errors.firstName?.message}</small>
            </div>

            <div className="form-group">
              <label>Sobrenome:</label>
              <input
                {...register("lastName", {
                  required: "Campo obrigatório",
                })}
                type="text"
                className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                name="lastName"
              />
              <small className="text-danger">{errors.lastName?.message}</small>
            </div>

            <div className="form-group">
              <label>CPF:</label>
              <input
                {...register("cpf", {
                  required: "Campo obrigatório",
                })}
                type="text"
                className={`form-control ${errors.cpf ? "is-invalid" : ""}`}
                name="cpf"
              />
              <small className="text-danger">{errors.cpf?.message}</small>
            </div>

            <div className="form-group">
              <label>Data de nascimento:</label>
              <input
                {...register("birthDate", {
                  required: "Campo obrigatório",
                })}
                type="date"
                className={`form-control ${errors.birthDate ? "is-invalid" : ""}`}
                name="birthDate"
              />
              <small className="text-danger">{errors.birthDate?.message}</small>
            </div>
          
            <div className="form-group">
              <label>Email:</label>
              <input
                {...register("email", {
                  required: "Campo obrigatório",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Email inválido',
                  },
                })}
                type="text"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                name="email"
              />
              <small className="text-danger">{errors.email?.message}</small>
            </div>
      
            {loading ? (
              <button className="btn btn-success shadow-none" type="button" disabled>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                CARREGANDO...
              </button>
            ) : (
              <button className="btn btn-success shadow-none">
                <i className="fas fa-save mr-2"></i>
                SALVAR
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  )
}

export default CustomerEdit;