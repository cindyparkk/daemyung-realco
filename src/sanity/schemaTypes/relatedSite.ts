import { defineField, defineType } from "sanity";

export default defineType({
  name: "relatedSite",
  title: "관련 사이트",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "사이트 이름",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      type: "string",
      title: "카테고리",
      options: {
        list: [
          { title: "분양대행", value: "분양대행" },
          { title: "F&B", value: "fnb" },
          { title: "엔터테인먼트", value: "entertainment" },
        ],
      },
    }),
    defineField({
      name: "logo",
      type: "object",
      title: "로고",
      fields: [
        { name: "src", type: "image", title: "이미지 (png/svg/jpg) 업로드" },
        { name: "alt", type: "string", title: "Alt Text" },
      ],
    }),
    defineField({
      name: "link",
      type: "url",
      title: "사이트 링크",
      //   validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "logo.src",
    },
    prepare(selection) {
      const { title, media } = selection;
      return {
        title: `${title}`,
        media,
      };
    },
  },
});
