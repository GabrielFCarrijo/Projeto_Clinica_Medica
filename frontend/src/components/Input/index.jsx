import React from 'react';
import * as C from './styles';


function Input({ Text, type='text', placeholder, value, onChange, mask }) {

  return (

    <C.LabelInput>
      <C.TextSpan>{ Text }:</C.TextSpan>
      {
        /**
         * Essa mask é para adicionar uma mascara no campo
         * de input para quen aparece em um formato desejado
         * Ex:
         *    999.999.999-99 -> Para CPF
         *    (99) 999999-9999 -> Para telefone
         * - Lembrando que irá sair com a mascara, logo é preciso
         *   fazer uma formatação do valor caso não queria sair com
         *   a mascara
         */
        mask ?
        <C.MaskInput
          type='text'
          mask={mask}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        /> :
        <C.Input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />  
      }
    </C.LabelInput>

  );

}


export default Input;
