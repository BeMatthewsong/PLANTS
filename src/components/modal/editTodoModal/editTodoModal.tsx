import DefaultInput from '@/components/modal/input/defaultInput/defaultInput';
import InputLayout from '@/components/modal/input/inputLayout';
import TagInput from '@/components/modal/input/tagInput/tagInput';
import InputModalLayout from '@/components/modal/inputModal/inputModalLayout';
import ModalLayout from '@/components/modal/modalLayout';
import S from '@/components/modal/editTodoModal/editTodoModal.module.css';
import CommonStyle from '@/components/modal/modalCommon.module.css';
import TextArea from '@/components/modal/textarea/textarea';
import SelectInput from '@/components/modal/input/selectInput/selectInput';
import ImgInput from '../input/imgInput/imgInput';
import ModalButtonSet from '../button/modalButtonSet';
import { FieldValues, useForm } from 'react-hook-form';

interface AddTodoModalProps {
  onClick: () => void;
}

const stateOptions = [
  { value: 'To Do', label: 'To Do' },
  { value: 'On Progress', label: 'On Progress' },
  { value: 'Done', label: 'Done' },
];

const ManagerOptions = [
  { value: '배유철', label: '배유철' },
  { value: '배동석', label: '배동석' },
  { value: '배유철1', label: '배유철1' },
];

function EditTodoModal({ onClick }: AddTodoModalProps) {
  const methods = useForm<FieldValues>({
    mode: 'onChange',
    defaultValues: {
      manager: '',
      title: '',
      explain: '',
      date: '',
      tag: [],
      img: '',
    },
  });

  const { handleSubmit, control, setValue } = methods;

  function handleEditTodo(data: FieldValues) {
    // 구현 필요
    console.log(data);
  }

  return (
    <ModalLayout onClick={onClick}>
      <InputModalLayout title="할 일 수정">
        <form
          className={CommonStyle.form}
          onSubmit={handleSubmit(handleEditTodo)}>
          <div className={S.inputContainer}>
            <InputLayout label="상태" isNessary={false}>
              <SelectInput
                optionData={stateOptions}
                type="state"
                placeholder="상태를 입력해주세요"
                setValue={setValue}
              />
            </InputLayout>
            <InputLayout label="담당자" isNessary={false}>
              <SelectInput
                optionData={ManagerOptions}
                type="manager"
                placeholder="이름을 입력해주세요"
                setValue={setValue}
              />
            </InputLayout>
          </div>

          <InputLayout label="제목" isNessary={true}>
            <DefaultInput
              placeholder="제목을 입력해 주세요"
              control={control}
              name="title"
            />
          </InputLayout>
          <InputLayout label="설명" isNessary={true}>
            <TextArea
              placeholder="설명을 입력해 주세요"
              control={control}
              name="explain"
            />
          </InputLayout>
          <InputLayout label="마감일" isNessary={false}>
            <DefaultInput
              placeholder="설명을 입력해 주세요"
              type="date"
              control={control}
              name="date"
            />
          </InputLayout>
          <InputLayout label="태그" isNessary={false}>
            <TagInput setValue={setValue} control={control} name="tag" />
          </InputLayout>
          <InputLayout label="이미지" isNessary={false}>
            <ImgInput control={control} name="img" setValue={setValue} />
          </InputLayout>
          <ModalButtonSet
            isDelete={false}
            submitmButtonTitle="수정"
            onClickCancel={onClick}
          />
        </form>
      </InputModalLayout>
    </ModalLayout>
  );
}

export default EditTodoModal;
