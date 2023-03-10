// try catch ko hatne ke liye
// means ek tarh ka smjj le error handle karne ke liye
// export const catchAsyncError = () =>{
//     return () =>{    }
// }  yaa aise likho yaa iske niche jaise likha hain waise likho
export const catchAsyncError = (passedFunction) => (req, res, next) => {
  Promise.resolve(passedFunction(req, res, next)).catch(next); // yeh next apne aap call karegha wo dekhe gha agr middlewares ke baad kuch nhi hoga toh apne aap error through or wo error bhi apne hee dexcribe kar rhe hain smjeee !!!
};
