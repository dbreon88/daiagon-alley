/**
Utils functions.
 */

/* This function formats the db query result if you want to just do one query and get all 3 results at once
and then format them after.
Currently not in use */
export const formatForChart = (queryResult) => {
  const formatted = [
    { id: "Compound", color: "hsl(97, 70%, 50%)", data: [] },
    { id: "DSR", color: "hsl(97, 70%, 50%)", data: [] },
    { id: "Aave", color: "hsl(125, 70%, 50%)", data: [] },
  ];
  for (let i = 0; i < queryResult.length; i++) {
    let { block_number, compound, dsr, aave } = queryResult[i];
    formatted[0].data.push({ x: block_number, y: compound });
    formatted[1].data.push({ x: block_number, y: dsr });
    formatted[2].data.push({ x: block_number, y: aave });
  }
  return formatted;
};
