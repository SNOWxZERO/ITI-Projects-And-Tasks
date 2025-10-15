import React from "react";
import { TestCasesContext } from "../Context/ProblemContext";
import SingleTestCase from "./SingleTestCase";
import "../index.css";

function TestCasesTable() {
    const testCases = React.useContext(TestCasesContext);
  return (
    <>
      <h4 className="custom-heading">Testcases</h4>
      <table className="custom-table">
        <thead className="custom-table-head">
          <tr>
            <th>Order</th>
            <th>Input</th>
            <th>Output</th>
            <th>Sample</th>
            <th>Hidden</th>
          </tr>
        </thead>
        <tbody>
          {testCases.testCases.map((item, index) => (
            <SingleTestCase key={index} testcase={item} index={index} />
          ))}
        </tbody>
      </table>
    </>
  );
}

export default TestCasesTable;
