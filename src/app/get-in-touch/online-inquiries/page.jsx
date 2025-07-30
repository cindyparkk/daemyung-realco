"use client";
import styled from "styled-components";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Image from "next/image";

import Title from "../../../components/title";
import CustomButton from "../../../components/button";
import ProcessSteps from "./components/processSteps";
import ConsentDialog from "./components/consentDialog";
import ProgressLoader from "../../../components/progressLoader";

import colors from "../../../constants/colors";
import useClientMediaQuery from "../../../hooks/useClientMediaQuery";

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

const OnlineInquiriesPage = () => {
  const recaptchaRef = useRef();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    contactPerson: "",
    companyName: "",
    phone: "",
    email: "",
    content: "",
    // spamCheck: "",
    privacyAgreement: false,
  });
  const [error, setError] = useState("");

  const [consentChecked, setConsentChecked] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogCheckbox, setDialogCheckbox] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.privacyAgreement) {
      setError("개인정보 수집 동의가 필요합니다.");
      return;
    }
    setSubmitting(true);
    try {
      const token = await recaptchaRef.current.executeAsync();
      recaptchaRef.current.reset();

      // Submit form data + token to your API route here
      // Example:
      // await fetch('/api/submit-form', { method: 'POST', body: JSON.stringify({ ...form, token }) });

      // alert("폼이 제출되었습니다!");
      const res = await fetch("/api/submit-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, token }),
      });

      const result = await res.json();
      if (res.ok) {
        alert("문의가 성공적으로 제출되었습니다!");
      } else {
        alert("오류가 발생했습니다: " + result.message);
      }
    } catch {
      console.error("Submit error:", error);
      setError("reCAPTCHA 확인에 실패했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleConsentBoxClick = (e) => {
    if (!consentChecked) {
      e.preventDefault(); // Prevent checking immediately
      setDialogOpen(true);
    } else {
      setConsentChecked(false);
    }
  };

  // Dialog checkbox logic
  const handleDialogCheckbox = (e) => {
    if (e.target.checked) {
      setDialogCheckbox(true);
      setConsentChecked(true); // Set main consent as checked
      setDialogOpen(false); // Close dialog
      setTimeout(() => setDialogCheckbox(false), 300); // Reset dialog checkbox for next time
    }
  };

  const isMobile = useClientMediaQuery("(max-width: 600px)");

  return (
    <>
      <ProgressLoader open={submitting} text={"문의 접수 중"} />
      <Title
        text={"온라인 문의"}
        hr
        subtitle={<>온라인 문의 절차를 안내드립니다</>}
      />
      <PageContainer>
        <p
          style={{
            color: colors.textGrey,
            fontSize: "14px",
            width: isMobile && "85%",
            textAlign: "center",
          }}
        >
          문의를 남겨 주시면 관련 내용 확인 후 빠른 시일 내에 연락 드리겠습니다.
        </p>
        <ProcessSteps isMobile={isMobile} />
        <FormSection $isMobile={isMobile}>
          <Illustration
            src="/assets/images/hero-image-2.jpg"
            alt="Daemyung Building"
          />
          <Form onSubmit={handleSubmit}>
            <Label>
              담당자 <span>*</span>
            </Label>
            <Input
              name="contactPerson"
              placeholder="담당자 성명"
              required
              value={form.contactPerson}
              onChange={handleChange}
            />

            <Label>
              업체명 <span>*</span>
            </Label>
            <Input
              name="companyName"
              placeholder="업체명"
              required
              value={form.companyName}
              onChange={handleChange}
            />

            <Label>
              연락처 <span>*</span>
            </Label>
            <Input
              name="phone"
              placeholder="000-0000-0000"
              required
              value={form.phone}
              onChange={handleChange}
            />

            <Label htmlFor="email">
              이메일 <span>*</span>
            </Label>
            <Input
              type="email"
              name="email"
              placeholder="sample@email.com"
              required
              value={form.email}
              onChange={handleChange}
            />

            <Label htmlFor="content">내용</Label>
            <Textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              placeholder="문의할 내용을 써주세요."
            />

            <CheckboxWrapper>
              <Checkbox
                type="checkbox"
                name="privacyAgreement"
                checked={form.privacyAgreement}
                onChange={handleChange}
                onClick={handleConsentBoxClick}
                readOnly
                required
              />
              <p>
                개인정보 수집 동의 약관에 동의합니다.{" "}
                <span style={{ color: colors.red }}>*</span>
              </p>
            </CheckboxWrapper>

            {/* reCAPTCHA widget (invisible recommended for UX) */}
            <ReCAPTCHA
              ref={recaptchaRef}
              size="invisible" // for invisible reCAPTCHA
              sitekey={SITE_KEY}
            />
            {error && !form.privacyAgreement && (
              <ErrorMessage>
                <Image
                  src={"/assets/icons/alert-icon.svg"}
                  alt={"Alert Icon"}
                  width={20}
                  height={20}
                />
                <p>{error}</p>
              </ErrorMessage>
            )}
            {/* <SubmitButton type="submit" disabled={submitting}>
              문의하기
            </SubmitButton> */}
            <CustomButton
              disabled={submitting}
              text={"문의하기"}
              onClick={handleSubmit}
              sx={{ mt: "20px" }}
            />
          </Form>
        </FormSection>
      </PageContainer>
      <ConsentDialog
        open={dialogOpen}
        checked={dialogCheckbox}
        onChange={handleDialogCheckbox}
        onClose={() => setDialogOpen(false)}
      />
    </>
  );
};

export default OnlineInquiriesPage;

const PageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 50px;
`;

const FormSection = styled.section`
  display: flex;
  gap: 40px;
  justify-content: center;
  align-items: center;
  background: #fff;

  ${(props) =>
    props.$isMobile && {
      flexDirection: "column",
    }}
`;

const Illustration = styled.img`
  width: 420px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 380px;
  padding: 36px 32px;
  border-radius: 8px;
`;

const Input = styled.input`
  padding: 12px;
  font-size: 14px;
  margin-bottom: 18px;
  border: 1.5px solid #e6e6e6;
  background: #f9f9f9;
  font-family: "Pretendard", sans-serif;
  /* color: ${colors.textGrey}; */
  border-radius: 5px;
  transition: border-color 0.2s;
  &:focus {
    outline: none;
    border-color: #e0703c;
  }
`;

const Textarea = styled.textarea`
  min-height: 84px;
  padding: 8px 12px;
  font-size: 14px;
  margin-bottom: 18px;
  border: 1.5px solid #e6e6e6;
  background: #f9f9f9;
  border-radius: 5px;
  transition: border-color 0.2s;
  resize: vertical;
  font-family: "Pretendard", sans-serif;
  &:focus {
    outline: none;
    border-color: #e0703c;
  }
`;

const Label = styled.label`
  font-weight: 500;
  font-size: 14px;
  margin-bottom: 8px;
  display: block;
  span {
    color: ${colors.red};
  }
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  /* padding-bottom: 20px; */
  p {
    font-size: 14px;
  }
  span {
    color: ${colors.red};
  }
`;

const Checkbox = styled.input`
  margin-right: 8px;
`;

const ErrorMessage = styled.div`
  color: ${colors.red};
  display: flex;
  align-items: center;
  p {
    margin-left: 5px;
    font-size: 14px;
  }
`;
