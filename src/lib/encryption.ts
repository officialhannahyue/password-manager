import crypto from "crypto"
import "dotenv/config"

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 32;

const key = Buffer.from(process.env.ENCRYPTION_KEY!, "hex")
export function encrypt( text: string) {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(
        ALGORITHM,
        key,
        iv
    );
    const encrypted = Buffer.concat([
        cipher.update(text, "utf8"),
        cipher.final()
    ]);
    const authTag = cipher.getAuthTag();
    return [
        iv.toString("hex"),
        authTag.toString("hex"),
        encrypted.toString("hex")
    ].join(":")
};

export function decrypt(encryptedText: string) {
    const [ivHex, authTagHex, encrypted] = encryptedText.split(":")

    const iv = Buffer.from(ivHex, "hex")
    const authTag = Buffer.from(authTagHex, "hex")

    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv)

    decipher.setAuthTag(authTag)

    let decrypted = decipher.update(encrypted, "hex", "utf8")
    decrypted += decipher.final("utf8")

    return decrypted
}