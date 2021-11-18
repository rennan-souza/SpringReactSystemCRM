import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
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
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
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
            className={`${errors.username ? "is-invalid" : ""}`}
            placeholder="Email"
            name="username"
          />
          <small className="text-danger">{errors.username?.message}</small>
        </div>

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
            className={`${errors.password ? "is-invalid" : ""}`}
            placeholder="Senha"
            name="password"
          />
          <small className="text-danger">{errors.password?.message}</small>
        </div>

        <button type="submit" className="btn btn-primary">Entrar</button>
      </form>

    </div>
  )
}

export default Signin;