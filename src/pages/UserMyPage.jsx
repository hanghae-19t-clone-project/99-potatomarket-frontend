import React, { useEffect, useState } from 'react';
import Card from '../components/common/Card';
import styled from 'styled-components';
import Layout from '../components/common/Layout';
import Text from '../components/common/Text';
import Button from '../components/common/Button';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import LoginSignup from './LoginSignup';
import Paging from '../components/paging/Paging';
import { useQuery, useQueryClient } from 'react-query';
import { getLikeList } from '../api/posts';
import { da } from 'date-fns/locale';

function UserMyPage() {
  const queryClient = useQueryClient();

  const [page, setPage] = useState(0);

  const { data, isLoadig } = useQuery(['likelist', page], () => getLikeList(page), {
    keepPreviousData: true,
    select: (data) => {
      return {
        likeList: data.likedProducts,
        hasMore: data.totalPages,
      };
    },
  });
  console.log(data);
  useEffect(() => {
    if (data?.hasMore) {
      queryClient.prefetchQuery(['likelist', page + 1], () => {
        getLikeList(page + 1);
      });
    }
  }, [data, page, queryClient]);

  const cookie = Cookies.get('accessToken');

  const navigate = useNavigate();

  const goUpload = () => {
    navigate('/uploads');
  };

  return (
    <>
      {cookie ? (
        <Layout>
          <PostTitle>나의 거래</PostTitle>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              position: 'relative',
              right: '15%',
            }}>
            <Button width={'10%'} height={'45px'} bc={'#9e7979'} onClick={goUpload}>
              <Text fontSize={'25px'} fontWeight={'bold'} color={'#ffffff'}>
                글쓰기
              </Text>
            </Button>
          </div>
          {/* 관심목록 */}
          <CardList>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Title>관심목록</Title>
            </div>
            <Cards>
              {isLoadig
                ? 'Loadig...'
                : data?.likeList?.map((card) => {
                    return <Card key={card.Post.post_id} card={card.Post} />;
                  })}
            </Cards>
            <Paging setPage={setPage} page={page} totalPages={data?.hasMore} />
          </CardList>
          {/* 판매중 */}
          <CardList>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Title>판매중</Title>
            </div>
            <Cards>
              <Card>
                <Buttons>
                  <Button width={'55%'} height={'30px'} outlinecolor={'#9e7979'} bc={'white'} linewidth={'2px'}>
                    <Text fontSize={'15px'} color={'#9e7979'} fontWeight={'bold'}>
                      거래완료
                    </Text>
                  </Button>
                  <Button bc={'#9e7979'} width={'40%'} height={'30px'}>
                    <Text fontSize={'15px'} color={'white'} fontWeight={'bold'}>
                      삭제
                    </Text>
                  </Button>
                </Buttons>
              </Card>
              <Card>
                <Buttons>
                  <Button width={'55%'} height={'30px'} outlinecolor={'#9e7979'} bc={'white'} linewidth={'2px'}>
                    <Text fontSize={'15px'} color={'#9e7979'} fontWeight={'bold'}>
                      거래완료
                    </Text>
                  </Button>
                  <Button bc={'#9e7979'} width={'40%'} height={'30px'}>
                    <Text fontSize={'15px'} color={'white'} fontWeight={'bold'}>
                      삭제
                    </Text>
                  </Button>
                </Buttons>
              </Card>
              <Card>
                <Buttons>
                  <Button width={'55%'} height={'30px'} outlinecolor={'#9e7979'} bc={'white'} linewidth={'2px'}>
                    <Text fontSize={'15px'} color={'#9e7979'} fontWeight={'bold'}>
                      거래완료
                    </Text>
                  </Button>
                  <Button bc={'#9e7979'} width={'40%'} height={'30px'}>
                    <Text fontSize={'15px'} color={'white'} fontWeight={'bold'}>
                      삭제
                    </Text>
                  </Button>
                </Buttons>
              </Card>
              <Card>
                <Buttons>
                  <Button width={'55%'} height={'30px'} outlinecolor={'#9e7979'} bc={'white'} linewidth={'2px'}>
                    <Text fontSize={'15px'} color={'#9e7979'} fontWeight={'bold'}>
                      거래완료
                    </Text>
                  </Button>
                  <Button bc={'#9e7979'} width={'40%'} height={'30px'}>
                    <Text fontSize={'15px'} color={'white'} fontWeight={'bold'}>
                      삭제
                    </Text>
                  </Button>
                </Buttons>
              </Card>
            </Cards>
          </CardList>
          <Paging />
          {/* 거래완료 */}
          <CardList>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Title>거래 완료</Title>
            </div>
            <Cards>
              <Card />
              <Card />
              <Card />
              <Card />
            </Cards>
          </CardList>
          <Paging />
        </Layout>
      ) : (
        <LoginSignup />
      )}
    </>
  );
}

export default UserMyPage;

const CardList = styled.div`
  width: 100%;
  margin: 50px 0px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-content: center;
`;

const Title = styled.div`
  color: rgba(158, 121, 121, 1);
  font-size: 25px;
  font-weight: 700;
  margin: 0 0 1rem;
  display: flex;
`;
const Cards = styled.div`
  gap: 50px;
  display: flex;
`;

const PostTitle = styled.div`
  display: flex;
  justify-content: center;
  font-size: 35px;
  font-weight: bold;
  color: rgba(190, 180, 125, 1);
  padding: 70px;
`;

const Buttons = styled.div`
  margin-top: 15px;
  justify-content: space-between;
  display: flex;
`;

//더보기버튼 거래완료 가로선 맞추기
//더보기버튼 스타일 정리
//컨테이너 밑에 배경색 채우기
