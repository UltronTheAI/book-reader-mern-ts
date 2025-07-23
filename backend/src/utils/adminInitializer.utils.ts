import bcrypt from "bcrypt";
import User from "../models/User";
import 'dotenv/config';

//take admin credentials from .env file
// Checks if books collection is empty; if yes, seeds data
export default async function checkAndInitializeAdmin(): Promise<void>{
  try {
    const count = await User.countDocuments();
    if (count === 0) {
      await initializeAdmin();
    } else {
      console.log(" Database already has users. Skipping intializing admin.");
    }
  } catch (error) {
    console.error("Error while checking and intializing admin:", error);
  }
}

export async function initializeAdmin(): Promise<void>{
  const ADMIN_PASSWORD =process.env.ADMIN_PASSWORD || "admin@example.com";
  const ADMIN_EMAIL =process.env.ADMIN_EMAIL || "admin@example.com";

  try {
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

    const admin = new User({
      username: 'superadmin',
      email: ADMIN_EMAIL,
      password: hashedPassword,
      role: 'admin',
      isEmailVerified: true //email verified while registering
    });
    await admin.save();
  } catch (error) {
    console.error("Error while intializing admin:", error);
  }
}
    
