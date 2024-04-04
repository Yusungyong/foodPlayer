import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();

    const pageReset = () => {
        navigate('/');
    }

    return (
        <div className='Header'>
            <p className='logo' onClick={pageReset}>FoodPlayer</p>
        </div>
    );
}

export default Header;
