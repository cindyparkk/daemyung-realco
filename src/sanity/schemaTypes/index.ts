import { type SchemaTypeDefinition } from "sanity";
import { postType, timelineType } from "./postType";
import timeline from "./timelineSchema";
import relatedSite from "./relatedSite";
import newsItem from "./newsItem";
import onlineInquiry from "./onlineInquiry";

export const schemaTypes = [
  timelineType,
  timeline,
  relatedSite,
  newsItem,
  onlineInquiry,
];

export const schema: { types: SchemaTypeDefinition[] } = {
  types: schemaTypes,
};
