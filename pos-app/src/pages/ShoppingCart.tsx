import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton } from '@ionic/react';

const Cart: React.FC = () => {
  const [cartItems] = useState([
    { id: 1, name: "Product 1", price: 10, quantity: 2 },
    { id: 2, name: "Product 2", price: 20, quantity: 1 },
  ]);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Your Cart</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {cartItems.map(item => (
            <IonItem key={item.id}>
              <IonLabel>{item.name} (x{item.quantity})</IonLabel>
              <IonLabel>${item.price * item.quantity}</IonLabel>
            </IonItem>
          ))}
        </IonList>
        <IonTitle>Total: ${total}</IonTitle>
        <IonButton expand="full">Proceed to Checkout</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Cart;
