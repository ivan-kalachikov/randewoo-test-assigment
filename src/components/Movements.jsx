import React from 'react';
import { useSelector } from 'react-redux';
import { ReactComponent as Spinner } from '../images/spinner.svg';
import getFormattedDate from '../utilities';

const Movements = () => {
  const movementsList = useSelector((state) => state.movements.list);
  const movementsError = useSelector((state) => state.movements.error);
  const movementsStatus = useSelector((state) => state.movements.status);

  const renderTable = () => (
    <table className="movements__table">
      <caption className="movements__caption">Перемещения Объекта</caption>
      <thead>
        <tr>
          <th>Дата / Время</th>
          <th>Широта</th>
          <th>Долгота</th>
        </tr>
      </thead>
      <tbody>
        {movementsList.map((item) => (
          <tr key={item.timestamp}>
            <td>{getFormattedDate(item.timestamp)}</td>
            <td>{item?.coordinates?.latitude}</td>
            <td>{item?.coordinates?.longitude}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="movements">
      {movementsStatus === 'pending' && <Spinner />}
      {movementsList?.length > 0 && renderTable()}
      {movementsStatus === 'error' && movementsError && <div className="error">{movementsError}</div>}
    </div>
  );
};

export default Movements;
