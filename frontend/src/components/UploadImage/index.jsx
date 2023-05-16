import React from 'react';
import * as C from './styles';


function UploadImage({ value, onChange }) {

  return (
    <C.Input
      type='file'
      value={ value }
      onChange={ onChange }
    />
  );

}


export default UploadImage;