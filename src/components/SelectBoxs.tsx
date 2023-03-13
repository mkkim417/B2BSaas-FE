import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import useDetectClose from '../hook/useDetectClose'

interface Itodolist {
  optionData: any
  placeholder: any
}
const SelectBoxs = ({ optionData, placeholder }: any): React.ReactElement => {
  const [currentValue, setCurrentValue] = useState(null)

  const dropDownRef = useRef()
  const [isOpen, setIsOpen] = useDetectClose(dropDownRef, false) //커스텀훅

  const handleOnChangeSelectValue = (e: any) => {
    const { innerText } = e.target
    setCurrentValue(innerText)
  }
  // console.log('optionData :', optionData)
  return (
    <SelectBox
      ref={dropDownRef}
      onClick={() => setIsOpen((prev: any) => !prev)}
    >
      <Label>{currentValue === null ? placeholder : currentValue}</Label>
      {isOpen && (
        <SelectOptions>
          {optionData.map((data: any, index: any) => (
            <Option
              key={index}
              value={data}
              onClick={handleOnChangeSelectValue}
            >
              {data}
            </Option>
          ))}
        </SelectOptions>
      )}
    </SelectBox>
  )
}
const SelectBox = styled.div<{ ref: any }>`
  margin-bottom: 30px;
  position: relative;
  height: 40px;
  width: 200px;
  display: flex;
  align-items: center;
  color: #424242;
  padding: 8px 28px;
  border-radius: 3px;
  background-color: #ffffff;
  justify-content: space-between;
  align-self: center;
  /* box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); */
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
`
const Label = styled.label`
  font-size: 14px;
  margin-left: 4px;
  text-align: left;
`
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
  border: 1px solid #ddd;
  box-sizing: border-box;
  color: #000;
  max-height: none;
`
const Option = styled.li`
  font-size: 14px;
  padding: 16px 18px;
  transition: background-color 0.2s ease-in;
  &:hover {
    background-color: #ddd;
  }
`

export default SelectBoxs
