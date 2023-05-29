
function Header () {
    return (
        <form >
        <label>
          <input type="text" name="title" placeholder="Title"/>
          <input type="text" name="link" placeholder="Link"/>
        </label>
        <input type="submit" value="Add" />
      </form>
    )
}

export default Header

