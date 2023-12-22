import S from '@/components/modal/input/inputLayout.module.css';
import { ReactNode } from 'react';

interface InputLayoutProps {
  label: string;
  isNessary: boolean;
  children: ReactNode;
}

// 모달 내부 label + input 구성 레이아웃
// isNessary: true -> * 추가됨
function InputLayout({ label, isNessary, children }: InputLayoutProps) {
  return (
    <div className={S.inputContainer}>
      <label className={S.label}>
        {label}
        {isNessary && <span className={S.violetLabel}>*</span>}
      </label>
      <div>{children}</div>
    </div>
  );
}

export default InputLayout;
