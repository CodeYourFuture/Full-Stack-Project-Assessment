export function AddVideoForm() {
  const addVideoHandler = (e) => {
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form)
    console.log("formData: ", formData)
    const title = formData.get('title')
    const url = formData.get('url')
    console.log(title, url)
  }
  return (
    <form onSubmit={addVideoHandler}>
      <input type="text" name="title" placeholder="Title" />
      <input type="text" name="url" placeholder="URL" />
      <button type="submit">Add Video</button>
    </form>
  )
}