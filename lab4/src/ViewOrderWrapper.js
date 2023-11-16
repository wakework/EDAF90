import { useNavigate } from 'react-router-dom';
import ViewOrder from './ViewOrder';

function ViewOrderWrapper(props) {
    const navigate = useNavigate();
    return (
        <ViewOrder navigate={navigate} {...props} />
    );
}
export default ViewOrderWrapper;