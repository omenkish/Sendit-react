import React from 'react';
import FormContainer from './container/LoginFormContainer.jsx';
import styles from '../assets/css/signin.css';
const LoginPage = () => {
  return (
    <section id={styles.signin}>
    <div className="container">
      <FormContainer/>
    </div>
  </section>
  );
}
export default LoginPage;