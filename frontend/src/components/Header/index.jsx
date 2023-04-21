import React from 'react';
import * as C from './styles';


function Header() {

  return (
    <C.Header>
      <C.LogoImg src='' />
      <C.Actions>
        <div>Notificação</div>
        <div>Logout</div>
      </C.Actions>
    </C.Header>
  );

}

export default Header;
