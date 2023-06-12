import { TextField } from '@mui/material'
import React from 'react'

export default function SearchComponent({onChange}) {
  return (
    <div>
        <TextField sx={{width:'95%'}} id="outlined-basic" label="Search" placeholder=' Search By Name Email Role' variant="outlined" onChange={onChange}/>

    </div>
  )
}
