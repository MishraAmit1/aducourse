const ErrorMiddleware = (err, req, res, next) => {
  // yh (err) express mein hota hai
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
export default ErrorMiddleware;

// yh pure ka matlab wahi nikla ki agar jaise (getAllcourses) ke baad agr kuch nhi nikla toh eh error through karegha wo bhi apne hee isme dale hain
