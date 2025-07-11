export const generateCertificateDataUrl = (name) => {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      if (img.naturalWidth === 0) {
        reject(
          "Failed to load certificate: The image file appears to be corrupted or invalid."
        );
        return;
      }

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Resize the image to a web-friendly dimension
      const maxWidth = 1200;
      const scaleFactor = maxWidth / img.width;
      canvas.width = maxWidth;
      canvas.height = img.height * scaleFactor;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const certificateBgColor = "#fcfaf2";
      const scale = (value) => value * scaleFactor;

      // Whiten out [Insert Date]
      ctx.fillStyle = certificateBgColor;
      ctx.fillRect(scale(1450), scale(935), scale(400), scale(100));

      // Draw current date
      const today = new Date();
      const dateOptions = { day: "2-digit", month: "short", year: "numeric" };
      const formattedDate = today
        .toLocaleDateString("en-GB", dateOptions)
        .replace(/ /g, " - ");
      ctx.fillStyle = "#595959";
      ctx.font = `${scale(64)}px serif`;
      ctx.textAlign = "left";
      ctx.fillText(formattedDate, scale(1450), scale(995));

      // Whiten out [PARTICIPANT'S NAME]
      ctx.fillStyle = certificateBgColor;
      ctx.fillRect(scale(900), scale(1050), scale(900), scale(108));

      // Draw participant's name
      ctx.fillStyle = "#333";
      ctx.font = `bold ${scale(80)}px serif`;
      ctx.textAlign = "center";
      ctx.fillText(name.toUpperCase(), canvas.width / 2, scale(1150));

      resolve(canvas.toDataURL("image/jpeg", 0.9));
    };

    img.onerror = () => {
      reject(
        "Failed to load certificate image. Ensure 'Certificate.jpeg' is in the 'public' folder and accessible."
      );
    };

    img.src = "/Certificate.jpeg";
  });
};
