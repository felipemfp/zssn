import React from 'react'
import { Segment } from 'semantic-ui-react'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #f5f5f5;
`

export const Panel = styled(Segment)`
  padding: 2rem !important;

  @media (min-width: 720px) {
    min-width: 30rem;
  }
`

export const Footer = styled.section`
  margin-top: 1.5rem;
  display: flex;
  justify-content: space-between;
`

export const PublicLayout = ({children}) => {
  return (
    <Container>
      <Panel>
        {children}
      </Panel>
    </Container>
  )
}

PublicLayout.Container = Container
PublicLayout.Panel = Panel
PublicLayout.Footer = Footer

export default PublicLayout
