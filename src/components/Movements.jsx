import React, { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as Spinner } from '../images/spinner.svg';
import getFormattedDate from '../utilities';
import './Movements.scss';

const offsetFromBottomToEnableAutoscroll = 70;

const Movements = ({
  objectsList, currentObjectId, movementsList, movementsError, movementsStatus,
}) => {
  const tbodyRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (tbodyRef.current && tbodyRef.current.scrollHeight
       - (tbodyRef.current.scrollTop + tbodyRef.current.clientHeight)
       < offsetFromBottomToEnableAutoscroll) {
      tbodyRef.current.scrollTop = tbodyRef.current.scrollHeight;
    }
  }, [movementsList, tbodyRef]);

  const renderTable = () => (
    <div className="movements__table-wrapper">
      <table className="movements__table">
        <caption className="movements__caption">
          {t('ui.movements')}
          <b>
            {' '}
            {objectsList.find(({ id }) => id === Number(currentObjectId))?.name}
          </b>
        </caption>
        <thead>
          <tr>
            <th>{t('ui.dateTime')}</th>
            <th>{t('ui.latitude')}</th>
            <th>{t('ui.longitude')}</th>
          </tr>
        </thead>
        <tbody ref={tbodyRef}>
          {movementsList.map((item) => (
            <tr role="row" key={item.timestamp}>
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
      {movementsStatus === 'pending' && <Spinner className="spinner" role="status" />}
      {movementsList?.length > 0 && renderTable()}
      {movementsStatus === 'error' && movementsError && <div className="error" role="alert">{movementsError}</div>}
    </div>
  );
};

export default Movements;
