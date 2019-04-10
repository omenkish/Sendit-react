import React from 'react';

import RegisterFormContainer from './container/RegisterFormContainer.jsx';
import styles from '../assets/css/signin.css';

const RegisterPage = ({history}) => (
  <section id={styles.signup}>
    <div className={styles.container}>
        <RegisterFormContainer history={history}/>
        
    </div>
  </section>

);
export default RegisterPage;