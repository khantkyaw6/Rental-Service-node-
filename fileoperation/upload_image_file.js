const fs = require("fs");
const path = require("path");

const imagePath = require("../Helpers/imagepatch");
const uploadBase64Image = (
    base64Data = null,
    user = "unknown",
    folderName = "unknown"
) => {
    const imageType = base64Data.substring(
        "data:image/".length,
        base64Data.indexOf(";base64")
    );
    const imageData = base64Data.replace(/^data:image\/\w+;base64,/, "");

    // Create a buffer from the Base64 data
    const buffer = Buffer.from(imageData, "base64");

    const uploadPath = `public/images/${user}/${folderName}/`;
    fs.mkdirSync(uploadPath, { recursive: true });
    // Example: Save the image to a file named "uploaded_image.png"
    const filename = new Date().valueOf() + "." + imageType;

    fs.writeFileSync(path.join(uploadPath, filename), buffer);
    const filePath = `${imagePath}/public/images/${user}/${folderName}/${filename}`;
    return filePath;
};
module.exports = uploadBase64Image;
