import React from 'react';
import * as C from './styles';


function Button({ Text, type='button', fColor='#fff', bgColor='#e8b23d', value, onChange }) {

  return (
    <C.Button
      type={type}
      value={value}
      onChange={onChange}
      fColor={fColor}
      bgColor={bgColor}
    >
      {Text}
    </C.Button>
  );

}


export default Button;
