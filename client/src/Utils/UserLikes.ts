const localData = localStorage.getItem('userLikes') ? JSON.parse(localStorage.getItem('userLikes') || '') : [];

type TLike = {
  id: number;
  like: number;
}

class UserLikes {
  likes: TLike[]

  constructor() {
    this.likes = localData;
  }

  addLike(id:number) {
    const existing = this.likes.find((like) => like.id === id)
    if (existing) {
      this.updateLike(id, 1);
    } else {
      const like = {
        id,
        like: 1,
      };
      this.likes.push(like);
    }
    this.persistData();
  }

  updateLike(id: number, num:number) {
    const likeId = this.likes.findIndex((el) => el.id === id);
    if (likeId) {
      this.likes[likeId].like = num;
    }
    this.persistData();
  }

  addDislike(id:number) {
    const existing = this.likes.find((like) => like.id === id)
    if (existing) {
      this.updateLike(id, -1);
    } else {
      const like = {
        id,
        like: -1,
      };
      this.likes.push(like);
    }
    this.persistData();
  }

  deleteLike(id:number) {
    const index = this.likes.findIndex((el) => el.id === id);
    this.likes.splice(index, 1);
    this.persistData();
  }

  getLike(id:number) {
    return this.likes.find((el) => el.id === id);
  }

  persistData() {
    localStorage.setItem('userLikes', JSON.stringify(this.likes));
  }
}

export default UserLikes;
