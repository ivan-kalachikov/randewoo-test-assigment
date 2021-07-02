import React from 'react';
import Map from './Map';
import Objects from './Objects';
import Movements from './Movements';

const Main = () => (
  <div className="container">
    <Objects />
    <Movements />
    <Map />
  </div>
);

export default Main;
