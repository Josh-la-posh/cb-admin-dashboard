import React from 'react'
import '../../pages/auth/auth.css';
import { Link } from 'react-router-dom';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function AuthInputField({ label, type, validName, valueName, id, onChange, setOnFocus, nameFocus, errNote }) {
    return (
        <div className="mb-4 w-full">
            <label className="block text-black text-xs lg:text-[13px] mb-1 lg:md-4 flex items-center" htmlFor={id}>
                {label}
                <span className={validName ? 'valid' : 'hide'}>
                    <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validName || !valueName ? 'hide' : 'invalid'}>
                    <FontAwesomeIcon icon={faTimes} />
                </span>
            </label>
            <input
                type={type}
                id={id}
                name={id}
                // ref={emailRef}
                value={valueName}
                onChange={onChange}
                className="w-full px-3 py-2 text-sm border border-gray rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
                autoComplete='off'
                aria-invalid={() => validName ? 'false' : 'true'}
                aria-describedby='uidnote'
                onFocus={() => setOnFocus(true)}
                onBlur={() => setOnFocus(false)}
            />
            <p id='uidnote' className={nameFocus && valueName &&
                !validName ? 'instructions' : 'offscreen'}>
                <FontAwesomeIcon icon={faInfoCircle} />
                &nbsp;
                {errNote}
            </p>
        </div>
    )
}

export default AuthInputField