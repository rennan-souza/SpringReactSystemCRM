import { AxiosRequestConfig } from "axios";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useHistory, useParams } from "react-router-dom";
import Select from 'react-select';
import { toast } from "react-toastify";
import { Roles, User } from "../../../types";
import { formatRole } from "../../../utils/formatter";
import { requestBackend } from "../../../utils/requests";


type UrlParams = {
  userId: string;
};

const UserEdit = () => {

  const history = useHistory();
  const { userId } = useParams<UrlParams>();
  const [roles, setRoles] = useState<Roles[]>();
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<User>();

  const getAllRoles = useCallback(() => {
    const params: AxiosRequestConfig = {
      method: "GET",
      url: "/roles",
      withCredentials: true
    };
    requestBackend(params).then((response) => {
      setRoles(response.data);
    });
  }, [])

  const getUser = useCallback(() => {
    const params: AxiosRequestConfig = {
      method: "GET",
      url: `/users/${userId}`,
      withCredentials: true,
    };
    requestBackend(params).then((response) => {
      const user = response.data as User;
      setValue('firstName', user.firstName)
      setValue('lastName', user.lastName)
      setValue('email', user.email)
      setValue('roles', user.roles)
    });
  }, [userId, setValue])

  useEffect(() => {
    getAllRoles();
    getUser();
  }, [getUser, getAllRoles])

  const onSubmit = (user: User) => {
    setLoading(true)
    requestBackend({
      method: 'PUT',
      url: `/users/${userId}`,
      data: user,
      withCredentials: true,
    }).then(() => {
      toast.success('Usuario salvo com sucesso', {
        position: "bottom-right",
        theme: "colored",
      });
      history.push('/usuarios');
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
        <h4>Editar usuário</h4>
      </div>
      <div className="mb-2">
        <Link to="/usuarios" className="btn btn-sm btn-primary shadow-none">
          <i className="fas fa-arrow-alt-circle-left mr-2"></i>
          VOLTAR
        </Link>
      </div>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label>Nome: <span className="text-danger">*</span></label>
              <input
                {...register("firstName", {
                  required: "Campo obrigatório",
                })}
                type="text"
                className={`form-control ${errors.firstName ? "input-invalid" : ""}`}
                name="firstName"
              />
              <small className="text-danger">{errors.firstName?.message}</small>
            </div>

            <div className="form-group">
              <label>Sobrenome: <span className="text-danger">*</span></label>
              <input
                {...register("lastName", {
                  required: "Campo obrigatório",
                })}
                type="text"
                className={`form-control ${errors.lastName ? "input-invalid" : ""}`}
                name="lastName"
              />
              <small className="text-danger">{errors.lastName?.message}</small>
            </div>

            <div className="form-group">
              <label>Email: <span className="text-danger">*</span></label>
              <input
                {...register("email", {
                  required: "Campo obrigatório",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Email inválido',
                  },
                })}
                type="text"
                className={`form-control ${errors.email ? "input-invalid" : ""}`}
                name="email"
              />
              <small className="text-danger">{errors.email?.message}</small>
            </div>

            <div className="form-group">
              <label>Selecione os perfis do usuário: <span className="text-danger">*</span></label>
              <Controller
                name="roles"
                rules={{ required: true }}
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={roles}
                    placeholder=""
                    classNamePrefix={`${errors.roles ? "input-select-invalid" : "input-select"}`}
                    isMulti
                    getOptionLabel={(role: Roles) => String(formatRole(role.authority))}
                    getOptionValue={(role: Roles) => String(role.id)}
                  />
                )}
              />
              {errors.roles && (
                <div className="invalid-feedback d-block">
                  Campo obrigatório
                </div>
              )}
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

export default UserEdit;