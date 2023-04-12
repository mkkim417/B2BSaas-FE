import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import useDetectClose from '../hook/useDetectClose';
const SelectBoxs = ({
  width = '',
  placeholder = '',
  optionData = '',
  currentCategoryValue = '',
  propFunction = '',
  className = '',
}: any): React.ReactElement => {
  const [currentValue, setCurrentValue] = useState(null);
  const [isGroupId, setGroupId] = useState<string>();
  const selectInputRef = useRef(null);
  const dropDownRef = useRef();
  const [isOpen, setIsOpen] = useDetectClose(dropDownRef, false); //커스텀훅
  const handleOnChangeSelectValue = (e: any) => {
    const { innerText, value } = e.target;
    setCurrentValue(innerText);
    setGroupId(value);
  };
  // onChange setState비동기
  const ResetHandler = useCallback(() => {
    setCurrentValue(null);
  }, []);
  useEffect(() => {
    if (currentValue !== null) {
      propFunction(currentValue, className, isGroupId);
    }
  }, [currentValue, propFunction, isGroupId]);
  useEffect(() => {
    ResetHandler();
  }, [currentCategoryValue, ResetHandler]);
  return (
    <SelectBox
      width={width}
      ref={dropDownRef}
      onClick={() => setIsOpen((prev: any) => !prev)}
    >
      <Label ref={selectInputRef}>
        {currentValue === null ? placeholder : currentValue}
      </Label>
      {isOpen && (
        <SelectOptions>
          {optionData.map((data: any, index: any) => (
            <Option
              key={index}
              value={`${className[index]}`}
              onClick={handleOnChangeSelectValue}
            >
              {data}
            </Option>
          ))}
        </SelectOptions>
      )}
    </SelectBox>
  );
};
const SelectBox = styled.div<{ ref: any; width?: string }>`
  position: relative;
  height: 45px;
  width: ${(props) => (props.width ? props.width : '200px')};
  display: flex;
  align-items: center;
  color: #424242;
  padding: 9px 20px;
  border-radius: 8px;
  background-color: #ffffff;
  justify-content: space-between;
  align-self: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: 1px solid #ddd;
  cursor: pointer;
  &::after {
    content: '▼';
    /* position: absolute;
    top: 1px;
    right: 8px; */
    color: #000;
    color: #ddd;
    font-size: 14px;
  }
`;
const Label = styled.label`
  font-size: 14px;
  margin-left: 4px;
  text-align: left;
`;
const SelectOptions = styled.ul<{ ref?: any }>`
  z-index: 1;
  position: absolute;
  list-style: none;
  top: 50px;
  left: 0;
  width: 100%;
  overflow: hidden;
  height: auto;
  padding: 0;
  border-radius: 8px;
  background-color: #fff;
  border: 1px solid #bdbdbd;
  box-sizing: border-box;
  color: #000;
  max-height: none;
  box-shadow: 0px 4px 4px rgb(20, 183, 105, 0.25);
`;
const Option = styled.li`
  font-size: 14px;
  padding: 16px 18px;
  transition: background-color 0.2s ease-in;
  &:hover {
    background-color: #000;
    color: white;
    font-weight: bold;
  }
`;
export default React.memo(SelectBoxs);
