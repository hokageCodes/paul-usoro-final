/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const questions = [
  { id: 1, label: "What's your name?", field: 'name' },
  { id: 2, label: "What’s your legal concern, {name}?", field: 'concern' },
  { id: 3, label: "Can we follow-up with an email?", field: 'email' },
];

const ContactModal = ({ closeModal }) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({ name: '', concern: '', email: '' });
  const modalRef = useRef(null);

  // Handle "Escape" key to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        console.log("Escape key pressed, closing modal...");
        closeModal();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [closeModal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => {
    if (step < questions.length - 1) setStep(step + 1);
  };

  const handleSubmit = () => {
    alert(JSON.stringify(formData, null, 2));
    closeModal();
  };

  const handleBackdropClick = (e) => {
    // Close modal if the backdrop is clicked and it's not inside the modal
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      console.log("Backdrop clicked, closing modal...");
      closeModal();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center pl-4 pr-4"
      onClick={handleBackdropClick}
    >
      <AnimatePresence>
        <motion.div
          ref={modalRef}
          className="relative bg-white p-8 rounded-md shadow-lg w-full max-w-md"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
        >
          <button
            className="absolute top-4 right-4 text-gray-600"
            onClick={closeModal}
          >
            ✕
          </button>

          {step < questions.length ? (
            <motion.div
              key={step}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <label className="block text-xl font-bold mb-4 text-[#01553d]">
                {questions[step].label.replace('{name}', formData.name || '')}
              </label>
              <input
                type="text"
                name={questions[step].field}
                value={formData[questions[step].field]}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-4"
              />
              <button
                onClick={handleNextStep}
                className="bg-[#01553d] text-white text-xl px-8 py-2"
              >
                {step < questions.length - 1 ? 'Next' : 'Submit'}
              </button>
            </motion.div>
          ) : (
            <div className="text-center">
              <p className="text-lg mb-4">
                Thank you, {formData.name}. We will be in touch soon.
              </p>
              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ContactModal;