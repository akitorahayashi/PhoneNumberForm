import React, { useState } from 'react';
import './App.css';

function App() {
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const handleNumberClick = (number: string) => {
    if (phoneNumber.length < 11) {
      setPhoneNumber(phoneNumber + number);
    }
  };

  const handleDelete = () => {
    setPhoneNumber(phoneNumber.slice(0, -1));
  };

  const isPhoneNumberValid = phoneNumber.length === 11;
  const isDeleteEnabled = phoneNumber.length > 0;

  return (
    <div className="container">
      <h1>電話番号を入力してください</h1>
      <p>Please enter your phone number</p>
      <div className="o-input-num-display">
        {Array(11).fill(' ').map((_, index) => (
          <React.Fragment key={index}>
            <div
              className={index < phoneNumber.length ? 'filled' : 'empty'}
            >
              {phoneNumber[index] || ' '}
            </div>
            {/* ハイフンを3桁目と7桁目の後ろに挿入 */}
            {(index === 2 || index === 6) && (
              <span className="hyphen">-</span>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="keypad">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'del', 0, 'enter'].map((key) => (
          <button
            key={key}
            id={key === 'enter' ? 'keypad-enter' : key === 'del' ? 'keypad-delete' : `keypad-${key}`}
            onClick={() => {
              if (key === 'del' && isDeleteEnabled) handleDelete();
              else if (key === 'enter' && isPhoneNumberValid) alert('電話番号が入力されました！');
              else if (typeof key === 'number') handleNumberClick(key.toString());
            }}
            disabled={(key === 'enter' && !isPhoneNumberValid) || (key === 'del' && !isDeleteEnabled)}
            className="keypad-button"
          >
            {key === 'del' ? '⌫' : key === 'enter' ? '↵' : key}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;