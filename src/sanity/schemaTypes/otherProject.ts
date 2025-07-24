import { defineField, defineType } from "sanity";

export default defineType({
  name: "otherProject",
  title: "주요 실적 - F&B / 엔터",
  type: "document",
  fields: [
    defineField({
      name: "label",
      type: "string",
      title: "사업 이름",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      type: "string",
      title: "사업 분야",
      options: {
        list: [
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
      name: "intro",
      type: "text",
      title: "사업 설명 (소개글)",
    }),
    defineField({
      name: "bannerImage",
      type: "object",
      title: "배너 이미지 (페이지 상단에 보여지는 상징적인 이미지)",
      fields: [
        { name: "src", type: "image", title: "이미지 (png/svg/jpg) 업로드" },
        { name: "alt", type: "string", title: "Alt Text" },
      ],
    }),
    defineField({
      name: "brand",
      type: "object",
      title: "브랜드 소개",
      fields: [
        { name: "name", type: "string", title: "브랜드 이름" },
        { name: "desc", type: "string", title: "설명" },
        { name: "location", type: "string", title: "위치" },
      ],
    }),
    defineField({
      name: "desc",
      type: "array",
      title: "브랜드 특징 / 부가설명",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "images",
      type: "array",
      of: [{ type: "image" }],
      title: "사업 관련 이미지",
    }),
  ],
  preview: {
    select: {
      title: "label",
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
