import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Grid, useMediaQuery } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import PostCard from '../Cards/PostCard';
import ResponsiveAppBar from '../Layout/ResponsiveAppBar';

const Home = ({ title, search, tags }) => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [end, setEnd] = useState(true);
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const imageListCols = isSmallScreen ? 6 : 2;
  useEffect(() => {
  
      setPage(0);
      setData([]);
      loadData();
   
  }, [title, search]);

  const searchData = async () => {
    try {
      let params = {
        tags: 'catering',
        search: search && search.length > 0 ? search : undefined,
        page: page,
        tags: tags
      };

      const res = await axios.get(`https://4dha3a7v6m.ap-south-1.awsapprunner.com/api/v1` + '/post/search', { params });

      if (res.data.success) {
        if (res.data.data.length > 0) {
          setCount(res.data.count);
          setData((prevData) => [...prevData, ...res.data.data]);
          setPage((prevPage) => prevPage + 1);
        } else {
          setEnd(false);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const loadData = async () => {
    try {
      let params = {
        search: search && search.length > 0 ? search : undefined,
        page: page,
        tags: tags
      };

      const res = await axios.get(`https://4dha3a7v6m.ap-south-1.awsapprunner.com/api/v1`+ '/post/search', { params });

      if (res.data.success) {
        if (res.data.data.length > 0) {
          setCount(res.data.count);
          setData(res.data.data);
          setPage((prevPage) => prevPage + 1);
        } else {
          setEnd(false);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <ResponsiveAppBar/>
      <p
        style={{
          fontFamily: 'Outfit',
          marginBottom: 0,
          fontWeight: 'bold',
          fontSize: '20px'
        }}
      >
        Posts
      </p>
      <p
        style={{
          fontFamily: 'Outfit',
          marginBottom: '20px',
          marginTop: '-0px',
          fontSize: '14px',
          color: 'gray'
        }}
      >
        Discover the most trending vendors in Pune for an unforgettable experience
      </p>

      <InfiniteScroll
        dataLength={data.length}
        next={searchData}
        hasMore={end}
        loader={<h4>Loading...</h4>}
      >
        <Grid container spacing={[2, 2]}>
          {data.map((item) => (
            <Grid xs={imageListCols} item key={item?._id}>
              <PostCard item={item} />
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
    </div>
  );
};

export default Home;
