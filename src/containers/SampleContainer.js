import { connect } from 'react-redux';
import Sample from '../components/Sample';
import { getPost, getUsers } from '../modules/sample';
import { useEffect } from 'react';

const SampleContainer = ({
  post,
  users,
  error,
  loading,
  getPost,
  getUsers,
}) => {
  useEffect(() => {
    getPost(1);
    getUsers();
  }, [getPost, getUsers]);

  return <Sample post={post} users={users} error={error} loading={loading} />;
};

export default connect(
  (state) => ({
    post: state.sample.post,
    users: state.sample.users,
    loadingPost: state.sample.loading.GET_POST,
    loadingUsers: state.sample.loading.GET_USERS,
    error: state.sample.error,
  }),
  {
    getPost,
    getUsers,
  },
)(SampleContainer);
