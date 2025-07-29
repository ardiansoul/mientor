import { config } from "dotenv";
const configEnv = () => {
  console.log("Environment variables loaded successfully");
  return config({ path: ".env.development" });
};

export default configEnv;
