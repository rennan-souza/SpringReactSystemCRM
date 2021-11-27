import "../../Auth/styles.css";

import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { getTokenData, requestBackend, requestBackendLogin, saveAuthData } from "../../../utils/requests";
import { toast } from "react-toastify";
import { AuthContext } from "../../../AuthContext";


type FormResetPassword = {
  email: string;
  password: string;
  code: string;
}

const Reset = () => {

  const history = useHistory();

  const { setAuthContextData } = useContext(AuthContext);

  const [historyLocationState, setHistoryLocationState] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormResetPassword>();

  const onSubmit = (data: FormResetPassword) => {
    setLoading(true);
    requestBackend({
      method: 'POST',
      url: '/users/reset',
      data: data,
      withCredentials: false,
    }).then(() => {
    

      const reauthenticateUserData = {
        username: data.email,
        password: data.password
      }
      requestBackendLogin(reauthenticateUserData)
      .then((response) => {
        saveAuthData(response.data);
        setAuthContextData({
          autheticated: true,
          tokenData: getTokenData(),
        });
        history.push("/dashboard");
      })
      setLoading(false)

    }).catch((errorResponse) => {
      setLoading(false)
      toast.error(errorResponse.response.data.message, {
        position: "bottom-right",
        theme: 'colored'
      });
    })
  };

  setValue("email", historyLocationState)

  useEffect(() => {

    if (history.location.state !== undefined) {
      setHistoryLocationState(history.location.state)
    } else {
      history.push("/login")
    }

  }, [historyLocationState, history])

  return (
    <div className="auth-container border shadow-sm">
      <div className="auth-logo text-center border-bottom">
        <h2>System CRM</h2>
      </div>

      <div className="auth-title text-center text-secondary">
        <h4>Criar nova senha</h4>
      </div>

      <div className="alert alert-success alert-dismissible fade show" role="alert">
        <small> Se o email informado estiver correto, em poucos minutos você receberá o código para criar a nova senha.</small>
        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <div className="form-group">
            <input
              {...register("email", {
                required: "Campo obrigatório",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email inválido",
                },
              })}
              type="text"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              name="email"
              placeholder="Email"
              readOnly
            />
            <small className="text-danger">{errors.email?.message}</small>
          </div>
        </div>

        <div className="form-group">
          <div className="form-group">
            <input
              {...register("password", {
                required: "Campo obrigatório",
                minLength: {
                  value: 6,
                  message: "A nova senha deve ter no mínimo 6 caracteres"
                }
              })}
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              name="password"
              placeholder="Nova senha"
            />
            <small className="text-danger">{errors.password?.message}</small>
          </div>
        </div>

        <div className="form-group">
          <div className="form-group">
            <input
              {...register("code")}
              type="text"
              className={`form-control ${errors.code ? "is-invalid" : ""}`}
              name="code"
              placeholder="Insira o código recebido no email"
            />
            <small className="text-danger">{errors.code?.message}</small>
          </div>
        </div>

        <div className="mb-2">
          {loading ? (
            <button className="btn btn-primary btn-block shadow-none" type="button" disabled>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              CARREGANDO...
            </button>
          ) : (
            <button className="btn btn-primary btn-block shadow-none">
              ENVIAR
            </button>
          )}
        </div>
      </form>
      <Link to="/login">Login</Link>
    </div>
  )
}

export default Reset;