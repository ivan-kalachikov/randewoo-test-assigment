import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ReactComponent as Spinner } from '../images/spinner.svg';
import getFormattedDate from '../utilities';
import './Movements.scss';

const Movements = () => {
  const objectsList = useSelector((state) => state.objects.list);
  const currentObjectId = useSelector((state) => state.objects.currentId);
  const movementsList = useSelector((state) => state.movements.list);
  const movementsError = useSelector((state) => state.movements.error);
  const movementsStatus = useSelector((state) => state.movements.status);
  const tbodyRef = useRef(null);

  useEffect(() => {
    if (tbodyRef.current && tbodyRef.current.scrollHeight
       - (tbodyRef.current.scrollTop + tbodyRef.current.clientHeight) < 70) {
      tbodyRef.current.scrollTop = tbodyRef.current.scrollHeight;
    }
  }, [movementsList]);

  const renderTable = () => (
    <div className="movements__table-wrapper">
      <table className="movements__table">
        <caption className="movements__caption">
          Перемещения
          <b>
            {' '}
            {objectsList.find(({ id }) => id === Number(currentObjectId))?.name}
          </b>
        </caption>
        <thead>
          <tr>
            <th>Дата / Время</th>
            <th>Широта</th>
            <th>Долгота</th>
          </tr>
        </thead>
        <tbody ref={tbodyRef}>
          {movementsList.map((item) => (
            <tr key={item.timestamp}>
              <td>{getFormattedDate(item.timestamp)}</td>
              <td>{item?.coordinates?.latitude}</td>
              <td>{item?.coordinates?.longitude}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="movements">
      {movementsStatus === 'pending' && <Spinner className="spinner" />}
      {movementsList?.length > 0 && renderTable()}
      {movementsStatus === 'error' && movementsError && <div className="error">{movementsError}</div>}
    </div>
  );
};

export default Movements;
