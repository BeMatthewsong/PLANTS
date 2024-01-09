import S from '@/components/modal/input/imgInput/imgInput.module.css';
import Image from 'next/image';
import { ChangeEvent, useCallback, useRef, useState } from 'react';
import {
  Control,
  FieldPath,
  FieldValues,
  UseFormSetValue,
  useController,
} from 'react-hook-form';

interface ImgInputProps {
  control: Control<FieldValues>;
  name: FieldPath<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  size?: 'large' | 'default';
  profileImg?: string;
}

// 프로필 이미지 업로드 컴포넌트
function ProfileImgInput({
  control,
  name,
  setValue,
  size = 'default',
  profileImg,
}: ImgInputProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files) {
      const targetFiles = e.target.files[0];
      const selectedFiles = URL.createObjectURL(targetFiles);
      setImageSrc(selectedFiles);
      setValue('imageUrl', e.target.files[0]);
    }
  };

  const handleUploadImg = useCallback(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  }, []);

  const { field } = useController({
    name,
    control,
  });

  return (
    <div className={`${S.profileContainer}`}>
      <div className={`${S.imgInputContainer} ${S[size]}`}>
        {imageSrc ? (
          <Image src={imageSrc} alt="이미지 업로드" fill />
        ) : (
          profileImg && <Image src={profileImg} alt="이미지 업로드" fill />
        )}

        <input
          type="file"
          accept="image/*"
          onChange={(e) => onUpload(e)}
          className={S.input}
          ref={inputRef}
          id={field.name}
          name={field.name}
        />
      </div>
      <div className={`${S.profileContainerBtn}`}>
        <div className={`${S.profileBtn}`} onClick={handleUploadImg}>
          변경하기
        </div>
      </div>
    </div>
  );
}

export default ProfileImgInput;
