import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { sendEmail } from "../utils/sendEmail.js";
import { Stats } from "../models/Stats.js";
export const contact = catchAsyncError(async (req, res, next) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message)
    return next(new ErrorHandler("All Fields are Mandatory"));
  const to = process.env.MY_MAIL;
  const subject = "Contact from CourseBundler";
  const text = `I am ${name} and my Email is ${email}. \n${message}`;

  await sendEmail(to, subject, text);
  res.status(200).json({
    success: true,
    message: "Your Message has been Sent",
  });
});

export const courseRequest = catchAsyncError(async (req, res, next) => {
  const { name, email, course } = req.body;
  if (!name || !email || !course)
    return next(new ErrorHandler("All Fields are Mandatory"));
  const to = process.env.MY_MAIL;
  const subject = "Requesting for a course on CourseBundler";
  const text = `I am ${name} and my Email is ${email}. \n${course}`;

  await sendEmail(to, subject, text);
  res.status(200).json({
    success: true,
    message: "Your Request has been Sent",
  });
});

export const getDashboardStats = catchAsyncError(async (req, res, next) => {
  const stats = await Stats.find({}).sort({ createAt: "desc" }).limit(12);
  const statsData = [];
  for (let i = 0; i < stats.length; i++) {
    statsData.push(stats[i]);
  }
  const requiredSize = 12 - stats.length;
  for (let i = 0; i < requiredSize; i++) {
    statsData.unshift({
      users: 0,
      subscription: 0,
      views: 0,
    });
  }
  const usersCount = statsData[11].users;
  const subscriptionCount = statsData[11].subscription;
  const viewsCount = statsData[11].views;

  let userProfit = true;
  let subscriptionProfit = true;
  let viewsProfit = true;
  let userPercentage = 0;
  let subscriptionPercentage = 0;
  let viewsPercentage = 0;
  // agr yh mahine 20 user aaye or agle mahine 0 to mein compare karne thori na bethu gha smjaaa naa isliye direct 100 se multiply
  if (statsData[10].users === 0) userPercentage = usersCount * 100;
  if (statsData[10].users === 0)
    subscriptionPercentage = subscriptionCount * 100;
  if (statsData[10].users === 0) viewsPercentage = viewsCount * 100;
  else {
    // abhi hain 20 users or pehle tha 10 user toh jo diffrence aayegha isme save kar lenghe
    const difference = {
      users: statsData[11].users - statsData[10].users,
      users: statsData[11].views - statsData[10].views,
      users: statsData[11].subscription - statsData[10].subscription,
    };
    // 20 15
    // 5/15*100
    usersPercentage = (difference.users / statsData[10].users) * 100;
    viewsPercentage = (difference.views / statsData[10].views) * 100;
    subscriptionPercentage =
      (difference.subscription / statsData[10].subscription) * 100;
  }
  if (userPercentage < 0) userProfit = false;
  if (viewsPercentage < 0) viewsProfit = false;
  if (subscriptionPercentage < 0) subscriptionProfit = false;
  res.status(200).json({
    success: true,
    stats: statsData, //yh pure saal ka
    usersCount, // or yh pure mahine ka
    subscriptionCount,
    viewsCount,
    userPercentage,
    viewsPercentage,
    subscriptionPercentage,
    subscriptionProfit,
    viewsProfit,
    userProfit,
  });
});
