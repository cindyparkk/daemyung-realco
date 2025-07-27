import { defineField, defineType } from "sanity";

export default defineType({
  name: "inquiry",
  title: "온라인 문의",
  type: "document",
  fields: [
    defineField({
      name: "contactPerson",
      title: "담당자",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "companyName",
      title: "업체명",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "phone",
      title: "연락처",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "이메일",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "content",
      title: "내용",
      type: "text",
    }),
    defineField({
      name: "spamCheck",
      title: "스팸방지",
      type: "boolean",
    }),
    defineField({
      name: "privacyAgreement",
      title: "개인정보 동의",
      type: "boolean",
    }),
  ],
});
