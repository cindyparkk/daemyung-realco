import { defineField, defineType } from "sanity";

export default defineType({
  name: "project",
  title: "주요 실적",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "프로젝트 이름",
    }),
    // defineField({
    //   name: "category",
    //   title: "Category",
    //   type: "reference",
    //   to: [{ type: "projectCategory" }],
    //   validation: (rule) => rule.required(),
    // }),
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
      name: "dateRange",
      type: "string",
      title: "진행 기간",
    }),
    defineField({
      name: "work",
      type: "string",
      title: "업무",
      initialValue: "분양대행 / MD컨설팅 / 상환경인테리어",
    }),
    defineField({
      name: "location",
      type: "string",
      title: "위치",
    }),
    defineField({
      name: "area",
      type: "string",
      title: "연면적",
    }),
    defineField({
      name: "contractedWith",
      type: "string",
      title: "계약주체",
    }),
    defineField({
      name: "images",
      type: "array",
      of: [{ type: "image" }],
      title: "실적 이미지",
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "",
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
