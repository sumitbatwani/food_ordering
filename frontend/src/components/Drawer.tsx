import { Dialog, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const Drawer = ({
  onRequestClose,
  children,
}: {
  onRequestClose: () => void;
  children: any;
}) => {
  return (
    <Dialog
      open={true}
      onClose={onRequestClose}
      className="relative z-10"
    >
      <div className="fixed inset-0" />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="relative flex-1">
                  <button
                    onClick={onRequestClose}
                    className="absolute top-5 right-4 w-6 h-6 text-gray-800 cursor-pointer rounded-full flex items-center justify-center"
                  >
                    <XMarkIcon className="w-5" />
                  </button>
                  {/* Your content */}
                  {children}
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default Drawer;
