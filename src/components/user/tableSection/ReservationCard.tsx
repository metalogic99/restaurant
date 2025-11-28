export default function ReservationCard({ item }: { item: any }) {
  return (
    <div className="w-full max-w-md bg-white shadow-md rounded-xl p-4 border">
      <h2 className="text-xl font-semibold mb-2">{item.name}</h2>

      <div className="text-sm space-y-1">
        <p>
          <strong>Date:</strong> {new Date(item.date).toDateString()}
        </p>
        <p>
          <strong>Time:</strong> {new Date(item.time).toLocaleTimeString()}
        </p>
        <p>
          <strong>People:</strong> {item.peopleNos}
        </p>
        <p>
          <strong>Phone:</strong> {item.phone}
        </p>
        <p>
          <strong>Pre-Ordered:</strong> {item.preOrdered ? "Yes" : "No"}
        </p>
        <p>
          <strong>Table:</strong> {item.table.tableName}
        </p>
      </div>
    </div>
  );
}
