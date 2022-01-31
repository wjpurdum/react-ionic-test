import React, { useRef, useState } from "react";
import { Redirect, Route } from 'react-router-dom';
//react component wrapper - allows us to use ionic web components in react app by wrapper
import {
  IonApp,
  IonHeader,
  IonContent,
  IonLabel,
  setupIonicReact,
  IonToolbar,
  IonTitle,
  IonItem,
  IonInput,
  IonAlert,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import BmiControls from "./components/BMIControls"
import BmiResult from "./components/BMIResult";
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import InputControl from "./components/InputControl";

setupIonicReact();

const App: React.FC = () => {
  const [calculatedBmi, setCalculatedBmi] = useState<number>();
  const [error, setError] = useState<string>();
  const [calcUnits, setCalcUnits] = useState<"mkg" | "ftlbs">("mkg")
  const weightInputRef = useRef<HTMLIonInputElement>(null); //This Ref will eventually hold pointer to ION Input element, which is a TS type provided by Ionic
  const heightInputRef = useRef<HTMLIonInputElement>(null);
  const calculateBMI = () => {
    const enteredWeight = weightInputRef.current!.value;
    const enteredHeight = heightInputRef.current!.value;

    if (!enteredHeight || !enteredWeight || +enteredHeight <= 0 || +enteredHeight <= 0) {
      setError("Please enter a valid, non-negative input value!")
      return
    }
    const weightConversionFactor = calcUnits === "ftlbs" ? 2.2 : 1;
    const heightConversionFactor = calcUnits === "ftlbs" ? 3.28 : 1;
    const weight = +enteredWeight / weightConversionFactor;
    const height = +enteredHeight / heightConversionFactor;
    const bmi = +weight / (+height* +height);
    console.log(bmi);
    setCalculatedBmi(bmi)
  }
  const resetInputs = () => {
    weightInputRef.current!.value = "";
    heightInputRef.current!.value = "";
  }

  const clearError = () => {
    setError("");
  }

  const selectCalcUnitHandler = (selectedValue: "mkg" | "ftlbs") => {
    setCalcUnits(selectedValue)
  }
  return (
    <React.Fragment>
      <IonAlert isOpen={!!error} message={error} buttons={[{ text: "Okay", handler: clearError }]}></IonAlert>
      <IonApp>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>BMI Calculator</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonGrid>
            <IonRow>
              <IonCol>
                <InputControl selectedValue={calcUnits} onSelectValue={selectCalcUnitHandler}/>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position='floating'>Your Height ({calcUnits === "mkg" ? "meters" : "feet"})</IonLabel>
                  <IonInput type="number" ref={heightInputRef}></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel position='floating'>Your Weight ({calcUnits === "mkg" ? "kg" : "lbs"})</IonLabel>
                  <IonInput type="number" ref={weightInputRef}></IonInput>
                </IonItem>
                <BmiControls onCalculate={calculateBMI} onReset={resetInputs} />

                {calculatedBmi && (
                  <BmiResult result={calculatedBmi} />
                )}
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
        {/* <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/tab1">
            <Tab1 />
          </Route>
          <Route exact path="/tab2">
            <Tab2 />
          </Route>
          <Route path="/tab3">
            <Tab3 />
          </Route>
          <Route exact path="/">
            <Redirect to="/tab1" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/tab1">
            <IonIcon icon={triangle} />
            <IonLabel>Tab 1</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tab2">
            <IonIcon icon={ellipse} />
            <IonLabel>Tab 2</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/tab3">
            <IonIcon icon={square} />
            <IonLabel>Tab 3</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter> */}
      </IonApp>
    </React.Fragment>)
};

export default App;
