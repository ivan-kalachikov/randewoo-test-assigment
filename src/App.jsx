import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncActions } from './slices';
import './App.scss';
import Map from './components/Map';
import Objects from './components/Objects';
import Movements from './components/Movements';

const App = () => {
  const dispatch = useDispatch();
  const objectsList = useSelector((state) => state.objects.list);
  const objectsError = useSelector((state) => state.objects.error);
  const objectsStatus = useSelector((state) => state.objects.status);
  const objectsCurrentId = useSelector((state) => state.objects.currentId);
  const currentObjectId = useSelector((state) => state.objects.currentId);
  const movementsList = useSelector((state) => state.movements.list);
  const movementsError = useSelector((state) => state.movements.error);
  const movementsStatus = useSelector((state) => state.movements.status);

  useEffect(() => {
    if (objectsCurrentId) {
      dispatch(asyncActions.getMovements(objectsCurrentId));
    }
  }, [dispatch, objectsCurrentId]);

  return (
    <div className="container">
      <Objects
        objectsList={objectsList}
        objectsError={objectsError}
        objectsStatus={objectsStatus}
      />
      <Movements
        objectsList={objectsList}
        currentObjectId={currentObjectId}
        movementsList={movementsList}
        movementsError={movementsError}
        movementsStatus={movementsStatus}
      />
      <Map />
    </div>
  );
};

export default App;
