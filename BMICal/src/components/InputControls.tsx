import { IonSegment, IonLabel, IonSegmentButton } from "@ionic/react";
import React from "react";

const InputControls: React.FC<{selectedValue: 'mkg' | 'ftlbs'; onSelectValue:(value:'mkg' | 'ftlbs')=>void;}> = props => {
    const inputChangeHandler = (event: CustomEvent) => {
        props.onSelectValue(event.detail.value);
    }
    return (
        <IonSegment value={props.selectedValue} onIonChange={inputChangeHandler}>
            <IonSegmentButton value="mkg">
                <IonLabel>m/kg</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="ftlbs">
                <IonLabel>ft</IonLabel>
            </IonSegmentButton>
        </IonSegment>
    )
};

export default InputControls;