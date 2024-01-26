const ConvertToEmbedUrl = (fullUrl) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = fullUrl.match(regExp);

    return (match && match[2].length === 11)
        ? match[2]
        : null;
}

export default ConvertToEmbedUrl;