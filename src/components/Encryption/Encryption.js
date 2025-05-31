const secretKey = 5; // Simple shift for demonstration

// Simple transformation and Base64 encoding for encryption
const encrypt = (text) => {
    let transformed = '';
    for (let i = 0; i < text.length; i++) {
        const charCode = text.charCodeAt(i) + secretKey;
        transformed += String.fromCharCode(charCode);
    }
    return btoa(encodeURIComponent(transformed)); // Ensure the string is URI encoded before Base64 encoding
};

// Base64 decoding and simple transformation for decryption
const decrypt = (encryptedText) => {
    const transformed = decodeURIComponent(atob(encryptedText)); // Decode URI encoded Base64 string
    let decrypted = '';
    for (let i = 0; i < transformed.length; i++) {
        const charCode = transformed.charCodeAt(i) - secretKey;
        decrypted += String.fromCharCode(charCode);
    }
    return decrypted;
}

export {encrypt, decrypt}