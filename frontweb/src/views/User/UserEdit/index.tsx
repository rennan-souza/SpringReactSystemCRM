import { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
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


  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<User>();

  const getAllRoles = () => {
    const params: AxiosRequestConfig = {
      method: "GET",
      url: "/roles",
      withCredentials: true
    };
    requestBackend(params).then((response) => {
      setRoles(response.data);
    });
  }

  const getUser = () => {
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
  }

  useEffect(() => {
    getAllRoles();
    getUser();
  }, [setValue])

  const onSubmit = (user: User) => {
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
      <div className="card form-card-base">

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="form-group col-md-6">
              <label>Nome:</label>
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

            <div className="form-group col-md-6">
              <label>Sobrenome:</label>
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

            <div className="form-group col-md-6">
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
                className={`form-control ${errors.email ? "input-invalid" : ""}`}
                name="email"
              />
              <small className="text-danger">{errors.email?.message}</small>
            </div>

            <div className="form-group col-md-6">
              <label htmlFor="roles">Selecione os perfis do usuário:</label>
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
                    inputId="roles"
                  />
                )}
              />
              {errors.roles && (
                <div className="invalid-feedback d-block">
                  Campo obrigatório
                </div>
              )}
            </div>
          </div>


          <div className="row">
            <div className="form-group col-md-12">
              <button className="btn btn-success shadow-none mr-1">
                <i className="fas fa-save mr-2"></i>
                SALVAR
              </button>
            </div>
          </div>

        </form>

      </div>
    </>
  )
}

export default UserEdit;