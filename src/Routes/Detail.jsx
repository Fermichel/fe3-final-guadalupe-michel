import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { ContextGlobal } from '../Components/utils/global.context';
import { BsArrowLeft } from 'react-icons/bs';

const Detail = () => {
  const { dentistsState, dentistsDispatch } = useContext(ContextGlobal);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchDentistData = () => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        dentistsDispatch({ type: 'GET_DENTIST', payload: data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchDentistData();
  }, [id]);

  const { name, email, phone, website } = dentistsState.dentist;

  return (
    <>
      <button className='back-btn' onClick={() => navigate(-1)}>
        <BsArrowLeft />
      </button>
      <h1 className='detail-heading'>Detalle del Dentista</h1>

      <div className='card-grid'>
        <div className='card' style={{ width: '260px', gap: '8px' }}>
          <img src='../images/doctor.jpg' alt='doctor' />
          <h3 style={{ margin: '0' }}>{name}</h3>
          <strong>
            <p>ID: {id}</p>
          </strong>
          <p>{email}</p>
          <p>{phone}</p>
          <p>{website}</p>
        </div>
      </div>
    </>
  );
};

export default Detail;

