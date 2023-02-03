const Embeded = ({ url }) => {
  //   console.log(typeof url)
  let url0
  if (url.includes('watch?v=')) {
    url0 = url.replace('watch?v=', 'embed/')
  }
  return (
    <div>
      <iframe
        width="560"
        height="315"
        src={url0}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  )
}

export default Embeded
