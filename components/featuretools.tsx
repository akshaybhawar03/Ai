// import React, { useState } from "react";

// const FeaturedTools = () => {
//   const [selectedTool, setSelectedTool] = useState<string | null>(null);
//   const [monthly, setMonthly] = useState("");
//   const [years, setYears] = useState("");
//   const [rate, setRate] = useState("");
//   const [result, setResult] = useState<number | null>(null);

//   const calculateSIP = () => {
//     const P = parseFloat(monthly);
//     const N = parseFloat(years) * 12;
//     const r = parseFloat(rate) / 100 / 12;
//     const maturity = P * ((Math.pow(1 + r, N) - 1) / r) * (1 + r);
//     setResult(maturity);
//   };

//   return (
//     <div>
//       <h2>Featured Tools</h2>

//       {/* Card */}
//       <div
//         style={{
//           border: "1px solid #ccc",
//           padding: "10px",
//           margin: "10px",
//           cursor: "pointer",
//         }}
//         onClick={() => setSelectedTool("SIP Calculator")}
//       >
//         SIP Calculator
//       </div>

//       {/* Form */}
//       {selectedTool === "SIP Calculator" && (
//         <div style={{ marginTop: "20px" }}>
//           <input
//             type="number"
//             placeholder="Monthly Investment"
//             value={monthly}
//             onChange={(e) => setMonthly(e.target.value)}
//           />
//           <input
//             type="number"
//             placeholder="Years"
//             value={years}
//             onChange={(e) => setYears(e.target.value)}
//           />
//           <input
//             type="number"
//             placeholder="Expected Return (%)"
//             value={rate}
//             onChange={(e) => setRate(e.target.value)}
//           />
//           <button onClick={calculateSIP}>Calculate</button>

//           {result && (
//             <h3>Maturity Amount: ₹{result.toFixed(2)}</h3>
//           )}
//         </div>
//       )}
//     </div>
// //   )
// };

// export default FeaturedTools;
