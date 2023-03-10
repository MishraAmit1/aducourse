class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    // Error.captureStackTrace(this, this.constructor);
  }
}
export default ErrorHandler;
// yh pure ka matlab kuch nhi hai bass wo Error.js mein message toh aajaye gha lekin statusCode undefined hee rhta usi ke liye hain yh sab
