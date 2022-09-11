import React from 'react'
import ContractPortal from '../components/ContractPortal'
import fake from '../data/fake.json'
function componentTester() {
  return (
    <>
        <ContractPortal mainJSON={
                fake
        }/>
    </>
  )
}

export default componentTester