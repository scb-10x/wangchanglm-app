import { Container } from '@chakra-ui/react'
import Navbar from './Navbar'

interface LayoutProps {
  children?: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <Container maxW="6xl" py={6}>
        {children}
      </Container>
    </div>
  )
}

export default Layout
