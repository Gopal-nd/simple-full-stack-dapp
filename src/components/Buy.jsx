

import { ethers } from 'ethers';
import React, { useState } from 'react';

const Buy = ({ state }) => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [number, setNumber] = useState("");

  const buyChai = async (event) => {
    event.preventDefault();
    try {
      const { contract } = state;
      let value = { value: ethers.utils.parseEther(number) };
      console.table(name, message, contract);

      const transaction = await contract.buyChai(name, message, value);
      await transaction.wait();
      console.log("Transaction Done");
      alert("success")
    } catch (error) {
      console.error("Error during transaction:", error);
    }
  };

  return (
    <form onSubmit={buyChai} style={{ textAlign: 'center', margin: '20px' }}>
      <label htmlFor="name" style={{ display: 'block', margin: '10px 0' }}>Name :</label>
      <input
        type="text"
        id="name"
        placeholder="Enter Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: '5px', margin: '5px', width: '200px' }}
      />

      <label htmlFor="message" style={{ display: 'block', margin: '10px 0' }}>Message</label>
      <input
        type="text"
        id="message"
        placeholder="Enter Your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ padding: '5px', margin: '5px', width: '200px' }}
      />

      <label htmlFor="number" style={{ display: 'block', margin: '10px 0' }}>Value</label>
      <input
        type="number"
        id="number"
        min={0}
        max={10}
        step={0.001}
        placeholder=".50"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        style={{ padding: '5px', margin: '5px', width: '200px' }}
      />

      <button type="submit" style={{ padding: '10px', margin: '20px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>
        Pay
      </button>
    </form>
  );
};

export default Buy;
