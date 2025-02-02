import React, {useState, useEffect} from 'react';
import { AxiosPrivate } from '../../api/axios';
import { useDispatch, useSelector } from 'react-redux';
import DisputeTable from './components/DisputesTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import DisputeForm from './DisputeForm';
import { disputeData } from '../../redux/disputeSlice';

const DISPUTE_URL= '/api/disputes';

function Disputes() {
    const axiosPrivate = AxiosPrivate();
    const dispatch = useDispatch();
    const disputes = useSelector((state) => state.dispute.disputes);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDisputeData, setSelectedDisputeData] = useState({});
    const [isExportPopupOpen, setIsExportPopupOpen] = useState(false);
    const storedMerchantData = localStorage.getItem('merchantData');
    const merchantData = storedMerchantData ? JSON.parse(storedMerchantData) : null;

    useEffect(() => {
        const fetchDisputes = async () => {
        if (disputes.length === 0) {
            try {
            const response = await axiosPrivate.get(DISPUTE_URL)
            if (response.status !== 200) {
                throw new Error('Failed to fetch disputes');
            }
            const data = await response.data.responseData;
            dispatch(disputeData(data));
            setLoading(false);
            } catch (error) {
            setError(error.message);
            setLoading(false);
            }
        } else {
            setLoading(false);
        }
        };

        fetchDisputes();
    }, []);

    const handleOpenModal = (val) => {
        setSelectedDisputeData(val);
        setIsModalOpen(true);
        console.log(val);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
      setSelectedDisputeData(null);
    };
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    
    return (
        <div className="min-h-screen bg-white border border-[#E4E7EC] rounded-lg p-8 sm:p-4 md:p-8">
            <div className="flex justify-between items-center">
                <header className="">
                    <h1 className="text-[22px] md:text-[28px] text-[#101928] font-semibold text-gray-800">Dispute</h1>
                </header>
                <button 
                    onClick={() => setIsExportPopupOpen(true)}
                    className='flex items-center justify-center rounded-[8px] gap-[10px] px-[12px] py-[8px] text-white text-xs font-[600] bg-priColor'
                >
                <FontAwesomeIcon icon={faDownload}/>
                <span>Export</span>
                </button>
            </div>

            {isModalOpen && 
            (<DisputeForm
                handleCloseModal={handleCloseModal}
                data={selectedDisputeData}
            />
            )}

            <DisputeTable isExportPopupOpen={isExportPopupOpen} setIsExportPopupOpen={setIsExportPopupOpen} disputes={disputes} handleOpenModal={handleOpenModal}/>


        </div>
    )
}

export default Disputes;