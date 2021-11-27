import "../../Auth/styles.css";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { requestBackend } from "../../../utils/requests";


type FormRecoverPassword = {
  email: string;
}

const Recover = () => {

  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormRecoverPassword>();

  const onSubmit = (data: FormRecoverPassword) => {
    setLoading(true);
    requestBackend({
      method: 'POST',
      url: '/users/recovery',
      data: data,
      withCredentials: false,
    }).then(() => {
      setLoading(false)
      history.push({
        pathname: "/criar-nova-senha",
        state: data.email
      });
    })
    
  };

  return (
    <div className="auth-container border shadow-sm">
      <div className="auth-logo text-center border-bottom">
        <h2>System CRM</h2>
      </div>
      <div className="auth-title text-center text-secondary">
        <h4>Recuperar acesso</h4>
        <p>Insira seu email do cadastro, que vamos lhe enviar um código para você criar a nova senha.</p>
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
            />
            <small className="text-danger">{errors.email?.message}</small>
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

export default Recover;