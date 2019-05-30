import React, { useState, useEffect } from 'react'

import Modal from '../components/UI/Modal/Modal';

const withErrorComponent = (WrappedComponent, axios) => {
  return props => {

    const [error, setError] = useState(null);

    useEffect(() => {
      console.log('[error handler]___use effect')
      const  reqInterceptor = axios.interceptors.request.use(req => {
        setError(null);
        return req;
      })

      const resInterceptor = axios.interceptors.response.use( res => res, error => {
        setError(error)
      })

      // will behave like compontentWillUnmount
      return () => {
        console.log("will unmount", reqInterceptor, resInterceptor);

        // destroy the interceptors from the memory
        axios.interceptors.request.eject(reqInterceptor);
        axios.interceptors.response.eject(resInterceptor);
      }

        

    }, [error])

    return (
      <React.Fragment>
        <Modal show={ error }
               modalClosed={ () => setError(null) }>
          <h1>Something Went Wrong</h1>
          <p>{ error ? error.message: null }</p>
        </Modal>
        <WrappedComponent { ...props } />
      </React.Fragment>
    )
  }
}

export default withErrorComponent;