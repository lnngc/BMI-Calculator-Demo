import React from 'react';
import { IonRow, IonCol, IonCard, IonCardContent} from '@ionic/react';
import { calculatorOutline, refreshOutline} from 'ionicons/icons';

const BmiResult: React.FC<{result: number | string}> = props => {
    return (
        <IonRow>
          <IonCol>
            <IonCard>
              <IonCardContent>
                <h2>Your Body Mass Index</h2>
                <h3 className="ion-text-center">{props.result.toFixed(2)}</h3>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
    );
};

export default BmiResult;