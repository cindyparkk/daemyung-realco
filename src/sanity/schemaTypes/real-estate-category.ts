import { defineType, defineField } from "sanity";

export default defineType({
  name: "real-estate-category",
  title: "분양사업분야",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "사업분야 (예: 주거용상품 분양사업)",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
  },
});
