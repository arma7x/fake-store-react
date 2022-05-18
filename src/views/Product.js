import { useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { setLoading, pushProductsRegistry } from '../store/database'
import { FakeStore } from '../api'

export default function Product() {

  let params = useParams();
  const product = useSelector((state) => state.database.productsRegistry[params.id])
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (product == null) {
      dispatch(setLoading(true))
      FakeStore.getProduct(params.id)
      .then((product) => {
        dispatch(pushProductsRegistry(product))
        document.title = product.title
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        dispatch(setLoading(false))
      })
    } else {
      document.title = product.title
    }
  },[]);
  
  return (
    <div>
      { 
        product != null && 
        <div className="container">
          <button className="btn btn-sm btn-primary mb-2" onClick={() => navigate(-1)}>Return</button>
          <div className="row">
            <div className="col col-12 col-md-5 p-2">
              <img className="img-fluid" src={product.image} alt={product.title}/>
            </div>
            <div className="col col-12 col-md-7">
              <h5>#{ product.id }</h5>
              <h1 className="mb-2">{ product.title }</h1>
              <h5 className="mb-3">{ product.description }</h5>
              <h5 className="mb-3">Category: <span className="text-uppercase">{ product.category }</span></h5>
              <h3 className="price-tag">MYR { product.price.toFixed(2) }</h3>
            </div>
          </div>
        </div> 
      }
    </div>
  );
}
