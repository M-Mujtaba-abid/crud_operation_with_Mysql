import bcrypt from "bcrypt";

// password ko hash karne ka function
export const hashPassword = async (plainPassword) => {
  try {
    const saltRounds = 10; // jitni zyada rounds utna secure
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error("Password hash karte waqt error aya: " + error.message);
  }
};

// password compare karne ka function
export const comparePassword = async (plainPassword, hashedPassword) => {
  try {
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    return match; // true ya false return karega
  } catch (error) {
    throw new Error("Password compare karte waqt error aya: " + error.message);
  }
};
