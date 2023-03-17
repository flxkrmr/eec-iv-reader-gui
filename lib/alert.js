class Alert {
  constructor(alert) {
    this.alert = alert;
  }

  showAndFade(text) {
    this.show(text);
    setTimeout((a) => {
      a.classList.add("hidden");
    }, 2000, this.alert);
  }

  show(text) {
    this.alert.classList.remove("hidden");
    this.alert.innerHTML=text;
  }
}