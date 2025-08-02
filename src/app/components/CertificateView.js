"use client";

import { useState, useEffect } from "react";
import QRCode from "qrcode";
import { generateCertificateDataUrl } from "@/lib/certificate";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import { put } from "@vercel/blob";
import { Button } from "@/components/ui/button";

export default function CertificateView({ name = "", onRestart }) {
  const [publicUrl, setPublicUrl] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const blobReadWriteToken =
    "vercel_blob_rw_1e0akAaW3IACiPX3_Fh2qSAdRJy3wUNR9UyrtspUCcb36yx";

  useEffect(() => {
    if (timeLeft <= 0) {
      onRestart();
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, onRestart]);

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
      <h1 className="mb-4 text-5xl font-bold tracking-tight">
        Your Certificate is Ready!
      </h1>
      {qrCodeUrl && (
        <div className="mt-8 flex flex-col items-center justify-center">
          <h2 className="mb-4 text-3xl font-bold">Scan to View/Download</h2>
          <img
            src={qrCodeUrl}
            alt="QR Code for Certificate"
            className="rounded-lg border-2 border-brand-primary"
          />
        </div>
      )}
      <div className="mt-8">
        <Button
          onClick={onRestart}
          className="w-64 transform rounded-full bg-brand-primary px-12 py-8 text-2xl font-semibold text-black transition active:scale-95 active:bg-brand-primary/90"
        >
          Restart Quiz - {timeLeft}s
        </Button>
      </div>
    </div>
  );
}
