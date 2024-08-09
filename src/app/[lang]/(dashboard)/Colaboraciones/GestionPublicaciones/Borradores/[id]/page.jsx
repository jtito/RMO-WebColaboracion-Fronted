'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { Grid } from '@mui/material'

import VistaDocumento from '../../../../../../../views/apps/Publicaciones/view/VistaDocumento'

const EditPage = ({ params }) => {

  const { id } = params

  console.log('id', id)


  // const router = useRouter();
  // const [id, setId] = useState(null);

  // useEffect(() => {
  //   const documentId = router.query?.id;
  //   if (documentId) {
  //     setId(documentId);
  //   }
  // }, [router.query]);

  // if (!id) {
  //   return null; // O muestra un indicador de carga mientras se obtiene el ID
  // }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} lg={4} md={5}>
        <VistaDocumento idDoc={id} />
      </Grid>
    </Grid>
  )
}

export default EditPage
