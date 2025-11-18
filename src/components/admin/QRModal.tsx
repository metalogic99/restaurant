import { useRef } from "react";
import QRCode from "react-qr-code";

const base_url = process.env.NEXT_PUBLIC_SOCKET_API ?? "";

const QRModal = ({ table, onCancel }: { table: Table; onCancel: any }) => {
  const printRef = useRef<HTMLDivElement>(null);
  const link = `${base_url}/guest?tableId=${table._id}`;

  const handlePrint = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!printRef.current) return;

    const printContent = printRef.current.innerHTML;
    const newWindow = window.open("", "_blank", "width=400,height=400");

    if (newWindow) {
      newWindow.document.write(`
        <html>
          <head>
            <title>Print QR Code</title>
            <style>
              body { text-align: center; margin: 20px; font-family: Arial, sans-serif; }
              .qr-code { margin-bottom: 10px; }
            </style>
          </head>
          <body>
            ${printContent}
          </body>
        </html>
      `);
      newWindow.document.close();
      newWindow.focus();

      setTimeout(() => {
        newWindow.print();
        newWindow.close();
      }, 500);
    }
  };

  return (
    <div>
      <div className="bg-black/50 fixed z-49 h-screen w-screen top-0 left-0"></div>
      <div className="bg-white mb-3 w-fit fixed z-50 h-fit top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2 p-8">
        <div ref={printRef}>
          <QRCode value={link} />
          <span className="text-center">Table: {table.tableName}</span>
        </div>
        <div className="flex items-center justify-between mt-2">
          <button
            onClick={handlePrint}
            className="px-5 py-1 cursor-pointer border-none rounded-lg bg-forestGreen hover:bg-forestGreen/90 text-white"
          >
            Print
          </button>
          <button
            onClick={onCancel}
            className="px-2 py-1 cursor-pointer border-none rounded-lg bg-red-500 hover:bg-red-500/90 text-white"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRModal;
