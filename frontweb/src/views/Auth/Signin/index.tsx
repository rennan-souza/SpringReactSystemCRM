import "../../Auth/styles.css";

import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../../AuthContext";
import { UserFormLogin } from "../../../types";
import { getTokenData, requestBackendLogin, saveAuthData } from "../../../utils/requests";
import { toast } from "react-toastify";


const Signin = () => {

  const history = useHistory();
  const { setAuthContextData } = useContext(AuthContext);

  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormLogin>();

  const onSubmit = (userFormLogin: UserFormLogin) => {

    setLoading(true);

    requestBackendLogin(userFormLogin)
      .then((response) => {
        saveAuthData(response.data);
        setAuthContextData({
          autheticated: true,
          tokenData: getTokenData(),
        });
        history.push("/dashboard");
      })
      .catch(() => {
        setLoading(false);
        toast.error("Email e ou senha inválidos", {
          position: "bottom-right",
          theme: 'colored'
        });
      }).finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className="auth-header bg-warning">
        <h1>System CRM</h1>
      </div>
      <div className="auth-container border">
        <div className="auth-title-container">
          <h3 className="text-secondary">LOGIN</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <div className="form-group">
                <input
                  {...register("username", {
                    required: "Campo obrigatório",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Email inválido",
                    },
                  })}
                  type="text"
                  className={`form-control ${errors.username ? "is-invalid" : ""}`}
                  name="username"
                  placeholder="Email"
                />
                <small className="text-danger">{errors.username?.message}</small>
              </div>
            </div>
            <div className="form-group">
              <div className="form-group">
                <input
                  {...register("password", {
                    required: "Campo obrigatório",
                    minLength: {
                      value: 6,
                      message: "A senha deve conter no mínimo 6 caracteres",
                    },
                  })}
                  type="password"
                  className={`form-control ${errors.password ? "is-invalid" : ""}`}
                  name="password"
                  placeholder="Senha"
                />
                <small className="text-danger">{errors.password?.message}</small>
              </div>
            </div>

            <div className="mb-4">
              {loading ? (
                <button className="btn btn-success btn-block shadow-none" type="button" disabled>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  CARREGANDO...
                </button>
              ) : (
                <button className="btn btn-success btn-block shadow-none">
                  ENTRAR
                </button>
              )}
            </div>
          </form>
          <Link to="#link">Esqueci minha senha</Link>
        </div>
      </div>
    </>
  )
}

export default Signin;