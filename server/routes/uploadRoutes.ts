import express from "express";
import auth from "../middleware/auth.js";
import multer from 'multer';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', auth, upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No image file provided" });
        }

        const b64 = Buffer.from(req.file.buffer).toString("base64");
        const dataURI = `data:${req.file.mimetype};base64,${b64}`;

        // Directly post to Cloudinary's unsigned REST API endpoint (matches curl)
        const formData = new FormData();
        formData.append("file", dataURI);
        formData.append("upload_preset", "ml_default");
        formData.append("folder", "grocery-del");

        const response = await fetch("https://api.cloudinary.com/v1_1/n7siwwss/image/upload", {
            method: "POST",
            body: formData,
        });

        const data: any = await response.json();

        if (!response.ok) {
            console.error("Cloudinary Error:", data);
            return res.status(response.status).json({ message: data.error?.message || "Upload failed" });
        }

        res.json({ url: data.secure_url });

    } catch (error: any) {
        console.error("Upload Route Error:", error);
        res.status(500).json({ message: error.message });
    }
});

export default router;