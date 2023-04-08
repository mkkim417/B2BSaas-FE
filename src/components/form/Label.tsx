import styled from 'styled-components';
import { LabelProps } from '../../libs/client/types/formType';

const Label = ({ value, errorMessage }: LabelProps) => {
  return (
    <Wrapper>
      <TitleLabel>{value}</TitleLabel>
      <ErrorMessage>{errorMessage}</ErrorMessage>
    </Wrapper>
  );
};

export default Label;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5px 0px;
  align-items: center;
`;

export const TitleLabel = styled.div`
  font-weight: 600;
  color: #909090;
`;

const ErrorMessage = styled.div`
  color: red;
  font-weight: normal;
  font-family: 'Inter';
  font-size: 0.9rem;
  text-align: right;
  width: 265px;
  line-height: 1.5;
`;
