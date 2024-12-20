class Content {
  constructor(data) {
    this.id = data.id;
    this.type = data.type; // 'promotion', 'news', 'announcement'
    this.title = data.title;
    this.content = data.content;
    this.publishDate = data.publishDate;
    this.author = data.author;
  }
}

export default Content;
