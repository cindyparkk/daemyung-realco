import { defineField, defineType } from "sanity";

export default defineType({
  name: "newsItem",
  title: "뉴스 기사",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "제목",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      type: "image",
      fields: [{ name: "alt", type: "string", title: "Alt Text" }],
    }),
    defineField({
      name: "publishedAt",
      type: "date",
      title: "작성일",
      //   initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "source",
      type: "string",
      title: "출처",
      //   validation: (rule) => rule.required(),
    }),
    defineField({
      name: "link",
      type: "url",
      title: "기사 링크",
      //   validation: (rule) => rule.required(),
    }),
  ],
});
