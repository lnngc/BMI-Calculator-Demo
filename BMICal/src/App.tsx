import React, { useRef, useState } from 'react';
import { IonApp, IonHeader, IonContent, IonGrid, IonInput, IonItem, IonLabel, IonCol, IonRow, IonTitle, IonToolbar, setupIonicReact, IonAlert} from '@ionic/react';

import BmiControls from './components/BmiControls';
import BmiResult from './components/BmiResult';
import InputControls from './components/InputControls';

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

setupIonicReact();

const App: React.FC = () => {
  const [calculateBmi,setCalculatedBmi]=useState<number>();
  const [error, setError]=useState<string>();
  const [calcUnits, setCalcUnits]=useState<'mkg'|'ftlbs'>();
  const weightInputRef = useRef<HTMLIonInputElement>(null);
  const heightInputRef = useRef<HTMLIonInputElement>(null);
  const calculateBMI = () => {
    const enteredWeight = weightInputRef.current!.value;
    const enteredHeight = heightInputRef.current!.value;

    if (!enteredHeight || !enteredWeight || +enteredWeight <= 0 || +enteredHeight <= 0) {
      setError('Please enter a validate input number!')
      return;
    }

    const weightConversionFactor = calcUnits === 'ftlbs' ? 2.2 : 1;
    const heightConversionFactor = calcUnits === 'ftlbs' ? 3.28 : 1;

    const weight = +enteredWeight / weightConversionFactor;
    const height = +enteredHeight / heightConversionFactor;
  
    const bmi = +enteredWeight / (+enteredHeight * +enteredHeight);

    setCalculatedBmi(bmi);

    console.log(bmi);
  };

  const resetInputs = () => {
    weightInputRef.current!.value='';
    heightInputRef.current!.value='';

  };

  const clearError = () => {
    setError('');
  };

  const selectCalcUnitHandler =(selectedValue: 'mkg'|'ftlbs')=>{
    setCalcUnits(selectedValue);
  }

return(
  <React.Fragment>
    <IonAlert isOpen={!!error} message={error} buttons={[{text: 'OK', handler: clearError}]}/>
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
            <InputControls selectedValue={calcUnits} onSelectValue={selectCalcUnitHandler}/>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position="floating">Your Height ({calcUnits === "mkg" ? 'meters' : 'feet'})</IonLabel>
              <IonInput ref={heightInputRef}></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position="floating">Your Weight ({calcUnits === 'mkg' ? 'kg' : 'lbs'})</IonLabel>
              <IonInput ref={weightInputRef}></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        {/* <IonRow>
          <IonCol className="ion-text-left">
            <IonButton onClick={calculateBMI}>
              <IonIcon slot="start" icon={calculatorOutline}/>
              Calculate
            </IonButton>
          </IonCol>
          <IonCol className="ion-text-right">
            <IonButton onClick={resetInputs}>
              <IonIcon slot="start" icon={refreshOutline}/>
              Reset
            </IonButton>
          </IonCol>
        </IonRow> */}
        <BmiControls onCalculate={calculateBMI} onReset={resetInputs}/>
        {calculateBmi && ( 
          <BmiResult result={calculateBmi}/>
        // <IonRow>
        //   <IonCol>
        //     <IonCard>
        //       <IonCardContent>
        //         <h2>(calculateBMI)</h2>
        //       </IonCardContent>
        //     </IonCard>
        //   </IonCol>
        // </IonRow>
        )}
      </IonGrid>
    </IonContent>
  </IonApp>
  </React.Fragment>
);
        };

export default App;
