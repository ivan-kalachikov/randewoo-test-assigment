import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { asyncActions, actions } from '../slices';
import { ReactComponent as Spinner } from '../images/spinner.svg';
import './Objects.scss';

const Objects = ({ objectsList, objectsError, objectsStatus }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (objectsList?.length === 0) {
      dispatch(asyncActions.getObjects());
    }
  }, [dispatch, asyncActions, objectsList]);

  const handleSelect = (e) => {
    const { value: id } = e.target;
    dispatch(actions.setCurrentObjectId({ id }));
  };

  return (
    <div className="objects">
      {objectsStatus === 'pending' && <Spinner className="spinner" role="status" />}
      <label className="objects__label" htmlFor="objectSelect">{t('ui.objectsLabel')}</label>
      <select
        onChange={handleSelect}
        className="objects__select"
        disabled={objectsStatus !== 'successful'}
        required
        id="objectSelect"
        defaultValue="placeholder"
        name="objectSelect"
      >
        <option value="placeholder" disabled hidden>{t('ui.objectsPlaceholder')}</option>
        {objectsList?.length > 0 && objectsList.map((object) => (
          <option key={object?.id} value={object?.id}>{object.name}</option>
        ))}
      </select>
      {objectsStatus === 'error' && objectsError && <div className="error" role="alert">{objectsError}</div>}
    </div>
  );
};

export default Objects;
