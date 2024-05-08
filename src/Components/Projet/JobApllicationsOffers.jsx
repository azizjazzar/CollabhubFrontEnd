import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Spin, Alert, Tooltip, notification } from 'antd';
import { FileTextOutlined, DownloadOutlined, MessageOutlined } from '@ant-design/icons';
import { ChatContext } from '@/Context/ChatProvider';
import { useNavigate } from 'react-router-dom';
import moment from 'moment'; // For formatting dates

const JobApplicationsOffers = () => {
  const [jobOffers, setJobOffers] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { authData } = useContext(ChatContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (authData && authData.user && authData.user._id) {
      fetchJobOffers(authData.user._id);
    } else {
      // Handle user not logged in or data not loaded
      console.log("User data is not available");
    }
  }, [authData]);

  const fetchJobOffers = async (userId) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://colabhub.onrender.com/jobs/byowner/${userId}`, {
        headers: { Authorization: `Bearer ${authData.accessToken}` }
      });
      setJobOffers(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching job offers:', error);
      setError('Failed to fetch job offers');
      notification.error({ message: 'Error', description: 'Failed to fetch job offers.' });
    }
    setLoading(false);
  };

  const fetchApplications = async (jobId) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`https://colabhub.onrender.com/jobs/jobOffers/${jobId}/applications`);
      setApplications(data.applications);
      setSelectedJob(jobOffers.find(job => job._id === jobId));
      setError(null);
    } catch (error) {
      console.error('Error fetching applications:', error);
      setError('Failed to fetch applications');
      notification.error({ message: 'Error', description: 'Failed to fetch applications.' });
    }
    setLoading(false);
  };

  const startChatWithApplicant = async (applicantId,jobid) => {
    try {
      const formData = {
        jobId: jobid,
        freelancerId : applicantId,
        
      };
      await axios.post(`https://colabhub.onrender.com/jobs/add/${jobid}/${applicantId}`,formData);
      const response = await axios.post(
        `https://colabhub.onrender.com/chat/acceschat`,
        { userId: applicantId },
        { headers: { Authorization: `Bearer ${authData.accessToken}` } }
      );
      if (response.data) {
        notification.success({
          message: 'Chat Initialized',
          description: 'The chat has been successfully initialized.'
        });
        navigate(`/messagerie`);
      } else {
        throw new Error('No data received from the backend');
      }
    } catch (error) {
      console.error('Failed to start chat with applicant:', error.response || error);
      notification.error({
        message: 'Failed to Start Chat',
        description: error.response?.data?.message || 'Could not initialize a chat with the applicant. Please try again.'
      });
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold my-4">Job Offers</h1>
      {error && <Alert message={error} type="error" />}
      {loading ? <Spin /> : (
        <Table dataSource={jobOffers} rowKey="_id" bordered className="py-4 px-5 mt-12">
          <Table.Column title="Title" dataIndex="title" key="title" />
          <Table.Column title="Posted" dataIndex="posted" key="posted" render={date => moment(date).format('LL')} />
          <Table.Column title="Actions" key="actions" render={(text, record) => (
            <Tooltip title="View applications">
              <Button icon={<FileTextOutlined />} onClick={() => fetchApplications(record._id)} className="py-1 px-3">
                View
              </Button>
            </Tooltip>
          )} />
        </Table>
      )}
      <Modal
        title={`Applications for: ${selectedJob?.title}`}
        open={!!selectedJob}
        onCancel={() => setSelectedJob(null)}
        footer={null}
        destroyOnClose
      >
        {applications.length > 0 ? (
          applications.map(app => (
            <div key={app._id} style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
              <p><strong>Applicant Name:</strong> {`${app.applicantId.prenom} ${app.applicantId.nom}`}</p>
              <p><strong>Email:</strong> {app.applicantId.email}</p>
              <p><strong>Applied on:</strong> {moment(app.applyDate).format('LL')}</p>
              {app.cv && (
                <Tooltip title="Download CV">
                  <Button icon={<DownloadOutlined />} onClick={() => window.open(app.cv, '_blank')} style={{ margin: '5px 0' }}>
                    Download CV
                  </Button>
                </Tooltip>
              )}
              <Button onClick={() => startChatWithApplicant(app.applicantId._id,selectedJob._id)}>Approve & Chat</Button>
            </div>
          ))
        ) : <p>No applications found for this job.</p>}
    </Modal>
    </div>
  );
};

export default JobApplicationsOffers;
