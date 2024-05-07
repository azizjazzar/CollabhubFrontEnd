import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Spin, Alert, Tooltip, notification } from 'antd';
import { FileTextOutlined, DownloadOutlined, MessageOutlined } from '@ant-design/icons';
import { ChatContext, ChatState } from '@/Context/ChatProvider';
import { useNavigate } from 'react-router-dom';



const JobApplicationsOffers = () => {
  const [jobOffers, setJobOffers] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const { authData, setSelectedChat, addOrUpdateChat, chats } = useContext(ChatContext);
const navigate = useNavigate();

  useEffect(() => {
    const fetchJobOffers = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get('https://colabhub.onrender.com/jobs/get');
        setJobOffers(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching job offers:', error);
        setError('Failed to fetch job offers');
        notification.error({ message: 'Error', description: 'Failed to fetch job offers.' });
      }
      setLoading(false);
    };
    fetchJobOffers();
  }, []);

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

    const startChatWithApplicant = async (applicantId) => {
   try {
    const response = await axios.post(
      `https://colabhub.onrender.com/chat/acceschat`, // Ensure this URL is correct as per your setup
      { userId: applicantId }, // The applicant's ID to start a chat with
      {
        headers: {
          Authorization: `Bearer ${authData.accessToken}`, // Assuming you store the token in the user object
        },
      }
       );
       
       console.log("Response data:", response.data); // Log to see what you receive
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
      <h1 className="text-2xl font-bold my-4 ">Job Offers</h1>
      {error && <Alert message={error} type="error" />}
      {loading ? <Spin /> : (
        <Table dataSource={jobOffers} rowKey="_id" bordered className="py-4 px-5 mt-12">
          <Table.Column title="Title" dataIndex="title" key="title" />
          <Table.Column title="Location" dataIndex="location" key="location" />
          <Table.Column title="Actions" key="actions" render={(text, record) => (
            <Tooltip title="View applications">
              <Button
                icon={<FileTextOutlined />}
                onClick={() => fetchApplications(record._id)}
                className="py-1 px-3"
              >
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
              <p><strong>Applied on:</strong> {new Date(app.applyDate).toLocaleDateString()}</p>
              {app.cv && (
                <Tooltip title="Download CV">
                  <Button
                    icon={<DownloadOutlined />}
                    onClick={() => window.open(app.cv, '_blank')}
                    style={{ margin: '5px 0' }}
                  >
                    Download CV
                  </Button>
                </Tooltip>
              )}
            <Button onClick={() => startChatWithApplicant(app.applicantId._id)}>Approve & Chat</Button>

            </div>
          ))
        ) : <p>No applications found for this job.</p>}
      </Modal>
    </div>
  );
};

export default JobApplicationsOffers;