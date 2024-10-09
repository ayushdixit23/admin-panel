import React, { Suspense } from 'react';
import dynamic from 'next/dynamic'
const Components = dynamic(()=>import("./component"))

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Components/>
    </Suspense>
  )
}

export default page