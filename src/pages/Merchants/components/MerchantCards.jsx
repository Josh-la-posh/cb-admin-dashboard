import React from 'react'
import Card from '../../../components/dashboard/Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faHourglassHalf, faTriangleExclamation, faUsers } from '@fortawesome/free-solid-svg-icons'

function MerchantCards() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            <Card title="Total Merchants" value='12,657' color="bg-[#E3EFFC]" icon={<FontAwesomeIcon icon={faUsers} style={{ color: '#7447C6' }} />} />
            <Card title="Active Meechants" value='185' color="bg-[#E7F6EC]" icon={<FontAwesomeIcon icon={faCheck} style={{ color: '#40B869' }} />} />
            <Card title="Pending Verifications" value='1234500' color="bg-[#FFECE5]" icon={<FontAwesomeIcon icon={faHourglassHalf} style={{ color: '#F56630' }} />} />
            <Card title="Suspended Merchant" value='1234500' color="bg-[#FBEAE9]" icon={<FontAwesomeIcon icon={faTriangleExclamation} style={{ color: '#D42620' }} />} />
        </div>
    )
}

export default MerchantCards