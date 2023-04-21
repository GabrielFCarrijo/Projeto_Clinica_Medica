import React from 'react';
import * as C from './styles';

import Header from '../../components/Header';

function Home() {

  return (
    <C.HomeContainer>
      <Header />
      <C.HomeBody>
        Corpo
      </C.HomeBody>
      <C.Footer>
        <div>Inicio</div>
        <div>Onde</div>
        <div>Consulta</div>
      </C.Footer>
    </C.HomeContainer>
  );

}

export default Home;
