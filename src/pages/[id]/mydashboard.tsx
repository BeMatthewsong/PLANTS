import { postDashboardsInvitations } from '@/api/dashboard';
import DeleteDashBoardButton from '@/components/button/dashBoard/delete/deleteDashBoardButton';
import ReturnButton from '@/components/button/dashBoard/return/returnButton';
import DashboardHeader from '@/components/header/dashboardHeader/dashboardHeader';
import ModalButtonSet from '@/components/modal/button/modalButtonSet';
import DefaultInput from '@/components/modal/input/defaultInput/defaultInput';
import InputLayout from '@/components/modal/input/inputLayout';
import InputModal from '@/components/modal/inputModal/inputModal';
import SideMenu from '@/components/sideMenu/SideMenu';
import EditDashboard from '@/components/table/editDashboard/editDashboard';
import InvitationList from '@/components/table/invitation/invitationList';
import MemberList from '@/components/table/member/memberList';
import S from '@/pages/[id]/mydashboard.module.css';
import { GetServerSidePropsContext } from 'next';
import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import CommonStyle from '@/components/modal/modalCommon.module.css';
import { useQuery } from '@tanstack/react-query';
import QUERY_KEYS from '@/constants/queryKeys';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  if (!context.params) {
    return {
      notFound: true,
    };
  }

  const dashboardId = context?.params['id'];

  return {
    props: {
      dashboardId,
    },
  };
}

interface DashboardEditPageProps {
  dashboardId: string;
}

function DashboardEditPage({ dashboardId }: DashboardEditPageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [flag, setFlag] = useState(false);
  const [invitationFlag, setInvitationFlag] = useState(false);
  const { error, refetch } = useQuery({
    queryKey: [QUERY_KEYS.invitations],
    queryFn: () => postDashboardsInvitations(dashboardId, formData),
    enabled: false,
  });

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const methods = useForm<FieldValues>({
    mode: 'onChange',
    defaultValues: {
      email: '',
    },
  });

  const { handleSubmit, control, reset } = methods;

  async function handleAddTodo(data: FieldValues) {
    setFormData(data);
    refetch();
    setIsModalOpen(false);
    reset();
  }

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  // 모달이 열릴 경우 백그라운드 스크롤 방지
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
  }, [isModalOpen]);

  return (
    <>
      <div className={S.mainOuter}>
        <SideMenu pageId={Number(dashboardId)} flag={flag} />
        <div className={S.main}>
          <DashboardHeader
            folder="1"
            users={[]}
            user={{
              letter: '1',
              name: 'kim',
              color: 'yellow',
              ownerFolder: { folder: '1' },
            }}
          />
          <div className={S.mainContainer}>
            <ReturnButton url={`/${dashboardId}`} />
            <div className={S.tableContainer}>
              <EditDashboard dashboardId={dashboardId} setFlag={setFlag} />
              <MemberList dashboardId={dashboardId} />
              <InvitationList
                dashboardId={dashboardId}
                onClick={handleModal}
                invitationFlag={invitationFlag}
                setInvitationFlag={setInvitationFlag}
              />
              <div className={S.marginDiv}></div>
              <DeleteDashBoardButton />
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <InputModal onClick={handleModal} title={'초대하기'}>
          <InputLayout label="이메일" isNecessary={false}>
            <form
              onSubmit={handleSubmit(handleAddTodo)}
              className={CommonStyle.form}>
              <DefaultInput
                placeholder="이메일을 입력해 주세요"
                control={control}
                name="email"
              />
              <ModalButtonSet
                isDelete={false}
                submitButtonTitle="초대"
                onClickCancel={handleModal}
              />
            </form>
          </InputLayout>
        </InputModal>
      )}
    </>
  );
}

export default DashboardEditPage;
