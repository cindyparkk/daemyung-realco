import { defineField, defineType } from "sanity";

export const postType = defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      type: "image",
    }),
    defineField({
      name: "body",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
});

export const timelineType = defineType({
  name: "timeline",
  title: "회사 연혁",
  type: "document",
  fields: [
    defineField({
      name: "year",
      type: "number",
      title: "연도",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      type: "image",
      title: "이미지",
    }),
    defineField({
      name: "fields",
      type: "array",
      of: [{ type: "timelineSchema" }],
      title: "해당 연도 설명란",
    }),
  ],
  preview: {
    select: {
      title: "year",
      media: "image",
    },
    prepare(selection) {
      const { title, media } = selection;
      return {
        title: `${title}년도`,
        media,
      };
    },
  },
});
