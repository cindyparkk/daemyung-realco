"use client";
import styled from "styled-components";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

import Title from "../../../components/title";
import CustomButton from "../../../components/button";
import ProcessSteps from "./components/processSteps";
import ConsentDialog from "./components/consentDialog";

import colors from "../../../constants/colors";

const SITE_KEY = "YOUR_RECAPTCHA_SITE_KEY"; // Replace with your actual site key
// TODO: https://www.google.com/recaptcha/admin/create after domain purchase

const OnlineInquiriesPage = () => {
  const recaptchaRef = useRef();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    담당자: "",
    업체명: "",
    연락처: "",
    이메일: "",
    내용: "",
    스팸방지: "",
    개인정보: false,
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
    if (!form.개인정보) {
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
      alert("폼이 제출되었습니다!");
    } catch {
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

  return (
    <>
      <Title
        text={"온라인 문의"}
        hr
        subtitle={<>온라인 문의 절차를 안내드립니다</>}
      />
      <PageContainer>
        <p style={{ color: colors.textGrey, fontSize: "14px" }}>
          문의를 남겨 주시면 관련 내용 확인 후 빠른 시일 내에 연락 드리겠습니다.
        </p>
        <ProcessSteps />
        <FormSection>
          <Illustration
            src="/assets/images/hero-image-2.jpg"
            alt="Daemyung Building"
          />
          <Form onSubmit={handleSubmit}>
            <Label>
              담당자 <span>*</span>
            </Label>
            <Input
              name="담당자"
              placeholder="담당자 성명"
              required
              value={form.담당자}
              onChange={handleChange}
            />

            <Label>
              업체명 <span>*</span>
            </Label>
            <Input
              name="업체명"
              placeholder="업체명"
              required
              value={form.업체명}
              onChange={handleChange}
            />

            <Label>
              연락처 <span>*</span>
            </Label>
            <Input
              name="연락처"
              placeholder="000-0000-0000"
              required
              value={form.연락처}
              onChange={handleChange}
            />

            <Label htmlFor="이메일">
              이메일 <span>*</span>
            </Label>
            <Input
              type="email"
              name="이메일"
              placeholder="sample@email.com"
              required
              value={form.이메일}
              onChange={handleChange}
            />

            <Label htmlFor="내용">내용</Label>
            <Textarea
              name="내용"
              value={form.내용}
              onChange={handleChange}
              placeholder="문의할 내용을 써주세요."
            />

            <CheckboxWrapper>
              <Checkbox
                type="checkbox"
                name="개인정보"
                checked={form.개인정보}
                // onChange={handleChange}
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
            {error && (
              <div style={{ color: "#b2441c", marginTop: 8 }}>{error}</div>
            )}
            {/* <SubmitButton type="submit" disabled={submitting}>
              문의하기
            </SubmitButton> */}
            <CustomButton disabled={submitting} text={"문의하기"} />
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
  padding: 12px;
  font-size: 16px;
  margin-bottom: 18px;
  border: 1.5px solid #e6e6e6;
  background: #f9f9f9;
  border-radius: 5px;
  transition: border-color 0.2s;
  resize: vertical;
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
  padding-bottom: 20px;
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
