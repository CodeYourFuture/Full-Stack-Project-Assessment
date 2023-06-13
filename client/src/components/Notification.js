export default function Notification({ message, bgColor }) {
    return (
        <div className="notification" style={{ backgroundColor: bgColor }}>
            <span>{message}</span>
        </div>
    );
}