import mongoose from "mongoose";

export interface IPriceConfiguration {
    [key: string]: {
        priceType: "base" | "additional";
        availableOptions: string[];
    };
}

export interface IAttribute {
    name: string;
    widgetType: "switch" | "radio";
    defaultValue: string;
    availableOptions: string[];
}

export interface ICategory {
    name: string;
    priceConfiguration: IPriceConfiguration;
    attributes: IAttribute[];
}

const PriceConfigurationSchema = new mongoose.Schema<IPriceConfiguration>({
    priceType: { type: String, enum: ["base", "additional"], required: true },
    availableOptions: { type: [String], required: true },
});

const AttributeSchema = new mongoose.Schema<IAttribute>({
    name: { type: String, required: true },
    widgetType: { type: String, enum: ["switch", "radio"], required: true },
    defaultValue: { type: mongoose.Schema.Types.Mixed, required: true },
    availableOptions: { type: [String], required: true },
});

export const CategorySchema = new mongoose.Schema<ICategory>(
    {
        name: { type: String, required: true },
        priceConfiguration: {
            type: Map,
            of: PriceConfigurationSchema,
            required: true,
        },
        attributes: { type: [AttributeSchema], required: true },
    },
    { timestamps: true },
);

export default mongoose.model<ICategory>("Category", CategorySchema);
