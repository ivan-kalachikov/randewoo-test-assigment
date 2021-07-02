import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { asyncActions, actions } from '../slices';
import { ReactComponent as Spinner } from '../images/spinner.svg';
import './Objects.scss';

const Objects = () => {
  const dispatch = useDispatch();
  const objectsList = useSelector((state) => state.objects.list);
  const objectsError = useSelector((state) => state.objects.error);
  const objectsStatus = useSelector((state) => state.objects.status);
  const { t } = useTranslation();

  useEffect(() => {
    if (objectsList.length === 0) {
      dispatch(asyncActions.getObjects());
    }
  }, [dispatch, asyncActions]);

  const handleSelect = (e) => {
    const { value: id } = e.target;
    dispatch(actions.setCurrentObjectId({ id }));
    dispatch(asyncActions.getMovements(id));
  };

  return (
    <div className="objects">
      {objectsStatus === 'pending' && <Spinner className="spinner" />}
      <label className="objects__label" htmlFor="objectSelect">{t('ui.objectsLabel')}</label>
      <select
        onChange={handleSelect}
        className="objects__select"
        disabled={objectsStatus === 'pending'}
        required
        id="objectSelect"
        defaultValue="placeholder"
        name="objectSelect"
      >
        <option value="placeholder" disabled hidden>{t('ui.objectsPlaceholder')}</option>
        {objectsList.map((object) => (
          <option key={object?.id} value={object?.id}>{object.name}</option>
        ))}
      </select>
      {objectsStatus === 'error' && objectsError && <div className="error">{objectsError}</div>}
    </div>
  );
};

export default Objects;
