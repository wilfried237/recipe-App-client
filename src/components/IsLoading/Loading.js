import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';

export default function LoadingPage(){
  return (
    <div style={{height: "100vh", width: "100%"}} className="d-flex justify-content-center align-items-center">
      <CircularProgress />
    </div>
  )
}