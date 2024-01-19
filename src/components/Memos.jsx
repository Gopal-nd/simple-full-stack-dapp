

import { useState, useEffect } from "react";

const Memos = ({ state }) => {
  const [memos, setMemos] = useState([]);
  const { contract } = state;

  useEffect(() => {
    const fetchMemos = async () => {
      const memosData = await contract.getMemose();
      setMemos(memosData);
    };
    contract && fetchMemos();
  }, [contract]);

  return (
    <>
      <p style={{ textAlign: "center", marginTop: "20px", fontSize: "20px", fontWeight: "bold" }}>
        Messages
      </p>
      {memos.map((memo) => (
        <div key={memo.id} style={cardStyle}>
          <div style={cardHeaderStyle}>
            <span style={{ fontWeight: "bold" }}>{memo.name}</span>
            <span>{new Date(memo.timestamp * 1000).toLocaleString()}</span>
          </div>
          <div style={cardContentStyle}>{memo.message}</div>
          <div style={cardFooterStyle}>{memo.from}</div>
        </div>
      ))}
    </>
  );
};

const cardStyle = {
  backgroundColor: "#96D4D4",
  border: "1px solid white",
  padding: "15px",
  marginBottom: "20px",
  borderRadius: "8px",
};

const cardHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "10px",
};

const cardContentStyle = {
  marginBottom: "10px",
};

const cardFooterStyle = {
  textAlign: "right",
  fontStyle: "italic",
};

export default Memos;


