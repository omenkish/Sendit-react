import React from 'react';
import SectionCard from './indexPartials/Card.jsx';
import Footer from './common/Footer.jsx';
import styles from '../assets/css/index.css';
import { final, world, back } from '../assets/images/index';


const HomePage = () => (
  <div>
    <section id={styles.showcase}>
    <div className={styles.container}>
        <h1> Affordable Parcel Delivery worldwide</h1>
        <p><i>Send it.....with convenience!</i></p>
      </div>
    </section>
    <section id={styles.search}>
    </section>
    <section id={styles.boxes}>
    <div className={styles.container}>
      <SectionCard  
        src={final}
        title = 'World Wide Service'
        text = 'With our various stations worldwide, we reach you at any part of the globe. You are just a click away from enjoying our\
        world className services.'
      />
      <SectionCard  
        src ={back}
        title = 'Express Delivery'
        text = 'Why not send it....With convenience.'
      />
      <SectionCard  
        src ={world}
        title = 'Quality control'
        text = 'We also provide procurement services. We can help you purchase from China, USA and India. We inspect such goods to make sure they match the description precisely.'
      />
    </div>
  </section>
  <Footer />
  </div>
);
export default HomePage;