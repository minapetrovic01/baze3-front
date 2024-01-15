
export function TOPSIS(matrixOfGrades:number[][],weights:number[],criteriaNumber:number,alternativeNumber:number):number[]{
    weights=normalizeWeights(weights);
    const squaredColumnSums:number[] = getColumnSums(matrixOfGrades);
    const normalizedWeightedMatrix:number[][]=matrixOfGrades.map(row =>
         row.map((value, colIndex) => value / squaredColumnSums[colIndex]* weights[colIndex]));
     // const weightedMatrix:number[][]=normalizedMatrix.map(row =>
     //     row.map((value, colIndex) => value * weights[colIndex]));
     const Vp:number[]=largestInColumn(normalizedWeightedMatrix);
     const Vm:number[]=smallestInColumn(normalizedWeightedMatrix);
    // let P:number[]=new Array(alternativeNumber);
     
     
     let f:boolean=true;
    
     const P: number[] = normalizedWeightedMatrix.map((row) => {
         const psum = Math.sqrt(row.reduce((sum, value, j) => sum + Math.pow(value - Vp[j], 2), 0));
         const msum = Math.sqrt(row.reduce((sum, value, j) => sum + Math.pow(value - Vm[j], 2), 0));
         
         if (psum === 0 && msum === 0) {
             f = false;
           return 0;
         }
         
         return msum / (msum + psum);
       });
     if(f){
         const sum= P.reduce((a, b) => a + b, 0);
         const result:number[] = P.map((value) => value / sum*100);
         return result;
     }
     else{
         //const result:number[] = P.map((value) => value / alternativeNumber*100);
         const result:number[] = P.map((value) => 1 / alternativeNumber*100);
         return result;
     }
 }
 
 function getColumnSums(matrix: number[][]): number[] {
     return matrix[0].map((_, colIndex) =>
         matrix.reduce((sum, row) => sum + row[colIndex]^2, 0)
     );
 }
 function largestInColumn(arr: number[][]): number[] {
     const maxValues: number[] = arr[0].map((_, colIndex) => {
         return arr.reduce((max, row) => Math.max(max, row[colIndex]), Number.NEGATIVE_INFINITY);
     });
 
     return maxValues;
 }
 function smallestInColumn(arr: number[][]): number[] {
     const minValues: number[] = arr[0].map((_, colIndex) => {
         return arr.reduce((min, row) => Math.min(min, row[colIndex]), Number.POSITIVE_INFINITY);
     });
 
     return minValues;
 }
 
 function normalizeWeights(weights:number[]):number[]{
     const sum= weights.reduce((a, b) => a + b, 0);
     if(sum===0){
         return weights;
     }
     const result:number[] = weights.map((value) => value / sum);
     return result;
 }