import { defineField, defineType } from "sanity";

export default defineType({
  name: "projectCategory",
  title: "사업 분야",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "사업 분야",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
