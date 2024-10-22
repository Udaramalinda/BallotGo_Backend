const crypto = require("crypto");

// Generate a symmetric encryption key (AES 256)
function generateEncryptionKey() {
  return crypto.randomBytes(32).toString("hex");
}

// Encrypt registration data
function encryptData(data, key) {
  const iv = crypto.randomBytes(16); // Initialization vector
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(key, "hex"),
    iv
  );
  let encrypted = cipher.update(data, "utf-8", "hex");
  encrypted += cipher.final("hex");
  return { iv: iv.toString("hex"), encryptedData: encrypted };
}

module.exports = {
  generateEncryptionKey,
  encryptData,
};
