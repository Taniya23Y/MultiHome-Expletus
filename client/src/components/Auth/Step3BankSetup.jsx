import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  useCreateBankMutation,
  useUploadBankDocsMutation,
  useVerifyBankMutation,
} from "../../redux/features/seller/sellerApi";

const Step3BankSetup = ({ onBack, onComplete }) => {
  const [createBank, { isLoading: creating }] = useCreateBankMutation();
  const [uploadDocs, { isLoading: uploading }] = useUploadBankDocsMutation();
  const [verifyBank, { isLoading: verifying }] = useVerifyBankMutation();

  const [files, setFiles] = useState([]);
  const [bankCreated, setBankCreated] = useState(false);

  const handleCreateBank = async () => {
    try {
      const res = await createBank().unwrap();
      toast.success(res.message || "Bank account created");
      setBankCreated(true);
    } catch (err) {
      toast.error(err?.data?.message || "Bank creation failed");
    }
  };

  const handleUpload = async () => {
    if (!files.length) {
      toast.error("Select documents to upload");
      return;
    }
    try {
      const formData = new FormData();
      files.forEach((f) => formData.append("documents", f));
      const res = await uploadDocs(formData).unwrap();
      toast.success(res.message || "Documents uploaded");
    } catch (err) {
      toast.error(err?.data?.message || "Upload failed");
    }
  };

  const handleVerify = async () => {
    try {
      const res = await verifyBank().unwrap();
      toast.success(res.message || "Bank verified");
      onComplete && onComplete();
    } catch (err) {
      toast.error(err?.data?.message || "Verification failed");
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-6">
        Step 4 — Seller Bank Setup
      </h2>
      <div className="space-y-4">
        <div>
          <p>1) Create bank account (dummy)</p>
          <button
            onClick={handleCreateBank}
            disabled={creating}
            className="bg-indigo-600 text-white px-4 py-2 rounded cursor-pointer"
          >
            {creating
              ? "Creating..."
              : bankCreated
              ? "Created"
              : "Create Bank Account"}
          </button>
        </div>

        <div>
          <p>2) Upload KYC documents</p>
          <input
            multiple
            type="file"
            onChange={(e) => setFiles(Array.from(e.target.files))}
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleUpload}
              disabled={uploading || !bankCreated}
              className="px-3 py-2 border rounded cursor-pointer"
            >
              {uploading ? "Uploading..." : "Upload Docs"}
            </button>
          </div>
        </div>

        <div>
          <p>3) Verify bank</p>
          <div className="flex gap-2">
            <button
              onClick={onBack}
              className="px-3 py-2 border rounded cursor-pointer"
            >
              Back
            </button>
            <button
              onClick={handleVerify}
              disabled={verifying || !bankCreated}
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 cursor-pointer text-white px-4 py-2 rounded"
            >
              {verifying ? "Verifying..." : "Verify Bank & Finish"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3BankSetup;
