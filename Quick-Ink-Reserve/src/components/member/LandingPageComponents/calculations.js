export const getTotalPrice = (inkPrice, matPrice, pdfCount) => {
    const partialPrice = (inkPrice + matPrice) * pdfCount;
    const tax = partialPrice * 0.07;
    const interest = partialPrice * 0.10;
    
    return partialPrice + tax + interest;
}