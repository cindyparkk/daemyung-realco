import { type SchemaTypeDefinition } from "sanity";
import { postType, timelineType } from "./postType";
import timeline from "./timelineSchema";
import relatedSite from "./relatedSite";
import newsItem from "./newsItem";
import inquiry from "./inquiry";
import project from "./project";
// import projectCategory from "./category";
import otherProject from "./otherProject";
import realEstateCategory from "./real-estate-category";

export const schemaTypes = [
  timelineType,
  timeline,
  relatedSite,
  newsItem,
  inquiry,
  realEstateCategory,
  project,
  // projectCategory,
  otherProject,
];

export const schema: { types: SchemaTypeDefinition[] } = {
  types: schemaTypes,
};
