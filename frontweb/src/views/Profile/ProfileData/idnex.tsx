import { AxiosRequestConfig } from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../../AuthContext";
import { getTokenData, requestBackend, requestBackendLogin, saveAuthData } from "../../../utils/requests";


type UserProfile = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}


const ProfileData = () => {

  const { setAuthContextData } = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UserProfile>();

  const showProfile = useCallback(() => {
    const params: AxiosRequestConfig = {
      method: "GET",
      url: '/profile/',
      withCredentials: true,
    };
    requestBackend(params).then((response) => {
      const user = response.data as UserProfile;
      setValue('firstName', user.firstName)
      setValue('lastName', user.lastName)
      setValue('email', user.email)
      setValue("password", "");
    });
  }, [setValue])

  useEffect(() => {
    showProfile();
  }, [showProfile])

  const onSubmit = (userProfile: UserProfile) => {
    setLoading(true)
    requestBackend({
      method: 'PUT',
      url: '/profile',
      data: userProfile,
      withCredentials: true,
    }).then(() => {
      const reauthenticateUserData = {
        username: userProfile.email,
        password: userProfile.password
      }
      requestBackendLogin(reauthenticateUserData).then((response) => {
        saveAuthData(response.data);
        setAuthContextData({
          autheticated: true,
          tokenData: getTokenData(),
        })
      })
      setLoading(false)
      showProfile()
      toast.success('Dados salvo sucesso', {
        position: "bottom-right",
        theme: "colored",
      });
    }).catch((errorResponse) => {
      setLoading(false)
      showProfile()
      toast.error(errorResponse.response.data.error_description, {
        position: "bottom-right",
        theme: "colored",
      });
    });
  }

  return (
    <>
      <div className="mb-4 text-secondary">
        <h4>Meus dados</h4>
      </div>
      <div className="mb-2">
        <Link to="/perfil/mudar-senha" className="btn btn-sm btn-primary shadow-none">
          <i className="fas fa-lock mr-2"></i>
          ALTERAR SENHA
        </Link>
      </div>

      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>

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
                className={`form-control ${errors.email ? "input-invalid" : ""}`}
                name="email"
                readOnly
              />
              <small className="text-danger">{errors.email?.message}</small>
            </div>

            <div className="form-group">
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

            <div className="form-group">
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

            <div className="form-group">
              <label>Senha atual para salvar as alterações:</label>
              <input
                {...register("password", {
                  required: "Campo obrigatório",
                })}
                type="password"
                className={`form-control ${errors.password ? "input-invalid" : ""}`}
                name="password"
              />
              <small className="text-danger">{errors.password?.message}</small>
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

export default ProfileData;