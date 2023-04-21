import React from 'react';
import * as C from './styles';


function Button({ Text, type='button', fColor='#fff', bgColor='#e8b23d', value, onClick }) {

  return (
    <C.Button
      type={type}
      value={value}
      onClick={onClick}
      fColor={fColor}
      bgColor={bgColor}
    >
      {Text}
    </C.Button>
  );

}


export default Button;
