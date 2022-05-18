import { Link } from "react-router-dom";

export default function ProductWidget(props) {
  return(
    <div className="card shadow-sm bg-white rounded" style={{ height: '100%' }}>
      <img className="card-img-top" src={props.metadata.image} alt={props.metadata.title} style={{ height: '350px', objectFit: 'cover', objectPosition: 'center' }} />
      <div className="card-body">
        <div className="row d-flex justify-content-between">
          <div className="col"><Link to={'/product/' + props.metadata.id.toString()} className="btn btn-primary">Detail</Link></div>
          <div className="col"><h5 className="font-weight-bold" style={{ textAlign: 'right!important' }}>MYR { props.metadata.price.toFixed(2) }</h5></div>
        </div>
        <p className="card-title mt-2">{ props.metadata.title }</p>
      </div>
    </div>
  )
};
