import { type SchemaTypeDefinition } from "sanity";
import { postType, timelineType } from "./postType";
import { timelineSchema } from "./timelineSchema";

export const schemaTypes = [timelineType, timelineSchema];

export const schema: { types: SchemaTypeDefinition[] } = {
  types: schemaTypes,
};
