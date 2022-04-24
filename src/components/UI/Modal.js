import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setModal } from '../../store/actions';

const Modal = () => {
  const modal = useSelector(state => state.modal)
  const dispatch = useDispatch()

  const closeModalHandler = () => {
    dispatch(setModal(false))
  }
  
  return (
    <>
      <Transition appear show={modal.show} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModalHandler}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="relative text-lg font-medium leading-6 text-gray-900 cursor-pointer"
                  onClick={closeModalHandler}
                >
                  <span className="absolute top-0 right-0">&times;</span>
                </Dialog.Title>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">
                    {modal.message}
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={modal.modalAction || closeModalHandler}
                  >
                    {modal.buttonText || "Close"}
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
};

export default Modal;
