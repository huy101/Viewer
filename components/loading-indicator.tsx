export function LoadingIndicator({ loading }: { loading: boolean }) {
  // If not loading, don't render anything
  if (!loading) return null;

  return (
    <div className='absolute inset-0 bg-black/20 flex items-center justify-center z-50'>
      <div className='bg-white p-4 rounded-lg shadow-lg flex items-center gap-3'>
        <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500'></div>
        <span>Loading model...</span>
      </div>
    </div>
  );
}
