import { Mosaic } from "react-loading-indicators";

export default function Loading() {
  return (
    <div className="absolute inset-0 flex h-screen items-center justify-center">
      <Mosaic
        color="#37d7f0"
        size="large"
        text="Please Wait"
        textColor="#000000"
      />
    </div>
  );
}
