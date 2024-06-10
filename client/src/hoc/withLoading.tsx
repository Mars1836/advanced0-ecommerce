// function withLoading<P extends object>(
//   WrappedComponent: React.ComponentType<P>
// ): React.FC<P & { isLoading: boolean }> {
//   const WithLoading: React.FC<P & { isLoading: boolean }> = ({
//     isLoading,
//     ...props
//   }: { isLoading: boolean } & P) => {
//     if (isLoading) {
//       return <div>Loading...</div>;
//     }

//     return <WrappedComponent {...(props as P)} />;
//   };

//   return WithLoading;
// }
function withLoading<P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P & { isLoading: boolean }> {
  const WithLoading: React.FC<P & { isLoading: boolean }> = ({
    isLoading,
    ...props
  }: {
    isLoading: boolean;
  } & P) => {
    if (isLoading) {
      return <div>Loading....</div>;
    }
    return <WrappedComponent {...(props as P)}></WrappedComponent>;
  };
  return WithLoading;
}
export default withLoading;
