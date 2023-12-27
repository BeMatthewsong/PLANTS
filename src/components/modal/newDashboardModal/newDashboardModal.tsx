import { FieldValues, useForm } from 'react-hook-form';
import ModalButtonSet from '@/components/modal/button/modalButtonSet';
import ColorChipInput from '@/components/modal/input/colorChipInput/colorChipInput';
import DefaultInput from '@/components/modal/input/defaultInput/defaultInput';
import InputLayout from '@/components/modal/input/inputLayout';
import InputModal from '@/components/modal/inputModal/inputModal';
import CommonStyle from '@/components/modal/modalCommon.module.css';
import { useEffect, useState } from 'react';

interface NewDashboardModalProps {
  onClick: () => void;
}

function NewDashboardModal({ onClick }: NewDashboardModalProps) {
  const [isColorValid, setIsColorValid] = useState(false);
  const [isDashboardNameValid, setIsDashboardNameValid] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const methods = useForm<FieldValues>({
    mode: 'onChange',
    defaultValues: {
      dashboardName: '',
      color: '',
    },
  });

  const { handleSubmit, control, setValue, watch } = methods;

  function handleNewDashboard(data: FieldValues) {
    console.log(data);
  }

  useEffect(() => {
    if (watch('color') === '') setIsColorValid(false);
    else setIsColorValid(true);

    if (watch('dashboardName') === '') setIsDashboardNameValid(false);
    else setIsDashboardNameValid(true);
  }, [watch()]);

  useEffect(() => {
    if (isColorValid && isDashboardNameValid) setIsActive(true);
    else setIsActive(false);
  }, [isColorValid, isDashboardNameValid]);

  return (
    <InputModal onClick={onClick} title={'새로운 대시보드'}>
      <InputLayout label="대시보드 이름" isNecessary={false}>
        <form
          onSubmit={handleSubmit(handleNewDashboard)}
          className={CommonStyle.form}>
          <DefaultInput
            placeholder="대시보드 이름을 입력해 주세요"
            control={control}
            name="dashboardName"
          />
          <ColorChipInput setValue={setValue} />

          <ModalButtonSet
            isDelete={false}
            submitButtonTitle="생성"
            onClickCancel={onClick}
            isActive={isActive}
          />
        </form>
      </InputLayout>
    </InputModal>
  );
}

export default NewDashboardModal;
