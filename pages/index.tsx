import StaffLayout from './../components/Layouts/Staff'
import type { ReactElement } from 'react'
import {  useAuthState } from '../context/context';
import dynamic from 'next/dynamic'


const Index = () => {
  console.log(useAuthState())

  return (
		  <p>test</p>
	);
}

Index.getLayout = function getLayout(page: ReactElement) {
  const AuthProvider = dynamic(() => import('./../context/AuthProvider'), { ssr: false })

  return (
    <AuthProvider>
      <StaffLayout>
        {page}
      </StaffLayout>
    </AuthProvider>
  )
}

export default Index;