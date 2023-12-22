import { useState } from 'react';
import S from '@/components/modal/input/tagInput/tagInput.module.css';
import {
  Control,
  FieldPath,
  FieldValues,
  UseFormSetValue,
  useController,
} from 'react-hook-form';

interface TagInputProps {
  control: Control<FieldValues>;
  name: FieldPath<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}

function TagInput({ control, name, setValue }: TagInputProps) {
  const [tagItem, setTagItem] = useState('');
  const [tagList, setTagList] = useState<string[]>([]);

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log('in');
    if (tagItem.length !== 0 && e.key === 'Enter') {
      submitTagItem();
    }
  };

  const submitTagItem = () => {
    const updatedTagList = [...tagList];
    updatedTagList.push(tagItem);
    setTagList(updatedTagList);
    setValue('tag', updatedTagList);
    setTagItem('');
  };

  const { field } = useController({
    name,
    control,
  });

  return (
    <div className={S.tagBox}>
      <div className={S.tagItemContainer}>
        {tagList.map((tagItem, index) => {
          return (
            // chip 컴포넌트로 교체 예정
            <div className={S.tagItem} key={index}>
              <div>{tagItem}</div>
            </div>
          );
        })}
      </div>

      <input hidden={true} />

      <input
        className={S.tagInput}
        type="text"
        placeholder="입력 후 Enter"
        tabIndex={2}
        onChange={(e) => setTagItem(e.target.value)}
        value={tagItem}
        onKeyDown={onKeyPress}
        id={field.name}
        name={field.name}
      />
    </div>
  );
}

export default TagInput;
