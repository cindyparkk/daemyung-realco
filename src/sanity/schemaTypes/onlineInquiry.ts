export default {
  name: "onlineInquiry",
  title: "온라인 문의",
  type: "document",
  fields: [
    { name: "name", type: "string", title: "Name" },
    { name: "organization", type: "string", title: "Organization" },
    { name: "phoneNum", type: "string", title: "Phone Number" },
    { name: "email", type: "string", title: "Email" },
    { name: "inquiry", type: "text", title: "Inquiry" },
    { name: "isAgreed", type: "boolean", title: "Agreed to Policy?" },
  ],
};
