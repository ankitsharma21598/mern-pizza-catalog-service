import mongoose from "mongoose";
import config from "config";
import logger from "./logger";

export const initDb = async () => {
    try {
        await mongoose
            .connect(config.get("database.url"))
            .then(() => {
                logger.info("Connected to MongoDB");
            })
            .catch((error) => {
                logger.error("Error connecting to MongoDB", error);
            });
    } catch (error) {
        console.log("Error connecting to MongoDB", error);
        logger.error("Error connecting to MongoDB", error);
    }
};
