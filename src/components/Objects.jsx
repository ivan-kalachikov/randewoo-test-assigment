import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncActions, actions } from '../slices';

const Objects = () => {
  const dispatch = useDispatch();
  const objectsList = useSelector((state) => state.objects.list);
  const objectsError = useSelector((state) => state.objects.error);
  const objectsStatus = useSelector((state) => state.objects.status);

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
      <label className="objects__label" htmlFor="objectSelect">Объект для отслеживания:</label>
      <select onChange={handleSelect} className="objects__select" required id="objectSelect" defaultValue="placeholder" name="objectSelect">
        <option value="placeholder" disabled hidden>Выберите объект для отслеживания</option>
        {objectsList.map((object) => (
          <option key={object?.id} value={object?.id}>{object.name}</option>
        ))}
      </select>
      {objectsStatus === 'error' && objectsError && <div className="error">{objectsError}</div>}
    </div>
  );
};

export default Objects;
