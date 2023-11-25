import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();

router.post('/upload/pdf', (req, res) => {
    try {
        const base64Data = req.body.pdfData.replace(/^data:application\/pdf;base64,/, "");
        const pdfBuffer = Buffer.from(base64Data, 'base64');
    
        const pdfPath = path.join(__dirname, 'uploads', 'pdf-uploaded.pdf');
        fs.writeFileSync(pdfPath, pdfBuffer);
    
        res.status(200).json({ message: 'PDF uploaded successfully' });
     } catch (error) {
        console.error('Error uploading PDF:', error);
        res.status(500).json({ message: 'Error uploading PDF' });
     }
});

export default router;