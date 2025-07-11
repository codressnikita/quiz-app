"use client";

import { useState, useEffect } from "react";
import QRCode from "qrcode";
import { generateCertificateDataUrl } from "@/lib/certificate";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import { put } from "@vercel/blob";

export default function CertificateView({ name = "" }) {
  const [publicUrl, setPublicUrl] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const blobReadWriteToken =
    "vercel_blob_rw_1e0akAaW3IACiPX3_Fh2qSAdRJy3wUNR9UyrtspUCcb36yx";

  useEffect(() => {
    let isMounted = true;
    const generateAndUpload = async () => {
      if (!name) return;
      setStatus("generating");
      try {
        // 1. Generate certificate data URL
        const dataUrl = await generateCertificateDataUrl(name);
        if (!isMounted) return;

        // 2. Convert data URL to blob
        const blob = await (await fetch(dataUrl)).blob();
        if (!isMounted) return;

        // 3. Upload to Vercel Blob via our API route
        setStatus("uploading");
        const filename = `${encodeURIComponent(
          name
        )}-${Date.now()}-certificate.jpeg`;

        const newBlob = await put(filename, blob, {
          access: "public",
          token: blobReadWriteToken,
        });

        if (!isMounted) return;

        setPublicUrl(newBlob.url);
        setStatus("success");

        // 4. Generate QR code
        const qrUrl = await QRCode.toDataURL(newBlob.url);
        if (isMounted) {
          setQrCodeUrl(qrUrl);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.toString());
          setStatus("error");
        }
      }
    };

    generateAndUpload();

    return () => {
      isMounted = false;
    };
  }, [name]);

  if (status === "error") {
    return (
      <ErrorMessage title="Error Generating Certificate" message={error} />
    );
  }

  if (status === "generating" || status === "idle") {
    return <Loader text="Generating your certificate..." />;
  }

  if (status === "uploading") {
    return <Loader text="Uploading your certificate..." />;
  }

  return (
    <div className="z-10 flex w-full max-w-5xl flex-col items-center justify-center p-4 text-center">
      <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
        Your Certificate is Ready!
      </h1>
      {qrCodeUrl && (
        <div className="mt-8">
          <h2 className="mb-4 text-2xl font-bold">Scan to View</h2>
          <img
            src={qrCodeUrl}
            alt="QR Code for Certificate"
            className="rounded-lg border-2 border-brand-primary"
          />
        </div>
      )}
    </div>
  );
}
