import React from "react";
import styles from "./Symptoms.module.css";
// import baseurl from '../../assets/baseurl'

import diseasedata from "../../assets/data/disease-symptoms.json";

function Symptoms(props) {
  const sympt = diseasedata.data.filter((record) => record.id === props.id);

  return (
    <div className={styles.container}>
      <div className={styles.description}>
        <h2>Description</h2>
        {sympt.map((desc) => {
          return <p>{desc.description}</p>;
        })}
      </div>
      <div className={styles.symptoms}>
        <h2>Symptoms</h2>
        
          {sympt.map((symptom) => {
            return (
              <p>
                {symptom.symptoms.map((sss) => {
                  return <p>{sss.charAt(0).toUpperCase()+sss.slice(1)}</p>
                })}
              </p>
            );
          })}

      </div>
      <div className={styles.precautions}>
        <h2>Precautions</h2>
        {sympt.map((symptom) => {
            return (
              <p>
                {symptom.precautions.map((sss) => {
                  return <p>{sss.charAt(0).toUpperCase()+sss.slice(1)}</p>
                })}
              </p>
            );
          })}
      </div>
    </div>
  );
}

export default Symptoms;
