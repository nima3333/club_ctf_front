import Loader from 'react-loader-spinner'
import React from 'react';
import styles from './Loading.module.css'

function Loading() {
return(
<div className={styles.loading}>
      <Loader type="Oval" color="#2BAD60" height="100" width="100" />
    </div>
)}

export default Loading