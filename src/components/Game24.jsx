import React, { useState, useEffect } from 'react';
import './Game24.css';

const Game24 = () => {
  const [numbers, setNumbers] = useState([]);
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
    generateNumbers();
  }, []);

  const generateNumbers = () => {
    const newNumbers = Array.from({ length: 4 }, () =>
      Math.floor(Math.random() * 10)
    );
    setNumbers(newNumbers);
    setExpression('');
    setResult('');
  };

  const addToExpression = (value) => {
    setExpression(expression + value);
  };

  const clearExpression = () => {
    setExpression('');
  };

  const checkSolution = () => {
    try {
      const evalResult = eval(expression);
      if (evalResult === 24 && isUsingAllNumbers(expression)) {
        setResult('ถูกต้อง! ได้ 24');
      } else {
        setResult('ไม่ถูกต้อง! ลองอีกครั้ง');
      }
    } catch (error) {
      setResult('สมการไม่ถูกต้อง!');
    }
  };

  const isUsingAllNumbers = (expression) => {
    const numStr = numbers.map(String);
    return numStr.every((num) => expression.includes(num));
  };

  return (
    <div className="container">
      <h1>24 Game</h1>
      <p>
        ใช้การดำเนินการทางคณิตศาสตร์ (+, -, *, /, (), และตัวเลขที่กำหนด)
        เพื่อให้ได้ค่า 24
      </p>
      <div className="numbers">
        {numbers.map((num, index) => (
          <button key={index} onClick={() => addToExpression(num)}>
            {num}
          </button>
        ))}
      </div>
      <div className="operators">
        <button onClick={() => addToExpression('+')}>+</button>
        <button onClick={() => addToExpression('-')}>-</button>
        <button onClick={() => addToExpression('*')}>*</button>
        <button onClick={() => addToExpression('/')}>/</button>
        <button onClick={() => addToExpression('(')}>(</button>
        <button onClick={() => addToExpression(')')}>)</button>
      </div>
      <input
        type="text"
        value={expression}
        placeholder="กรอกสมการที่นี่"
        readOnly
      />
      <div className="buttons">
        <button onClick={checkSolution}>ตรวจสอบ</button>
        <button onClick={generateNumbers}>สุ่มเลขใหม่</button>
        <button onClick={clearExpression}>ล้าง</button>
      </div>
      <p id="result">{result}</p>
    </div>
  );
};

export default Game24;
