import React, { useContext } from 'react'
import { TableRow, TableCell, Tooltip, Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { TestCaseType } from '../Context/ProblemContext';
import { TestCasesContext } from '../Context/ProblemContext';
import "../index.css";

interface PropsType {
    testcase: TestCaseType;
    index: number;
  }


function SingleTestCase({ testcase, index }: PropsType) {

  
  const {testCases, setTestCases} = useContext(TestCasesContext);

  const deleteTestCase = (index: number) => {
    const newTestCases = testCases.filter((_, i) => i !== index);
    setTestCases(newTestCases);
  }

  console.log(testcase.input)
  return (
    
    <TableRow className={`table-row ${index % 2 === 0 ? 'even' : 'odd'}`}>
      <TableCell>{index + 1}</TableCell>
      <TableCell className="text-blue underline">
        {testcase.input}
      </TableCell>
      <TableCell className="text-blue underline">
        {testcase.output}
      </TableCell>
      <TableCell>
        <Checkbox
          color={`${testcase.is_sample ? 'success' : 'error'}`}
          indeterminate={!testcase.is_sample}
          checked
          disabled
        />
      </TableCell>
      <TableCell>
        <Checkbox
          color={`${testcase.is_hiden ? 'success' : 'error'}`}
          indeterminate={!testcase.is_hiden}
          checked
          disabled
        />
      </TableCell>
      <TableCell>
        <Tooltip title="Delete">
          <button className="delete-button" onClick={
            () => deleteTestCase(index)
          }>
            <DeleteIcon />
          </button>
        </Tooltip>

      </TableCell>
    </TableRow>
  )
}

export default SingleTestCase