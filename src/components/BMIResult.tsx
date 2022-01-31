import React from "react";
import { IonRow, IonCard, IonCol } from "@ionic/react";

const BmiResult: React.FC<{
    result: number
}> =  (props) => {
return ( <IonRow>
    <IonCol>
      <IonCard className="ion-text-center">
        <h2>Your Body Mass Index</h2>
        <h3 >{props.result.toFixed(2)}</h3>
      </IonCard>
    </IonCol>
  </IonRow>
)
}

export default BmiResult;