import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddContact = ({ isOpen, onClose, children }) => {
    const modalClassName = isOpen ? 'add-contact fixed inset-0 flex items-center justify-center' : 'add-contact hidden';

    return (
        <div className={modalClassName}>
            <div className="add-contact-overlay fixed inset-0 bg-black opacity-50 z-index-0"></div>
            <div className="add-contact-content flex flex-col gap-4 bg-white p-2 rounded shadow-lg relative w-[20%] ">
                <div className="flex flex-row justify-between border-b border-gray-200 pb-2">
                    <p className="text-lg font-semibold text-green-700">Add Contact</p>
                    <button class="modal-close text-lg font-bold  text-red-700" onClick={onClose}>
                        &times;
                    </button>
                </div>

                <div className='flex gap-2'>
                    <input
                        type="text"
                        id="contact-name"
                        required
                        className='border rounded w-full'
                        placeholder='Enter email or username'
                    />
                </div>
                <button class="bg-green-700 text-white px-2 py-1  rounded shadow hover:bg-green-800" onClick={onClose}>
                    Add
                </button>
            </div>
        </div>
    );
};


export default AddContact;
