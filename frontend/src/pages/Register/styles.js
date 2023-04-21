import styled from 'styled-components';


export const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;

  text-align: center;
  align-items: center;

  padding: 3em;
`;

export const Title = styled.h2`
  margin-top: 2vh;
  margin-bottom: 6vh;

  color: #fff;
`;

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    
    align-items: center;

    width: 50%;
`;

export const ErrorLabel = styled.span`
  margin: 8px;

  color: red;

  font-size: large;
  font-weight: 500;
  font-style: italic;
`;
