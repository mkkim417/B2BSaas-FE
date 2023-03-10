import React from 'react'
import styled from 'styled-components'

type Props = {
  title?: string | React.ReactNode
  contents?: string | React.ReactNode
}

function Accordion(props: Props) {
  const parentRef = React.useRef<HTMLDivElement>(null)
  const childRef = React.useRef<HTMLDivElement>(null)
  const [isCollapse, setIsCollapse] = React.useState(false)

  const handleButtonClick = React.useCallback(
    (event: any) => {
      event.stopPropagation()
      if (parentRef.current === null || childRef.current === null) {
        return
      }
      if (parentRef.current.clientHeight > 0) {
        parentRef.current.style.height = '0'
      } else {
        parentRef.current.style.height = `${childRef.current.clientHeight}px`
      }
      setIsCollapse(!isCollapse)
    },
    [isCollapse]
  )
  return (
    <Container>
      <Header onClick={handleButtonClick}>{props.title}</Header>
      <ContentsWrapper ref={parentRef}>
        <Contents ref={childRef}>{props.contents}</Contents>
      </ContentsWrapper>
    </Container>
  )
}
const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  border-radius: 4px;
  color: white;
`

const Header = styled.div`
  display: flex;
  align-items: center;

  height: 32px;
  margin: 0 32px 0 8px;
`

const ContentsWrapper = styled.div`
  height: 0;
  width: 100%;
  overflow: hidden;
  transition: height 0.35s ease;
`

const Contents = styled.div``
export default Accordion
