import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { requestBackend } from "../../../utils/requests";

type UserPassForm = {
  password: string;
  newPassword: string;
  new_password_confirmation: string;
};

const ChangePassword = () => {

  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);


  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<UserPassForm>();


  const onSubmit = (userPassForm: UserPassForm) => {
    setLoading(true)
    requestBackend({
      method: 'PUT',
      url: '/profile/change-password',
      data: userPassForm,
      withCredentials: true,
    }).then(() => {
      setLoading(false)
      toast.success('Senha alterada com sucesso', {
        position: "bottom-right",
        theme: "colored",
      });
      history.push('/perfil');
    }).catch((errorResponse) => {
      setLoading(false)
      toast.error(errorResponse.response.data.error_description, {
        position: "bottom-right",
        theme: "colored",
      });
    });
  }

  return (
    <>
      <div className="mb-4 text-secondary">
        <h4>Nova senha</h4>
      </div>
      <div className="mb-2">
        <Link to="/perfil" className="btn btn-sm btn-primary shadow-none">
          <i className="fas fa-arrow-alt-circle-left mr-2"></i>
          VOLTAR
        </Link>
      </div>

      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label>Nova senha: </label>
              <input
                {...register("newPassword", {
                  required: "Campo obrigatório",
                  minLength: {
                    value: 6,
                    message: "A senha deve conter no mínimo 6 caracteres",
                  },
                })}
                type="password"
                className={`form-control ${errors.newPassword ? "input-invalid" : ""}`}

                name="newPassword"
              />
              <small className="text-danger">
                {errors.newPassword?.message}
              </small>
            </div>

            <div className="form-group">
              <label>Confirme a nova senha:</label>
              <input
                {...register("new_password_confirmation", {
                  required: "Campo obrigatório",
                  validate: (value) =>
                    value === watch("newPassword") ||
                    "A confirmação da senha não coincide",
                })}
                type="password"
                className={`form-control ${errors.new_password_confirmation ? "input-invalid" : ""}`}
                name="new_password_confirmation"
              />
              <small className="text-danger">
                {errors.new_password_confirmation?.message}
              </small>
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

export default ChangePassword;