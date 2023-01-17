import Video from '../Video.js';
import DeleteButton from './DeleteButton.js';

function VideoDelete(props) {
    const handleRemove = () => {
        <DeleteButton />
    }
    return (
        <div>
            <DeleteButton onRemove={handleRemove} />
            {Video}
        </div>
    );
}

export default VideoDelete;