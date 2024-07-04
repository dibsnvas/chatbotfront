import { ReactMediaRecorder } from "react-media-recorder";
import { FaMicrophone } from "react-icons/fa";

type Props = {
  handleStop: any;
};

const RecordMessage = ({ handleStop }: Props) => {
  const translateStatus = (status: string) => {
    switch (status) {
      case "idle":
        return "В ожидании";
      case "recording":
        return "Запись";
      case "stopped":
        return "Остановлено";
      default:
        return status;
    }
  };

  return (
    <ReactMediaRecorder
      audio
      onStop={handleStop}
      render={({ status, startRecording, stopRecording }) => (
        <div className="mt-2">
          <button
            onMouseDown={startRecording}
            onMouseUp={stopRecording}
            className="bg-white p-4 rounded-full"
          >
            <FaMicrophone />
          </button>
          <p className="mt-2 text-white font-light">{translateStatus(status)}</p>
        </div>
      )}
    />
  );
};

export default RecordMessage;
