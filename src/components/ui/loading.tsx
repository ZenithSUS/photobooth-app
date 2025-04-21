import { Mosaic } from "react-loading-indicators";

export default function Loading() {
  return (
    <div className="absolute inset-0 flex h-screen items-center justify-center">
      <Mosaic
        color="#6e82f9"
        size="large"
        text="Please Wait..."
        textColor="#000000"
      />
    </div>
  );
}
