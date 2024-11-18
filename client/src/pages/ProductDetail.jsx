import {useParams} from 'react-router-dom'
const ProductDetail =()=>{
    const{id}=useParams();
    
return <>
productdetail {id} </>
}
export default ProductDetail