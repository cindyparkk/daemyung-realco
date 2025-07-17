import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import styled from "styled-components";

import colors from "../../../../constants/colors";

const ConsentDialog = ({ open, onClose, checked, onChange }) => {
  return (
    <Dialog open={open} onClose={() => {}} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ textAlign: "center" }}>
        개인정보 수집 · 이용 동의 (필수)
      </DialogTitle>
      <DialogContent>
        <DialogContenrWrapper>
          <DialogText>
            <b>1. 수집하는 개인정보 항목</b>
            <UnorderedListBox>
              <ul>
                <li>담당자</li>
                <li>업체명</li>
              </ul>
              <ul>
                <li>연락처</li>
                <li>이메일</li>
              </ul>
            </UnorderedListBox>
            <b>2. 수집 목적</b>
            <OrderedListBox>
              <ol>
                <li>
                  연락처, 이메일: 고지의 전달 등 원활한 의사소통 경로의 확보
                </li>
                <li>담당자, 업체명: 고객의 정보</li>
              </ol>
            </OrderedListBox>
            <b>3. 개인정보 보유기간</b>
            <OrderedListBox>
              <ol>
                <li>계약 또는 청약 철회 등에 관한 기록: 5년</li>
                <li>대금결제 및 재화 등의 공급에 관한 기록: 5년</li>
                <li>소비자의 불만 또는 분쟁처리에 관한 기록: 3년</li>
              </ol>
            </OrderedListBox>
          </DialogText>
          <DialogCheckRow>
            <ConsentCheckbox
              type="checkbox"
              checked={checked}
              onChange={onChange}
              id="consent-dialog-check"
            />
            <label htmlFor="consent-dialog-check">
              개인정보 수집 동의 약관에 동의합니다.
            </label>
          </DialogCheckRow>
        </DialogContenrWrapper>
      </DialogContent>
    </Dialog>
  );
};
export default ConsentDialog;

const DialogContenrWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const DialogText = styled.div`
  font-size: 16px;
  color: ${colors.black};
  line-height: 1.7;
  margin-bottom: 24px;
`;

const DialogCheckRow = styled.div`
  display: flex;
  align-items: center;
`;

const ConsentCheckbox = styled.input`
  margin-right: 8px;
`;

const UnorderedListBox = styled.div`
  display: flex;
  align-items: flex-start;

  ul {
    margin: 10px 25px 20px 25px;
    font-size: 14px;
  }
`;

const OrderedListBox = styled.div`
  ol {
    margin: 10px 25px 20px 25px;
    font-size: 14px;
  }
`;
