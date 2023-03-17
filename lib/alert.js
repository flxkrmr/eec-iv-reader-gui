class Alert {
  constructor(alert) {
    this.alert = alert;
  }

  showAndFade(text, danger = false) {
    this.show(text, danger);
    setTimeout((a) => {
      a.classList.add("hidden");
    }, 2000, this.alert);
  }

  show(text, danger = false) {
    this.alert.classList.remove("hidden");
    this.alert.innerHTML=text;
    this.alert.classList.remove("alert-danger");
    this.alert.classList.remove("alert-primary");
    if (danger) {
      this.alert.classList.add("alert-danger");
    } else {
      this.alert.classList.add("alert-primary");
    }
  }
}