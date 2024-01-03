import { useEffect, useState, ReactElement } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getDashboards } from '@/api/dashboard';
import { DashBoardData } from '@/types/DashBoard';
import QUERY_KEYS from '@/constants/queryKeys';
import InvitedList from '@/components/table/invitedDashboard/invitedList';
import PaginationCreateDashboard from '@/components/button/dashBoard/create/paginationCreateDashboard/paginationCreateDashboard';
import Layout from '@/components/layout/layout';
import NestedLayout from '@/components/layout/nestedLayout';
import CreateDashBoardButton from '@/components/button/dashBoard/create/createDashBoardButton';
import NewDashboardModal from '@/components/modal/newDashboardModal/newDashboardModal';

function MyDashboard() {
  const [DSize, setDSize] = useState(5);
  const [page, setPage] = useState(1);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [dashboard, setDashboard] = useState<DashBoardData>();

  const { data: dashboardsData } = useQuery({
    queryKey: [QUERY_KEYS.dashboards, DSize, page],
    queryFn: () => getDashboards('pagination', DSize, page),
    enabled: true,
    placeholderData: dashboard,
  });

  function handleClick() {
    setIsOpenModal((prev) => !prev);
  }

  useEffect(() => {
    if (page > 1) {
      setDSize(6);
    } else if (page === 1) {
      setDSize(5);
    }
  }, [page]);

  useEffect(() => {
    setDashboard(dashboardsData);
  }, [dashboardsData]);

  return (
    <>
      {dashboard ? (
        <PaginationCreateDashboard
          dashboardData={dashboard}
          onClick={handleClick}
          page={page}
          setPage={setPage}
        />
      ) : (
        <CreateDashBoardButton onClick={handleClick} />
      )}
      <InvitedList />
      {isOpenModal && (
        <NewDashboardModal onClick={handleClick} redirect={false} />
      )}
    </>
  );
}

export default MyDashboard;

MyDashboard.getLayout = (page: ReactElement) => {
  return (
    <Layout folder="내 대시보드" active={false}>
      <NestedLayout>{page}</NestedLayout>
    </Layout>
  );
};
