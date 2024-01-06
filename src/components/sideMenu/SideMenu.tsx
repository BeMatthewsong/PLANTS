import S from '@/components/sideMenu/sideMenu.module.css';
import Image from 'next/image';
import Link from 'next/link';
import SmallLogoImg from '@/assets/icons/SmallLogo.svg';
import TaskifyImg from '@/assets/icons/Taskify.svg';
import AddBoxImg from '@/assets/icons/AddBox.svg';
import { MouseEvent, useEffect, useState } from 'react';
import { DashBoardList } from '@/types/DashBoard';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import NewDashboardModal from '@/components/modal/newDashboardModal/newDashboardModal';
import { getDashboards } from '@/api/dashboard';
import { useQuery } from '@tanstack/react-query';
import QUERY_KEYS from '@/constants/queryKeys';
import SideMenuItem from '@/components/sideMenu/sideMenuItem';

interface SideMenuProps {
  pageId: number;
  initialPage: number;
  flag?: boolean;
  refreshFlag?: boolean;
}

function SideMenu({ pageId, initialPage, flag, refreshFlag }: SideMenuProps) {
  const [dashboards, setDashboards] = useState<DashBoardList[]>([]);
  const [target, setTarget] = useState<HTMLDivElement | null>(null);
  const [totalCount, setTotalCount] = useState<number>(Infinity);
  const [currentLength, setCurrentLength] = useState(0);
  const [isModalClicked, setIsModalClicked] = useState(false);
  const [page, setPage] = useState(initialPage);
  const [addFlag, setAddFlag] = useState(false);
  const { isLoading, data, refetch } = useQuery({
    queryKey: [QUERY_KEYS.dashboards],
    queryFn: () =>
      getDashboards({ navigationMethod: 'pagination', size: 5, page: page }),
    enabled: false,
  });

  async function fetchMoreDashboards() {
    if (isLoading) return;
    await refetch();
  }

  useEffect(() => {
    setDashboards([]);
    setPage(1);
    setCurrentLength(0);
    setTotalCount(0);
    refetch();
  }, [flag]);

  useEffect(() => {
    if (addFlag) {
      setDashboards([]);
      setPage(1);
      setCurrentLength(0);
      setTotalCount(0);
      refetch();
      setAddFlag(false);
    }
  }, [addFlag]);

  useEffect(() => {
    if (refreshFlag) {
      setDashboards([]);
      setPage(1);
      setCurrentLength(0);
      setTotalCount(0);
    }
  }, [refreshFlag]);

  useEffect(() => {
    if (data) {
      setPage((prev) => prev + 1);
      setDashboards((prev) => [...prev, ...data.dashboards]);
      setCurrentLength((prev) => prev + data.dashboards.length);
      setTotalCount(data.totalCount);
    }
  }, [data]);

  useIntersectionObserver({
    target: target,
    fetchCallback: fetchMoreDashboards,
    props: page,
  });

  function handleCancelClick() {
    setIsModalClicked(false);
  }

  function handleAddClick(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setIsModalClicked(true);
  }

  return (
    <div className={S.main}>
      <div className={S.headerOuter}>
        <div className={S.imgContainer}>
          <Link href="/mydashboard">
            <Image
              src={SmallLogoImg}
              alt="로고 이미지"
              className={S.smallLogoImg}
            />
          </Link>
          <Link href="/mydashboard">
            <Image
              src={TaskifyImg}
              alt="Taskify 이미지"
              className={S.taskifyImg}
            />
          </Link>
        </div>
        <div className={S.headerContainer}>
          <p className={S.headerDescription}>Dash Boards</p>
          <button onClick={handleAddClick}>
            <Image
              src={AddBoxImg}
              alt="대시보드 추가 이미지"
              width={20}
              height={20}
            />
          </button>
        </div>
        <button className={S.expansionButton}>사이드바 확장</button>
      </div>
      <div className={S.dashBoardOuter}>
        <ul className={S.dashBoardContainer}>
          {dashboards &&
            dashboards.map((dashboard) => (
              <SideMenuItem
                dashboardId={dashboard.id}
                pageId={pageId}
                dashboardColor={dashboard.color}
                dashboardTitle={dashboard.title}
                createdByMe={dashboard.createdByMe}
                key={dashboard.id}
              />
            ))}
          <div ref={setTarget} className={S.refContainer}>
            <div className={S.loading}>{isLoading && 'loading...'}</div>
          </div>
          <div className={S.warning}>
            {totalCount === currentLength && !isLoading
              ? 'no more data!'
              : null}
          </div>
        </ul>
      </div>
      {isModalClicked && (
        <NewDashboardModal
          onClick={handleCancelClick}
          setAddFlag={setAddFlag}
        />
      )}
    </div>
  );
}

export default SideMenu;
