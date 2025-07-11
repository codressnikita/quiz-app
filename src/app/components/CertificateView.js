"use client";

import { useState, useEffect } from "react";
import QRCode from "qrcode";
import { generateCertificateDataUrl } from "@/lib/certificate";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";

export default function CertificateView({ name = "" }) {
  const [publicUrl, setPublicUrl] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

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

        // 3. Upload to Vercel Blob
        setStatus("uploading");
        const filename = `${encodeURIComponent(
          name
        )}-${Date.now()}-certificate.jpeg`;
        const response = await fetch(
          `/api/upload-certificate?filename=${filename}`,
          {
            method: "POST",
            body: blob,
          }
        );

        if (!response.ok) {
          throw new Error("Failed to upload certificate.");
        }

        const result = await response.json();
        if (!isMounted) return;

        setPublicUrl(result.url);
        setStatus("success");

        // 4. Generate QR code
        const qrUrl = await QRCode.toDataURL(result.url);
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
