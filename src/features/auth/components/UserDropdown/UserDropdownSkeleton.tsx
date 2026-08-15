export default function UserDropdownSkeleton() {
  return (
    <div className="relative flex items-center justify-center h-48 w-48 bg-slate-900">
      {/* Pulse wave */}
      <div className="absolute bg-sky-500 rounded-full h-16 w-16 opacity-75 animate-ping"></div>

      {/* Core circle */}
      <div className="relative rounded-full h-8 w-8 bg-sky-500"></div>
    </div>
  );
}
