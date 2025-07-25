import { type SchemaTypeDefinition } from "sanity";
import { postType, timelineType } from "./postType";
import timeline from "./timelineSchema";
import relatedSite from "./relatedSite";
import newsItem from "./newsItem";
import onlineInquiry from "./onlineInquiry";
import project from "./project";
// import projectCategory from "./category";
import otherProject from "./otherProject";

export const schemaTypes = [
  timelineType,
  timeline,
  relatedSite,
  newsItem,
  onlineInquiry,
  project,
  // projectCategory,
  otherProject,
];

export const schema: { types: SchemaTypeDefinition[] } = {
  types: schemaTypes,
};
