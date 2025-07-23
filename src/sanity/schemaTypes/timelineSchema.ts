import { defineType, defineField } from "sanity";

export default defineType({
  name: "timelineSchema",
  type: "object",
  fields: [
    defineField({
      name: "month",
      type: "string",
      title: "월 (예. 8월 -> 08)",
    }),
    defineField({
      name: "text",
      type: "string",
      title: "설명",
    }),
  ],
});
