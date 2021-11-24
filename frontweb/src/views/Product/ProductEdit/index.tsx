import { AxiosRequestConfig } from "axios";
import { useCallback, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Product, ProductCategory, ProductResponse } from "../../../types";
import { requestBackend } from "../../../utils/requests";
import { toast } from "react-toastify";
import { Controller, useForm } from "react-hook-form";
import Select from 'react-select';

type UrlParams = {
  productId: string;
};

const ProductEdit = () => {

  const history = useHistory();
  const { productId } = useParams<UrlParams>();
  const [categories, setCategories] = useState<ProductCategory[]>();
  const [img, setImg] = useState<any>();
  const [imgBase64, setImgBase64] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);


  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<Product>();

  const getAllCategories = useCallback(() => {
    const params: AxiosRequestConfig = {
      method: "GET",
      url: "/categories",
      withCredentials: true
    };
    requestBackend(params).then((response) => {
      setCategories(response.data);
    });
  }, [])

  const handlePreviewImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImg(event.target.files[0])
    }
  };

  const getProduct = useCallback(() => {
    const params: AxiosRequestConfig = {
      method: "GET",
      url: `/products/${productId}`,
      withCredentials: true,
    };
    requestBackend(params).then((response) => {
      const product = response.data as ProductResponse;
      setValue('name', product.name)
      setValue('description', product.description)
      setValue('price', product.price)
      setValue('category', product.category)
      setImgBase64(product.imgBase64)
    });
  }, [setValue, productId])
  

  const onSubmit = (product: Product) => {
    setLoading(true)
    const imgExtension: string[] = ["image/png", "image/jpg", "image/jpeg"];

    if (product.file[0] && !imgExtension.includes(product.file[0].type)) {
      alert("A imagem deve ser do tipo: png, jpg, jpeg")
      setLoading(false)
    } else {

      const formData = new FormData();
     
      formData.append('file', product.file[0]);
      formData.append('name', product.name);
      formData.append('description', product.description);
      formData.append('price', product.price as any);
      formData.append('category', product.category.id as any);

      requestBackend({
        method: "PUT",
        url: `/products/${productId}`,
        withCredentials: true,
        data: formData
      }).then((response) => {
        toast.success('Produto salvo com sucesso', {
          position: "bottom-right",
          theme: "colored",
        });
        history.push('/produtos');
      }).catch((errorResponse) => {
        setLoading(false)
      })
    }
  }

  useEffect(() => {
    getAllCategories();
    getProduct()
  }, [getProduct, getAllCategories])

  return (
    <>
      <div className="mb-4 text-secondary">
        <h4>Editar produto</h4>
      </div>
      <div className="mb-2">
        <Link to="/produtos" className="btn btn-sm btn-primary shadow-none">
          <i className="fas fa-arrow-alt-circle-left mr-2"></i>
          VOLTAR
        </Link>
      </div>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <div className="mb-2">
                {img ? (
                  <img src={URL.createObjectURL(img)} alt="Product" width={200} />
                ) : imgBase64 ? (
                  <img src={imgBase64} alt="Product" width={200} />
                ) : ''}
              </div>
              <label>Selecione a imagem do produto: <span className="text-danger">*</span></label>
              <input
                {...register("file")}
                type="file"
                className="form-control-file"
                name="file"
                onChange={handlePreviewImg}
              />
              <small className="text-danger">{errors.file?.message}</small>
            </div>
            <div className="form-group">
              <label>Nome do produto: <span className="text-danger">*</span> </label>
              <input
                {...register("name", {
                  required: "Campo obrigatório",
                })}
                type="text"
                className={`form-control ${errors.name ? "input-invalid" : ""}`}
                name="name"
              />
              <small className="text-danger">{errors.name?.message}</small>
            </div>
            <div className="form-group">
              <label>Descrição: <span className="text-danger">*</span> </label>
              <textarea
                {...register("description", {
                  required: "Campo obrigatório"
                })}
                rows={3}
                className={`form-control ${errors.description ? "input-invalid" : ""}`}
                name="description"
              >
              </textarea>
              <small className="text-danger">{errors.description?.message}</small>
            </div>
            <div className="form-group">
              <label>Preço: <span className="text-danger">*</span> </label>
              <input
                {...register("price", {
                  required: "Campo obrigatório"
                })}
                type="text"
                className={`form-control ${errors.price ? "input-invalid" : ""}`}
                name="price"
              />
              <small className="text-danger">{errors.price?.message}</small>
            </div>
            <div className="form-group">
              <label>Categoria: <span className="text-danger">*</span> </label>
              <Controller
                name="category"
                rules={{ required: true }}
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={categories}
                    placeholder=""
                    classNamePrefix={`${errors.category ? "input-select-invalid" : "input-select"}`}
                    getOptionLabel={(category: ProductCategory) => String(category.name)}
                    getOptionValue={(category: ProductCategory) => String(category.id)}
                    inputId="category"
                  />
                )}
              />
              {errors.category && (
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

export default ProductEdit;